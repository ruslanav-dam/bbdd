import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Login() {
  const navigate = useNavigate()
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState(null)
  const [loading,  setLoading]  = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    // 1. Autenticar
    const { data: authData, error: authErr } = await supabase.auth.signInWithPassword({ email, password })
    if (authErr) {
      setError('Credencials incorrectes.')
      setLoading(false)
      return
    }

    // 2. Llegir perfil
    const { data: profile, error: profErr } = await supabase
      .from('profiles')
      .select('role, is_whitelisted')
      .eq('id', authData.user.id)
      .single()

    if (profErr || !profile) {
      setError('No s\'ha trobat el perfil. Contacta amb el professor.')
      setLoading(false)
      return
    }

    if (!profile.is_whitelisted) {
      await supabase.auth.signOut()
      setError('No tens permís per accedir als exàmens. Contacta amb el professor.')
      setLoading(false)
      return
    }

    // 3. Redirigir per rol
    if (profile.role === 'teacher') {
      navigate('/admin')
    } else {
      navigate('/examen')
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <img src={`${import.meta.env.BASE_URL}lasalle_logo.JPG`} alt="La Salle Tarragona" />
        </div>

        <h1 className="login-title">Exàmens SQL</h1>
        <p className="login-sub">0484 Bases de Dades · DAM 2025-2026</p>

        <form onSubmit={handleSubmit} className="login-form">
          <label className="login-label">
            Correu electrònic
            <input
              type="email"
              className="login-input"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="nom.cognom@alumne.lassalle.cat"
              required
              autoComplete="email"
            />
          </label>

          <label className="login-label">
            Contrasenya
            <input
              type="password"
              className="login-input"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••••"
              required
              autoComplete="current-password"
            />
          </label>

          {error && <div className="login-error">{error}</div>}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Entrant...' : 'Accedir'}
          </button>
        </form>

        <p className="login-footer">
          Contrasenya inicial: <code>LaSalle2026!</code> · Contacta amb el professor si tens problemes
        </p>
      </div>
    </div>
  )
}
