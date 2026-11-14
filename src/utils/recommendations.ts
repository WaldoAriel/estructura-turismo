/**
 * Recomendaciones de actividad basadas en el clima actual
 * Usa los mismos codes WMO que Open-Meteo
 */

export interface Recommendation {
  label: string
  shortLabel: string
  description: string
  action: string
  type: 'activity' | 'gastronomy'
  gastronomyType?: string
}

interface WeatherInput {
  temperature: number
  weathercode: number
  windspeed?: number
  time?: string
}

function isDaytime(time?: string): boolean {
  if (!time) {
    const hour = new Date().getHours()
    return hour >= 7 && hour < 20
  }
  const hour = new Date(time).getHours()
  return hour >= 7 && hour < 20
}

type MealSlot = 'breakfast' | 'lunch' | 'snack' | 'dinner' | 'late'

function getMealSlot(time?: string): MealSlot {
  const hour = time ? new Date(time).getHours() : new Date().getHours()
  if (hour >= 22 || hour < 7) return 'late'
  if (hour >= 19) return 'dinner'
  if (hour >= 15) return 'snack'
  if (hour >= 11) return 'lunch'
  return 'breakfast'
}

export function getActivityRecommendations(weather: WeatherInput | null): Recommendation[] {
  if (!weather) return []
  const activities: Recommendation[] = []
  const { temperature, weathercode, windspeed, time } = weather
  const day = isDaytime(time)
  const mealSlot = getMealSlot(time)
  const isRainy = [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(weathercode)
  const isStorm = [95, 96, 99].includes(weathercode)
  const isFoggy = [45, 48].includes(weathercode)
  const isWindy = (windspeed ?? 0) > 20

  // Clima cálido y despejado - día
  if (weathercode === 0 && temperature >= 20 && day) {
    activities.push({
      label: 'Playa y piscina',
      shortLabel: 'ir a los balnearios',
      description: 'Cielo despejado, ideal para actividades acuáticas',
      action: '/visitar/naturaleza/costanera-y-balnearios',
      type: 'activity',
    })
  }

  // Clima cálido y despejado - noche
  if (weathercode === 0 && temperature >= 20 && !day) {
    activities.push({
      label: 'Paseo costanero nocturno',
      shortLabel: 'recorrer la costanera',
      description: 'Disfrutá la costanera iluminada y la brisa del río',
      action: '/visitar/paseos',
      type: 'activity',
    })
  }

  // Clima templado para actividades al aire libre
  if (temperature >= 15 && temperature <= 25 && [1, 2, 3].includes(weathercode)) {
    activities.push({
      label: 'Senderismo y paseos',
      shortLabel: 'disfrutar de la naturaleza',
      description: 'Perfecto para actividad al aire libre',
      action: '/visitar/naturaleza',
      type: 'activity',
    })
  }

  // Lluvioso o tormenta - actividades indoor
  if (isRainy || isStorm) {
    activities.push({
      label: 'Museos y cultura',
      shortLabel: 'visitar museos',
      description: 'Los mejores días para lo cultural',
      action: '/visitar/cultura',
      type: 'activity',
    })
  }

  // Niebla
  if (isFoggy) {
    activities.push({
      label: 'Museos y cultura',
      shortLabel: 'visitar museos',
      description: 'Día ideal para descubrir la historia local',
      action: '/visitar/cultura',
      type: 'activity',
    })
  }

  // Viento fuerte - deportes de viento
  if (isWindy && !isRainy && !isStorm) {
    activities.push({
      label: 'Deportes de viento',
      shortLabel: 'andar en bici',
      description: 'Viento ideal para actividades al aire libre',
      action: '/hacer/cicloturismo',
      type: 'activity',
    })
  }

  // Clima muy caluroso
  if (temperature > 30) {
    activities.push({
      label: 'Hidratación y sombra',
      shortLabel: 'refrescarte en el río',
      description: 'Hace mucho calor, buscá sombra en horas centrales',
      action: '/visitar/naturaleza/costanera-y-balnearios',
      type: 'activity',
    })
  }

  // Clima frío
  if (temperature < 10) {
    activities.push({
      label: 'Actividades cálidas',
      shortLabel: 'disfrutar actividades bajo techo',
      description: 'Ropa abrigada recomendada, ideal para paseos cortos',
      action: '/hacer',
      type: 'activity',
    })
  }

  // Recomendación por defecto si no hay coincidencia específica
  if (activities.length === 0) {
    if (temperature >= 20) {
      activities.push({
        label: day ? 'Salir a pasear' : 'Paseo nocturno',
        shortLabel: day ? 'pasear' : 'recorrer la ciudad',
        description: day ? 'Buen día para actividades al aire libre' : 'Disfrutá la noche en Santa Rosa',
        action: day ? '/visitar' : '/visitar/paseos',
        type: 'activity',
      })
    } else {
      activities.push({
        label: 'Disfrutar el día',
        shortLabel: 'pasear por la ciudad',
        description: 'Aprovechá para explorar la ciudad',
        action: '/visitar',
        type: 'activity',
      })
    }
  }

  // --- Gastronomía por horario y clima (múltiples opciones) ---
  const hot = temperature >= 25
  const mild = temperature >= 15 && temperature < 25
  const cold = temperature < 15

  if (!isRainy && !isStorm) {
    if (mealSlot === 'breakfast') {
      activities.push({
        label: 'Cafés y desayunos',
        shortLabel: 'desayunar',
        description: 'Empezá el día con un buen café y algo dulce',
        action: '/gastronomia?tipo=cafetería',
        type: 'gastronomy',
        gastronomyType: 'cafetería',
      })
      if (hot) {
        activities.push({
          label: 'Heladerías',
          shortLabel: 'tomar un helado',
          description: 'Refrescate desde temprano',
          action: '/gastronomia?tipo=heladería',
          type: 'gastronomy',
          gastronomyType: 'heladería',
        })
      }
    } else if (mealSlot === 'lunch') {
      activities.push({
        label: 'Almuerzo',
        shortLabel: hot ? 'almorzar algo fresco' : 'almorzar',
        description: hot ? 'Buen momento para comer algo liviano' : 'Ideal para disfrutar un buen almuerzo',
        action: '/gastronomia?tipo=restaurante',
        type: 'gastronomy',
        gastronomyType: 'restaurante',
      })
      activities.push({
        label: 'Pizzerías',
        shortLabel: 'comer pizza',
        description: 'Una opción clásica para el mediodía',
        action: '/gastronomia?tipo=pizzería',
        type: 'gastronomy',
        gastronomyType: 'pizzería',
      })
      if (hot) {
        activities.push({
          label: 'Heladerías',
          shortLabel: 'tomar un helado',
          description: 'Refrescate después de almorzar',
          action: '/gastronomia?tipo=heladería',
          type: 'gastronomy',
          gastronomyType: 'heladería',
        })
        activities.push({
          label: 'Bares y restobares',
          shortLabel: 'tomar algo fresco',
          description: 'Bebidas frías para el calor',
          action: '/gastronomia?tipo=restobares',
          type: 'gastronomy',
          gastronomyType: 'restobares',
        })
      }
      if (cold) {
        activities.push({
          label: 'Cafés',
          shortLabel: 'tomar un café',
          description: 'Algo caliente para acompañar',
          action: '/gastronomia?tipo=cafetería',
          type: 'gastronomy',
          gastronomyType: 'cafetería',
        })
      }
      activities.push({
        label: 'Comidas para llevar',
        shortLabel: 'pedir para llevar',
        description: 'Opciones prácticas para comer donde quieras',
        action: '/gastronomia?tipo=comidas para llevar',
        type: 'gastronomy',
        gastronomyType: 'comidas para llevar',
      })
    } else if (mealSlot === 'snack') {
      if (hot) {
        activities.push({
          label: 'Heladerías',
          shortLabel: 'tomar un helado',
          description: 'Refrescate con un helado artesanal',
          action: '/gastronomia?tipo=heladería',
          type: 'gastronomy',
          gastronomyType: 'heladería',
        })
        activities.push({
          label: 'Bares y restobares',
          shortLabel: 'tomar algo fresco',
          description: 'Bebidas frías para la tarde',
          action: '/gastronomia?tipo=restobares',
          type: 'gastronomy',
          gastronomyType: 'restobares',
        })
      } else {
        activities.push({
          label: 'Cafés y merienda',
          shortLabel: 'merendar',
          description: 'Un café y algo dulce para la tarde',
          action: '/gastronomia?tipo=cafetería',
          type: 'gastronomy',
          gastronomyType: 'cafetería',
        })
        activities.push({
          label: 'Alfajores y delicias',
          shortLabel: 'comer algo dulce',
          description: 'Delicias artesanales para acompañar',
          action: '/gastronomia?tipo=alfajores y delicias artesanales',
          type: 'gastronomy',
          gastronomyType: 'alfajores y delicias artesanales',
        })
      }
    } else if (mealSlot === 'dinner') {
      activities.push({
        label: 'Restaurantes',
        shortLabel: hot ? 'cenar al aire libre' : 'una deliciosa cena',
        description: hot ? 'Noche ideal para cenar en terrazas' : 'Ideal para una cena reconfortante',
        action: '/gastronomia?tipo=restaurante',
        type: 'gastronomy',
        gastronomyType: 'restaurante',
      })
      activities.push({
        label: 'Pizzerías',
        shortLabel: 'comer pizza',
        description: 'Una opción clásica para la noche',
        action: '/gastronomia?tipo=pizzería',
        type: 'gastronomy',
        gastronomyType: 'pizzería',
      })
      activities.push({
        label: 'Restobares',
        shortLabel: 'tomar algo',
        description: 'Bares y restobares con buena comida',
        action: '/gastronomia?tipo=restobares',
        type: 'gastronomy',
        gastronomyType: 'restobares',
      })
      activities.push({
        label: 'Comidas para llevar',
        shortLabel: 'pedir para llevar',
        description: 'Llevá tu cena donde quieras',
        action: '/gastronomia?tipo=comidas para llevar',
        type: 'gastronomy',
        gastronomyType: 'comidas para llevar',
      })
      if (hot) {
        activities.push({
          label: 'Heladerías',
          shortLabel: 'tomar un helado',
          description: 'Un postre fresco para cerrar la noche',
          action: '/gastronomia?tipo=heladería',
          type: 'gastronomy',
          gastronomyType: 'heladería',
        })
      }
      if (cold) {
        activities.push({
          label: 'Cafés',
          shortLabel: 'tomar un café',
          description: 'Algo caliente para la noche fría',
          action: '/gastronomia?tipo=cafetería',
          type: 'gastronomy',
          gastronomyType: 'cafetería',
        })
      }
    } else if (mealSlot === 'late') {
      activities.push({
        label: 'Restobares y bares',
        shortLabel: 'tomar algo',
        description: 'Bares y pubs para disfrutar la noche',
        action: '/gastronomia?tipo=restobares',
        type: 'gastronomy',
        gastronomyType: 'restobares',
      })
      if (hot || mild) {
        activities.push({
          label: 'Heladerías',
          shortLabel: 'comer un helado',
          description: 'Heladerías abiertas para la noche',
          action: '/gastronomia?tipo=heladería',
          type: 'gastronomy',
          gastronomyType: 'heladería',
        })
      }
      if (hot) {
        activities.push({
          label: 'Pizzerías',
          shortLabel: 'comer pizza',
          description: 'Una opción para la noche',
          action: '/gastronomia?tipo=pizzería',
          type: 'gastronomy',
          gastronomyType: 'pizzería',
        })
      }
    }
  } else {
    // Lluvia o tormenta: opciones bajo techo según franja
    if (mealSlot === 'breakfast') {
      activities.push({
        label: 'Cafés y desayunos',
        shortLabel: 'desayunar bajo techo',
        description: 'Refugiate con un buen café y algo dulce',
        action: '/gastronomia?tipo=cafetería',
        type: 'gastronomy',
        gastronomyType: 'cafetería',
      })
    } else if (mealSlot === 'lunch') {
      activities.push({
        label: 'Restaurantes',
        shortLabel: 'almorzar bajo techo',
        description: 'Refugiate y disfrutá de la gastronomía local',
        action: '/gastronomia?tipo=restaurante',
        type: 'gastronomy',
        gastronomyType: 'restaurante',
      })
      activities.push({
        label: 'Pizzerías',
        shortLabel: 'comer pizza',
        description: 'Una opción cómoda bajo techo',
        action: '/gastronomia?tipo=pizzería',
        type: 'gastronomy',
        gastronomyType: 'pizzería',
      })
    } else if (mealSlot === 'snack') {
      activities.push({
        label: 'Cafés y merienda',
        shortLabel: 'merendar',
        description: 'Un café y algo dulce para pasar la tarde',
        action: '/gastronomia?tipo=cafetería',
        type: 'gastronomy',
        gastronomyType: 'cafetería',
      })
      activities.push({
        label: 'Alfajores y delicias',
        shortLabel: 'comer algo dulce',
        description: 'Delicias artesanales para acompañar',
        action: '/gastronomia?tipo=alfajores y delicias artesanales',
        type: 'gastronomy',
        gastronomyType: 'alfajores y delicias artesanales',
      })
    } else if (mealSlot === 'dinner') {
      activities.push({
        label: 'Restaurantes',
        shortLabel: ' una deliciosa cena',
        description: 'Cena tranquila bajo techo',
        action: '/gastronomia?tipo=restaurante',
        type: 'gastronomy',
        gastronomyType: 'restaurante',
      })
      activities.push({
        label: 'Restobares',
        shortLabel: 'tomar algo',
        description: 'Bares y restobares para la noche',
        action: '/gastronomia?tipo=restobares',
        type: 'gastronomy',
        gastronomyType: 'restobares',
      })
      activities.push({
        label: 'Pizzerías',
        shortLabel: 'comer pizza',
        description: 'Una opción clásica para la noche',
        action: '/gastronomia?tipo=pizzería',
        type: 'gastronomy',
        gastronomyType: 'pizzería',
      })
    } else {
      activities.push({
        label: 'Restobares',
        shortLabel: 'tomar algo',
        description: 'Opciones para disfrutar la noche a resguardo',
        action: '/gastronomia?tipo=restobares',
        type: 'gastronomy',
        gastronomyType: 'restobares',
      })
    }
  }

  return activities
}