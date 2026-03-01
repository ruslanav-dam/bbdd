import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = {
  '/modul/1': [
    { id: 'crear-bd',     label: 'Crear BD' },
    { id: 'numerics',     label: 'Numèrics' },
    { id: 'text',         label: 'Text' },
    { id: 'data-hora',    label: 'Data/Hora' },
    { id: 'altres',       label: 'Altres' },
    { id: 'crear-taules', label: 'Crear Taules' },
  ],
  '/modul/2': [
    { id: 'agregacio', label: 'Agregació' },
    { id: 'alias',     label: 'AS Àlies' },
    { id: 'group-by',  label: 'GROUP BY' },
    { id: 'distinct',  label: 'DISTINCT' },
    { id: 'having',    label: 'HAVING' },
    { id: 'order-by',  label: 'ORDER BY' },
  ],
}

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function NavBar() {
  const { pathname } = useLocation()
  const links = NAV_LINKS[pathname] || []

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={`${import.meta.env.BASE_URL}lasalle_logo.JPG`} alt="La Salle Tarragona" />
      </div>

      <div className="navbar-modules">
        <Link to="/modul/1" className={`module-link ${pathname === '/modul/1' ? 'active' : ''}`}>
          Mòdul 1
        </Link>
        <Link to="/modul/2" className={`module-link ${pathname === '/modul/2' ? 'active' : ''}`}>
          Mòdul 2 ★
        </Link>
      </div>

      <ul className="navbar-sections">
        {links.map(({ id, label }) => (
          <li key={id}>
            <button onClick={() => scrollTo(id)}>{label}</button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
