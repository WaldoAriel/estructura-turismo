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

  const widgetSx = {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    padding: '8px 16px',
    borderRadius: '999px',
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
    backdropFilter: 'blur(2px) saturate(100%)',
    WebkitBackdropFilter: 'blur(4px) saturate(180%)',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease, box-shadow 0.2s ease',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    },
    '&:focus-visible': {
      outline: 'none',
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
      boxShadow: '0 0 0 3px rgba(58, 171, 181, 0.4)',
    },
  } as const

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Tooltip title={error || `Temperatura actual: ${currentTemp ?? '--'}°C, ${display.label}`}>
        <Box sx={widgetSx} onClick={onOpenModal} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onOpenModal() }}>
          {isLoading ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                style={{ fontSize: 20, color: 'var(--color-primary-dark)' }}
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" strokeDasharray="31.4 31.4" strokeLinecap="round" style={{ transformOrigin: 'center' }} /></svg>
              </motion.div>
              <span style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>--°</span>
            </Box>
          ) : (
            <>
              <Icon style={{ fontSize: 32, color: iconColor }} />
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: '1.3rem', sm: '1.6rem' },
                  color: 'var(--color-primary-dark)',
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