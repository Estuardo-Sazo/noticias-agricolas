import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import CommentsList from '../components/comments/CommentsList'
import { getPostById } from '../services/postService'
import type { Post } from '../../../model/post'

export default function PostDetail() {
  const { id } = useParams()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let alive = true
    async function load() {
      if (!id) return
      try {
        const p = await getPostById(id)
        if (alive) setPost(p)
      } catch (e: any) {
        console.error(e)
        if (alive) setError('No se pudo cargar la publicación')
      } finally {
        if (alive) setLoading(false)
      }
    }
    load()
    return () => {
      alive = false
    }
  }, [id])

  const hero = useMemo(() => post?.images?.[0], [post])
  const gallery = useMemo(() => (post?.images ?? []).slice(1), [post])

  if (loading) {
    return <div className="pb-16 max-w-5xl mx-auto px-4">Cargando…</div>
  }
  if (error || !post) {
    return <div className="pb-16 max-w-5xl mx-auto px-4 text-red-600">{error || 'Publicación no encontrada'}</div>
  }

  return (
    <div className="pb-16 max-w-5xl mx-auto px-4">
      {/* Hero */}
      <div className="aspect-[21/9] w-full overflow-hidden rounded-2xl bg-gray-100">
        {hero ? (
          <img className="w-full h-full object-cover" src={hero} alt={post.title} />
        ) : (
          <div className="w-full h-full grid place-items-center text-gray-400">Sin imagen</div>
        )}
      </div>

      {/* Title + meta */}
      <header className="mt-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">{post.title}</h1>
        <div className="mt-3 flex items-center flex-wrap gap-4 md:gap-6 text-sm text-gray-500">
          <span className="inline-flex items-center gap-2">
            <img src={post.author.avatarUrl || 'https://i.pravatar.cc/80?u='+post.author.id} alt={post.author.name || 'Autor'} className="w-8 h-8 rounded-full ring-2 ring-emerald-100 object-cover" />
            <span className="text-gray-800 font-medium">{post.author.name || 'Autor'}</span>
          </span>
          {post.categories && post.categories[0] && (
            <span className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary-600" /> {post.categories[0]}
            </span>
          )}
          {post.createdAt && (
            <span className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gray-400" /> {new Date(post.createdAt).toLocaleDateString('es-ES', { day:'2-digit', month:'long', year:'numeric' })}
            </span>
          )}
        </div>
      </header>

      {/* Content */}
      <article className="prose prose-neutral mt-6">
        {post.content ? (
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        ) : (
          <p className="text-gray-600">Sin contenido.</p>
        )}
      </article>

      {/* Gallery */}
      {gallery.length > 0 && (
        <section className="mt-10">
          <h3 className="text-xl font-semibold mb-4">Galería de imágenes</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {gallery.map((src, i) => (
              <figure key={i} className="rounded-xl overflow-hidden border border-gray-200">
                <img src={src} alt={"galería-" + i} className="w-full h-40 object-cover" />
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* Comments (placeholder UI) */}
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

        <CommentsList comments={[]} />
      </section>
    </div>
  )
}
