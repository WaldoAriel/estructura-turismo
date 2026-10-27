import { hacerCategories } from './hacerData'
import { summerEvents, autumnEvents, winterEvents, springEvents } from './eventosData'
import {
  infoPages,
  usefulPhones,
  faqs,
  travelAgencies,
  busInfo,
  flightInfo,
  distancesFromSantaRosa,
  distancesToNearby,
  contactInfo,
} from './infoData'
import type { SearchItem } from '../components/SearchBar'

// Import external JSON data
import alojamientos from './externals/alojamientos.json'
import gastronomia from './externals/gastronomia.json'

export const searchIndex: SearchItem[] = [
  // --- Hacer items ---
  ...hacerCategories.flatMap((cat) =>
    cat.items.map((item) => ({
      id: `hacer-${cat.name}-${item.title.toLowerCase().replace(/\s+/g, '-')}`,
      title: item.title,
      description: item.description,
      type: 'hacer' as const,
      url: `/hacer/${cat.name}`,
      category: cat.label,
    }))
  ),

  // --- Eventos ---
  ...summerEvents.map((e) => ({
    id: `evento-${e.title.toLowerCase().replace(/\s+/g, '-')}`,
    title: e.title,
    description: e.description,
    type: 'evento' as const,
    url: '/eventos',
    category: e.season,
  })),
  ...autumnEvents.map((e) => ({
    id: `evento-${e.title.toLowerCase().replace(/\s+/g, '-')}`,
    title: e.title,
    description: e.description,
    type: 'evento' as const,
    url: '/eventos',
    category: e.season,
  })),
  ...winterEvents.map((e) => ({
    id: `evento-${e.title.toLowerCase().replace(/\s+/g, '-')}`,
    title: e.title,
    description: e.description,
    type: 'evento' as const,
    url: '/eventos',
    category: e.season,
  })),
  ...springEvents.map((e) => ({
    id: `evento-${e.title.toLowerCase().replace(/\s+/g, '-')}`,
    title: e.title,
    description: e.description,
    type: 'evento' as const,
    url: '/eventos',
    category: e.season,
  })),

  // --- Información pages ---
  ...infoPages.map((p) => ({
    id: `informacion-${p.key}`,
    title: p.label,
    description: p.intro,
    type: 'informacion' as const,
    url: `/informacion/${p.key}`,
  })),

  // --- Useful phones ---
  ...usefulPhones.map((p, i) => ({
    id: `teléfono-${i}`,
    title: p.label,
    description: `${p.category} — ${p.number}`,
    type: 'informacion' as const,
    url: '/informacion/telefonos',
    category: p.category,
  })),

  // --- FAQs ---
  ...faqs.map((f, i) => ({
    id: `faq-${i}`,
    title: f.question,
    description: f.answer,
    type: 'informacion' as const,
    url: '/informacion/faq',
  })),

  // --- Travel agencies ---
  ...travelAgencies.map((a, i) => ({
    id: `agencia-${i}`,
    title: a.name,
    description: a.phone + (a.web ? ` — ${a.web}` : ''),
    type: 'informacion' as const,
    url: '/informacion/agencias',
  })),

  // --- Bus info ---
  ...Object.entries(busInfo).flatMap(([key, value]) => {
    if (Array.isArray(value)) {
      return value.map((entry: any, i: number) => ({
        id: `bus-${key}-${i}`,
        title: entry.label,
        description: `${entry.phone} — ${entry.web}`,
        type: 'informacion' as const,
        url: '/informacion/como-llegar',
      }))
    }
    return []
  }),

  // --- Flight info ---
  ...Object.values(flightInfo).flatMap((section: any) => {
    if (section && typeof section === 'object' && section.label) {
      return [{
        id: `vuelo-${section.label.toLowerCase().replace(/\s+/g, '-')}`,
        title: section.label,
        description: section.content,
        type: 'informacion' as const,
        url: '/informacion/como-llegar',
      }]
    }
    return []
  }),

  // --- Distances from Santa Rosa ---
  ...distancesFromSantaRosa.map((d, i) => ({
    id: `distancia-${i}`,
    title: d.city,
    description: `${d.distance} km desde Santa Rosa de Calamuchita`,
    type: 'informacion' as const,
    url: '/informacion/como-llegar',
  })),

  // --- Distances to nearby ---
  ...distancesToNearby.map((d, i) => ({
    id: `distancia-cercana-${i}`,
    title: d.city,
    description: `${d.distance} km a Santa Rosa de Calamuchita`,
    type: 'informacion' as const,
    url: '/informacion/mapas',
  })),

  // --- Contact info ---
  {
    id: 'contacto',
    title: 'Información de contacto',
    description: `${contactInfo.address} — Tel: ${contactInfo.phone} — Email: ${contactInfo.email}`,
    type: 'informacion' as const,
    url: '/informacion/contacto',
  },

  // --- Alojamientos (internal) ---
  ...(alojamientos as any[]).map((a: any) => ({
    id: `alojamiento-${a.id}`,
    title: a.nombre,
    description: `${a.categoria} — ${a.direccion || ''} — Tel: a.telefono || ''`,
    type: 'alojamiento' as const,
    url: `/alojamientos`,
    external: false,
    source: 'alojamientos' as const,
  })),

  // --- Gastronomía (internal) ---
  ...(gastronomia as any[]).map((g: any) => ({
    id: `gastronomia-${g.id}`,
    title: g.nombre,
    description: `${g.categoria} — ${g.direccion || ''} — Tel: g.telefono || ''`,
    type: 'gastronomia' as const,
    url: `/gastronomia`,
    external: false,
    source: 'gastronomia' as const,
  })),
]