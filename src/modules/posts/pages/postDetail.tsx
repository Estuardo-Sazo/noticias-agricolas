import { useParams } from 'react-router-dom'
import CommentsList from '../components/comments/CommentsList'

const gallery = [
  'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1459664018906-085c36f472af?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1501820488136-72669149e0d4?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1457530378978-8bac673b8062?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1457530378978-8bac673b8062?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1524592877031-9f4bd2c1fdf4?q=80&w=1200&auto=format&fit=crop',
]

const author = {
  name: 'Ing. Marta López',
  avatar: 'https://i.pravatar.cc/80?img=1',
}

const comments = [
  {
    author: 'María_Paz',
    avatar: 'https://i.pravatar.cc/40?img=5',
    date: 'Hace 2 horas',
    text:
      '¡Excelente artículo! La información sobre la agricultura de precisión es muy relevante para los desafíos actuales. Me gustaría saber más sobre cómo pequeños agricultores pueden acceder a estas tecnologías.',
  },
  {
    author: 'Juan_Agro',
    avatar: 'https://i.pravatar.cc/40?img=12',
    date: 'Hace 6 horas',
    text:
      'Muy interesante el enfoque en agroecología. Es fundamental valorar a los suelos y trabajar con la naturaleza. ¿Hay algún modelo sobre el impacto económico en diferentes regiones?',
  },
  {
    author: 'Sonia_Verde',
    avatar: 'https://i.pravatar.cc/40?img=32',
    date: 'Ayer',
    text:
      'Me encantó la parte sobre energías renovables. Es un paso crucial hacia la independencia energética de las granjas. ¿Existen guías para empezar?'
  },
]

export default function PostDetail() {
  const { id } = useParams()

  return (
    <div className="pb-16 max-w-5xl mx-auto px-4">
      {/* Hero */}
      <div className="aspect-[21/9] w-full overflow-hidden rounded-2xl bg-gray-100">
        <img
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1800&auto=format&fit=crop"
          alt="cover"
        />
      </div>

      {/* Title + meta */}
      <header className="mt-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
          La Revolución Verde: Innovaciones en Agricultura Sostenible {id ? `#${id}` : ''}
        </h1>
        <div className="mt-3 flex items-center flex-wrap gap-4 md:gap-6 text-sm text-gray-500">
          <span className="inline-flex items-center gap-2">
            <img src={author.avatar} alt={author.name} className="w-8 h-8 rounded-full ring-2 ring-emerald-100 object-cover" />
            <span className="text-gray-800 font-medium">{author.name}</span>
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary-600" /> Agrícola
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gray-400" /> 11 de Mayo de 2024
          </span>
        </div>
      </header>

      {/* Content */}
      <article className="prose prose-neutral mt-6">
        <p>
          La agricultura sostenible no es solo una tendencia; es una necesidad urgente para asegurar el futuro de nuestro
          planeta. Con el crecimiento constante de la población mundial y la creciente preocupación por el cambio
          climático, la búsqueda de métodos agrícolas que protejan el medio ambiente y garanticen la seguridad alimentaria
          se ha vuelto crucial.
        </p>
        <p>
          Uno de los avances más significativos es la agricultura de precisión. Esta técnica utiliza tecnología avanzada,
          como sensores, GPS y drones, para monitorear y optimizar el uso de recursos. Los agricultores pueden aplicar
          fertilizantes y pesticidas de manera más eficiente, reduciendo el desperdicio y minimizando el impacto ambiental.
        </p>

        <h2>Energía Renovable en la Granja</h2>
        <p>
          La integración de fuentes de energía renovable, como la solar y la eólica, en las operaciones agrícolas está
          ganando terreno. Los paneles solares pueden alimentar sistemas de riego, maquinaria y edificios de granja,
          reduciendo la dependencia de los combustibles fósiles y los costos operativos.
        </p>

        <h2>El Futuro de la Alimentación</h2>
        <p>
          A medida que avanzamos, la investigación y el desarrollo continúan abriendo nuevas posibilidades. La biotecnología
          y la agrotecnología ofrecen herramientas para cultivar más resilientes, eficientes y sostenibles.
        </p>
      </article>

      {/* Gallery */}
      <section className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Galería de imágenes</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {gallery.map((src, i) => (
            <figure key={i} className="rounded-xl overflow-hidden border border-gray-200">
              <img src={src} alt={"galería-" + i} className="w-full h-40 object-cover" />
              <figcaption className="p-3 text-sm text-gray-600">Descripción de la imagen {i + 1}</figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-6 flex gap-3">
          <button className="px-4 py-2 rounded-lg border border-gray-300 text-sm">Compartir</button>
          <button className="px-4 py-2 rounded-lg border border-gray-300 text-sm">Guardar</button>
        </div>
      </section>

      {/* Comments */}
      <section className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Comentarios</h3>
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <textarea
            className="w-full p-4 outline-none resize-none min-h-28"
            placeholder="Escribe un comentario..."
          />
          <div className="p-3 border-t flex justify-end">
            <button className="px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700">Enviar</button>
          </div>
        </div>

        <CommentsList comments={comments} />
      </section>
    </div>
  )
}
