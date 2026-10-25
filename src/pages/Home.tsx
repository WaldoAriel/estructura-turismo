import { Box, Typography, Container, Button, Link as MuiLink } from '@mui/material'
import { motion } from 'framer-motion'
import { Link as RouterLink } from 'react-router-dom'
import { SPRING_STANDARD, SPRING_GENTLE, STAGGER_FAST } from '../config/animations'
import { municipalGradients, municipalPalette } from '../config/theme'
import SearchBar from '../components/SearchBar'
import { searchIndex } from '../data/searchIndex'
import Footer from '../components/Footer'

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      damping: 25,
      stiffness: 300,
      delay: i * 0.08,
    },
  }),
}

function AnimatedTitle({ text }: { text: string }) {
  const words = text.split(' ')
  const isLast = (i: number) => i === words.length - 1
  return (
    <Box
      component="h1"
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.25em',
        justifyContent: { xs: 'center', md: 'flex-start' },
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        fontSize: { xs: '2rem', sm: '3rem', md: '3.75rem' },
        color: '#FFFFFF',
        letterSpacing: '-0.02em',
        lineHeight: 1.05,
        textShadow: '0 2px 12px rgba(0,0,0,0.3)',
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          custom={i}
          initial="hidden"
          animate="visible"
          variants={wordVariants}
          style={{ display: 'inline-block', color: isLast(i) ? municipalPalette.limeGreen : 'inherit' }}
        >
          {word}
        </motion.span>
      ))}
    </Box>
  )
}

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

const CategoryTile = ({
  title,
  count,
  gradient,
  to,
  delay,
}: {
  title: string
  count: number
  gradient: string
  to: string
  delay: number
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...SPRING_GENTLE, delay }}
    >
      <Box
        sx={{
          position: 'relative',
          borderRadius: 'var(--border-radius-lg)',
          overflow: 'hidden',
          border: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-surface)',
          boxShadow: 'var(--shadow-sm)',
          minHeight: 160,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textDecoration: 'none',
          transition: 'transform 160ms cubic-bezier(0.23, 1, 0.32, 1), box-shadow 160ms cubic-bezier(0.23, 1, 0.32, 1)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 'var(--shadow-md)',
          },
        }}
        component={RouterLink}
        to={to}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: gradient,
            opacity: 0.95,
          }}
        />
        <Box sx={{ position: 'relative', textAlign: 'center', p: 3 }}>
          <Typography
            variant="h3"
            sx={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              color: '#FFFFFF',
              fontSize: { xs: '2rem', md: '2.5rem' },
              lineHeight: 1.1,
              mb: 1,
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '0.85rem',
              fontWeight: 600,
            }}
          >
            {count} {count === 1 ? 'lugar' : 'lugares'}
          </Typography>
        </Box>
      </Box>
    </motion.div>
  )
}

export default function Home() {
  return (
    <>
      <Box
        sx={{
          position: 'relative',
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
            position: 'relative',
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
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                alignItems: { xs: 'center', md: 'flex-start' },
              }}
            >
              <AnimatedTitle text="Santa Rosa de Calamuchita" />
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
                  mt: 1,
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 'var(--shadow-lg)',
                  },
                }}
              >
                Descubrir destinos
              </Button>
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: { xs: 'center', md: 'flex-end' },
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...SPRING_GENTLE, delay: 0.5 }}
                style={{ width: '100%', maxWidth: 680 }}
              >
                <SearchBar items={searchIndex} />
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
                description="Atractivos naturales, culturales y de interés que no podés dejar de conocer."
                gradient={municipalGradients.ocean}
                to="/visitar"
                delay={0.1}
              />
              <HighlightCard
                title="Qué Hacer"
                description="Actividades, deportes y experiencias para disfrutar en cualquier temporada."
                gradient={municipalGradients.sunset}
                to="/hacer"
                delay={0.15}
              />
            </Box>
          </motion.div>
        </Container>
      </section>

      <Box sx={{ height: { xs: 60, md: 100 } }} />

      <section style={{ padding: 'var(--spacing-xl-md) 0', background: 'var(--color-surface)' }}>
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
              Explorá por categoría
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
              Encontrá el plan ideal según lo que más te guste hacer.
            </Typography>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={STAGGER_FAST}
          >
            <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' } }}>
              <CategoryTile title="Eventos" count={17} gradient={municipalGradients.turquesa} to="/eventos" delay={0.05} />
              <CategoryTile title="Qué Hacer" count={24} gradient={municipalGradients.sunset} to="/hacer" delay={0.1} />
              <CategoryTile title="Qué Visitar" count={24} gradient={municipalGradients.ocean} to="/visitar" delay={0.15} />
              <CategoryTile title="Información" count={8} gradient={municipalGradients.naturaleza} to="/informacion" delay={0.2} />
            </Box>
          </motion.div>
        </Container>
      </section>

      <Box sx={{ height: { xs: 60, md: 100 } }} />

      <section style={{ padding: 'var(--spacing-xl-md) 0', background: 'var(--color-background)' }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 }, textAlign: 'center' }}>
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
                mb: 2,
                color: 'var(--color-text-primary)',
                fontSize: { xs: '1.6rem', sm: '2rem', md: '2.5rem' },
              }}
            >
              ¿Listo para vivir Santa Rosa?
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                maxWidth: 700,
                mx: 'auto',
                lineHeight: 1.7,
                mb: 4,
              }}
            >
              Te esperamos todo el año con propuestas únicas en el corazón del Valle de Calamuchita.
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
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 'var(--shadow-lg)',
                },
              }}
            >
              Planificá tu visita
            </Button>
          </motion.div>
        </Container>
      </section>

      <Footer />
    </>
  )
}
