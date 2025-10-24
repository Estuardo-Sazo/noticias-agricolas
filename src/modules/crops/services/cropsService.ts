import type { Crop, CropInput } from '../../../model/crop'

const KEY = 'crops'

function read(): Crop[] {
  const raw = localStorage.getItem(KEY)
  if (!raw) return []
  try {
    return JSON.parse(raw) as Crop[]
  } catch {
    return []
  }
}

function write(data: Crop[]) {
  localStorage.setItem(KEY, JSON.stringify(data))
}

function uuid() {
  return crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2)
}

export const cropsService = {
  list(): Crop[] {
    const data = read()
    if (data.length === 0) {
      // seed de ejemplo
      const seed: Crop[] = [
        {
          id: uuid(),
          userId: 'me',
          name: 'Lote Norte',
          type: 'Hortaliza',
          speciesName: 'Tomate',
          area: 2.5,
          areaUnit: 'ha',
          status: 'En crecimiento',
          sowingDate: '2025-08-15',
          expectedHarvestDate: '2025-11-20',
          location: 'Finca El Porvenir',
          notes: 'Riego por goteo',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: uuid(),
          userId: 'me',
          name: 'Parcela 3',
          type: 'Grano',
          speciesName: 'Maíz',
          area: 7,
          areaUnit: 'mz',
          status: 'Sembrado',
          sowingDate: '2025-09-01',
          expectedHarvestDate: '2026-01-10',
          location: 'Sector Sur',
          notes: 'Revisar malezas cada 10 días',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]
      write(seed)
      return seed
    }
    return data
  },
  get(id: string): Crop | undefined {
    return read().find((c) => c.id === id)
  },
  create(input: CropInput): Crop {
    const now = new Date().toISOString()
    const crop: Crop = { id: uuid(), createdAt: now, updatedAt: now, ...input }
    const data = read()
    data.push(crop)
    write(data)
    return crop
  },
  update(id: string, input: Partial<CropInput>): Crop | undefined {
    const data = read()
    const idx = data.findIndex((c) => c.id === id)
    if (idx === -1) return undefined
    const updated: Crop = { ...data[idx], ...input, updatedAt: new Date().toISOString() }
    data[idx] = updated
    write(data)
    return updated
  },
  remove(id: string) {
    const data = read().filter((c) => c.id !== id)
    write(data)
  },
}
