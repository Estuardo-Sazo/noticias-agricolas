import { NavLink } from 'react-router-dom'

type Props = {
  onLogout?: () => void
}

type IconName = 'home' | 'user' | 'leaf' | 'cog' | 'question' | 'logout'

function Icon({ name, className }: { name: IconName; className?: string }) {
  const common = `w-5 h-5 ${className ?? ''}`
  switch (name) {
    case 'home':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 11.5L12 4l9 7.5" />
          <path d="M5 10.5V20h14v-9.5" />
        </svg>
      )
    case 'user':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 20c0-3.314 3.134-6 7-6s7 2.686 7 6" />
        </svg>
      )
    case 'leaf':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 4c-6 0-10 4-10 10 0 3 2 6 6 6 6 0 6-10 4-16z" />
          <path d="M10 14c2-2 6-4 10-4" />
        </svg>
      )
    case 'cog':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.7 2.75h2.6l.5 2.25a7.5 7.5 0 0 1 1.9.8l2-1.2 1.8 1.8-1.2 2a7.5 7.5 0 0 1 .8 1.9l2.25.5v2.6l-2.25.5a7.5 7.5 0 0 1-.8 1.9l1.2 2-1.8 1.8-2-1.2a7.5 7.5 0 0 1-1.9.8l-.5 2.25h-2.6l-.5-2.25a7.5 7.5 0 0 1-1.9-.8l-2 1.2-1.8-1.8 1.2-2a7.5 7.5 0 0 1-.8-1.9L2.75 13.3v-2.6l2.25-.5a7.5 7.5 0 0 1 .8-1.9l-1.2-2 1.8-1.8 2 1.2a7.5 7.5 0 0 1 1.9-.8l.5-2.25z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      )
    case 'question':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M9.5 9.75a2.5 2.5 0 1 1 3.5 2.25c-.7.3-1 1-1 2.25" />
          <circle cx="12" cy="17" r=".8" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'logout':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 16l5-4-5-4" />
          <path d="M19 12H9" />
          <path d="M5 5h6a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5" />
        </svg>
      )
    default:
      return null
  }
}

type NavItem = { to: string; label: string; icon: IconName; end?: boolean }

const navItems: NavItem[] = [
  { to: '/', label: 'Inicio', icon: 'home', end: true },
  { to: '/profile', label: 'Mi Perfil', icon: 'user' },
  { to: '/crops', label: 'Mis Cultivos', icon: 'leaf' },
  { to: '/settings', label: 'Configuración', icon: 'cog' },
  { to: '/help', label: 'Ayuda', icon: 'question' },
]

export default function SidebarNav({ onLogout }: Props) {
  return (
    <aside className="hidden md:flex md:flex-col border-r border-gray-200 bg-white md:min-h-screen p-4">
      <div className="flex items-center gap-2 px-2 text-primary-700 font-bold text-xl">
        <span className="inline-block w-6 h-6 rounded-full bg-primary-600" aria-hidden />
        <span>Agrícola</span>
      </div>
      <nav className="mt-6 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `group flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon name={item.icon} className={isActive ? 'text-primary-700' : 'text-gray-500'} />
                <span>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}

        {onLogout && (
          <button
            onClick={onLogout}
            className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
          >
            <Icon name="logout" />
            <span>Cerrar sesión</span>
          </button>
        )}
      </nav>
    </aside>
  )
}
