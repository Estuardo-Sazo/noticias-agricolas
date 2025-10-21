export type Comment = {
  author: string
  avatar: string
  date: string
  text: string
}

type Props = {
  comments: Comment[]
}

export default function CommentsList({ comments }: Props) {
  if (!comments?.length) {
    return <p className="text-sm text-gray-500">Sé el primero en comentar.</p>
  }

  return (
    <ul className="mt-6 space-y-3">
      {comments.map((c, i) => (
        <li key={i} className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <img src={c.avatar} alt={c.author} className="w-10 h-10 rounded-full" />
            <div>
              <p className="font-medium">{c.author}</p>
              <p className="text-xs text-gray-500">{c.date}</p>
            </div>
          </div>
          <p className="mt-3 text-gray-700 text-sm">{c.text}</p>
        </li>
      ))}
    </ul>
  )
}
