import { Box, Typography, Card, CardContent, Chip, Button, Stack } from '@mui/material'
import { Phone, WhatsApp, Language, LocationOn } from '@mui/icons-material'
import { motion } from 'framer-motion'
import { municipalPalette, municipalGradients } from '../config/theme'
import { FADE_UP_CHILD, SPRING_STANDARD } from '../config/animations'

export interface Establecimiento {
  id: number
  nombre: string
  categoria: string
  direccion?: string
  telefono?: string
  telefonos?: { e164: string; tipo: string; numero: string; whatsapp?: string }[]
  web?: string
}

interface Props {
  item: Establecimiento
  guideType: 'alojamientos' | 'gastronomia'
  categoryColor?: string
}

export default function EstablecimientoCard({ item, guideType, categoryColor }: Props) {
  const categoryGradient =
    guideType === 'alojamientos' ? municipalGradients.ocean : municipalGradients.sunset
  const chipColor = categoryColor || categoryGradient

  const whatsappNumber = item.telefonos?.find((t) => t.whatsapp)?.whatsapp || item.telefonos?.[0]?.numero
  const webUrl = item.web && item.web.trim() !== '' ? item.web : null

  const buildWhatsAppMessage = () => {
    const cat = item.categoria.toUpperCase()
    const nombre = item.nombre
    if (guideType === 'gastronomia') {
      return `Hola, lo contacto desde el sitio web de Turismo de Santa Rosa de Calamuchita para consultar sobre ${cat} ${nombre}.`
    }
    return `Hola, lo contacto desde el sitio web de Turismo de Santa Rosa de Calamuchita para consultar disponibilidad en ${cat} ${nombre}.`
  }

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(buildWhatsAppMessage())
    const num = whatsappNumber ? whatsappNumber.replace(/\D/g, '') : ''
    const url = num ? `https://wa.me/${num}?text=${msg}` : `https://wa.me/?text=${msg}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleCall = () => {
    if (item.telefono) {
      window.open(`tel:${item.telefono}`, '_self')
    }
  }

  return (
    <motion.div variants={FADE_UP_CHILD} transition={SPRING_STANDARD}>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--border-radius-lg)',
          boxShadow: 'var(--shadow-card)',
          transition: 'box-shadow 160ms cubic-bezier(0.23, 1, 0.32, 1), transform 160ms cubic-bezier(0.23, 1, 0.32, 1)',
          '&:hover': {
            boxShadow: 'var(--shadow-cardHover)',
            transform: 'translateY(-2px)',
          },
        }}
      >
        <Box
          sx={{
            height: 8,
            background: chipColor,
            flexShrink: 0,
          }}
        />
        <CardContent sx={{ p: 2.5, display: 'flex', flexDirection: 'column', gap: 1.5, flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Chip
              label={item.categoria}
              size="small"
              sx={{
                backgroundColor: chipColor,
                color: '#FFFFFF',
                fontWeight: 600,
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 700, color: 'var(--color-text-primary)', lineHeight: 1.3 }}>
            {item.nombre}
          </Typography>
          {item.direccion && (
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.75, color: 'var(--color-text-secondary)' }}>
              <LocationOn sx={{ fontSize: 16, flexShrink: 0, mt: 0.25 }} />
              <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                {item.direccion}
              </Typography>
            </Box>
          )}
          {item.telefono && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, color: 'var(--color-text-secondary)' }}>
              <Phone sx={{ fontSize: 16, flexShrink: 0 }} />
              <Typography variant="body2">{item.telefono}</Typography>
            </Box>
          )}
          <Stack direction="row" gap={1} mt="auto" pt={1} flexWrap="wrap">
            <Button
              variant="contained"
              startIcon={<WhatsApp />}
              onClick={handleWhatsApp}
              size="small"
              sx={{
                backgroundColor: '#25D366',
                color: '#FFFFFF',
                fontWeight: 600,
                '&:hover': { backgroundColor: '#1EBEA5' },
                textTransform: 'none',
                borderRadius: 10,
              }}
            >
              WhatsApp
            </Button>
            {item.telefono && (
              <Button
                variant="outlined"
                startIcon={<Phone />}
                onClick={handleCall}
                size="small"
                sx={{
                  textTransform: 'none',
                  borderRadius: 10,
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-text-primary)',
                  '&:hover': { borderColor: municipalPalette.turquoise, color: municipalPalette.turquoise },
                }}
              >
                Llamar
              </Button>
            )}
            {webUrl && (
              <Button
                variant="outlined"
                startIcon={<Language />}
                href={webUrl.startsWith('http') ? webUrl : `https://${webUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{
                  textTransform: 'none',
                  borderRadius: 10,
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-text-primary)',
                  '&:hover': { borderColor: municipalPalette.turquoise, color: municipalPalette.turquoise },
                }}
              >
                Web
              </Button>
            )}
          </Stack>
        </CardContent>
      </Card>
    </motion.div>
  )
}