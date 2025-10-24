import { useState } from 'react'
import type { Crop, CropInput, AreaUnit, CropStatus } from '../../../model/crop'

const statusOptions: CropStatus[] = ['Sembrado', 'En crecimiento', 'Cosechado', 'Pausado']
const unitOptions: AreaUnit[] = ['ha', 'mz', 'm2']

type Props = {
  initial?: Partial<Crop>
  onSubmit: (data: CropInput) => void
  onCancel?: () => void
}

export default function CropForm({ initial, onSubmit, onCancel }: Props) {
  const [name, setName] = useState(initial?.name || '')
  const [type, setType] = useState(initial?.type || '')
  const [speciesName, setSpeciesName] = useState(initial?.speciesName || '')
  const [area, setArea] = useState<number>(initial?.area ?? 0)
  const [areaUnit, setAreaUnit] = useState<AreaUnit>(initial?.areaUnit || 'ha')
  const [status, setStatus] = useState<CropStatus>(initial?.status || 'Sembrado')
  const [sowingDate, setSowingDate] = useState(initial?.sowingDate || '')
  const [expectedHarvestDate, setExpectedHarvestDate] = useState(initial?.expectedHarvestDate || '')
  const [location, setLocation] = useState(initial?.location || '')
  const [notes, setNotes] = useState(initial?.notes || '')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() && !speciesName.trim()) {
      alert('Debes indicar nombre o especie')
      return
    }
    if (!type.trim()) {
      alert('Debes indicar el tipo de cultivo')
      return
    }
    if (!area || area <= 0) {
      alert('El área debe ser mayor a 0')
      return
    }
    const payload: CropInput = {
      userId: initial?.userId || 'me',
      name: name.trim() || speciesName.trim(),
      type: type.trim(),
      speciesName: speciesName.trim() || undefined,
      area,
      areaUnit,
      status,
      sowingDate: sowingDate || undefined,
      expectedHarvestDate: expectedHarvestDate || undefined,
      location: location || undefined,
      notes: notes || undefined,
    }
    onSubmit(payload)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-600">Nombre del cultivo</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full h-10 rounded-lg border border-gray-300 px-3" placeholder="Lote Norte" />
        </div>
        <div>
          <label className="text-sm text-gray-600">Especie</label>
          <input value={speciesName} onChange={(e) => setSpeciesName(e.target.value)} className="mt-1 w-full h-10 rounded-lg border border-gray-300 px-3" placeholder="Tomate, Maíz..." />
        </div>
        <div>
          <label className="text-sm text-gray-600">Tipo de cultivo</label>
          <input value={type} onChange={(e) => setType(e.target.value)} className="mt-1 w-full h-10 rounded-lg border border-gray-300 px-3" placeholder="Hortaliza, Grano..." />
        </div>
        <div className="grid grid-cols-[1fr_auto] gap-3">
          <div>
            <label className="text-sm text-gray-600">Área</label>
            <input type="number" step="0.01" value={area} onChange={(e) => setArea(parseFloat(e.target.value))} className="mt-1 w-full h-10 rounded-lg border border-gray-300 px-3" placeholder="2.5" />
          </div>
          <div>
            <label className="text-sm text-gray-600">Unidad</label>
            <select value={areaUnit} onChange={(e) => setAreaUnit(e.target.value as AreaUnit)} className="mt-1 w-full h-10 rounded-lg border border-gray-300 px-3">
              {unitOptions.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="text-sm text-gray-600">Estado</label>
          <select value={status} onChange={(e) => setStatus(e.target.value as CropStatus)} className="mt-1 w-full h-10 rounded-lg border border-gray-300 px-3">
            {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm text-gray-600">Fecha de siembra</label>
          <input type="date" value={sowingDate} onChange={(e) => setSowingDate(e.target.value)} className="mt-1 w-full h-10 rounded-lg border border-gray-300 px-3" />
        </div>
        <div>
          <label className="text-sm text-gray-600">Fecha estimada de cosecha</label>
          <input type="date" value={expectedHarvestDate} onChange={(e) => setExpectedHarvestDate(e.target.value)} className="mt-1 w-full h-10 rounded-lg border border-gray-300 px-3" />
        </div>
        <div className="md:col-span-2">
          <label className="text-sm text-gray-600">Ubicación</label>
          <input value={location} onChange={(e) => setLocation(e.target.value)} className="mt-1 w-full h-10 rounded-lg border border-gray-300 px-3" placeholder="Finca/sector" />
        </div>
        <div className="md:col-span-2">
          <label className="text-sm text-gray-600">Notas</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 p-3" rows={4} placeholder="Observaciones, riego, plagas, etc." />
        </div>
      </div>

      <div className="pt-2 flex justify-end gap-2">
        {onCancel && <button type="button" onClick={onCancel} className="px-4 py-2 rounded-lg border border-gray-300">Cancelar</button>}
        <button type="submit" className="px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700">Guardar</button>
      </div>
    </form>
  )
}
