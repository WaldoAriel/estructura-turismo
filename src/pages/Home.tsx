import { Box, Typography, Container, Button, Link as MuiLink, Chip } from '@mui/material'
import { motion } from 'framer-motion'
import { Link as RouterLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { SPRING_STANDARD, SPRING_GENTLE, STAGGER_FAST } from '../config/animations'
import { municipalGradients } from '../config/theme'
import SearchBar from '../components/SearchBar'
import ClimaWidget from '../components/ClimaWidget'
import ClimaModal from '../components/ClimaModal'
import { searchIndex } from '../data/searchIndex'
import Footer from '../components/Footer'
import { fetchCurrentWeather } from '../utils/weather'
import { getActivityRecommendations } from '../utils/recommendations'

const HighlightCard = ({
  title,
  description,
  gradient,
  to,
  delay,
}: {
  title: string
  description: string
  gradient: string
  to: string
  delay: number
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...SPRING_GENTLE, delay }}
    >
      <Box
        sx={{
          height: '100%',
          borderRadius: 'var(--border-radius-lg)',
          overflow: 'hidden',
          border: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-surface)',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 160ms cubic-bezier(0.23, 1, 0.32, 1), box-shadow 160ms cubic-bezier(0.23, 1, 0.32, 1)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 'var(--shadow-lg)',
          },
        }}
      >
        <Box sx={{ height: 180, width: '100%', background: gradient, position: 'relative' }}>
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.2) 0%, transparent 70%)',
            }}
          />
        </Box>
        <Box sx={{ p: 3, flex: 1, flexShrink: 0 }}>
          <Typography
            variant="h6"
            component="h3"
            sx={{ fontWeight: 700, mb: 1, color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)', fontSize: '1.25rem' }}
          >
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, mb: 2 }}>
            {description}
          </Typography>
          <MuiLink
            component={RouterLink}
            to={to}
            underline="none"
            sx={{
              color: 'var(--color-secondary)',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            Ver más →
          </MuiLink>
        </Box>
      </Box>
    </motion.div>
  )
}

export default function Home() {
  const [climaModalOpen, setClimaModalOpen] = useState(false)
  const [currentWeather, setCurrentWeather] = useState<{temperature: number; weathercode: number} | null>(null)

  // useEffect para fetch del clima
  useEffect(() => {
    let mounted = true
    fetchCurrentWeather().then((data) => {
      if (!mounted) return
      if (data && data.temperature !== undefined) {
        setCurrentWeather({
          temperature: Math.round(data.temperature),
          weathercode: data.weathercode,
        })
      }
    })
    return () => { mounted = false }
  }, [])

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          minHeight: { xs: 'auto', md: '100vh' },
          width: '100%',
          overflow: 'hidden',
          pb: { xs: 6, md: 16 },
        }}
      >
        <Box
          component="img"
          src="/hero.jpg"
          alt="Vista aérea de Santa Rosa de Calamuchita"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          sx={{ zIndex: 0, pointerEvents: 'none' }}
        />
        <Container
          maxWidth="lg"
          sx={{
            position: { xs: 'relative', md: 'absolute' },
            zIndex: 1,
            width: '100%',
            pt: { xs: 8, sm: 10, md: 15 },
            pb: { xs: 4, md: 6 },
            px: { xs: 2, sm: 3, md: 4 },
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr', lg: '1.2fr 0.8fr' },
              gap: { xs: 4, md: 6, lg: 8 },
              alignItems: 'flex-start',
            }}
          >
            {/* LEFT COLUMN: Hero SVG + Quote + CTA */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                alignItems: { xs: 'center', md: 'center' },
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...SPRING_STANDARD, delay: 0.1 }}
              >
                <Box
                  component="img"
                  src="/images/santa-rosa_hero.svg"
                  alt="Santa Rosa de Calamuchita"
                  className="hero-logo"
                  sx={{
                    width: { xs: '100%', md: '85%' },
                    maxWidth: { xs: '100%', md: '425px', lg: '510px', xl: '595px' },
                    maxHeight: { xs: '200px', md: 'none' },
                    height: 'auto',
                    mx: { xs: 'auto', md: 0 },
                    position: 'relative',
                    zIndex: 1300,
                  }}
                />
              </motion.div>

              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mb: 2 }}>
                <Button
                  variant="contained"
                  component={RouterLink}
                  to="/visitar"
                  sx={{
                    background: municipalGradients.principal,
                    color: '#F8F5F3',
                    fontFamily: 'var(--font-body)',
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                    px: 5,
                    py: 1.5,
                    borderRadius: 'var(--border-radius-sm)',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 'var(--shadow-lg)',
                    },
                  }}
                >
                  Descubrir destinos
                </Button>
              </Box>

            </Box>

            {/* RIGHT COLUMN: SearchBar + ClimaWidget + Recomendaciones */}
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              {/* SearchBar + ClimaWidget en fila en sm+ */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  flexWrap: { xs: 'wrap', md: 'nowrap' },
                  gap: { xs: 2, sm: 2.5 },
                  width: '100%',
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...SPRING_GENTLE, delay: 0.5 }}
                >
                  <Box
                    sx={{
                      flexGrow: 1,
                      minWidth: 350,
                      width: '100%',
                      maxWidth: { xs: '100%', sm: '400px' },
                    }}
                  >
                    <SearchBar items={searchIndex} />
                  </Box>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...SPRING_GENTLE, delay: 0.6 }}
                >
                  <ClimaWidget onOpenModal={() => setClimaModalOpen(true)} />
                </motion.div>
              </Box>

              {/* Recomendaciones de actividad según el clima */}
              {currentWeather && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...SPRING_GENTLE, delay: 0.7 }}
                >
                  <Box
                    sx={{
                      backgroundColor: 'rgba(255, 255, 255, 0.35)',
                      backdropFilter: 'blur(2px) saturate(100%)',
                      WebkitBackdropFilter: 'blur(4px) saturate(180%)',
                      borderRadius: '999px',
                      padding: '8px 16px',
                      marginTop: '50px',
                      border: 'none',
                      textAlign: 'center',
                      transition: 'background-color 0.2s ease, box-shadow 0.2s ease',
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.5)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      },
                      '&:focus-visible': {
                        outline: 'none',
                        backgroundColor: 'rgba(255,255,255,0.6)',
                        boxShadow: '0 0 0 3px rgba(58,171,181,0.4)',
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', gap: 1, mb: 0.5, px: 0.5 }}>
                      <Typography variant="subtitle2" sx={{ color: 'var(--color-text-secondary)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        ¿Qué hacer hoy?
                      </Typography>
                      <Box component={RouterLink} to={getActivityRecommendations(currentWeather)[0]?.action} sx={{ textDecoration: 'none', cursor: 'pointer', pointerEvents: 'auto' }}>
                        <Chip label={getActivityRecommendations(currentWeather)[0]?.label} sx={{ m: 0 }} />
                      </Box>
                    </Box>
                    <Typography variant="caption" sx={{ color: 'var(--color-text-secondary)', fontSize: '0.7rem', textAlign: 'center', width: '100%', p: 0 }}>
                      {getActivityRecommendations(currentWeather)[0]?.description}
                    </Typography>
                  </Box>
                </motion.div>
              )}
            </Box>

          </Box>
        </Container>
      </Box>

      <Box sx={{ height: { xs: 80, sm: 100, md: 100 } }} />

      <section style={{ padding: 'var(--spacing-xl-md) 0', background: 'var(--color-background)' }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={SPRING_STANDARD}
          >
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                textAlign: 'center',
                mb: 1,
                color: 'var(--color-text-primary)',
                fontSize: { xs: '1.6rem', sm: '2rem', md: '2.5rem' },
              }}
            >
              Conocé Santa Rosa
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                textAlign: 'center',
                maxWidth: 700,
                mx: 'auto',
                lineHeight: 1.7,
                mb: 5,
              }}
            >
              Historia, naturaleza y actividades para todos los gustos.
            </Typography>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={STAGGER_FAST}
          >
            <Box sx={{ display: 'grid', gap: 4, gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' } }}>
              <HighlightCard
                title="Sobre Santa Rosa"
                description="Descubrí la historia, tradiciones y el carácter que definen a nuestra ciudad."
                gradient={municipalGradients.naturaleza}
                to="/informacion/sobre-santa-rosa"
                delay={0.05}
              />
              <HighlightCard
                title="Qué Visitar"
                description="Explorá los mejores atractivos naturales, culturales y de interés de la región."
                gradient={municipalGradients.principal}
                to="/visitar"
                delay={0.1}
              />
              <HighlightCard
                title="Qué Hacer"
                description="Actividades al aire libre, deportes, cultura y entretenimiento para toda la familia."
                gradient={municipalGradients.turquesa}
                to="/hacer"
                delay={0.15}
              />
              <HighlightCard
                title="Eventos"
                description="Agenda de festivales, ferias y celebraciones durante todo el año."
                gradient={municipalGradients.sunset}
                to="/eventos"
                delay={0.2}
              />
              <HighlightCard
                title="Dónde Dormir"
                description="Encontrá tu alojamiento ideal: hoteles, cabañas, hostels y más."
                gradient={municipalGradients.citrus}
                to="/alojamientos"
                delay={0.25}
              />
              <HighlightCard
                title="Dónde Comer"
                description="Descubrí la gastronomía local: restaurantes, pizzerías, heladerías y más."
                gradient={municipalGradients.tropical}
                to="/gastronomia"
                delay={0.3}
              />
            </Box>
          </motion.div>
        </Container>
      </section>

      <Footer />
      <ClimaModal open={climaModalOpen} onClose={() => setClimaModalOpen(false)} />
    </>
  )
}