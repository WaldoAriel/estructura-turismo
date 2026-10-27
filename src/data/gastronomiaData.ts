import gastronomiaRaw from './externals/gastronomia.json'

export interface Gastronomia {
  id: number
  nombre: string
  categoria: string
  direccion?: string
  telefono?: string
  telefonos?: { e164: string; tipo: string; numero: string; whatsapp?: string }[]
  web?: string
}

export const gastronomia: Gastronomia[] = gastronomiaRaw as Gastronomia[]

export const gastronomiaCATEGORIES = [
  { key: 'restaurante', label: 'Restaurantes', icon: '🍽️' },
  { key: 'restobares', label: 'Restobares', icon: '🍸' },
  { key: 'comidas para llevar', label: 'Comidas para llevar', icon: '🥡' },
  { key: 'pizzería', label: 'Pizzerías', icon: '🍕' },
  { key: 'cafetería', label: 'Cafeterías', icon: '☕' },
  { key: 'heladería', label: 'Heladerías', icon: '🍦' },
  { key: 'alfajores y delicias artesanales', label: 'Alfajores y delicias', icon: '🍰' },
] as const

export function getCountByCategory(key: string): number {
  return gastronomia.filter((g) => g.categoria === key).length
}

export function getGastronomia(id: number): Gastronomia | undefined {
  return gastronomia.find((g) => g.id === id)
}

export function searchGastronomia(query: string): Gastronomia[] {
  if (query.trim().length < 2) return []
  const q = query.toLowerCase().trim()
  return gastronomia.filter(
    (g) =>
      g.nombre.toLowerCase().includes(q) ||
      (g.direccion?.toLowerCase().includes(q)) ||
      (g.telefono?.toLowerCase().includes(q))
  )
}

export const introText = 'Descubrí los sabores de Santa Rosa de Calamuchita: restaurantes, pizzerías, heladerías, cafeterías y mucho más. Una experiencia gastronómica única en el corazón del Valle de Calamuchita.'