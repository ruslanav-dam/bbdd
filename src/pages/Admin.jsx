import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'

const EXAM_SLUG = 'modul2-sql-2526'

// ── helpers ───────────────────────────────────────────────────────────────────

function fmt(ts) {
  if (!ts) return '—'
  return new Date(ts).toLocaleString('ca-ES', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

function scoreColor(pct) {
  if (pct >= 50) return 'var(--accent-green)'
  if (pct >= 30) return 'var(--accent-orange)'
  return 'var(--accent-red)'
}

function StatusBadge({ status }) {
  const map = {
    in_progress:  { label: 'En curs',    bg: 'rgba(59,130,246,.15)',  color: 'var(--accent-blue)' },
    submitted:    { label: 'Entregat',   bg: 'rgba(16,185,129,.15)', color: 'var(--accent-green)' },
    suspended:    { label: 'Suspès',     bg: 'rgba(239,68,68,.15)',  color: 'var(--accent-red)' },
    abandoned:    { label: 'Abandonat',  bg: 'rgba(245,158,11,.15)', color: 'var(--accent-orange)' },
  }
  const s = map[status] ?? { label: status, bg: 'var(--bg-elevated)', color: 'var(--text-muted)' }
  return (
    <span style={{
      background: s.bg, color: s.color,
      padding: '0.2rem 0.6rem', borderRadius: 6,
      fontSize: '0.78rem', fontWeight: 600,
    }}>
      {s.label}
    </span>
  )
}

// ── sub-components ────────────────────────────────────────────────────────────

function AnswerDetail({ attemptId }) {
  const [answers, setAnswers] = useState(null)
  const [audit, setAudit]    = useState(null)
  const [tab, setTab]        = useState('answers')

  useEffect(() => {
    supabase
      .from('attempt_answers')
      .select('*')
      .eq('attempt_id', attemptId)
      .order('question_number')
      .then(({ data }) => setAnswers(data ?? []))

    supabase
      .from('audit_events')
      .select('*')
      .eq('attempt_id', attemptId)
      .order('created_at')
      .then(({ data }) => setAudit(data ?? []))
  }, [attemptId])

  const tabStyle = (t) => ({
    background: tab === t ? 'var(--accent-purple)' : 'var(--bg-elevated)',
    color: tab === t ? '#fff' : 'var(--text-secondary)',
    border: 'none', borderRadius: 6, padding: '0.35rem 1rem',
    fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer',
    fontFamily: 'inherit',
  })

  return (
    <div className="answer-detail">
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <button style={tabStyle('answers')} onClick={() => setTab('answers')}>Respostes</button>
        <button style={tabStyle('audit')}   onClick={() => setTab('audit')}>Auditoria ({audit?.length ?? 0})</button>
      </div>

      {tab === 'answers' && (
        answers === null
          ? <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Carregant...</p>
          : answers.length === 0
            ? <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Sense respostes registrades.</p>
            : (
              <div className="admin-answers-table">
                <table>
                  <thead>
                    <tr>
                      <th>Pregunta</th>
                      <th>Resposta alumne</th>
                      <th>Punt.</th>
                      <th>Estat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {answers.map(a => {
                      const ans = a.question_type === 'mc'   ? a.mc_answer
                                : a.question_type === 'fill' ? a.fill_values?.join(' / ')
                                : a.write_text
                      return (
                      <tr key={a.id}>
                        <td style={{ fontFamily: 'monospace', fontSize: '0.82rem' }}>P{a.question_number}</td>
                        <td style={{ maxWidth: 320, wordBreak: 'break-word', fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                          {ans ?? <em style={{ color: 'var(--text-muted)' }}>sense resposta</em>}
                        </td>
                        <td style={{ fontWeight: 600, color: a.points_awarded > 0 ? 'var(--accent-green)' : 'var(--text-muted)' }}>
                          {a.points_awarded ?? 0}
                        </td>
                        <td>
                          {a.is_correct === true  && <span style={{ color: 'var(--accent-green)', fontWeight: 700 }}>✓</span>}
                          {a.is_correct === false && <span style={{ color: 'var(--accent-red)',   fontWeight: 700 }}>✗</span>}
                          {a.is_correct === null  && <span style={{ color: 'var(--accent-orange)' }}>?</span>}
                        </td>
                      </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )
      )}

      {tab === 'audit' && (
        audit === null
          ? <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Carregant...</p>
          : audit.length === 0
            ? <p style={{ color: 'var(--accent-green)', fontSize: '0.85rem' }}>Cap infracció registrada.</p>
            : (
              <div className="admin-answers-table">
                <table>
                  <thead>
                    <tr>
                      <th>Hora</th>
                      <th>Tipus</th>
                      <th>Detall</th>
                    </tr>
                  </thead>
                  <tbody>
                    {audit.map(e => (
                      <tr key={e.id}>
                        <td style={{ fontSize: '0.8rem', whiteSpace: 'nowrap' }}>{fmt(e.created_at)}</td>
                        <td>
                          <span style={{
                            background: 'rgba(239,68,68,.12)', color: 'var(--accent-red)',
                            padding: '0.15rem 0.5rem', borderRadius: 4, fontSize: '0.78rem', fontWeight: 600,
                          }}>{e.event_type}</span>
                        </td>
                        <td style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{e.event_data?.detail ?? '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
      )}
    </div>
  )
}

// ── main component ────────────────────────────────────────────────────────────

export default function Admin() {
  const [session,   setSession]   = useState(undefined) // undefined = loading
  const [isTeacher, setIsTeacher] = useState(false)
  const [attempts,  setAttempts]  = useState([])
  const [expanded,  setExpanded]  = useState(null)
  const [loading,   setLoading]   = useState(true)
  const [error,     setError]     = useState(null)

  // ── auth check ─────────────────────────────────────────────────────────────
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (session === undefined) return
    if (!session) { setLoading(false); return }

    supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()
      .then(({ data }) => {
        setIsTeacher(data?.role === 'teacher')
        if (data?.role === 'teacher') fetchData()
        else setLoading(false)
      })
  }, [session]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── data fetch ─────────────────────────────────────────────────────────────
  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    const { data, error: err } = await supabase
      .from('exam_attempts')
      .select(`
        id,
        status,
        score,
        score_pct,
        infraction_count,
        started_at,
        submitted_at,
        profiles:user_id ( full_name, email )
      `)
      .eq('exam_slug', EXAM_SLUG)
      .order('started_at', { ascending: false })

    if (err) setError(err.message)
    else setAttempts(data ?? [])
    setLoading(false)
  }, [])

  // ── logout ─────────────────────────────────────────────────────────────────
  async function handleLogout() {
    await supabase.auth.signOut()
    window.location.href = '#/login'
  }

  // ── stats ──────────────────────────────────────────────────────────────────
  const submitted = attempts.filter(a => a.status === 'submitted')
  const avgScore  = submitted.length
    ? (submitted.reduce((s, a) => s + (a.score ?? 0), 0) / submitted.length).toFixed(1)
    : '—'
  const passCount = submitted.filter(a => (a.score ?? 0) >= 5).length

  // ── guards ─────────────────────────────────────────────────────────────────
  if (session === undefined || loading) {
    return (
      <div className="admin-page">
        <div className="admin-loading">Carregant...</div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="admin-page">
        <div className="admin-card admin-auth-msg">
          <p>Has d'iniciar sessió per accedir al panell.</p>
          <a href="#/login" className="admin-btn">Iniciar sessió</a>
        </div>
      </div>
    )
  }

  if (!isTeacher) {
    return (
      <div className="admin-page">
        <div className="admin-card admin-auth-msg">
          <p>Accés restringit. Aquesta àrea és exclusiva per al professor.</p>
          <a href="#/login" className="admin-btn">Tornar</a>
        </div>
      </div>
    )
  }

  // ── render ─────────────────────────────────────────────────────────────────
  return (
    <div className="admin-page">
      {/* Header */}
      <div className="admin-topbar">
        <div className="admin-topbar-left">
          <span className="admin-badge-tag">PROFESSOR</span>
          <h1 className="admin-title">Panell d'Exàmens — {EXAM_SLUG}</h1>
        </div>
        <div className="admin-topbar-right">
          <button className="admin-refresh-btn" onClick={fetchData}>↻ Actualitzar</button>
          <button className="admin-logout-btn"  onClick={handleLogout}>Tancar sessió</button>
        </div>
      </div>

      <div className="admin-content">
        {/* Stats row */}
        <div className="admin-stats-row">
          <div className="admin-stat">
            <div className="admin-stat-value">{attempts.length}</div>
            <div className="admin-stat-label">Intents totals</div>
          </div>
          <div className="admin-stat">
            <div className="admin-stat-value" style={{ color: 'var(--accent-green)' }}>{submitted.length}</div>
            <div className="admin-stat-label">Entregats</div>
          </div>
          <div className="admin-stat">
            <div className="admin-stat-value" style={{ color: 'var(--accent-orange)' }}>
              {attempts.filter(a => a.status === 'suspended').length}
            </div>
            <div className="admin-stat-label">Suspesos (trampa)</div>
          </div>
          <div className="admin-stat">
            <div className="admin-stat-value" style={{ color: 'var(--accent-blue)' }}>{avgScore}</div>
            <div className="admin-stat-label">Nota mitjana</div>
          </div>
          <div className="admin-stat">
            <div className="admin-stat-value" style={{ color: 'var(--accent-purple)' }}>
              {submitted.length ? `${passCount}/${submitted.length}` : '—'}
            </div>
            <div className="admin-stat-label">Aprovats (≥50%)</div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: 'rgba(239,68,68,.1)', border: '1px solid var(--accent-red)',
            borderRadius: 10, padding: '1rem 1.25rem', marginBottom: '1.5rem',
            color: 'var(--accent-red)', fontSize: '0.9rem',
          }}>
            Error en carregar dades: {error}
          </div>
        )}

        {/* Attempts table */}
        <div className="admin-card">
          <h2 className="admin-section-title">Resultats dels alumnes</h2>
          {attempts.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', padding: '1rem 0' }}>
              Encara no hi ha intents registrats per a aquest examen.
            </p>
          ) : (
            <div className="admin-table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Alumne</th>
                    <th>Email</th>
                    <th>Estat</th>
                    <th>Puntuació</th>
                    <th>Infraccions</th>
                    <th>Inici</th>
                    <th>Entrega</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {attempts.map(a => {
                    const pct     = Math.round(a.score_pct ?? 0)
                    const isOpen  = expanded === a.id
                    const name    = a.profiles?.full_name ?? '—'
                    const email   = a.profiles?.email ?? '—'
                    return (
                      <>
                        <tr key={a.id} className={`attempt-row ${isOpen ? 'open' : ''}`}>
                          <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{name}</td>
                          <td style={{ fontSize: '0.82rem' }}>{email}</td>
                          <td><StatusBadge status={a.status} /></td>
                          <td>
                            {a.score !== null ? (
                              <div className="score-cell">
                                <span style={{ fontWeight: 700, color: scoreColor(pct) }}>
                                  {a.score?.toFixed(1)}/10
                                </span>
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginLeft: 4 }}>
                                  ({pct}%)
                                </span>
                                {a.status === 'submitted' && (
                                  <span style={{
                                    marginLeft: 6, fontSize: '0.75rem', fontWeight: 700,
                                    color: pct >= 50 ? 'var(--accent-green)' : 'var(--accent-red)',
                                  }}>
                                    {pct >= 50 ? 'APROVAT' : 'NO APROVAT'}
                                  </span>
                                )}
                              </div>
                            ) : '—'}
                          </td>
                          <td>
                            {a.infraction_count > 0 ? (
                              <span style={{ color: 'var(--accent-red)', fontWeight: 700 }}>
                                ⚠ {a.infraction_count}
                              </span>
                            ) : (
                              <span style={{ color: 'var(--text-muted)' }}>0</span>
                            )}
                          </td>
                          <td style={{ fontSize: '0.82rem' }}>{fmt(a.started_at)}</td>
                          <td style={{ fontSize: '0.82rem' }}>{fmt(a.submitted_at)}</td>
                          <td>
                            <button
                              className="detail-btn"
                              onClick={() => setExpanded(isOpen ? null : a.id)}
                            >
                              {isOpen ? '▲ Tancar' : '▼ Detall'}
                            </button>
                          </td>
                        </tr>
                        {isOpen && (
                          <tr key={`${a.id}-detail`} className="detail-row">
                            <td colSpan={8}>
                              <AnswerDetail attemptId={a.id} />
                            </td>
                          </tr>
                        )}
                      </>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
