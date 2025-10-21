import { useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
	const { logout } = useAuth()
	const navigate = useNavigate()

	const [name, setName] = useState('Juan Pérez')
	const [location, setLocation] = useState('Ciudad de México, México')
	const [interests, setInterests] = useState<Record<string, boolean>>({
		Maíz: true,
		Frijol: false,
		Café: true,
		Sandía: false,
		Girasol: false,
		Tomate: false,
	})

	function toggleInterest(key: string) {
		setInterests((prev) => ({ ...prev, [key]: !prev[key] }))
	}

	function handleSave() {
		// Aquí podrías integrar tu API/Supabase para guardar los datos
		console.log({ name, location, interests })
	}

	async function handleLogout() {
		await logout()
		navigate('/login')
	}

	return (
		<>
					{/* Content */}
					{/* Topbar */}
					<div className="flex justify-end items-center gap-3 mb-6">
						<button className="w-9 h-9 rounded-full bg-white shadow border border-gray-300" aria-label="Notificaciones">🔔</button>
						<button className="w-9 h-9 rounded-full bg-white shadow border border-gray-300" aria-label="Apps">🔳</button>
						<button className="w-9 h-9 rounded-full bg-white shadow border border-gray-300" aria-label="Ajustes">⚙️</button>
						<button className="w-9 h-9 rounded-full bg-white shadow border border-gray-300 overflow-hidden" aria-label="Cuenta">
							<img src="/assets/avatar.jpg" alt="avatar" className="w-full h-full object-cover" onError={(e)=>{(e.target as HTMLImageElement).style.display='none'}} />
						</button>
					</div>

					{/* Card */}
					<div className="max-w-3xl mx-auto bg-white rounded-2xl shadow border border-gray-200 p-6 sm:p-10">
						<div className="flex flex-col items-center text-center">
							<div className="w-24 h-24 rounded-full ring-4 ring-white shadow -mt-16 md:mt-0 overflow-hidden bg-gray-100">
								<img src="/assets/avatar.jpg" alt="avatar" className="w-full h-full object-cover" onError={(e)=>{(e.target as HTMLImageElement).style.display='none'}} />
							</div>
							<h1 className="text-2xl font-extrabold mt-4">Mi Perfil</h1>
							<p className="text-gray-500">Gestiona tu información personal y preferencias.</p>
						</div>

						{/* Form */}
						<div className="mt-8 space-y-6">
							{/* Nombre */}
							<div>
								<label className="block text-sm font-medium mb-2">Nombre Completo</label>
								<div className="relative">
									<span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">👤</span>
									<input
										value={name}
										onChange={(e) => setName(e.target.value)}
										type="text"
										className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
										placeholder="Tu nombre"
									/>
								</div>
							</div>

							{/* Ubicación */}
							<div>
								<label className="block text-sm font-medium mb-2">Ubicación</label>
								<div className="relative">
									<span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">📍</span>
									<input
										value={location}
										onChange={(e) => setLocation(e.target.value)}
										type="text"
										className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
										placeholder="Ciudad, País"
									/>
								</div>
							</div>

							{/* Cultivos de Interés */}
							<div>
								<label className="block text-sm font-medium mb-2">Cultivos de Interés</label>
								<div className="flex flex-wrap gap-x-5 gap-y-3">
									{Object.keys(interests).map((key) => (
										<label key={key} className="inline-flex items-center gap-2 cursor-pointer select-none">
											<input
												type="checkbox"
												checked={interests[key]}
												onChange={() => toggleInterest(key)}
												className="peer sr-only"
											/>
											<span className="w-5 h-5 rounded-sm border grid place-items-center bg-white peer-checked:bg-primary-600 peer-checked:border-primary-600 border-gray-300">
												<span className="text-white text-xs">✓</span>
											</span>
											<span className="text-sm text-gray-700">{key}</span>
										</label>
									))}
								</div>
							</div>

							<div className="pt-4 border-t flex items-center justify-end gap-3">
								<button
									onClick={handleSave}
									className="px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 shadow"
								>
									Guardar cambios
								</button>
								<button
									onClick={handleLogout}
									className="px-4 py-2 rounded-lg border border-red-300 text-red-600 hover:bg-red-50"
								>
									Cerrar sesión
								</button>
							</div>
						</div>
					</div>
		</>
	)
}

