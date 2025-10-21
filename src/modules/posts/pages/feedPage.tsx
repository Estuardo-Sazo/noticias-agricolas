import PostCard from '../components/posts/PostCard'
import CurrentWeatherCard from '../../weathers/components/CurrentWeatherCard'
import AlertsList, { type Alert } from '../../weathers/components/AlertsList'

const mockPosts = [
  {
    image: 'https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?q=80&w=1200&auto=format&fit=crop',
    title: 'Técnicas Avanzadas para el Cultivo de Tomates Orgánicos',
    excerpt: 'Descubre las técnicas clave para una cosecha abundante y saludable, desde la selección de semillas hasta la prevención de plagas.',
    badge: '8 min',
  },
  {
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop',
    title: 'Monitoreo del Clima: Herramientas Esenciales para la Agricultura Moderna',
    excerpt: 'Conoce cómo integrar datos climáticos para planificar mejor tus cultivos y mitigar riesgos de clima extremo.',
    badge: '6 min',
  },
  {
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop',
    title: 'La Importancia de la Salud del Suelo para una Cosecha Sostenible',
    excerpt: 'Buenas prácticas de rotación de cultivos, compostaje y mejoras del suelo para potenciar la productividad.',
    badge: '9 min',
  },
  {
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop',
    title: 'Sistemas de Irrigación Eficientes: Ahorra Agua y Optimiza Rendimientos',
    excerpt: 'Explora nuevas tecnologías de riego y estrategias de eficiencia hídrica adaptadas a distintos cultivos.',
    badge: '5 min',
  },
  {
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop',
    title: 'Control Natural de Plagas: Protege tus Cultivos sin Químicos',
    excerpt: 'Implementa estrategias biológicas y trampas integradas para un manejo responsable de plagas.',
    badge: '7 min',
  },
  {
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=1200&auto=format&fit=crop',
    title: 'Tecnología en el Campo: Smart Farming para el Agricultor Moderno',
    excerpt: 'Sensores, drones y datos para decisiones informadas y mejores resultados en tu producción.',
    badge: '10 min',
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
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {mockPosts.map((p, i) => (
              <PostCard key={i} {...p} onReadMore={() => navigate(`/posts/${i + 1}`)} />
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
