import type { ReactNode } from 'react'
import MobileTopbar from '../components/nav/MobileTopbar'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import TopNav from '../components/nav/TopNav'

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
			{/* Top navigations */}
			<MobileTopbar onLogout={handleLogout} />
			<TopNav onLogout={handleLogout} />

			{/* Content area (full width in desktop) */}
			<main className="p-6 md:p-10">{children}</main>
		</div>
	)
}

