import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Tooltip, Box, Typography } from '@mui/material'
import { fetchCurrentWeather, getWeatherDisplay } from '../utils/weather'
import WbSunny from '@mui/icons-material/WbSunny'

interface Props {
  onOpenModal: () => void
}

export default function ClimaWidget({ onOpenModal }: Props) {
  const [currentTemp, setCurrentTemp] = useState<number | null>(null)
  const [weatherCode, setWeatherCode] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    fetchCurrentWeather().then((data) => {
      if (!mounted) return
      if (data) {
        setCurrentTemp(Math.round(data.temperature))
        setWeatherCode(data.weathercode)
        setError(null)
      } else {
        setError('No disponible')
      }
      setIsLoading(false)
    })
    return () => { mounted = false }
  }, [])

  const display = getWeatherDisplay(weatherCode)
  const Icon = display.icon ?? WbSunny
  const iconColor = display.color ?? '#FFD54F'

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
      style={{ cursor: 'pointer' }}
      onClick={onOpenModal}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onOpenModal() }}
    >
      <Tooltip title={error || `Temperatura actual: ${currentTemp ?? '--'}°C, ${display.label}`}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, p: 0.5, borderRadius: 8, transition: 'background-color 0.2s' }}>
          {isLoading ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                style={{ fontSize: 20, color: 'var(--color-primary)' }}
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" strokeDasharray="31.4 31.4" strokeLinecap="round" style={{ transformOrigin: 'center' }} /></svg>
              </motion.div>
              <span style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>--°</span>
            </Box>
          ) : (
            <>
              <Icon style={{ fontSize: 22, color: iconColor }} />
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: '0.85rem', sm: '0.95rem' },
                  color: 'var(--color-text-primary)',
                  whiteSpace: 'nowrap',
                }}
              >
                {currentTemp !== null ? `${currentTemp}°` : '--°'}
              </Typography>
            </>
          )}
        </Box>
      </Tooltip>
    </motion.div>
  )
}