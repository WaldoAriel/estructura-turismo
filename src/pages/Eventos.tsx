import { Box, Typography, Container, Card, CardContent, Breadcrumbs, Link, Chip } from '@mui/material'
import { motion } from 'framer-motion'
import { introText, autumnIntroText, winterIntroText, springIntroText, summerEvents, autumnEvents, winterEvents, springEvents, getEventPlaceholder } from '../data/eventosData'
import { SPRING_STANDARD, STAGGER_FAST } from '../config/animations'
import { municipalGradients } from '../config/theme'
import Gallery from '../components/Gallery'
import Footer from '../components/Footer'

const seasonConfig: Record<string, { gradient: string; intro: string; heroGradient: string }> = {
  Verano: { gradient: 'linear-gradient(135deg, #F89C32, #F37335)', intro: '', heroGradient: municipalGradients.turquesa },
  Otoño: { gradient: 'linear-gradient(135deg, #F89C32, #F37335)', intro: autumnIntroText, heroGradient: municipalGradients.sunset },
  Invierno: { gradient: 'linear-gradient(135deg, #3AABB5, #0E98AE)', intro: winterIntroText, heroGradient: municipalGradients.principal },
  Primavera: { gradient: 'linear-gradient(135deg, #92C14A, #B9CF41)', intro: springIntroText, heroGradient: municipalGradients.forest },
}

const seasonOrder = ['Verano', 'Otoño', 'Invierno', 'Primavera']

const seasonEvents: Record<string, any[]> = {
  Verano: summerEvents,
  Otoño: autumnEvents,
  Invierno: winterEvents,
  Primavera: springEvents,
}

function SeasonSection({
  season,
  index,
}: {
  season: string
  index: number
}) {
  const config = seasonConfig[season]
  const events = seasonEvents[season] || []
  const isEven = index % 2 === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...SPRING_STANDARD, delay: index * 0.05 }}
    >
      <Box
        sx={{
          mb: { xs: 4, md: 6 },
          position: 'relative',
          borderRadius: 'var(--border-radius-lg)',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid var(--color-border)',
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: isEven ? '3fr 2fr' : '2fr 3fr' },
            borderRadius: 'var(--border-radius-lg)',
            minHeight: { xs: 260, md: 320 },
            backgroundColor: 'var(--color-surface)',
          }}
          >
          <Box
            sx={{
              position: 'relative',
              minWidth: 0,
              background: config.heroGradient,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: { xs: 3, md: 4 },
              ...(!isEven ? { order: { xs: 1, md: 2 } } : {}),
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.15) 0%, transparent 70%)',
              }}
            />
            <Box
              sx={{
                position: 'relative',
                width: 100,
                height: 100,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.85)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  color: 'var(--color-text-primary)',
                  fontWeight: 800,
                  fontFamily: 'var(--font-display)',
                }}
              >
                {season[0]}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              p: { xs: 3, md: 4 },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              backgroundColor: 'var(--color-surface)',
              ...(isEven ? { order: { xs: 1, md: 2 } } : {}),
            }}
          >
            <Typography
              variant="h5"
              component="h3"
              sx={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                mb: 2,
                color: 'var(--color-text-primary)',
                fontSize: { xs: '1.4rem', md: '1.75rem' },
              }}
            >
              {season}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'var(--color-text-secondary)',
                lineHeight: 1.7,
                mb: 3,
              }}
            >
              {config.intro || introText}
            </Typography>
            <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap', alignItems: 'center' }}>
              <Chip
                label={`${events.length} eventos`}
                size="small"
                sx={{
                  backgroundColor: 'var(--color-primary)1A',
                  color: 'var(--color-primary-dark)',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  border: '1px solid var(--color-primary)33',
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={STAGGER_FAST}
        style={{ marginTop: '1rem' }}
      >
        <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' } }}>
          {events.map((event) => (
            <Card
              key={event.title}
              sx={{
                boxShadow: 'var(--shadow-md)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--border-radius-lg)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box sx={{ position: 'relative' }}>
                <Gallery images={[getEventPlaceholder(event.title)]} title={event.title} />
              </Box>
              <CardContent sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
                {event.month && (
                  <Chip
                    label={event.month}
                    size="small"
                    sx={{
                      mb: 1,
                      alignSelf: 'flex-start',
                      backgroundColor: 'var(--color-primary)1A',
                      color: 'var(--color-primary-dark)',
                      fontWeight: 600,
                      fontSize: '0.75rem',
                    }}
                  />
                )}
                {event.location && (
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontStyle: 'italic' }}>
                    📍 {event.location}
                  </Typography>
                )}
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{ fontWeight: 600, mb: 1.5, color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)', flex: 1 }}
                >
                  {event.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  {event.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </motion.div>
    </motion.div>
  )
}

export default function Eventos() {
  return (
    <>
      <Box
        sx={{
          position: 'relative',
          pt: { xs: 14, sm: 16, md: 18 },
          pb: { xs: 12, md: 18 },
          mb: { xs: 4, md: 6 },
          background: municipalGradients.principal,
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url("/bg-texture.svg")',
            opacity: 0.08,
            pointerEvents: 'none',
          }}
        />
        <Container maxWidth="lg" sx={{ position: 'relative', px: { xs: 2, sm: 3, md: 4 }, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={SPRING_STANDARD}
          >
            <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3, justifyContent: 'center', '& .MuiBreadcrumbs-separator': { color: 'rgba(255,255,255,0.6)' } }}>
              <Link href="/" underline="hover" sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem' }}>Inicio</Link>
              <Typography sx={{ color: '#FFFFFF', fontSize: '0.85rem', fontWeight: 600 }}>Eventos</Typography>
            </Breadcrumbs>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SPRING_STANDARD, delay: 0.02 }}
          >
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: { xs: '2rem', sm: '2.75rem', md: '3.5rem' },
                color: '#FFFFFF',
                mb: 3,
                letterSpacing: '-0.02em',
                lineHeight: 1.05,
              }}
            >
              Eventos por Estación
            </Typography>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SPRING_STANDARD, delay: 0.04 }}
          >
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(248, 245, 243, 0.9)',
                maxWidth: 700,
                mx: 'auto',
                lineHeight: 1.7,
                fontSize: { xs: '1rem', sm: '1.1rem' },
              }}
            >
              {introText}
            </Typography>
          </motion.div>
        </Container>
      </Box>

      <section style={{ padding: 'var(--spacing-xl) 0', background: 'var(--color-background)' }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
          {seasonOrder.map((season, index) => (
            <SeasonSection key={season} season={season} index={index} />
          ))}
        </Container>
      </section>

      <Footer />
    </>
  )
}
