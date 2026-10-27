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
  contactInfo
} from './infoData'
import type { SearchItem } from '../components/SearchBar'

export function buildSearchIndex(): SearchItem[] {
  const items: SearchItem[] = []

  for (const category of hacerCategories) {
    const slug = category.name
    for (const item of category.items || []) {
      items.push({
        id: `hacer-${slug}-${item.title}`,
        title: item.title,
        description: item.description,
        type: 'hacer',
        url: `/hacer/${slug}`,
        category: slug,
      })
    }
  }

  for (const event of [...summerEvents, ...autumnEvents, ...winterEvents, ...springEvents]) {
    items.push({
      id: `evento-${event.title}`,
      title: event.title,
      description: event.description,
      type: 'evento',
      url: '/eventos',
    })
  }

  for (const page of infoPages) {
    items.push({
      id: `info-${page.key}`,
      title: page.title,
      description: page.intro,
      type: 'informacion',
      url: `/informacion/${page.key}`,
    })
  }

  // Index useful phones
  for (const phone of usefulPhones) {
    items.push({
      id: `info-telefonos-${phone.label}-${phone.number}`,
      title: phone.label,
      description: `${phone.category}: ${phone.number}`,
      type: 'informacion',
      url: '/informacion/telefonos',
    })
  }

  // Index FAQs
  for (const faq of faqs) {
    items.push({
      id: `info-faq-${faq.question}`,
      title: faq.question,
      description: faq.answer,
      type: 'informacion',
      url: '/informacion/faq',
    })
  }

  // Index travel agencies
  for (const agency of travelAgencies) {
    items.push({
      id: `info-agencias-${agency.name}`,
      title: agency.name,
      description: `Tel: ${agency.phone}${agency.web ? ` - Web: ${agency.web}` : ''}`,
      type: 'informacion',
      url: '/informacion/agencias',
    })
  }

  // Index bus info
  if (busInfo.fromCordoba) {
    for (const bus of busInfo.fromCordoba) {
      items.push({
        id: `info-transporte-cordoba-${bus.label}`,
        title: bus.label,
        description: `Desde Córdoba - Tel: ${bus.phone}${bus.web ? ` - Web: ${bus.web}` : ''}`,
        type: 'informacion',
        url: '/informacion/como-llegar',
      })
    }
  }
  if (busInfo.fromVillaMaria) {
    for (const bus of busInfo.fromVillaMaria) {
      items.push({
        id: `info-transporte-villamaria-${bus.label}`,
        title: bus.label,
        description: `Desde Villa María - Tel: ${bus.phone}${bus.web ? ` - Web: ${bus.web}` : ''}`,
        type: 'informacion',
        url: '/informacion/como-llegar',
      })
    }
  }
  if (busInfo.fromRioIV) {
    for (const bus of busInfo.fromRioIV) {
      items.push({
        id: `info-transporte-rioiv-${bus.label}`,
        title: bus.label,
        description: `Desde Río IV - Tel: ${bus.phone}${bus.web ? ` - Web: ${bus.web}` : ''}`,
        type: 'informacion',
        url: '/informacion/como-llegar',
      })
    }
  }
  if (busInfo.fromBuenosAires) {
    for (const bus of busInfo.fromBuenosAires) {
      items.push({
        id: `info-transporte-buenosaires-${bus.label}`,
        title: bus.label,
        description: `Desde Buenos Aires - Tel: ${bus.phone}${bus.web ? ` - Web: ${bus.web}` : ''}`,
        type: 'informacion',
        url: '/informacion/como-llegar',
      })
    }
  }
  if (busInfo.fromRosario) {
    for (const bus of busInfo.fromRosario) {
      items.push({
        id: `info-transporte-rosario-${bus.label}`,
        title: bus.label,
        description: `Desde Rosario - Tel: ${bus.phone}${bus.web ? ` - Web: ${bus.web}` : ''}`,
        type: 'informacion',
        url: '/informacion/como-llegar',
      })
    }
  }

  // Index flight info
  if (flightInfo.cordobaAirport) {
    items.push({
      id: `info-vuelo-cordoba`,
      title: flightInfo.cordobaAirport.label,
      description: flightInfo.cordobaAirport.content,
      type: 'informacion',
      url: '/informacion/como-llegar',
    })
  }
  if (flightInfo.rioIVAirport) {
    items.push({
      id: `info-vuelo-rioiv`,
      title: flightInfo.rioIVAirport.label,
      description: flightInfo.rioIVAirport.content,
      type: 'informacion',
      url: '/informacion/como-llegar',
    })
  }

  // Index travel guides (distances)
  for (const dist of distancesFromSantaRosa) {
    items.push({
      id: `info-distancia-${dist.city}`,
      title: `Distancia a ${dist.city}`,
      description: `${dist.distance} km desde ${dist.city}`,
      type: 'informacion',
      url: '/informacion/como-llegar',
    })
  }

  for (const dist of distancesToNearby) {
    items.push({
      id: `info-distancia-cercana-${dist.city}`,
      title: `Distancia a ${dist.city}`,
      description: `${dist.distance} km desde Santa Rosa`,
      type: 'informacion',
      url: '/informacion/como-llegar',
    })
  }

  // Index contact info
  items.push({
    id: 'info-contacto',
    title: 'Contacto Municipalidad',
    description: `${contactInfo.address} - Tel: ${contactInfo.phone} - Email: ${contactInfo.email} - ${contactInfo.schedule}`,
    type: 'informacion',
    url: '/informacion/contacto',
  })

  return items
}

export const searchIndex = buildSearchIndex()
