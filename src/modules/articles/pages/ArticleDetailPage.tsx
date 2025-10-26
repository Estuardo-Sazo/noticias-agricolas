import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import DOMPurify from 'dompurify'
import { getArticleById, getArticleBySlug } from '../services/articleService'
import type { Article } from '../../../model'
import CommentsList from '../../posts/components/comments/CommentsList'
import { addArticleComment, deleteArticleComment, fetchArticleComments } from '../services/articleCommentsService'

export default function ArticleDetailPage() {
  const params = useParams()
  const idOrSlug = params.id as string
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)

  // Comentarios UI state
  const [comments, setComments] = useState<any[]>([])
  const [cPage, setCPage] = useState(0)
  const [cHasMore, setCHasMore] = useState(true)
  const [cInput, setCInput] = useState('')
  const [cSubmitting, setCSubmitting] = useState(false)

  useEffect(() => {
    let mounted = true
    async function load() {
      setLoading(true)
      try {
        // si es UUID o no: intentamos slug primero y si no, por id
        const bySlug = await getArticleBySlug(idOrSlug)
        const a = bySlug ?? (await getArticleById(idOrSlug))
        if (mounted) setArticle(a)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => {
      mounted = false
    }
  }, [idOrSlug])

  const sanitizedHtml = useMemo(() => {
    if (!article?.contentHtml) return ''
    return DOMPurify.sanitize(article.contentHtml, { USE_PROFILES: { html: true } })
  }, [article?.contentHtml])

  async function loadComments(p = cPage) {
    if (!article) return
    const { items, hasMore } = await fetchArticleComments(article.id, p, 10)
    setComments((prev) => (p === 0 ? items.map(rowToUIComment) : [...prev, ...items.map(rowToUIComment)]))
    setCHasMore(hasMore)
    setCPage(p)
  }

  function rowToUIComment(c: any) {
    return {
      id: c.id,
      author: c.author?.name || 'Usuario',
      avatar: c.author?.avatarUrl || `https://api.dicebear.com/9.x/identicon/svg?seed=${c.author?.id || 'u'}`,
      date: new Date(c.createdAt).toLocaleString(),
      text: c.text,
      canDelete: true, // la API ya valida autor; si no es autor, borrado fallará
    }
  }

  useEffect(() => {
    if (!article) return
    loadComments(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [article?.id])

  async function handleSubmitComment() {
    if (!article) return
    const text = cInput.trim()
    if (!text) return
    try {
      setCSubmitting(true)
      const created = await addArticleComment(article.id, text)
      setComments((prev) => [...prev, rowToUIComment(created)])
      setCInput('')
    } catch (e: any) {
      alert(e?.message || 'No se pudo enviar el comentario')
    } finally {
      setCSubmitting(false)
    }
  }

  async function handleDeleteComment(cid: string) {
    if (!article) return
    try {
      await deleteArticleComment(cid)
      setComments((prev) => prev.filter((c) => c.id !== cid))
    } catch (e: any) {
      alert(e?.message || 'No se pudo eliminar el comentario')
    }
  }

  if (loading) return <p className="p-4">Cargando…</p>
  if (!article) return <p className="p-4">No encontrado</p>

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-3">{article.title}</h1>
      {article.excerpt && <p className="text-gray-600 mb-4">{article.excerpt}</p>}
      <article className="prose max-w-none" dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />

      {/* Comentarios */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold">Comentarios</h2>
        <div className="mt-4">
          <textarea
            className="w-full border rounded-lg p-2"
            rows={3}
            placeholder="Escribe un comentario"
            value={cInput}
            onChange={(e) => setCInput(e.target.value)}
            disabled={cSubmitting}
          />
          <div className="mt-2 flex justify-end">
            <button
              onClick={handleSubmitComment}
              disabled={cSubmitting}
              className="px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50"
            >
              {cSubmitting ? 'Enviando…' : 'Comentar'}
            </button>
          </div>
        </div>

        <CommentsList comments={comments} onDelete={handleDeleteComment} />

        {cHasMore && (
          <div className="mt-4 flex justify-center">
            <button
              className="px-3 py-1.5 rounded-lg border bg-white hover:bg-gray-50"
              onClick={() => loadComments(cPage + 1)}
            >
              Cargar más
            </button>
          </div>
        )}
      </section>
    </div>
  )
}
