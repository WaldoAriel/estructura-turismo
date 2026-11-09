import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Modal,
  Box,
  Typography,
  Tabs,
  Tab,
  Grid,
  Paper,
  Divider,
  Chip,
  CircularProgress,
  Alert,
  AlertTitle,
  IconButton,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { fetchForecast, getWeatherDisplay, getDailyForecastList, getTodayHourlyForecast, formatTime, ForecastResponse } from '../utils/weather'

interface Props {
  open: boolean
  onClose: () => void
}

export default function ClimaModal({ open, onClose }: Props) {
  const [forecast, setForecast] = useState<ForecastResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tab, setTab] = useState(0)

  useEffect(() => {
    if (!open) return
    let mounted = true
    setIsLoading(true)
    setError(null)
    fetchForecast().then((data) => {
      if (!mounted) return
      if (data) {
        setForecast(data)
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

  const handleTabChange = (_: React.SyntheticEvent, newTab: number) => setTab(newTab)

  if (!open) return null

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropProps={{ timeout: 250, sx: { backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' } }}
    >
      <Box
        sx={{
          maxWidth: { xs: '100vw', sm: 520 },
          width: '100%',
          maxHeight: { xs: '100vh', sm: '90vh' },
          bgcolor: 'var(--color-surface)',
          borderRadius: { xs: '0 0 0 0', sm: 3 },
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, borderBottom: '1px solid var(--color-border)' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>
              Pronóstico Santa Rosa
            </Typography>
            <IconButton onClick={onClose} style={{ color: 'var(--color-text-secondary)' }} aria-label="Cerrar">
              <CloseIcon />
            </IconButton>
          </Box>

          <Tabs value={tab} onChange={handleTabChange} sx={{ borderBottom: '1px solid var(--color-border)', px: 1 }}>
            <Tab label="5 días" icon={<span style={{ marginRight: 8 }}>📅</span>} />
            <Tab label="Hoy (horas)" icon={<span style={{ marginRight: 8 }}>🕐</span>} />
          </Tabs>

          <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
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

            {tab === 0 && dailyList.length > 0 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {dailyList.map((day, idx) => {
                  const display = getWeatherDisplay(day.code)
                  const Icon = display.icon
                  return (
                    <motion.div
                      key={day.date}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: idx * 0.05 }}
                    >
                      <Paper elevation={1} sx={{ p: 2, borderRadius: 2, border: '1px solid var(--color-border)' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1, mb: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'var(--color-text-primary)', minWidth: 100 }}>
                              {idx === 0 ? 'Hoy' : day.dayName}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'var(--color-text-secondary)' }}>
                              {day.date}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Icon style={{ fontSize: 28, color: display.color ?? '#FFD54F' }} />
                            <Typography variant="body2" sx={{ color: display.color ?? '#FFD54F', fontWeight: 500, textTransform: 'capitalize' }}>
                              {display.label}
                            </Typography>
                          </Box>
                        </Box>
                        <Divider sx={{ mb: 1.5 }} />
                        <Grid container spacing={2} sx={{ textAlign: 'center' }}>
                          <Grid item xs={6} sm={3}>
                            <Typography variant="caption" sx={{ color: 'var(--color-text-secondary)', display: 'block' }}>Máx</Typography>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>{day.max}°</Typography>
                          </Grid>
                          <Grid item xs={6} sm={3}>
                            <Typography variant="caption" sx={{ color: 'var(--color-text-secondary)', display: 'block' }}>Mín</Typography>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: 'var(--color-text-secondary)' }}>{day.min}°</Typography>
                          </Grid>
                          <Grid item xs={6} sm={3}>
                            <Typography variant="caption" sx={{ color: 'var(--color-text-secondary)', display: 'block' }}>💧 Humedad</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>{day.humidity}%</Typography>
                          </Grid>
                          <Grid item xs={6} sm={3}>
                            <Typography variant="caption" sx={{ color: 'var(--color-text-secondary)', display: 'block' }}>💨 Viento</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>{day.wind} km/h</Typography>
                          </Grid>
                          <Grid item xs={6} sm={3}>
                            <Typography variant="caption" sx={{ color: 'var(--color-text-secondary)', display: 'block' }}>☀️ UV</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>{day.uv}</Typography>
                          </Grid>
                          <Grid item xs={6} sm={3}>
                            <Typography variant="caption" sx={{ color: 'var(--color-text-secondary)', display: 'block' }}>🌧️ Lluvia</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>{day.precip}%</Typography>
                          </Grid>
                        </Grid>
                      </Paper>
                    </motion.div>
                  )
                })}
              </Box>
            )}

            {tab === 1 && hourlyList.length > 0 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="body2" sx={{ color: 'var(--color-text-secondary)', mb: 1 }}>
                  Pronóstico por horas para hoy
                </Typography>
                {hourlyList.slice(0, 12).map((hour, idx) => {
                  const display = getWeatherDisplay(hour.code)
                  const Icon = display.icon
                  return (
                    <motion.div
                      key={hour.time}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.15, delay: idx * 0.02 }}
                    >
                      <Paper elevation={0} sx={{ p: 1.5, borderRadius: 1.5, border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, flexWrap: 'wrap' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 140 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'var(--color-text-primary)', minWidth: 55 }}>
                            {formatTime(hour.time)}
                          </Typography>
                          <Icon style={{ fontSize: 24, color: display.color ?? '#FFD54F' }} />
                          <Typography variant="body2" sx={{ color: display.color ?? '#FFD54F', textTransform: 'capitalize' }}>
                            {display.label}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>{Math.round(hour.temp)}°</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3, color: 'var(--color-text-secondary)' }}>
                            <Chip label={`${hour.precip}%`} size="small" variant="outlined" sx={{ fontSize: '0.7rem', height: 24 }} />
                          </Box>
                        </Box>
                      </Paper>
                    </motion.div>
                  )
                })}
              </Box>
            )}

            {(!isLoading && !error && dailyList.length === 0 && hourlyList.length === 0) && (
              <Alert severity="info">
                No hay datos de pronóstico disponibles.
              </Alert>
            )}
          </Box>

          <Box sx={{ p: 1.5, borderTop: '1px solid var(--color-border)', textAlign: 'center' }}>
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