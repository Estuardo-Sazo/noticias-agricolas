import { useEffect, useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import RichTextEditor from '../../../components/editor/RichTextEditor'
import { createArticle, getArticleById, updateArticle, uploadArticleImages } from '../services/articleService'
import { getMyProfile } from '../../users/services/userService'

export default function ArticleUpsertPage() {
  const params = useParams()
  const navigate = useNavigate()
  const articleId = params.id as string | undefined
  const isEdit = Boolean(articleId)

  const [role, setRole] = useState<'admin' | 'editor' | 'user' | undefined>()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [contentHtml, setContentHtml] = useState('')
  const [images, setImages] = useState<string[]>([])
  const [status, setStatus] = useState<'published' | 'draft'>('published')

  useEffect(() => {
    let mounted = true
    async function init() {
      try {
        const me = await getMyProfile()
        if (mounted) setRole((me?.role as any) || 'user')
        if (isEdit && articleId) {
          const a = await getArticleById(articleId)
          if (a && mounted) {
            setTitle(a.title || '')
            setSlug(a.slug || '')
            setExcerpt(a.excerpt || '')
            setContentHtml(a.contentHtml || '')
            setImages(a.images || [])
            setStatus((a.status as any) || 'published')
          }
        }
      } finally {
        if (mounted) setLoading(false)
      }
    }
    init()
    return () => { mounted = false }
  }, [isEdit, articleId])

  const canEdit = useMemo(() => role === 'admin' || role === 'editor', [role])

  async function handleUploadImages(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files ? Array.from(e.target.files) : []
    if (!files.length) return
    try {
      const urls = await uploadArticleImages(files)
      setImages((prev) => [...prev, ...urls])
    } catch (e: any) {
      alert(e?.message || 'No se pudieron subir las imágenes')
    }
  }

  async function handleSave() {
    try {
      setSaving(true)
      if (isEdit && articleId) {
        const updated = await updateArticle(articleId, { title, slug, excerpt, contentHtml, images, status })
        navigate(`/articles/${updated.slug || updated.id}`)
      } else {
        const created = await createArticle({ title, slug, excerpt, contentHtml, images, status })
        navigate(`/articles/${created.slug || created.id}`)
      }
    } catch (e: any) {
      alert(e?.message || 'No se pudo guardar el artículo')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className="p-4">Cargando…</p>
  if (!canEdit) return <p className="p-4">No tienes permisos para gestionar artículos.</p>

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{isEdit ? 'Editar artículo' : 'Nuevo artículo'}</h1>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Título</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Slug (opcional)</label>
          <input value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full border rounded-lg px-3 py-2" placeholder="mi-articulo" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Extracto</label>
          <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} className="w-full border rounded-lg px-3 py-2" rows={2} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Contenido</label>
          <RichTextEditor value={contentHtml} onChange={setContentHtml} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Imágenes</label>
          <input type="file" accept="image/*" multiple onChange={handleUploadImages} />
          {!!images.length && (
            <div className="mt-2 grid grid-cols-3 gap-2">
              {images.map((u) => (
                <img key={u} src={u} alt="img" className="w-full h-24 object-cover rounded-lg border" />
              ))}
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Estado</label>
          <select value={status} onChange={(e) => setStatus(e.target.value as any)} className="border rounded-lg px-3 py-2">
            <option value="published">Publicado</option>
            <option value="draft">Borrador</option>
          </select>
        </div>

        <div className="pt-2 flex justify-end gap-2">
          <button onClick={() => navigate(-1)} className="px-4 py-2 rounded-lg border">Cancelar</button>
          <button onClick={handleSave} disabled={saving} className="px-4 py-2 rounded-lg bg-primary-600 text-white disabled:opacity-50">
            {saving ? 'Guardando…' : 'Guardar'}
          </button>
        </div>
      </div>
    </div>
  )
}
