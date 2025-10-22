import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { cropsService } from '../services/cropsService'
import type { Crop } from '../types'
import CropForm from '../components/CropForm'

export default function CropUpsertPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [initial, setInitial] = useState<Crop | undefined>()

  useEffect(() => {
    if (id) {
      const c = cropsService.get(id)
      setInitial(c)
    }
  }, [id])

  function handleSubmit(data: any) {
    if (id && initial) {
      cropsService.update(id, data)
    } else {
      cropsService.create(data)
    }
    navigate('/crops')
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-3 mb-4">
        <h1 className="text-2xl font-bold">{id ? 'Editar cultivo' : 'Nuevo cultivo'}</h1>
      </div>

      <div className="rounded-xl border border-gray-200 p-4">
        <CropForm initial={initial} onSubmit={handleSubmit} onCancel={() => navigate('/crops')} />
      </div>
    </div>
  )
}
