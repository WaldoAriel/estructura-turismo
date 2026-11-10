import { Box, Typography, Container, Button, Link as MuiLink } from '@mui/material'
import { motion } from 'framer-motion'
import { Link as RouterLink } from 'react-router-dom'
import { useState } from 'react'
import { SPRING_STANDARD, SPRING_GENTLE, STAGGER_FAST } from '../config/animations'
import { municipalGradients } from '../config/theme'
import SearchBar from '../components/SearchBar'
import ClimaWidget from '../components/ClimaWidget'
import ClimaModal from '../components/ClimaModal'
import { searchIndex } from '../data/searchIndex'
import Footer from '../components/Footer'

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

  return (
    <>
      <Box
        sx={{
          position: 'inherit',
          minHeight: { xs: 'auto', md: '100vh' },
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pb: { xs: 12, md: 16 },
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
            position: 'absolute',
            zIndex: 1,
            pt: { xs: 12, sm: 14, md: 16 },
            pb: { xs: 4, md: 6 },
            px: { xs: 2, sm: 3, md: 4 },
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: { xs: 4, md: 6 },
              alignItems: 'flex-start',
            }}
          >
            {/* LEFT COLUMN: Hero SVG + Quote + CTA */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                alignItems: { xs: 'center', md: 'flex-start' },
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
                    maxWidth: { xs: '100%', md: '500px' },
                    height: 'auto',
                    mx: { xs: 'auto', md: 0 },
                  }}
                />
              </motion.div>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-start' }, mb: 2 }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: 'rgba(248, 245, 243, 0.9)',
                    maxWidth: 520,
                    mx: { xs: 'auto', md: 0 },
                    lineHeight: 1.5,
                    fontSize: { xs: '1rem', sm: '1.15rem', md: '1.25rem' },
                    fontStyle: 'italic',
                  }}
                >
                  "Hay lugares donde uno se queda y lugares que se quedan en uno"
                </Typography>
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
                    ml: { xs: 0, md: 3 },
                    mt: { xs: 1, md: 0 },
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

            {/* RIGHT COLUMN: SearchBar + ClimaWidget */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                flexWrap: { xs: 'wrap', md: 'nowrap' },
                gap: { xs: 2, md: 3 },
                alignItems: { xs: 'center', md: 'center' },
                justifyContent: { xs: 'center', md: 'flex-end' },
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
                    minWidth: 330,
                    width: '100%',
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

          </Box>
        </Container>
      </Box>

      <Box sx={{ height: { xs: 60, md: 100 } }} />

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