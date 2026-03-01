import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Modul1 from './pages/Modul1'
import Modul2 from './pages/Modul2'
import Login  from './pages/Login'
import Examen from './pages/Examen'
import Admin  from './pages/Admin'

// Pages that show the course shell (navbar + footer)
const SHELL_PATHS = ['/modul/1', '/modul/2']

function Layout() {
  const { pathname } = useLocation()
  const showShell = SHELL_PATHS.some(p => pathname.startsWith(p))

  return (
    <>
      {showShell && <NavBar />}
      <main style={showShell ? undefined : { paddingTop: 0 }}>
        <Routes>
          {/* Course pages */}
          <Route path="/"        element={<Navigate to="/modul/1" replace />} />
          <Route path="/modul/1" element={<Modul1 />} />
          <Route path="/modul/2" element={<Modul2 />} />

          {/* Exam system */}
          <Route path="/login"  element={<Login />} />
          <Route path="/examen" element={<Examen />} />
          <Route path="/admin"  element={<Admin />} />
        </Routes>
      </main>
      {showShell && <Footer />}
    </>
  )
}

export default function App() {
  return (
    <HashRouter>
      <Layout />
    </HashRouter>
  )
}
