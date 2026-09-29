import { Box, Typography, Container, Button } from '@mui/material'
import { motion } from 'framer-motion'
import { Link as RouterLink } from 'react-router-dom'
import { SPRING_STANDARD, SPRING_GENTLE, STAGGER_FAST } from '../config/animations'

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
        justifyContent: 'center',
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
        color: '#FFFFFF',
        letterSpacing: '-0.02em',
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
          style={{ display: 'inline-block', color: isLast(i) ? '#E29578' : 'inherit' }}
        >
          {word}
        </motion.span>
      ))}
    </Box>
  )
}

const FeatureCard = ({
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
      initial={{ opacity: 0, y: 20 }}
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
        }}
      >
        <Box sx={{ height: 140, width: '100%', background: gradient, position: 'relative' }}>
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(ellipse at center, rgba(255,255,255,0.15) 0%, transparent 70%)',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: -16,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: 'var(--color-surface)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-md)',
              border: '2px solid var(--color-surface)',
            }}
          >
            <Typography variant="h6" sx={{ color: 'var(--color-text-primary)', fontWeight: 800, fontFamily: 'var(--font-display)' }}>
              {title[0]}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ p: 3, flex: 1, flexShrink: 0 }}>
          <Typography
            variant="h6"
            component="h3"
            sx={{ fontWeight: 700, mb: 1, color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
          >
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, mb: 2 }}>
            {description}
          </Typography>
          <Button
            variant="outlined"
            size="small"
            component={RouterLink}
            to={to}
            sx={{
              mt: 'auto',
              borderColor: 'var(--color-accent)',
              color: 'var(--color-primary-dark)',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: 'rgba(226, 149, 120, 0.1)',
              },
            }}
          >
            Explorar
          </Button>
        </Box>
      </Box>
    </motion.div>
  )
}

const HeroSection = () => (
  <Box
    sx={{
      position: 'relative',
      height: '100vh',
      width: '100%',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Box
      component="img"
      src="/hero.jpg"
      alt="Vista aérea de Santa Rosa de Calamuchita"
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      sx={{ zIndex: 0, pointerEvents: 'none' }}
    />
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(135deg, rgba(10, 77, 76, 0.6) 0%, rgba(123, 76, 158, 0.5) 50%, rgba(226, 149, 120, 0.4) 100%)',
        zIndex: 0,
      }}
    />
    <Container
      maxWidth="lg"
      sx={{
        position: 'relative',
        zIndex: 1,
        pt: { xs: 10, sm: 12, md: 14 },
        px: { xs: 2, sm: 3, md: 4 },
        textAlign: 'center',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...SPRING_STANDARD, delay: 0.2 }}
      >
        <AnimatedTitle text="Santa Rosa de Calamuchita" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...SPRING_GENTLE, delay: 0.4 }}
      >
        <Typography
          variant="h6"
          sx={{
            color: 'rgba(248, 245, 243, 0.9)',
            maxWidth: 720,
            mx: 'auto',
            my: 4,
            lineHeight: 1.6,
            fontSize: { xs: '1rem', sm: '1.2rem', md: '1.4rem' },
            fontStyle: 'italic',
          }}
        >
          "Hay lugares donde uno se queda y lugares que se quedan en uno"
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...SPRING_GENTLE, delay: 0.6 }}
      >
        <Button
          variant="contained"
          component={RouterLink}
          to="/visitar"
          sx={{
            background: 'linear-gradient(135deg, #3AABB5 0%, #0A4D4C 100%)',
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
          Descubrir destinos
        </Button>
      </motion.div>
    </Container>
  </Box>
)

export default function Home() {
  return (
    <>
      <HeroSection />

      <section style={{ padding: 'var(--spacing-xl) 0', background: 'var(--color-background)', marginTop: '-2rem' }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={SPRING_STANDARD}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 6 }}>
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: 'var(--border-radius-md)',
                  background: 'var(--bg-accent-gradient)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: 'rotate(-10deg)',
                  boxShadow: 'var(--shadow-md)',
                }}
              >
                <Typography variant="h6" sx={{ color: 'var(--color-text-primary)', fontWeight: 800 }}>
                  S
                </Typography>
              </Box>
              <Typography
                variant="h4"
                component="h2"
                sx={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  color: 'var(--color-text-primary)',
                  fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                }}
              >
                Conocé Santa Rosa
              </Typography>
            </Box>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={STAGGER_FAST}
          >
            <Box sx={{ display: 'grid', gap: 4, gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' } }}>
              <FeatureCard
                title="Sobre Santa Rosa"
                description="Descubrí la historia, tradiciones y caracteres que definen a nuestra ciudad."
                gradient="linear-gradient(135deg, #a5d6a7, #388e3c)"
                to="/informacion/sobre-santa-rosa"
                delay={0.05}
              />
              <FeatureCard
                title="Qué Visitar"
                description="Atractivos naturales, culturales y de interés que no podés dejar de ver."
                gradient="linear-gradient(135deg, #3AABB5, #0A4D4C)"
                to="/visitar"
                delay={0.08}
              />
              <FeatureCard
                title="Qué Hacer"
                description="Actividades, deportes y experiencias que podés disfrutar en cualquier temporada."
                gradient="linear-gradient(135deg, #ffcc80, #ef6c00)"
                to="/hacer"
                delay={0.11}
              />
            </Box>
          </motion.div>
        </Container>
      </section>
    </>
  )
}
