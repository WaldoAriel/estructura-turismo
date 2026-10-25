import { Box, Typography, Container, Link, Grid, Card, CardContent } from '@mui/material'
import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { SPRING_STANDARD, SPRING_BOUNCY } from '../config/animations'
import { municipalPalette, municipalGradients } from '../config/theme'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import LocationIcon from '@mui/icons-material/LocationOn'

const FooterSection = ({ title, children, delay = 0, centered = false }: { title: string; children: React.ReactNode; delay?: number; centered?: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ ...SPRING_STANDARD, delay }}
  >
    <Box sx={{ mb: 3, textAlign: centered ? 'center' : 'left' }}>
      <Typography
        variant="h6"
        sx={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          color: '#FFFFFF',
          mb: 2,
          fontSize: { xs: '1.1rem', md: '1.25rem' },
        }}
      >
        {title}
      </Typography>
      {children}
    </Box>
  </motion.div>
)

const FooterLink = ({ href, children, delay = 0 }: { href: string; children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ ...SPRING_STANDARD, delay }}
  >
    <Link
      component={RouterLink}
      to={href}
      underline="none"
      sx={{
        color: 'rgba(248, 245, 243, 0.8)',
        fontSize: '0.9rem',
        display: 'block',
        mb: 1,
        transition: 'color 160ms cubic-bezier(0.23, 1, 0.32, 1)',
        '&:hover': {
          color: municipalPalette.clay,
        },
      }}
    >
      {children}
    </Link>
  </motion.div>
)

const CARD_COLORS = [
  municipalPalette.turquoise,
  municipalPalette.teal,
  municipalPalette.orange,
  municipalPalette.amber,
  municipalPalette.limeGreen,
  municipalPalette.green,
]

interface StatData {
  number: string
  label: string
  target: number
  color: string
}

const stats: StatData[] = [
  { number: '12', label: 'balnearios', target: 12, color: CARD_COLORS[0] },
  { number: '21', label: 'puentes y vados', target: 21, color: CARD_COLORS[1] },
  { number: '24', label: 'atractivos turísticos', target: 24, color: CARD_COLORS[2] },
  { number: '17', label: 'eventos anuales', target: 17, color: CARD_COLORS[3] },
  { number: '12 km', label: 'de costanera sobre el río', target: 12, color: CARD_COLORS[4] },
  { number: '564', label: 'alojamientos habilitados', target: 564, color: CARD_COLORS[5] },
  { number: '86', label: 'locales gastronómicos', target: 86, color: CARD_COLORS[0] },
  { number: '20.000', label: 'habitantes te esperamos!', target: 20000, color: CARD_COLORS[1] },
]

function CountUp({ target, suffix = '', delay = 0, shouldAnimate }: { target: number; suffix?: string; delay?: number; shouldAnimate: boolean }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (!isInView || !shouldAnimate) return
    const timer = setTimeout(() => {
      const duration = 1500
      const start = performance.now()
      const animate = (now: number) => {
        const progress = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setCount(Math.floor(eased * target))
        if (progress < 1) requestAnimationFrame(animate)
        else setCount(target)
      }
      requestAnimationFrame(animate)
    }, delay)
    return () => clearTimeout(timer)
  }, [isInView, target, delay, shouldAnimate])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...SPRING_STANDARD, delay: delay + 0.1 }}
    >
      <Typography
        variant="h4"
        sx={{
          fontFamily: "'Space Grotesk', 'Syne', sans-serif",
          fontWeight: 700,
          color: '#FFFFFF',
          fontSize: { xs: '1.75rem', md: '2.5rem' },
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
        }}
      >
        {count.toLocaleString()}{suffix}
      </Typography>
    </motion.div>
  )
}

const StatCard = ({ stat, index }: { stat: StatData; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [fillProgress, setFillProgress] = useState(0)
  const [countStarted, setCountStarted] = useState(false)
  const isInView = useInView(cardRef, { once: true, margin: '-100px' })

  useEffect(() => {
    if (!isInView) return
    const timer = setTimeout(() => {
      const duration = 1000
      const start = performance.now()
      const animate = (now: number) => {
        const progress = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 4)
        setFillProgress(eased)
        if (progress >= 1) {
          setCountStarted(true)
        }
        if (progress < 1) requestAnimationFrame(animate)
      }
      requestAnimationFrame(animate)
    }, index * 80)
    return () => clearTimeout(timer)
  }, [isInView, index])

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ ...SPRING_BOUNCY, delay: index * 0.06 }}
      whileHover={{ y: -8, scale: 1.02, transition: SPRING_BOUNCY }}
    >
      <Card
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.06)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: 'var(--border-radius-md)',
          position: 'relative',
          overflow: 'hidden',
          height: '100%',
          minHeight: '160px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: stat.color,
            transform: `scaleY(${fillProgress})`,
            transformOrigin: 'bottom',
            transition: `transform 1s cubic-bezier(0.23, 1, 0.32, 1) ${index * 0.08}s`,
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />
        <CardContent sx={{ p: { xs: 2, md: 3 }, textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <CountUp
            target={stat.target}
            suffix={stat.number.includes('km') ? ' km' : stat.number.includes('.') ? '+' : ''}
            delay={index * 0.06}
            shouldAnimate={countStarted}
          />
          <Typography variant="body2" sx={{ color: '#FFFFFF', mt: 1, fontSize: { xs: '0.8rem', md: '0.95rem' }, fontWeight: 600, lineHeight: 1.4 }}>
            {stat.label}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function Footer() {
  return (
    <Box
      sx={{
        position: 'relative',
        background: municipalGradients.secundario,
        color: '#FFFFFF',
        pt: { xs: 8, md: 12 },
        pb: { xs: 4, md: 6 },
        overflow: 'hidden',
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Syne:wght@600;700;800&display=swap"
        rel="stylesheet"
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url("/bg-texture.svg")',
          opacity: 0.05,
          pointerEvents: 'none',
        }}
      />
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <Grid container spacing={{ xs: 4, md: 6 }}>
          <Grid item xs={12}>
            <FooterSection title="Santa Rosa en números" delay={0} centered>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)', md: 'repeat(4, 1fr)' }, gap: { xs: 2, md: 3 }, alignItems: 'stretch' }}>
                {stats.map((stat, i) => (
                  <StatCard key={stat.label} stat={stat} index={i} />
                ))}
              </Box>
            </FooterSection>
          </Grid>

          <Grid item xs={12} md={4}>
            <FooterSection title="Información" delay={0.1}>
              <FooterLink href="/informacion/sobre-santa-rosa" delay={0.15}>Sobre Santa Rosa</FooterLink>
              <FooterLink href="/informacion/como-llegar" delay={0.18}>Cómo llegar</FooterLink>
              <FooterLink href="/informacion/mapas" delay={0.21}>Mapas y planos</FooterLink>
              <FooterLink href="/informacion/agencias" delay={0.24}>Agencias de viajes</FooterLink>
              <FooterLink href="/informacion/telefonos" delay={0.27}>Teléfonos útiles</FooterLink>
              <FooterLink href="/informacion/faq" delay={0.3}>Preguntas frecuentes</FooterLink>
              <FooterLink href="/informacion/contacto" delay={0.33}>Contacto</FooterLink>
            </FooterSection>
          </Grid>

          <Grid item xs={12} md={4}>
            <FooterSection title="Explorá" delay={0.2}>
              <FooterLink href="/eventos" delay={0.25}>Eventos</FooterLink>
              <FooterLink href="/hacer" delay={0.28}>Qué Hacer</FooterLink>
              <FooterLink href="/visitar" delay={0.31}>Qué Visitar</FooterLink>
              <FooterLink href="/informacion/galeria" delay={0.34}>Galería fotográfica</FooterLink>
            </FooterSection>
          </Grid>

          <Grid item xs={12} md={4}>
            <FooterSection title="Contacto" delay={0.3}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5, gap: 1, justifyContent: 'center' }}>
                <LocationIcon sx={{ color: municipalPalette.clay, fontSize: '1.2rem' }} />
                <Typography variant="body2" sx={{ color: 'rgba(248, 245, 243, 0.8)' }}>
                  Santa Rosa de Calamuchita, Córdoba
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5, gap: 1, justifyContent: 'center' }}>
                <PhoneIcon sx={{ color: municipalPalette.clay, fontSize: '1.2rem' }} />
                <Typography variant="body2" sx={{ color: 'rgba(248, 245, 243, 0.8)' }}>
                  +54 3541 123456
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5, gap: 1, justifyContent: 'center' }}>
                <EmailIcon sx={{ color: municipalPalette.clay, fontSize: '1.2rem' }} />
                <Typography variant="body2" sx={{ color: 'rgba(248, 245, 243, 0.8)' }}>
                  info@santarosa.gob.ar
                </Typography>
              </Box>
            </FooterSection>
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: { xs: 6, md: 8 },
            pt: 4,
            borderTop: '1px solid rgba(255, 255, 255, 0.15)',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" sx={{ color: 'rgba(248, 245, 243, 0.7)', fontSize: '0.85rem' }}>
            © {new Date().getFullYear()} Municipalidad de Santa Rosa de Calamuchita. Todos los derechos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}