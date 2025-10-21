import { useNavigate } from 'react-router-dom'

type Props = {
  image: string
  title: string
  excerpt: string
  badge?: string
  onReadMore?: () => void
}

export default function PostCard({ image, title, excerpt, badge, onReadMore }: Props) {
  const navigate = useNavigate()
  return (
    <article className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
      <div className="aspect-[16/9] w-full overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-4 flex flex-col gap-3 flex-1">
        {badge && (
          <span className="inline-flex items-center gap-1 text-xs text-gray-500">
            <span className="w-2 h-2 rounded-full bg-primary-500" />
            {badge}
          </span>
        )}
        <h3 className="font-semibold text-gray-900 leading-snug line-clamp-2">{title}</h3>
        <p className="text-sm text-gray-600 line-clamp-3 flex-1">{excerpt}</p>
        <div className="pt-2">
          <button
            onClick={onReadMore ?? (() => navigate('/posts/1'))}
            className="w-full md:w-auto px-4 py-2 text-sm font-medium rounded-lg border border-primary-500 text-primary-700 hover:bg-primary-50"
          >
            Leer más
          </button>
        </div>
      </div>
    </article>
  )
}
