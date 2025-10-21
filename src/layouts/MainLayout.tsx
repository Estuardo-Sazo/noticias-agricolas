import type { ReactNode } from 'react'
import SidebarNav from '../components/nav/SidebarNav'
import MobileTopbar from '../components/nav/MobileTopbar'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

type Props = { children: ReactNode }

export default function MainLayout({ children }: Props) {
	const { logout } = useAuth()
	const navigate = useNavigate()

	async function handleLogout() {
		await logout()
		navigate('/login')
	}

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Mobile topbar */}
			<MobileTopbar onLogout={handleLogout} />
			<div className="grid grid-cols-1 md:grid-cols-[260px_1fr]">
				<SidebarNav onLogout={handleLogout} />
				<main className="p-6 md:p-10">{children}</main>
			</div>
		</div>
	)
}

