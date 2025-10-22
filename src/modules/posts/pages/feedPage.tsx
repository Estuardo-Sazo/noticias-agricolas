import PostCard from '../components/posts/PostCard'
import CurrentWeatherCard from '../../weathers/components/CurrentWeatherCard'
import AlertsList, { type Alert } from '../../weathers/components/AlertsList'

const mockPosts = [
  {
    images: [
      'https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1200&auto=format&fit=crop'
    ],
    title: 'Técnicas Avanzadas para el Cultivo de Tomates Orgánicos',
    excerpt: 'Descubre las técnicas clave para una cosecha abundante y saludable, desde la selección de semillas hasta la prevención de plagas.',
    badge: '8 min',
    commentsCount: 12,
    author: { name: 'Ing. Marta López', avatar: 'https://i.pravatar.cc/80?img=1' },
    categories: ['Tomates', 'Orgánico', 'Suelo']
  },
  {
    images: [
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1587763146968-6d4f0b88d5a3?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop'
    ],
    title: 'Monitoreo del Clima: Herramientas Esenciales para la Agricultura Moderna',
    excerpt: 'Conoce cómo integrar datos climáticos para planificar mejor tus cultivos y mitigar riesgos de clima extremo.',
    badge: '6 min',
    commentsCount: 5,
    author: { name: 'Carlos Pérez', avatar: 'https://i.pravatar.cc/80?img=12' },
    categories: ['Clima', 'Tecnología']
  },
  {
    images: [
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1516302350523-b0e3b92e9c2a?q=80&w=1200&auto=format&fit=crop'
    ],
    title: 'La Importancia de la Salud del Suelo para una Cosecha Sostenible',
    excerpt: 'Buenas prácticas de rotación de cultivos, compostaje y mejoras del suelo para potenciar la productividad.',
    badge: '9 min',
    commentsCount: 31,
    author: { name: 'Ana Morales', avatar: 'https://i.pravatar.cc/80?img=5' },
    categories: ['Suelos', 'Sostenible', 'Rotación']
  },
  {
    images: [
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop'
    ],
    title: 'Sistemas de Irrigación Eficientes: Ahorra Agua y Optimiza Rendimientos',
    excerpt: 'Explora nuevas tecnologías de riego y estrategias de eficiencia hídrica adaptadas a distintos cultivos.',
    badge: '5 min',
    commentsCount: 8,
    author: { name: 'Mario Juárez', avatar: 'https://i.pravatar.cc/80?img=20' },
    categories: ['Riego', 'Eficiencia']
  },
  {
    images: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1472148083601-16f4a165c23a?q=80&w=1200&auto=format&fit=crop'
    ],
    title: 'Control Natural de Plagas: Protege tus Cultivos sin Químicos',
    excerpt: 'Implementa estrategias biológicas y trampas integradas para un manejo responsable de plagas.',
    badge: '7 min',
    commentsCount: 14,
    author: { name: 'Laura Gómez', avatar: 'https://i.pravatar.cc/80?img=32' },
    categories: ['Plagas', 'Manejo Integrado']
  },
  {
    images: [
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1514515927494-290f4f0d1e02?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1520975922203-baf7b1560d63?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop'
    ],
    title: 'Tecnología en el Campo: Smart Farming para el Agricultor Moderno',
    excerpt: 'Sensores, drones y datos para decisiones informadas y mejores resultados en tu producción.',
    badge: '10 min',
    commentsCount: 22,
    author: { name: 'Diego Hernández', avatar: 'https://i.pravatar.cc/80?img=41' },
    categories: ['Tecnología', 'Drones', 'Sensores', 'Datos']
  },
]

import { useNavigate } from 'react-router-dom'

export default function FeedPage() {
  const navigate = useNavigate()
  return (
    <div>
      {/* Encabezado */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <h1 className="text-2xl font-bold">Publicaciones Recientes</h1>
      </div>

      {/* Controles de búsqueda en móvil */}
      <div className="flex items-center gap-2 mb-4 lg:hidden">
        <input
          type="search"
          placeholder="Buscar artículos, guías..."
          className="h-10 flex-1 rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <button className="h-10 px-3 rounded-lg border border-gray-300 text-sm">Filtros</button>
        <button className="h-10 px-3 rounded-lg border border-gray-300 text-sm">Ordenar</button>
      </div>

      {/* Layout: contenido + barra derecha sticky */}
      <div className="lg:grid lg:grid-cols-[1fr_360px] lg:gap-6">
        {/* Contenido principal */}
        <div>
          {/* Todas como destacados (variante large) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockPosts.map((p, i) => (
              <PostCard key={`post-${i}`} {...p} variant="large" onOpen={() => navigate(`/posts/${i + 1}`)} />
            ))}
          </div>
        </div>

        {/* Barra derecha sticky */}
        <aside className="hidden lg:block">
          <div className="sticky top-20 space-y-4">
            {/* Búsqueda y acciones */}
            <div className="flex items-center gap-2">
              <input
                type="search"
                placeholder="Buscar artículos, guías..."
                className="h-10 flex-1 rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button className="h-10 px-3 rounded-lg border border-gray-300 text-sm">Filtros</button>
              <button className="h-10 px-3 rounded-lg border border-gray-300 text-sm">Ordenar</button>
            </div>

            {/* Clima */}
            <CurrentWeatherCard
              tempC={27}
              summary="Soleado con nubes dispersas"
              details={[
                { label: 'Sensación', value: '26°C', icon: 'feels' },
                { label: 'Humedad', value: '65%', icon: 'humidity' },
                { label: 'Viento', value: '12 km/h', icon: 'wind' },
                { label: 'Índice UV', value: 'Bajo', icon: 'uv' },
              ]}
            />

            {/* Alertas */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Alertas rápidas</h3>
              <AlertsList
                alerts={[
                  { title: 'Riesgo de lluvias intensas', description: 'Posibilidad de 25-50 mm en 24h. Prepara drenajes.', severity: 'medium', tags: ['Maíz'] },
                  { title: 'Ventana ideal para fertilizar', description: 'Vientos suaves y humedad moderada para aplicar.', severity: 'low', tags: ['Café'] },
                ] as Alert[]}
              />
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
