/**
 * Recomendaciones de actividad basadas en el clima actual
 * Usa los mismos codes WMO que Open-Meteo
 */
export function getActivityRecommendations(weather: { temperature: number; weathercode: number; windspeed?: number } | null):
  { label: string;
  description: string;
  action: string;
 }[] {
  if (!weather) return []
  const activities: {
    label: string;
    description: string;
    action: string;
  }[] = []
  const { temperature, weathercode, windspeed } = weather

  // Clima cálido y despejado
  if (weathercode === 0 && temperature >= 20) {
    activities.push({
      label: 'Playa y piscina',
      description: 'Cielo despejado, ideal para actividades acuáticas',
      action: '/visitar',
    })
  }

  // Clima templado para actividades al aire libre
  if (temperature >= 15 && temperature <= 25 && [1, 2, 3].includes(weathercode)) {
    activities.push({
      label: 'Senderismo y paseos',
      description: 'Perfecto para actividad al aire libre',
      action: '/hacer',
    })
  }

  // Lluvioso - actividades indoor
  if ([61, 63, 65, 66, 67, 80].includes(weathercode)) {
    activities.push({
      label: 'Museos y cultura',
      description: 'Los mejores días para lo cultural',
      action: '/informacion',
    })
  }

  // Viento fuerte - deportes de viento
  if (windspeed && windspeed > 20) {
    activities.push({
      label: 'Deportes de viento',
      description: 'Viento ideal para deportes náuticos',
      action: '/hacer',
    })
  }

  // Clima muy caluroso
  if (temperature > 30) {
    activities.push({
      label: 'Hidratación y sombra',
      description: 'Hace mucho calor, buscar sombra en horas centrales',
      action: '/',
    })
  }

  // Clima frío
  if (temperature < 10) {
    activities.push({
      label: 'Actividades cálidas',
      description: 'Ropa abrigada recomendada, para acompañar',
      action: '/',
    })
  }

  // Recomendación por defecto si no hay coincidencia específica
  if (activities.length === 0) {
    if (temperature >= 20) {
      activities.push({
        label: 'Salir a pasear',
        description: 'Buen día para actividades al aire libre',
        action: '/visitar',
      })
    } else {
      activities.push({
        label: 'Disfrutar el día',
        description: 'Aprovecha el día para explorar',
        action: '/visitar',
      })
    }
  }

  return activities
}
