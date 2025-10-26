import { useEffect, useState } from 'react'
import { listArticles } from '../services/articleService'
import type { Article } from '../../../model'
import { Link } from 'react-router-dom'

export default function ArticlesListPage() {
  const [items, setItems] = useState<Article[]>([])
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)

  async function load(p = page) {
    if (loading) return
    setLoading(true)
    try {
      const { items, hasMore } = await listArticles(p, 10, 'published')
      setItems((prev) => (p === 0 ? items : [...prev, ...items]))
      setHasMore(hasMore)
      setPage(p)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Artículos</h1>
      <ul className="space-y-4">
        {items.map((a) => (
          <li key={a.id} className="bg-white border rounded-xl p-4">
            <Link to={`/articles/${a.slug || a.id}`} className="text-lg font-semibold hover:underline">
              {a.title}
            </Link>
            {a.excerpt && <p className="text-sm text-gray-600 mt-1">{a.excerpt}</p>}
          </li>
        ))}
      </ul>
      {hasMore && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => load(page + 1)}
            disabled={loading}
            className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            {loading ? 'Cargando…' : 'Cargar más'}
          </button>
        </div>
      )}
    </div>
  )
}
