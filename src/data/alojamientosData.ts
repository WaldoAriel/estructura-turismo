import alojamientosRaw from './externals/alojamientos.json'

export interface Alojamiento {
  id: number
  nombre: string
  categoria: string
  direccion?: string
  telefono?: string
  telefonos?: { e164: string; tipo: string; numero: string; whatsapp?: string }[]
  web?: string
}

export const alojamientos: Alojamiento[] = alojamientosRaw as Alojamiento[]

export const alojamientoCATEGORIES = [
  { key: 'hotel', label: 'Hoteles', icon: '🏨' },
  { key: 'aparthotel', label: 'Aparthotels', icon: '🏨' },
  { key: 'posada', label: 'Posadas', icon: '🏡' },
  { key: 'hostería', label: 'Hosterías', icon: '🏡' },
  { key: 'hospedaje', label: 'Hospedaje', icon: '🛏️' },
  { key: 'hostel', label: 'Hostels', icon: '🛏️' },
  { key: 'residencial', label: 'Residenciales', icon: '🏠' },
  { key: 'departamento', label: 'Departamentos', icon: '🏢' },
  { key: 'cabaña', label: 'Cabañas', icon: '🛖' },
  { key: 'apart cabaña', label: 'Apart Cabañas', icon: '🛖' },
  { key: 'complejo de cabañas', label: 'Complejos de Cabañas', icon: '🏕️' },
  { key: 'colonia', label: 'Colonias', icon: '🏕️' },
  { key: 'camping', label: 'Campings', icon: '🏕️' },
  { key: 'casa de alquiler', label: 'Casas en alquiler', icon: '🏡' },
  { key: 'casa', label: 'Casas', icon: '🏡' },
  { key: 'agencias de viajes', label: 'Agencias de viajes', icon: '✈️' },
] as const

export function getCountByCategory(key: string): number {
  return alojamientos.filter((a) => a.categoria === key).length
}

export function getAlojamiento(id: number): Alojamiento | undefined {
  return alojamientos.find((a) => a.id === id)
}

export function searchAlojamientos(query: string): Alojamiento[] {
  if (query.trim().length < 2) return []
  const q = query.toLowerCase().trim()
  return alojamientos.filter(
    (a) =>
      a.nombre.toLowerCase().includes(q) ||
      (a.direccion?.toLowerCase().includes(q)) ||
      (a.telefono?.toLowerCase().includes(q))
  )
}

export const introText = 'Santa Rosa de Calamuchita cuenta con una amplia variedad de opciones de alojamiento para todos los gustos y presupuestos. Encontrá el lugar ideal para tu visita en el corazón del Valle de Calamuchita.'