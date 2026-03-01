import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Modul1 from './pages/Modul1'
import Modul2 from './pages/Modul2'

export default function App() {
  return (
    <HashRouter>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/modul/1" replace />} />
          <Route path="/modul/1" element={<Modul1 />} />
          <Route path="/modul/2" element={<Modul2 />} />
        </Routes>
      </main>
      <Footer />
    </HashRouter>
  )
}
