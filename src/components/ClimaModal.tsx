import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Modal,
  Box,
  Typography,
  Tabs,
  Tab,
  Chip,
  CircularProgress,
  Alert,
  AlertTitle,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { fetchCurrentWeather, fetchForecast, getWeatherDisplay, getDailyForecastList, getTodayHourlyForecast, formatTime, ForecastResponse, CurrentWeather } from '../utils/weather'

interface Props {
  open: boolean
  onClose: () => void
}

export default function ClimaModal({ open, onClose }: Props) {
  const [forecast, setForecast] = useState<ForecastResponse | null>(null)
  const [current, setCurrent] = useState<CurrentWeather | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tab, setTab] = useState(0)
  const [hoursExpanded, setHoursExpanded] = useState(false)
  const [daysExpanded, setDaysExpanded] = useState(false)

  useEffect(() => {
    if (!open) {
      setHoursExpanded(false)
      setDaysExpanded(false)
      return
    }
    let mounted = true
    setIsLoading(true)
    setError(null)
    Promise.all([fetchForecast(), fetchCurrentWeather()]).then(([forecastData, currentData]) => {
      if (!mounted) return
      if (forecastData || currentData) {
        setForecast(forecastData)
        setCurrent(currentData ?? forecastData?.current_weather ?? null)
        setError(null)
      } else {
        setError('No se pudo cargar el pronóstico. Intenta nuevamente más tarde.')
      }
      setIsLoading(false)
    })
    return () => { mounted = false }
  }, [open])

  const dailyList = forecast ? getDailyForecastList(forecast) : []
  const hourlyList = forecast ? getTodayHourlyForecast(forecast) : []

  const todayDay = dailyList[0] as any
  const restDays = dailyList.slice(1)

  const now = new Date()
  let currentHourEntry: any = null
  let restHours: any[] = []
  if (hourlyList.length > 0) {
    let closestIdx = 0
    let minDiff = Infinity
    hourlyList.forEach((h: any, idx: number) => {
      try {
        const hourDt = new Date(h.time)
        const diff = Math.abs((hourDt.getTime() - now.getTime()) / 3600000)
        if (diff < minDiff) { minDiff = diff; closestIdx = idx }
      } catch {}
    })
    currentHourEntry = hourlyList[closestIdx]
    restHours = hourlyList.filter((_: any, idx: number) => idx !== closestIdx)
    const nowHourTime = new Date(currentHourEntry.time).getTime()
    restHours = restHours.filter((h: any) => new Date(h.time).getTime() >= nowHourTime)
  }

  const handleTabChange = (_: React.SyntheticEvent, newTab: number) => {
    setTab(newTab)
    setHoursExpanded(false)
    setDaysExpanded(false)
  }

  if (!open) return null

  const cardStyle = {
    background: '#FFFFFF',
    border: '1px solid var(--color-border)',
    borderRadius: 12,
    boxShadow: 'var(--shadow-sm)',
  } as const

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropProps={{ timeout: 250, sx: { backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' } }}
    >
      <Box
        sx={{
          maxWidth: { xs: '100vw', sm: 560 },
          width: '100%',
          maxHeight: { xs: '100vh', sm: '92vh' },
          bgcolor: 'var(--color-background)',
          borderRadius: { xs: 0, sm: 3 },
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
          // Center on desktop (modal centers children by default, but explicit margin helps)
          margin: { xs: 0, sm: 'auto' },
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: 1.5, borderBottom: '1px solid var(--color-border)', bgcolor: 'var(--color-surface)', position: 'sticky', top: 0, zIndex: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'var(--color-text-primary)', fontSize: '1rem' }}>
              Pronóstico Santa Rosa
            </Typography>
            <IconButton onClick={onClose} style={{ color: 'var(--color-text-secondary)' }} aria-label="Cerrar" size="small">
              <CloseIcon style={{ fontSize: 20 }} />
            </IconButton>
          </Box>

          <Tabs value={tab} onChange={handleTabChange} sx={{ borderBottom: '1px solid var(--color-border)', bgcolor: 'var(--color-surface)', px: 1, minHeight: 40 }}>
            <Tab label="Hoy" icon={<span style={{ marginRight: 6, fontSize: 14 }}>🕐</span>} sx={{ minHeight: 40, fontSize: '0.85rem' }} />
            <Tab label="5 días" icon={<span style={{ marginRight: 6, fontSize: 14 }}>📅</span>} sx={{ minHeight: 40, fontSize: '0.85rem' }} />
          </Tabs>

          <Box sx={{ flex: 1, overflow: 'auto', p: { xs: 1.5, sm: 2 } }}>
            {isLoading && (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 200 }}>
                <CircularProgress color="primary" />
              </Box>
            )}

            {error && !isLoading && (
              <Alert severity="error" sx={{ mb: 2 }}>
                <AlertTitle>Error</AlertTitle>
                {error}
              </Alert>
            )}

            {tab === 0 && (current || currentHourEntry) && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {/* Hero condensed */}
                <Box sx={{ ...cardStyle, p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ width: 72, height: 72, borderRadius: 2, bgcolor: 'var(--color-background)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {(() => {
                      const code = current?.weathercode ?? currentHourEntry?.code ?? 0
                      const display = getWeatherDisplay(code)
                      const Icon = (display.icon as any) ?? (() => null)
                      return <Icon style={{ fontSize: 44, color: display.color ?? '#FFD54F' }} />
                    })()}
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="caption" sx={{ color: 'var(--color-text-secondary)', letterSpacing: '0.08em', fontWeight: 700, display: 'block' }}>AHORA</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                      <Typography variant="h3" sx={{ fontWeight: 800, color: 'var(--color-text-primary)', lineHeight: 1 }}>
                        {current ? Math.round(current.temperature) : Math.round(currentHourEntry?.temp ?? 0)}°
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: 'var(--color-text-secondary)', textTransform: 'capitalize', fontSize: '0.8rem' }}>
                      {getWeatherDisplay(current?.weathercode ?? currentHourEntry?.code ?? 0).label}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
                    {todayDay && (
                      <>
                        <Typography variant="h6" sx={{ fontWeight: 800, color: 'var(--color-text-primary)', lineHeight: 1.1 }}>{todayDay.max}°</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: 'var(--color-text-secondary)', lineHeight: 1.1 }}>{todayDay.min}°</Typography>
                      </>
                    )}
                  </Box>
                </Box>

                {/* Metrics as small tiles */}
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1 }}>
                  {[
                    { label: 'Viento', value: current ? `${Math.round(current.windspeed)} km/h` : '—', icon: '💨' },
                    { label: 'Dirección', value: current ? `${Math.round(current.winddirection)}°` : '—', icon: '🧭' },
                    { label: 'Humedad', value: todayDay ? `${todayDay.humidity}%` : '—', icon: '💧' },
                    { label: 'UV / Lluvia', value: todayDay ? `${todayDay.uv} / ${todayDay.precip}%` : '—', icon: '☀️' },
                  ].map((m) => (
                    <Box key={m.label} sx={{ ...cardStyle, p: 1, textAlign: 'center' }}>
                      <Box style={{ fontSize: 14 }}>{m.icon}</Box>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: 'var(--color-text-primary)', lineHeight: 1.2, fontSize: '0.75rem' }}>{m.value}</Typography>
                      <Typography variant="caption" sx={{ color: 'var(--color-text-secondary)', display: 'block', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{m.label}</Typography>
                    </Box>
                  ))}
                </Box>

                {restHours.length > 0 && (
                  <Accordion expanded={hoursExpanded} onChange={(_, e) => setHoursExpanded(e)} disableGutters elevation={0} sx={{ ...cardStyle as any, borderRadius: 2, '&:before': { display: 'none' } }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 1.5, minHeight: 36, py: 0.5 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'var(--color-text-primary)', fontSize: '0.85rem' }}>
                        Próximas horas
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ px: 1, pb: 1, pt: 0 }}>
                      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1 }}>
                        {restHours.map((hour: any) => {
                          const display = getWeatherDisplay(hour.code)
                          const Icon = display.icon
                          return (
                            <Box key={hour.time} sx={{ p: 1, borderRadius: 1.5, bgcolor: 'var(--color-background)', border: '1px solid var(--color-border)', textAlign: 'center' }}>
                              <Typography variant="caption" sx={{ fontWeight: 700, color: 'var(--color-text-secondary)', display: 'block', fontSize: '0.65rem' }}>{formatTime(hour.time)}</Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, my: 0.5 }}>
                                <Icon style={{ fontSize: 22, color: display.color ?? '#FFD54F' }} />
                                <Typography variant="h6" sx={{ fontWeight: 800, color: 'var(--color-text-primary)', lineHeight: 1, fontSize: '1.1rem' }}>{Math.round(hour.temp)}°</Typography>
                              </Box>
                              <Typography variant="caption" sx={{ color: display.color ?? '#FFD54F', display: 'block', fontSize: '0.6rem', textTransform: 'capitalize' }}>{display.label}</Typography>
                              <Typography variant="caption" sx={{ color: 'var(--color-text-secondary)', display: 'block', fontSize: '0.6rem' }}>🌧️{hour.precip}%</Typography>
                            </Box>
                          )
                        })}
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                )}
              </Box>
            )}

            {tab === 1 && dailyList.length > 0 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {todayDay && (() => {
                  const display = getWeatherDisplay(todayDay.code)
                  const Icon = display.icon
                  return (
                    <Box sx={{ ...cardStyle, p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ width: 72, height: 72, borderRadius: 2, bgcolor: 'var(--color-background)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon style={{ fontSize: 44, color: display.color ?? '#FFD54F' }} />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="caption" sx={{ color: 'var(--color-text-secondary)', letterSpacing: '0.08em', fontWeight: 700, display: 'block' }}>HOY</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                          <Typography variant="h4" sx={{ fontWeight: 800, color: 'var(--color-text-primary)', lineHeight: 1 }}>{todayDay.max}° / {todayDay.min}°</Typography>
                        </Box>
                        <Typography variant="body2" sx={{ color: display.color ?? '#FFD54F', textTransform: 'capitalize', fontSize: '0.8rem' }}>{display.label}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, alignItems: 'flex-end' }}>
                        <Chip label={`💧${todayDay.humidity}%`} size="small" variant="outlined" sx={{ fontSize: '0.65rem', height: 22 }} />
                        <Chip label={`💨${todayDay.wind} km/h`} size="small" variant="outlined" sx={{ fontSize: '0.65rem', height: 22 }} />
                        <Chip label={`☀️${todayDay.uv}`} size="small" variant="outlined" sx={{ fontSize: '0.65rem', height: 22 }} />
                        <Chip label={`🌧️${todayDay.precip}%`} size="small" variant="outlined" sx={{ fontSize: '0.65rem', height: 22 }} />
                      </Box>
                    </Box>
                  )
                })()}

                {restDays.length > 0 && (
                  <Accordion expanded={daysExpanded} onChange={(_, e) => setDaysExpanded(e)} disableGutters elevation={0} sx={{ ...cardStyle as any, borderRadius: 2, '&:before': { display: 'none' } }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 1.5, minHeight: 36, py: 0.5 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'var(--color-text-primary)', fontSize: '0.85rem' }}>
                        Próximos días
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ px: 1, pb: 1, pt: 0 }}>
                      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1 }}>
                        {restDays.map((day: any) => {
                          const display = getWeatherDisplay(day.code)
                          const Icon = display.icon
                          return (
                            <Box key={day.date} sx={{ p: 1.5, borderRadius: 1.5, bgcolor: 'var(--color-background)', border: '1px solid var(--color-border)' }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'var(--color-text-primary)', textTransform: 'capitalize', fontSize: '0.8rem' }}>{day.dayName}</Typography>
                                <Icon style={{ fontSize: 28, color: display.color ?? '#FFD54F' }} />
                              </Box>
                              <Typography variant="body2" sx={{ color: display.color ?? '#FFD54F', textTransform: 'capitalize', fontSize: '0.7rem', display: 'block', mb: 1 }}>{display.label}</Typography>
                              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 1 }}>
                                <Typography variant="h6" sx={{ fontWeight: 800, color: 'var(--color-text-primary)', lineHeight: 1 }}>{day.max}°</Typography>
                                <Typography variant="h6" sx={{ fontWeight: 700, color: 'var(--color-text-secondary)', lineHeight: 1 }}>{day.min}°</Typography>
                              </Box>
                              <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                <Chip label={`💧${day.humidity}%`} size="small" variant="outlined" sx={{ fontSize: '0.6rem', height: 20 }} />
                                <Chip label={`💨${day.wind}`} size="small" variant="outlined" sx={{ fontSize: '0.6rem', height: 20 }} />
                                <Chip label={`☀️${day.uv}`} size="small" variant="outlined" sx={{ fontSize: '0.6rem', height: 20 }} />
                                <Chip label={`🌧️${day.precip}%`} size="small" variant="outlined" sx={{ fontSize: '0.6rem', height: 20 }} />
                              </Box>
                            </Box>
                          )
                        })}
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                )}
              </Box>
            )}

            {(!isLoading && !error && tab === 0 && !current && !currentHourEntry) && (
              <Alert severity="info">
                No hay datos disponibles para hoy.
              </Alert>
            )}
            {(!isLoading && !error && tab === 1 && dailyList.length === 0) && (
              <Alert severity="info">
                No hay datos disponibles.
              </Alert>
            )}
          </Box>

          <Box sx={{ p: 1.5, borderTop: '1px solid var(--color-border)', textAlign: 'center', bgcolor: 'var(--color-surface)' }}>
            <Typography variant="caption" sx={{ color: 'var(--color-text-secondary)' }}>
              Datos: <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Open-Meteo</a>
              {' | '}
              Actualizado: {new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}
            </Typography>
          </Box>
        </motion.div>
      </Box>
    </Modal>
  )
}
