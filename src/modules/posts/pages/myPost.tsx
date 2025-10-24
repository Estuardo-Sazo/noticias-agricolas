import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type Post = {
	id: number
	title: string
	excerpt: string
	image: string
	date: string // ISO
	status: 'published' | 'draft'
	views: number
	readingTime: string
}

const initialData: Post[] = [
	{
		id: 1,
		title: 'Técnicas Avanzadas para el Cultivo de Tomates Orgánicos',
		excerpt:
			'Descubre las técnicas clave para una cosecha abundante y saludable, desde la selección de semillas hasta la prevención de plagas.',
		image:
			'https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?q=80&w=1200&auto=format&fit=crop',
		date: '2025-08-21',
		status: 'published',
		views: 234,
		readingTime: '8 min',
	},
	{
		id: 2,
		title: 'Monitoreo del Clima: Herramientas Esenciales para la Agricultura Moderna',
		excerpt:
			'Conoce cómo integrar datos climáticos para planificar mejor tus cultivos y mitigar riesgos de clima extremo.',
		image:
			'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop',
		date: '2025-09-10',
		status: 'draft',
		views: 102,
		readingTime: '6 min',
	},
	{
		id: 3,
		title: 'Sistemas de Irrigación Eficientes: Ahorra Agua y Optimiza Rendimientos',
		excerpt: 'Estrategias de eficiencia hídrica adaptadas a distintos cultivos.',
		image:
			'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop',
		date: '2025-07-03',
		status: 'published',
		views: 398,
		readingTime: '5 min',
	},
]

function formatDate(iso: string) {
	const d = new Date(iso)
	return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })
}

export default function MyPostsPage() {
	const navigate = useNavigate()
	const [query, setQuery] = useState('')
	const [status, setStatus] = useState<'all' | 'published' | 'draft'>('all')
	const [rows, setRows] = useState<Post[]>(initialData)

	const filtered = useMemo(() => {
		return rows.filter((r) => {
			const okStatus = status === 'all' ? true : r.status === status
			const okQuery = (r.title + ' ' + r.excerpt).toLowerCase().includes(query.toLowerCase())
			return okStatus && okQuery
		})
	}, [rows, query, status])

	function togglePublish(id: number) {
		setRows((prev) =>
			prev.map((p) => (p.id === id ? { ...p, status: p.status === 'published' ? 'draft' : 'published' } : p))
		)
	}

	function removePost(id: number) {
		if (!confirm('¿Eliminar esta publicación? Esta acción no se puede deshacer.')) return
		setRows((prev) => prev.filter((p) => p.id !== id))
	}

	return (
		<div className="pb-16">
			<div className="flex items-center justify-between gap-3 mb-5">
				<h1 className="text-2xl font-bold">Mis Publicaciones</h1>
				<button
					onClick={() => navigate('/posts/new')}
					className="px-4 py-2 rounded-lg border border-primary-500 text-primary-700 hover:bg-primary-50 text-sm"
				>
					Nuevo post
				</button>
			</div>

				{/* Filtros */}
				<div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-4">
					<div className="flex items-center gap-2 w-full sm:w-auto">
						<input
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							type="search"
							placeholder="Buscar por título o contenido…"
							className="h-10 w-full sm:w-96 rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
						/>
						<select
							value={status}
							onChange={(e) => setStatus(e.target.value as any)}
							className="h-10 rounded-lg border border-gray-300 px-3 text-sm bg-white"
						>
							<option value="all">Todos</option>
							<option value="published">Publicado</option>
							<option value="draft">Borrador</option>
						</select>
					</div>
				</div>

				{/* Grid de tarjetas (todo tamaño) */}
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
					{filtered.map((p) => (
						<article key={p.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
							<div className="aspect-[16/9] w-full overflow-hidden">
								<img src={p.image} alt={p.title} className="w-full h-full object-cover" />
							</div>
							<div className="p-4 flex flex-col gap-3 flex-1">
								<div className="flex items-center justify-between gap-2">
									<h3 className="font-semibold text-gray-900 leading-snug line-clamp-2">{p.title}</h3>
									{p.status === 'published' ? (
										<span className="shrink-0 inline-flex items-center px-2 py-0.5 text-[10px] rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">Publicado</span>
									) : (
										<span className="shrink-0 inline-flex items-center px-2 py-0.5 text-[10px] rounded-full bg-gray-100 text-gray-700 border border-gray-200">Borrador</span>
									)}
								</div>
								<p className="text-sm text-gray-600 line-clamp-3 flex-1">{p.excerpt}</p>
								<div className="text-xs text-gray-500">{formatDate(p.date)} · {p.readingTime} · {p.views} vistas</div>
								<div className="flex flex-wrap items-center gap-2 pt-2">
									<button onClick={() => navigate(`/posts/${p.id}`)} className="px-3 py-1.5 rounded-md border text-sm">Ver</button>
									<button onClick={() => navigate('/posts/new')} className="px-3 py-1.5 rounded-md border border-primary-500 text-primary-700 text-sm">Editar</button>
									<button onClick={() => togglePublish(p.id)} className="px-3 py-1.5 rounded-md border border-amber-500 text-amber-700 text-sm">
										{p.status === 'published' ? 'Despublicar' : 'Publicar'}
									</button>
									<div className="ml-auto" />
									<button onClick={() => removePost(p.id)} className="px-3 py-1.5 rounded-md border border-red-500 text-red-600 text-sm">Eliminar</button>
								</div>
							</div>
						</article>
					))}
				</div>

			{filtered.length === 0 && (
				<div className="mt-6 rounded-xl border border-dashed border-gray-300 bg-gray-50/60 p-8 text-center text-sm text-gray-600">
					No hay publicaciones con esos filtros.
				</div>
			)}
		</div>
	)
}

