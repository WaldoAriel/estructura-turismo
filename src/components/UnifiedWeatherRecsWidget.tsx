import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Box, Typography, Tooltip } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { fetchCurrentWeather, getWeatherDisplay } from '../utils/weather'
import { getActivityRecommendations } from '../utils/recommendations'
import WbSunny from '@mui/icons-material/WbSunny'

interface Props {
  onOpenClimaModal: () => void
}

export default function UnifiedWeatherRecsWidget({ onOpenClimaModal }: Props) {
  const [currentWeather, setCurrentWeather] = useState<{
    temperature: number
    weathercode: number
    windspeed?: number
    time?: string
  } | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    fetchCurrentWeather().then((data) => {
      if (!mounted) return
      if (data) {
        setCurrentWeather({
          temperature: Math.round(data.temperature),
          weathercode: data.weathercode,
          windspeed: data.windspeed,
          time: data.time,
        })
      }
      setIsLoading(false)
    })
    return () => { mounted = false }
  }, [])

  const display = currentWeather ? getWeatherDisplay(currentWeather.weathercode) : null
  const Icon = display?.icon ?? WbSunny
  const iconColor = display?.color ?? '#FFD54F'

  const recommendations = currentWeather ? getActivityRecommendations(currentWeather) : []
  const activityRec = recommendations.find((r) => r.type === 'activity')
  const gastronomyRecs = recommendations.filter((r) => r.type === 'gastronomy')
  const firstRec = activityRec || recommendations[0]

  const widgetSx = {
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    alignItems: 'stretch',
    width: '100%',
    minWidth: 0,
    borderRadius: { xs: '24px', sm: '999px' },
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
    backdropFilter: 'blur(2px) saturate(100%)',
    WebkitBackdropFilter: 'blur(4px) saturate(180%)',
    border: 'none',
    overflow: 'hidden',
    transition: 'background-color 0.2s ease, box-shadow 0.2s ease',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.5)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    },
  } as const

  if (isLoading) {
    return (
      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
        <Box sx={widgetSx} role="status" aria-label="Cargando clima y recomendaciones">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, width: '100%', justifyContent: 'center', py: 1.25, px: 2 }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              style={{ fontSize: 20, color: 'var(--color-primary-dark)' }}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" strokeDasharray="31.4 31.4" strokeLinecap="round" />
              </svg>
            </motion.div>
            <span style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>Cargando...</span>
          </Box>
        </Box>
      </motion.div>
    )
  }

  const activityText = activityRec?.shortLabel || activityRec?.label || ''
  const gastronomyRec = gastronomyRecs[0]
  const gastronomyText = gastronomyRec?.shortLabel || gastronomyRec?.label || ''

  const recLink = currentWeather
    ? `/recomendaciones?clima=${currentWeather.weathercode}&temp=${currentWeather.temperature}&wind=${currentWeather.windspeed ?? 0}&time=${encodeURIComponent(currentWeather.time ?? '')}`
    : '/recomendaciones'

  const recTextColor = 'var(--color-primary-dark)'

  return (
    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
      <Box sx={widgetSx}>
        {/* 25%: Clima actual */}
        <Tooltip title={`Temperatura actual: ${currentWeather?.temperature ?? '--'}°C, ${display?.label ?? '—'}`}>
          <Box
            onClick={onOpenClimaModal}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onOpenClimaModal() }}
            sx={{
              flex: { xs: '1 1 auto', sm: '0 0 25%' },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              cursor: 'pointer',
              py: 1.25,
              px: 2,
            }}
          >
            <Icon style={{ fontSize: 26, color: iconColor }} />
            <Typography variant="body2" sx={{ fontWeight: 600, fontSize: { xs: '1.1rem', sm: '1.3rem' }, color: recTextColor, whiteSpace: 'nowrap' }}>
              {currentWeather?.temperature !== null ? `${currentWeather?.temperature}°` : '--°'}
            </Typography>
          </Box>
        </Tooltip>

        {/* Divider */}
        {firstRec && currentWeather && (
          <Box sx={{ width: { xs: '60%', sm: '1px' }, height: { xs: '1px', sm: 'auto' }, alignSelf: 'center', bgcolor: 'rgba(10, 77, 76, 0.2)', mx: { xs: 'auto', sm: 0 }, my: { xs: 0.5, sm: 1 } }} />
        )}

        {/* 75%: Recomendación humanizada */}
        {firstRec && currentWeather && (
          <Box
            component={RouterLink}
            to={recLink}
            sx={{
              flex: { xs: '1 1 auto', sm: '0 0 75%' },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              cursor: 'pointer',
              py: 1.25,
              px: 2,
              textAlign: 'center',
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 600, fontSize: { xs: '0.75rem', sm: '0.85rem' }, color: recTextColor, lineHeight: 1.4 }}>
              Es un día ideal para {activityText}
              {gastronomyText && <> y {gastronomyText}</>}
            </Typography>
          </Box>
        )}
      </Box>
    </motion.div>
  )
}