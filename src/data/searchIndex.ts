import { hacerCategories } from './hacerData'
import { summerEvents, autumnEvents, winterEvents, springEvents } from './eventosData'
import { infoPages } from './infoData'
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

  return items
}

export const searchIndex = buildSearchIndex()
