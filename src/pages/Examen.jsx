import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import {
  EXAM, MC_QUESTIONS, FILL_QUESTIONS, WRITE_QUESTIONS,
  gradeMC, gradeFill, gradeWrite, calcTotalScore,
} from '../lib/examData'
import useAntiCheat  from '../hooks/useAntiCheat'
import useHeartbeat  from '../hooks/useHeartbeat'

// ── Helpers ───────────────────────────────────────────────────────────────────

function pad(n) { return String(n).padStart(2, '0') }
function fmtTime(secs) { return `${pad(Math.floor(secs / 60))}:${pad(secs % 60)}` }
function fmtElapsed(ms) {
  const s = Math.floor(ms / 1000)
  return `${Math.floor(s / 60)}m ${s % 60}s`
}

// Renderitza un template amb {0},{1}... com a inputs inline en codi
function CodeTemplate({ template, inputs, values, onChange, disabled }) {
  const parts = template.split(/(\{[0-9]+\})/g)
  return (
    <code style={{ display: 'block', whiteSpace: 'pre', lineHeight: 1.8 }}>
      {parts.map((part, i) => {
        const m = part.match(/^\{([0-9]+)\}$/)
        if (m) {
          const inp = inputs[parseInt(m[1])]
          return (
            <input
              key={i}
              id={inp.id}
              className="fi"
              style={{ width: `${inp.width + 1}ch` }}
              value={values[inp.id] || ''}
              onChange={e => onChange(inp.id, e.target.value)}
              disabled={disabled}
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
            />
          )
        }
        return <span key={i}>{part}</span>
      })}
    </code>
  )
}

// ── Component principal ───────────────────────────────────────────────────────

export default function Examen() {
  const navigate = useNavigate()

  // ── Auth + perfil ─────────────────────────────────────────────────────────
  const [profile,  setProfile]  = useState(null)
  const [attempt,  setAttempt]  = useState(null)
  const [session,  setSession]  = useState(null)   // { token, userId }

  // ── Fase de la pàgina ─────────────────────────────────────────────────────
  const [phase, setPhase] = useState('loading')
  // 'loading' | 'not_auth' | 'not_whitelisted' | 'already_submitted'
  // | 'start' | 'exam' | 'suspended' | 'finished'

  // ── Estat de l'examen ─────────────────────────────────────────────────────
  const [timeLeft,     setTimeLeft]     = useState(EXAM.timeLimit)
  const [mcAnswers,    setMcAnswers]    = useState({})      // { qNum: 'C' }
  const [fillValues,   setFillValues]   = useState({})      // { id: 'AVG' }
  const [writeValues,  setWriteValues]  = useState({})      // { qNum: text }
  const [results,      setResults]      = useState(null)
  const [infractions,  setInfractions]  = useState([])
  const [suspendInfo,  setSuspendInfo]  = useState(null)
  const [saving,       setSaving]       = useState(false)
  const [copied,       setCopied]       = useState(false)

  const startTsRef   = useRef(null)
  const timerRef     = useRef(null)
  const finishedRef  = useRef(false)

  // ── Comptar preguntes respostes ───────────────────────────────────────────
  const answered = Object.keys(mcAnswers).length
    + FILL_QUESTIONS.filter(q => fillValues[q.inputs[0].id]).length
    + WRITE_QUESTIONS.filter(q => (writeValues[q.qNum] || '').trim()).length

  // ═════════════════════════════════════════════════════════════════════════
  // INIT: comprova auth + whitelist + existing submission
  // ═════════════════════════════════════════════════════════════════════════
  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setPhase('not_auth'); return }

      const { data: prof } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (!prof)               { setPhase('not_auth'); return }
      if (!prof.is_whitelisted){ setPhase('not_whitelisted'); return }
      setProfile(prof)

      // Comprova si ja ha entregat
      const { data: submitted } = await supabase
        .from('exam_attempts')
        .select('id, score, passed, submitted_at, time_spent_sec')
        .eq('user_id', user.id)
        .eq('exam_slug', EXAM.slug)
        .eq('status', 'submitted')
        .maybeSingle()

      if (submitted) {
        setAttempt(submitted)
        setPhase('already_submitted')
        return
      }

      setPhase('start')
    }
    init()
  }, [])

  // ═════════════════════════════════════════════════════════════════════════
  // INICIAR EXAMEN
  // ═════════════════════════════════════════════════════════════════════════
  async function startExam() {
    const { data: { user } } = await supabase.auth.getUser()

    // Crea un nou attempt (o reutilitza un in_progress)
    let att
    const { data: existing } = await supabase
      .from('exam_attempts')
      .select('id, session_token, time_left_sec')
      .eq('user_id', user.id)
      .eq('exam_slug', EXAM.slug)
      .eq('status', 'in_progress')
      .maybeSingle()

    if (existing) {
      att = existing
      // Restaura temps restant si hi ha
      if (existing.time_left_sec) setTimeLeft(existing.time_left_sec)
    } else {
      const { data: newAtt, error } = await supabase
        .from('exam_attempts')
        .insert({
          exam_slug:  EXAM.slug,
          user_id:    user.id,
          status:     'in_progress',
          user_agent: navigator.userAgent,
        })
        .select()
        .single()

      if (error) { alert('Error al crear l\'intent. Torna-ho a provar.'); return }
      att = newAtt
    }

    // Reclama sessió exclusiva
    const { data: token, error: sessErr } = await supabase.rpc('claim_exam_session', {
      p_attempt_id: att.id,
    })

    if (sessErr) {
      if (sessErr.message.includes('session_conflict')) {
        alert('Ja tens una sessió activa en un altre navegador o pestanya. Tanca-la i torna-ho a provar.')
      } else {
        alert('Error de sessió. Torna-ho a provar.')
      }
      return
    }

    setAttempt(att)
    setSession({ token, userId: user.id })
    startTsRef.current = Date.now()
    setPhase('exam')

    // Inicia el temporitzador
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current); doSubmit(true); return 0 }
        return t - 1
      })
    }, 1000)
  }

  // ═════════════════════════════════════════════════════════════════════════
  // ANTI-CHEAT + HEARTBEAT
  // ═════════════════════════════════════════════════════════════════════════
  const handleInfraction = useCallback(async ({ type, detail, ts }) => {
    if (finishedRef.current) return
    const newList = [...infractions, { type, detail, ts }]
    setInfractions(newList)

    // Guarda a la BD
    if (attempt && profile) {
      await supabase.from('audit_events').insert({
        attempt_id:  attempt.id,
        user_id:     profile.id,
        event_type:  type,
        event_data:  { detail },
      })

      await supabase
        .from('exam_attempts')
        .update({ infraction_count: newList.length })
        .eq('id', attempt.id)
    }

    // Suspèn si és greu
    const CRITICAL = ['tab_hidden', 'window_blur', 'devtools_key', 'devtools_size', 'view_source']
    if (CRITICAL.includes(type)) {
      doSuspend({ type, detail })
    }
  }, [attempt, profile, infractions])

  useAntiCheat(phase === 'exam', handleInfraction)
  useHeartbeat(
    session?.token,
    session?.userId,
    phase === 'exam',
    () => doSuspend({ type: 'session_conflict', detail: 'Sessió revocada per un altre dispositiu' })
  )

  // ═════════════════════════════════════════════════════════════════════════
  // SUSPENDRE
  // ═════════════════════════════════════════════════════════════════════════
  async function doSuspend({ type, detail }) {
    if (finishedRef.current) return
    finishedRef.current = true
    clearInterval(timerRef.current)
    setPhase('suspended')

    const elapsed = startTsRef.current ? Date.now() - startTsRef.current : 0
    const info = { type, detail, elapsed, ts: new Date().toLocaleString('ca-ES') }
    setSuspendInfo(info)

    if (attempt) {
      await supabase.from('exam_attempts').update({
        status: 'suspended',
        submitted_at: new Date().toISOString(),
        time_spent_sec: Math.floor(elapsed / 1000),
        time_left_sec: timeLeft,
        infraction_count: infractions.length + 1,
      }).eq('id', attempt.id)

      // Invalida la sessió activa
      await supabase.from('active_sessions').update({ is_active: false })
        .eq('session_token', session?.token)
    }
  }

  // ═════════════════════════════════════════════════════════════════════════
  // ENTREGAR
  // ═════════════════════════════════════════════════════════════════════════
  async function doSubmit(timeUp = false) {
    if (finishedRef.current) return
    finishedRef.current = true
    clearInterval(timerRef.current)
    setSaving(true)

    const score    = calcTotalScore(mcAnswers, fillValues, writeValues)
    const passed   = score >= 5
    const elapsed  = startTsRef.current ? Date.now() - startTsRef.current : 0

    // Calcula detall de cada resposta
    const answerRows = []

    // MC
    ;[...Object.keys(MC_QUESTIONS)].forEach(nStr => {
      const n    = parseInt(nStr)
      const user = mcAnswers[n]
      const ok   = gradeMC(n, user)
      answerRows.push({
        attempt_id:      attempt.id,
        question_number: n,
        question_type:   'mc',
        mc_answer:       user || null,
        is_correct:      !!user && ok,
        is_partial:      false,
        points_awarded:  ok ? 0.5 : 0,
      })
    })

    // Fill
    FILL_QUESTIONS.forEach(cfg => {
      const vals  = cfg.inputs.map(inp => fillValues[inp.id] || '')
      const ok    = gradeFill(cfg, fillValues)
      answerRows.push({
        attempt_id:      attempt.id,
        question_number: cfg.qNum,
        question_type:   'fill',
        fill_values:     vals,
        is_correct:      ok,
        is_partial:      false,
        points_awarded:  ok ? 0.5 : 0,
      })
    })

    // Write
    WRITE_QUESTIONS.forEach(cfg => {
      const text = writeValues[cfg.qNum] || ''
      const { correct, partial, pts } = gradeWrite(cfg, text)
      answerRows.push({
        attempt_id:      attempt.id,
        question_number: cfg.qNum,
        question_type:   'write',
        write_text:      text,
        is_correct:      correct,
        is_partial:      partial,
        points_awarded:  pts,
      })
    })

    // Guarda a Supabase
    await supabase.from('attempt_answers').upsert(answerRows, { onConflict: 'attempt_id,question_number' })

    await supabase.from('exam_attempts').update({
      status:          'submitted',
      score:           score,
      score_pct:       score * 10,
      passed,
      submitted_at:    new Date().toISOString(),
      time_spent_sec:  Math.floor(elapsed / 1000),
      time_left_sec:   timeLeft,
    }).eq('id', attempt.id)

    await supabase.from('active_sessions').update({ is_active: false })
      .eq('session_token', session?.token)

    // Build per-question detail for the summary screen
    const strip = s => (s || '').replace(/<[^>]+>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ')
    const details = []

    // MC — Part A (1-8) + Part C (15-17)
    ;[1,2,3,4,5,6,7,8,15,16,17].forEach(n => {
      const q      = MC_QUESTIONS[n]
      const userA  = mcAnswers[n]
      const ok     = gradeMC(n, userA)
      details.push({
        qNum: n, type: 'mc',
        studentAnswer: userA ? `${userA}) ${strip(q.options[userA])}` : '',
        correctAnswer: `${q.correct}) ${strip(q.options[q.correct])}`,
        pts: ok ? 0.5 : 0, maxPts: 0.5,
        isCorrect: ok, isPartial: false,
      })
    })

    // Fill — Part B (9-14)
    FILL_QUESTIONS.forEach(cfg => {
      const ok = gradeFill(cfg, fillValues)
      details.push({
        qNum: cfg.qNum, type: 'fill',
        studentAnswer: cfg.inputs.map(inp => fillValues[inp.id] || '—').join(' / '),
        correctAnswer: cfg.inputs.map(inp => inp.answer).join(' / '),
        pts: ok ? 0.5 : 0, maxPts: 0.5,
        isCorrect: ok, isPartial: false,
      })
    })

    // Write — Part D (18-20)
    WRITE_QUESTIONS.forEach(cfg => {
      const text = writeValues[cfg.qNum] || ''
      const { correct, partial, pts: wpts } = gradeWrite(cfg, text)
      details.push({
        qNum: cfg.qNum, type: 'write',
        studentAnswer: text,
        pts: wpts, maxPts: 1.0,
        isCorrect: correct, isPartial: partial,
      })
    })

    setResults({ score, passed, elapsed, timeUp, totalQ: EXAM.totalQ, details })
    setPhase('finished')
    setSaving(false)
  }

  // ═════════════════════════════════════════════════════════════════════════
  // RENDERS
  // ═════════════════════════════════════════════════════════════════════════

  if (phase === 'loading') return (
    <div className="overlay">
      <p style={{ color: 'var(--text-secondary)' }}>Carregant…</p>
    </div>
  )

  if (phase === 'not_auth') return (
    <div className="overlay">
      <div className="ov-logo"><img src={`${import.meta.env.BASE_URL}lasalle_logo.JPG`} alt="La Salle" /></div>
      <h2 className="ov-title">Accés restringit</h2>
      <p className="ov-sub">Has d'iniciar sessió per accedir als exàmens.</p>
      <button className="exam-btn" onClick={() => navigate('/login')}>Iniciar sessió</button>
    </div>
  )

  if (phase === 'not_whitelisted') return (
    <div className="overlay">
      <div className="ov-logo"><img src={`${import.meta.env.BASE_URL}lasalle_logo.JPG`} alt="La Salle" /></div>
      <h2 className="ov-title" style={{ color: 'var(--accent-red)' }}>Sense permís</h2>
      <p className="ov-sub">No estàs a la llista d'alumnes autoritzats. Contacta amb el professor.</p>
    </div>
  )

  if (phase === 'already_submitted') return (
    <div className="overlay">
      <div className="ov-logo"><img src={`${import.meta.env.BASE_URL}lasalle_logo.JPG`} alt="La Salle" /></div>
      <h2 className="ov-title">Examen ja entregat</h2>
      <p className="ov-sub">Ja has entregat aquest examen. Només es permet un intent.</p>
      {attempt && (
        <div className="result-stats" style={{ marginTop: '1.5rem' }}>
          <div className="rstat">
            <span className="rstat-label">Nota</span>
            <span className={`rstat-val ${attempt.passed ? 'pass-text' : 'fail-text'}`}>
              {attempt.score?.toFixed(2)}/10
            </span>
          </div>
          <div className="rstat">
            <span className="rstat-label">Resultat</span>
            <span className={`rstat-val ${attempt.passed ? 'pass-text' : 'fail-text'}`}>
              {attempt.passed ? 'Aprovat' : 'Suspès'}
            </span>
          </div>
        </div>
      )}
    </div>
  )

  if (phase === 'start') return (
    <div className="overlay">
      <div className="ov-logo"><img src={`${import.meta.env.BASE_URL}lasalle_logo.JPG`} alt="La Salle" /></div>
      <div className="module-tag" style={{ marginBottom: '1rem' }}>Mòdul 2</div>
      <h2 className="ov-title">{EXAM.title}</h2>
      <p className="ov-sub">{EXAM.subtitle}</p>

      <div className="rules-box">
        <h4>Normes de l'examen</h4>
        <ul>
          <li>⏱ Temps límit: <strong>25 minuts</strong></li>
          <li>📋 20 preguntes · Nota màxima: 10 punts</li>
          <li>🔒 <strong>Un sol intent.</strong> Un cop entregat no es pot repetir.</li>
          <li>🚫 Canviar de pestanya o finestra <strong>suspèn l'examen automàticament</strong></li>
          <li>🚫 Eines de desenvolupador desactivades</li>
          <li>🚫 Clic dret desactivat</li>
          <li>📱 Assegura't de tenir connexió estable</li>
        </ul>
      </div>

      {profile && (
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          Hola, <strong style={{ color: 'var(--text-primary)' }}>{profile.full_name}</strong>
        </p>
      )}

      <button className="exam-btn exam-btn-start" onClick={startExam}>
        Iniciar examen
      </button>
    </div>
  )

  if (phase === 'suspended') return (
    <div className="overlay">
      <div className="ov-logo"><img src={`${import.meta.env.BASE_URL}lasalle_logo.JPG`} alt="La Salle" /></div>
      <h2 className="ov-title" style={{ color: 'var(--accent-red)' }}>Examen suspès per infracció</h2>
      <p className="ov-sub">S'ha detectat una acció no permesa. L'examen s'ha tancat.</p>

      {suspendInfo && (
        <div className="suspend-box">
          <div><span>Alumne/a:</span><strong>{profile?.full_name || '—'}</strong></div>
          <div><span>Hora:</span><strong>{suspendInfo.ts}</strong></div>
          <div><span>Motiu:</span><strong>{suspendInfo.detail}</strong></div>
          <div><span>Temps transcorregut:</span><strong>{fmtElapsed(suspendInfo.elapsed)}</strong></div>
          <div><span>Infraccions totals:</span><strong>{infractions.length}</strong></div>
        </div>
      )}

      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '1rem' }}>
        Mostra aquesta pantalla al professor per a la verificació.
      </p>
    </div>
  )

  // ─── Helpers for result summary ─────────────────────────────────────────────
  function buildCopyText() {
    const sep  = '═'.repeat(54)
    const dash = '─'.repeat(54)
    const lines = [
      sep,
      `RESUM D'EXAMEN — ${EXAM.title}`,
      EXAM.course,
      sep,
      `Alumne/a   : ${profile?.full_name ?? '—'}`,
      `Data       : ${new Date().toLocaleString('ca-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}`,
      `Resultat   : ${results?.score.toFixed(2)}/10 — ${results?.passed ? 'APROVAT' : 'NO APROVAT'}`,
      `Temps      : ${fmtElapsed(results?.elapsed ?? 0)}`,
      `Infraccions: ${infractions.length}`,
    ]

    EXAM.parts.forEach(part => {
      lines.push('', dash, `${part.label.toUpperCase()} (${part.pts})`, dash)
      part.qNums.forEach(n => {
        const d = results?.details?.find(x => x.qNum === n)
        if (!d) return
        const icon = d.isCorrect ? '✓' : d.isPartial ? '≈' : '✗'
        if (d.type === 'write') {
          lines.push(`P${String(n).padStart(2)} ${icon}  [${d.pts.toFixed(1)}/${d.maxPts.toFixed(1)} pts]`)
          ;(d.studentAnswer || '(sense resposta)').split('\n').forEach(l => lines.push('   ' + l))
        } else {
          lines.push(`P${String(n).padStart(2)} ${icon}  Resposta : ${d.studentAnswer || '—'}   [${d.pts.toFixed(1)}/${d.maxPts.toFixed(1)} pts]`)
          if (!d.isCorrect) lines.push(`           Correcta : ${d.correctAnswer}`)
        }
      })
    })

    lines.push('', sep, `TOTAL: ${results?.score.toFixed(2)} / 10.00 — ${results?.passed ? 'APROVAT' : 'NO APROVAT'}`, sep)
    return lines.join('\n')
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(buildCopyText())
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  if (phase === 'finished' && results) return (
    <div className="result-page">

      {/* ── Sticky top bar ── */}
      <div className="result-topbar">
        <div>
          <div className="tb-name">{profile?.full_name}</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>{EXAM.course}</div>
        </div>
        <button className="copy-result-btn" onClick={handleCopy}>
          {copied ? '✓ Copiat!' : '📋 Copiar resum'}
        </button>
      </div>

      {/* ── Hero score ── */}
      <div className="result-hero">
        <div className={results.passed ? 'pass-text' : 'fail-text'} style={{ fontSize: '4rem', fontWeight: 800, fontFamily: 'JetBrains Mono, monospace', lineHeight: 1 }}>
          {results.score.toFixed(2)}
          <span style={{ fontSize: '1.6rem', color: 'var(--text-muted)', fontWeight: 400 }}>/10</span>
        </div>
        <div className={results.passed ? 'pass-badge' : 'fail-badge'}>
          {results.passed ? '✓ APROVAT' : '✗ NO APROVAT'}
        </div>
        <div className="result-meta-row">
          <span>⏱ {fmtElapsed(results.elapsed)}</span>
          {infractions.length > 0 && <span>⚠ {infractions.length} infracció{infractions.length !== 1 ? 'ns' : ''}</span>}
          {results.timeUp && <span>· Temps exhaurit</span>}
        </div>
      </div>

      {/* ── Per-part breakdown ── */}
      <div className="result-breakdown">
        {EXAM.parts.map(part => (
          <div key={part.id} className="result-part-block">
            <div className="result-part-hd">
              <span>{part.label}</span>
              <span className="result-part-pts">{part.pts}</span>
            </div>

            {part.qNums.map(n => {
              const d = results.details?.find(x => x.qNum === n)
              if (!d) return null
              return (
                <div key={n} className={`ans-row ${d.isCorrect ? 'ans-ok' : d.isPartial ? 'ans-partial' : 'ans-wrong'}`}>
                  <span className="ans-icon">{d.isCorrect ? '✓' : d.isPartial ? '≈' : '✗'}</span>
                  <span className="ans-qnum">P{n}</span>
                  <div className="ans-content">
                    {d.type === 'write' ? (
                      <pre className="ans-write-pre">{d.studentAnswer || '(sense resposta)'}</pre>
                    ) : (
                      <>
                        <span className="ans-your">
                          Teva: <strong>{d.studentAnswer || <em>sense resposta</em>}</strong>
                        </span>
                        {!d.isCorrect && (
                          <span className="ans-correct-lbl">
                            Correcta: <strong>{d.correctAnswer}</strong>
                          </span>
                        )}
                      </>
                    )}
                  </div>
                  <span className="ans-pts-tag">{d.pts.toFixed(1)}/{d.maxPts.toFixed(1)}</span>
                </div>
              )
            })}
          </div>
        ))}
      </div>

      {/* ── Bottom copy CTA ── */}
      <div className="result-copy-footer">
        <p>Copia el resum i envia'l al portal d'entrega.</p>
        <button className="copy-result-btn copy-result-btn-lg" onClick={handleCopy}>
          {copied ? '✓ Resum copiat al portapapers!' : '📋 Copiar resum per entregar'}
        </button>
      </div>
    </div>
  )

  // ─── EXAM IN PROGRESS ─────────────────────────────────────────────────────
  const urgent = timeLeft <= 120
  const warn   = timeLeft <= 300 && !urgent

  return (
    <div className="exam-wrapper">
      {/* Top bar */}
      <div className="exam-topbar">
        <span className="tb-name">{profile?.full_name}</span>
        <div className="tb-prog">
          <div className="prog-bar-wrap">
            <div
              className="prog-bar"
              style={{ width: `${Math.min(100, (answered / EXAM.totalQ) * 100)}%` }}
            />
          </div>
          <span className="prog-lbl">{answered} / {EXAM.totalQ}</span>
        </div>
        <span className={`exam-timer ${urgent ? 'crit' : warn ? 'warn' : ''}`}>
          {fmtTime(timeLeft)}
        </span>
        <button
          className="exam-btn exam-btn-submit"
          onClick={() => !saving && doSubmit()}
          disabled={saving}
        >
          {saving ? 'Guardant…' : 'Entregar'}
        </button>
      </div>

      {/* Questions */}
      <div className="exam-body">
        {EXAM.parts.map(part => (
          <div key={part.id} className="exam-part">
            <div className="part-header">
              <h2 className="part-title">{part.label}</h2>
              <span className="part-pts">{part.pts}</span>
            </div>

            {part.qNums.map(n => {
              const isMC   = MC_QUESTIONS[n]
              const isFill = FILL_QUESTIONS.find(q => q.qNum === n)
              const isWrite= WRITE_QUESTIONS.find(q => q.qNum === n)

              return (
                <div key={n} className="q-card" id={`q${n}`}>
                  <div className="q-num">P{n}</div>

                  {/* ── MC ── */}
                  {isMC && (
                    <>
                      <p
                        className="q-text"
                        dangerouslySetInnerHTML={{ __html: isMC.text }}
                      />
                      {isMC.code && (
                        <div className="code-block" style={{ margin: '0.75rem 0' }}>
                          <div className="code-content">
                            <code style={{ whiteSpace: 'pre', display: 'block' }}>{isMC.code}</code>
                          </div>
                        </div>
                      )}
                      <div className="opts">
                        {Object.entries(isMC.options).map(([letter, text]) => (
                          <button
                            key={letter}
                            className={`opt ${mcAnswers[n] === letter ? 'sel' : ''}`}
                            onClick={() => setMcAnswers(a => ({ ...a, [n]: letter }))}
                          >
                            <span className="opt-l">{letter}</span>
                            <span
                              className="opt-text"
                              dangerouslySetInnerHTML={{ __html: text }}
                            />
                          </button>
                        ))}
                      </div>
                    </>
                  )}

                  {/* ── Fill ── */}
                  {isFill && (
                    <>
                      <p
                        className="q-text"
                        dangerouslySetInnerHTML={{ __html: isFill.text }}
                      />
                      <div className="code-block" style={{ margin: '0.75rem 0' }}>
                        <div className="code-content">
                          <CodeTemplate
                            template={isFill.codeTemplate}
                            inputs={isFill.inputs}
                            values={fillValues}
                            onChange={(id, val) => setFillValues(v => ({ ...v, [id]: val }))}
                            disabled={false}
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {/* ── Write ── */}
                  {isWrite && (
                    <>
                      <p
                        className="q-text"
                        dangerouslySetInnerHTML={{ __html: isWrite.text }}
                      />
                      <textarea
                        className="write-area"
                        rows={7}
                        placeholder={isWrite.placeholder}
                        value={writeValues[n] || ''}
                        onChange={e => setWriteValues(v => ({ ...v, [n]: e.target.value }))}
                        spellCheck={false}
                        autoCorrect="off"
                      />
                    </>
                  )}
                </div>
              )
            })}
          </div>
        ))}

        <div style={{ textAlign: 'center', padding: '3rem 0 4rem' }}>
          <button
            className="exam-btn exam-btn-start"
            onClick={() => !saving && doSubmit()}
            disabled={saving}
          >
            {saving ? 'Guardant…' : 'Entregar examen'}
          </button>
        </div>
      </div>
    </div>
  )
}
