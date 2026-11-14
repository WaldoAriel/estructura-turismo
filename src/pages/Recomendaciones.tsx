import { Box, Typography, Container, Chip, Grid, Card, CardContent, CardMedia, Link as MuiLink } from '@mui/material'
import { motion } from 'framer-motion'
import { useSearchParams, Link as RouterLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { SPRING_STANDARD, STAGGER_FAST, FADE_UP_CHILD } from '../config/animations'
import { municipalGradients } from '../config/theme'
import { getActivityRecommendations, type Recommendation } from '../utils/recommendations'
import { visitarCategories, hacerCategories, type HacerItem } from '../data/hacerData'
import gastronomia from '../data/externals/gastronomia.json'
import Footer from '../components/Footer'

interface WeatherParams {
  weathercode: number
  temperature: number
  windspeed: number
  time?: string
}

interface MappedPlace extends HacerItem {
  matchedRecommendation: string
  sourceUrl: string
}

interface GastroPlace {
  id: number
  nombre: string
  categoria: string
  direccion: string
  telefono?: string
  web?: string | null
  matchedRecommendation: string
}

function getAllVisitarItems(): HacerItem[] {
  const items: HacerItem[] = []
  visitarCategories.forEach((cat) => {
    if (cat.items) items.push(...cat.items)
    cat.subcategories?.forEach((sub) => {
      if (sub.items) items.push(...sub.items)
    })
  })
  return items
}

function getAllHacerItems(): HacerItem[] {
  const items: HacerItem[] = []
  hacerCategories.forEach((cat) => {
    if (cat.items) items.push(...cat.items)
  })
  return items
}

function mapRecommendationToPlaces(recLabel: string): MappedPlace[] {
  const allVisitar = getAllVisitarItems()
  const allHacer = getAllHacerItems()
  const allItems = [...allVisitar, ...allHacer]
  const matched: MappedPlace[] = []
  const lowerLabel = recLabel.toLowerCase()

  if (lowerLabel.includes('playa') || lowerLabel.includes('piscina') || lowerLabel.includes('acuátic')) {
    allItems.forEach((item) => {
      if (
        item.subcategory === 'Costanera y Balnearios' ||
        item.title.toLowerCase().includes('balneario') ||
        item.title.toLowerCase().includes('playa') ||
        item.title.toLowerCase().includes('costa')
      ) {
        matched.push({ ...item, matchedRecommendation: recLabel, sourceUrl: '/visitar/naturaleza/costanera-y-balnearios' })
      }
    })
  } else if (lowerLabel.includes('costanero nocturno') || lowerLabel.includes('paseo nocturno')) {
    allItems.forEach((item) => {
      if (
        item.subcategory === 'Costanera y Balnearios' ||
        item.category === 'paseos' ||
        item.title.toLowerCase().includes('costanera') ||
        item.title.toLowerCase().includes('remanso') ||
        item.title.toLowerCase().includes('paseo')
      ) {
        matched.push({ ...item, matchedRecommendation: recLabel, sourceUrl: '/visitar/paseos' })
      }
    })
  } else if (lowerLabel.includes('senderismo') || lowerLabel.includes('paseo') || lowerLabel.includes('aire libre')) {
    allItems.forEach((item) => {
      if (
        item.category === 'senderismo' ||
        (item.category === 'naturaleza' && item.subcategory !== 'Costanera y Balnearios') ||
        item.difficulty ||
        item.distance
      ) {
        const isSenderismo = item.category === 'senderismo'
        matched.push({
          ...item,
          matchedRecommendation: recLabel,
          sourceUrl: isSenderismo ? '/hacer/senderismo' : '/visitar/naturaleza',
        })
      }
    })
  } else if (lowerLabel.includes('museo') || lowerLabel.includes('cultura') || lowerLabel.includes('cultural')) {
    allItems.forEach((item) => {
      if (
        item.subcategory === 'Atractivos Culturales' ||
        item.category === 'cultura' ||
        item.category === 'historia' ||
        item.category === 'artesanos'
      ) {
        matched.push({ ...item, matchedRecommendation: recLabel, sourceUrl: '/visitar/cultura' })
      }
    })
  } else if (lowerLabel.includes('viento') || lowerLabel.includes('deporte') || lowerLabel.includes('náutic')) {
    allItems.forEach((item) => {
      if (
        item.category === 'cicloturismo' ||
        item.category === 'cabalgatas' ||
        item.category === 'esparcimiento'
      ) {
        matched.push({ ...item, matchedRecommendation: recLabel, sourceUrl: `/hacer/${item.category}` })
      }
    })
  } else if (lowerLabel.includes('hidratación') || lowerLabel.includes('sombra') || lowerLabel.includes('calor')) {
    allItems.forEach((item) => {
      if (item.category === 'bienestar' || item.subcategory === 'Costanera y Balnearios') {
        matched.push({ ...item, matchedRecommendation: recLabel, sourceUrl: '/visitar/naturaleza/costanera-y-balnearios' })
      }
    })
  } else if (lowerLabel.includes('frío') || lowerLabel.includes('abrigad') || lowerLabel.includes('cálid')) {
    allItems.forEach((item) => {
      if (item.category === 'bienestar' || item.category === 'esparcimiento') {
        matched.push({ ...item, matchedRecommendation: recLabel, sourceUrl: `/hacer/${item.category === 'bienestar' ? 'bienestar' : 'esparcimiento'}` })
      }
    })
  } else {
    allItems.slice(0, 8).forEach((item) => {
      matched.push({ ...item, matchedRecommendation: recLabel, sourceUrl: item.category === 'naturaleza' ? '/visitar/naturaleza' : '/visitar/cultura' })
    })
  }

  const seen = new Set<string>()
  return matched.filter((item) => {
    if (seen.has(item.title)) return false
    seen.add(item.title)
    return true
  }).slice(0, 8)
}

function mapGastronomyRecommendation(gastronomyType: string, label: string): GastroPlace[] {
  const typeMap: Record<string, string[]> = {
    'heladería': ['heladería'],
    'restobares': ['restobares'],
    'restaurante': ['restaurante'],
    'cafetería': ['cafetería', 'alfajores y delicias artesanales'],
    'pizzería': ['pizzería'],
  }
  const categories = typeMap[gastronomyType] || [gastronomyType]
  const places = (gastronomia as any[]).filter((g) => categories.includes(g.categoria))
  return places.slice(0, 8).map((g) => ({
    id: g.id,
    nombre: g.nombre,
    categoria: g.categoria,
    direccion: g.direccion,
    telefono: g.telefono,
    web: g.web,
    matchedRecommendation: label,
  }))
}

function getWeatherDisplay(code: number) {
  const displays: Record<number, { label: string }> = {
    0: { label: 'Despejado' },
    1: { label: 'Mayormente despejado' },
    2: { label: 'Parcialmente nublado' },
    3: { label: 'Nublado' },
    45: { label: 'Niebla' },
    48: { label: 'Niebla con escarcha' },
    51: { label: 'Llovizna ligera' },
    53: { label: 'Llovizna moderada' },
    55: { label: 'Llovizna densa' },
    61: { label: 'Lluvia ligera' },
    63: { label: 'Lluvia moderada' },
    65: { label: 'Lluvia fuerte' },
    80: { label: 'Chubascos ligeros' },
    81: { label: 'Chubascos moderados' },
    82: { label: 'Chubascos violentos' },
    95: { label: 'Tormenta' },
    96: { label: 'Tormenta con granizo' },
    99: { label: 'Tormenta con granizo fuerte' },
  }
  return displays[code] ?? { label: 'Desconocido' }
}

export default function Recomendaciones() {
  const [searchParams] = useSearchParams()
  const [weather, setWeather] = useState<WeatherParams | null>(null)
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [mappedPlaces, setMappedPlaces] = useState<MappedPlace[]>([])
  const [gastroPlaces, setGastroPlaces] = useState<GastroPlace[]>([])

  useEffect(() => {
    const clima = searchParams.get('clima')
    const temp = searchParams.get('temp')
    const wind = searchParams.get('wind')
    const time = searchParams.get('time') || undefined

    if (clima && temp) {
      const weatherData: WeatherParams = {
        weathercode: parseInt(clima, 10),
        temperature: parseInt(temp, 10),
        windspeed: wind ? parseInt(wind, 10) : 0,
        time,
      }
      setWeather(weatherData)
      const recs = getActivityRecommendations(weatherData)
      setRecommendations(recs)

      const activityRecs = recs.filter((r) => r.type === 'activity')
      const gastronomyRecs = recs.filter((r) => r.type === 'gastronomy')

      const allPlaces: MappedPlace[] = []
      activityRecs.forEach((rec) => {
        allPlaces.push(...mapRecommendationToPlaces(rec.label))
      })
      const seenPlaces = new Set<string>()
      setMappedPlaces(allPlaces.filter((p) => {
        if (seenPlaces.has(p.title)) return false
        seenPlaces.add(p.title)
        return true
      }).slice(0, 8))

      const allGastro: GastroPlace[] = []
      gastronomyRecs.forEach((rec) => {
        if (rec.gastronomyType) {
          allGastro.push(...mapGastronomyRecommendation(rec.gastronomyType, rec.label))
        }
      })
      const seenGastro = new Set<number>()
      setGastroPlaces(allGastro.filter((g) => {
        if (seenGastro.has(g.id)) return false
        seenGastro.add(g.id)
        return true
      }).slice(0, 4))
    }
  }, [searchParams])

  const display = weather ? getWeatherDisplay(weather.weathercode) : null

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          pt: { xs: 14, sm: 16, md: 18 },
          pb: { xs: 8, md: 12 },
          mb: { xs: 4, md: 6 },
          background: municipalGradients.principal,
          overflow: 'hidden',
        }}
      >
        <Box sx={{ position: 'absolute', inset: 0, backgroundImage: 'url("/bg-texture.svg")', opacity: 0.08, pointerEvents: 'none' }} />
        <Container maxWidth="lg" sx={{ position: 'relative', px: { xs: 2, sm: 3, md: 4 }, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={SPRING_STANDARD}>
            <Typography variant="h2" component="h1" sx={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: { xs: '2rem', sm: '2.75rem', md: '3.5rem' }, color: '#FFFFFF', mb: 3, letterSpacing: '-0.02em', lineHeight: 1.05 }}>
              Recomendaciones para hoy
              <Box component="span" sx={{ display: 'block', color: '#E29578', fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' } }}>
                Según el clima actual
              </Box>
            </Typography>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ ...SPRING_STANDARD, delay: 0.02 }}>
            <Typography variant="body1" sx={{ color: 'rgba(248, 245, 243, 0.9)', maxWidth: 700, mx: 'auto', lineHeight: 1.7, fontSize: { xs: '1rem', sm: '1.1rem' } }}>
              El clima en Santa Rosa de Calamuchita está <strong>{display?.label ?? 'despejado'}</strong> con <strong>{weather?.temperature ?? '--'}°C</strong>
              {weather?.windspeed && weather.windspeed > 10 && <> y viento de <strong>{weather.windspeed} km/h</strong></>}
              . Te sugerimos estas actividades y opciones gastronómicas ideales para hoy.
            </Typography>
          </motion.div>

          {recommendations.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ ...SPRING_STANDARD, delay: 0.04 }}>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center', mt: 3 }}>
                {recommendations.map((rec, idx) => (
                  <Chip
                    key={idx}
                    label={rec.label}
                    size="small"
                    sx={{
                      backgroundColor: rec.type === 'gastronomy' ? 'rgba(226,149,120,0.3)' : 'rgba(255,255,255,0.2)',
                      color: '#FFFFFF',
                      fontWeight: 600,
                      border: '1px solid rgba(255,255,255,0.3)',
                    }}
                  />
                ))}
              </Box>
            </motion.div>
          )}
        </Container>
      </Box>

      <section style={{ padding: 'var(--spacing-xl-md) 0', background: 'var(--color-background)' }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
          {mappedPlaces.length > 0 && (
            <>
              <Typography variant="h4" component="h2" sx={{ fontFamily: 'var(--font-display)', fontWeight: 700, mb: 4, color: 'var(--color-text-primary)' }}>
                Actividades recomendadas
              </Typography>
              <motion.div initial="hidden" animate="visible" variants={STAGGER_FAST}>
                <Grid container spacing={4} sx={{ mb: gastroPlaces.length > 0 ? 8 : 0 }}>
                  {mappedPlaces.map((place, index) => (
                    <Grid item xs={12} sm={6} lg={3} key={`${place.title}-${index}`}>
                      <motion.div variants={FADE_UP_CHILD} transition={SPRING_STANDARD}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 'var(--shadow-md)', border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius-lg)', overflow: 'hidden', transition: 'transform 0.2s ease, box-shadow 0.2s ease', '&:hover': { transform: 'translateY(-4px)', boxShadow: 'var(--shadow-lg)' } }}>
                          {place.gallery && place.gallery.length > 0 ? (
                            <CardMedia component="img" image={place.gallery[0]} alt={place.title} sx={{ height: 180, objectFit: 'cover' }} />
                          ) : (
                            <Box sx={{ height: 180, width: '100%', background: municipalGradients.principal, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <Typography variant="h5" sx={{ color: 'rgba(255,255,255,0.8)', fontWeight: 700, fontFamily: 'var(--font-display)', textAlign: 'center', px: 2 }}>{place.title}</Typography>
                            </Box>
                          )}
                          <CardContent sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ mb: 1 }}>
                              <Chip label={place.subcategory || place.category} size="small" sx={{ backgroundColor: 'var(--color-primary)1A', color: 'var(--color-primary-dark)', fontWeight: 600, fontSize: '0.7rem' }} />
                            </Box>
                            <Typography variant="h6" component="h3" sx={{ fontFamily: 'var(--font-display)', fontWeight: 700, mb: 1.5, color: 'var(--color-text-primary)', fontSize: '1.1rem' }}>{place.title}</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, mb: 2, flex: 1 }}>{place.description.substring(0, 120)}...</Typography>
                            <MuiLink component={RouterLink} to={place.sourceUrl} underline="none" sx={{ color: 'var(--color-secondary)', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', mt: 'auto' }}>Ver más →</MuiLink>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
              </motion.div>
            </>
          )}

          {gastroPlaces.length > 0 && (
            <>
              <Typography variant="h4" component="h2" sx={{ fontFamily: 'var(--font-display)', fontWeight: 700, mb: 4, color: 'var(--color-text-primary)' }}>
                Dónde comer
              </Typography>
              <motion.div initial="hidden" animate="visible" variants={STAGGER_FAST}>
                <Grid container spacing={4}>
                  {gastroPlaces.map((place) => (
                    <Grid item xs={12} sm={6} lg={3} key={place.id}>
                      <motion.div variants={FADE_UP_CHILD} transition={SPRING_STANDARD}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 'var(--shadow-md)', border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius-lg)', overflow: 'hidden', transition: 'transform 0.2s ease, box-shadow 0.2s ease', '&:hover': { transform: 'translateY(-4px)', boxShadow: 'var(--shadow-lg)' } }}>
                          <Box sx={{ height: 120, width: '100%', background: municipalGradients.sunset, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography variant="h5" sx={{ color: 'rgba(255,255,255,0.9)', fontWeight: 700, fontFamily: 'var(--font-display)', textAlign: 'center', px: 2, fontSize: '1.1rem' }}>{place.nombre}</Typography>
                          </Box>
                          <CardContent sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ mb: 1 }}>
                              <Chip label={place.categoria} size="small" sx={{ backgroundColor: 'rgba(226,149,120,0.15)', color: '#B85C38', fontWeight: 600, fontSize: '0.7rem', textTransform: 'capitalize' }} />
                            </Box>
                            <Typography variant="h6" component="h3" sx={{ fontFamily: 'var(--font-display)', fontWeight: 700, mb: 1, color: 'var(--color-text-primary)', fontSize: '1rem' }}>{place.nombre}</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, mb: 1, fontSize: '0.85rem' }}>📍 {place.direccion}</Typography>
                            {place.telefono && <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem', mb: 2 }}>📞 {place.telefono}</Typography>}
                            <MuiLink component={RouterLink} to={`/gastronomia?tipo=${encodeURIComponent(place.categoria)}`} underline="none" sx={{ color: 'var(--color-secondary)', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', mt: 'auto' }}>Ver gastronomía →</MuiLink>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                  <MuiLink component={RouterLink} to="/gastronomia" underline="none" sx={{ color: 'var(--color-secondary)', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}>
                    Ver todas las opciones de gastronomía →
                  </MuiLink>
                </Box>
              </motion.div>
            </>
          )}

          {mappedPlaces.length === 0 && gastroPlaces.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h5" color="text.secondary">No hay recomendaciones disponibles para el clima actual.</Typography>
            </Box>
          )}
        </Container>
      </section>

      <Footer />
    </>
  )
}