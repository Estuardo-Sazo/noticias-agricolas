import { NavLink, Link } from 'react-router-dom'

type Props = {
  onLogout?: () => void
}

export default function TopNav({ onLogout }: Props) {
  const linkBase = 'px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100'
  const linkActive = 'bg-gray-100 text-gray-900'

  return (
    <header className="hidden md:block sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="mx-auto px-6 h-14 flex items-center justify-between">
        {/* Branding */}
        <Link to="/" className="flex items-center gap-2 text-primary-700 font-bold text-lg">
          <span className="inline-block w-4 h-4 rounded-full bg-primary-600" aria-hidden />
          Agrícola
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-1">
          <NavLink to="/" end className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ''}`}>Inicio</NavLink>
          <NavLink to="/weather" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ''}`}>Clima</NavLink>
          <NavLink to="/profile" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ''}`}>Mi Perfil</NavLink>
          <NavLink to="/posts" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ''}`}>Mis Publicaciones</NavLink>
          <NavLink to="/settings" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ''}`}>Configuración</NavLink>
          <NavLink to="/help" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ''}`}>Ayuda</NavLink>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <Link to="/posts/new" className="hidden lg:inline-flex px-3 py-2 rounded-lg border border-primary-500 text-primary-700 hover:bg-primary-50 text-sm">Nuevo post</Link>
          {onLogout && (
            <button onClick={onLogout} className="px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 text-sm">Cerrar sesión</button>
          )}
        </div>
      </div>
    </header>
  )
}
