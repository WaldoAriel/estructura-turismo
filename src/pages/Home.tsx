import { Box, Typography, Container } from '@mui/material'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <Box sx={{ position: 'relative', height: '100vh', width: '100%', overflow: 'hidden' }}>
      <Box
        component="video"
        src="/videos/sta-rosa-bg.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        sx={{ zIndex: 0, pointerEvents: 'none' }}
      />
      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 1,
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.175, 0.1, 0.25, 1] }}
          style={{
            flex: 1,
            paddingRight: 'clamp(1rem, 4vw, 4rem)',
            textAlign: 'center',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.175, 0.1, 0.25, 1], delay: 0.1 }}
          >
            <Typography
              variant="h3"
              component="h1"
              sx={{
                color: '#ffffff',
                fontWeight: 700,
                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                mb: 2,
                textShadow: '0 2px 8px rgba(0,0,0,0.4)',
              }}
            >
              Bienvenido a Santa Rosa de Calamuchita
            </Typography>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.175, 0.1, 0.25, 1], delay: 0.2 }}
          >
            <Typography
              variant="h6"
              color="#ffffff"
              sx={{
                fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' },
                textShadow: '0 1px 4px rgba(0,0,0,0.3)',
              }}
            >
              Tu destino turístico favorito en la provincia de Córdoba
            </Typography>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.175, 0.1, 0.25, 1], delay: 0.3 }}
          style={{
            display: 'none',
          }}
        >
          <Box
            component="img"
            src="/mapa.ubi.svg"
            alt="Mapa de Córdoba señalando Santa Rosa de Calamuchita"
            sx={{
              display: { xs: 'none', md: 'block' },
              position: 'absolute',
              right: { md: '5%' },
              top: '50%',
              transform: 'translateY(-50%)',
              height: '52.5vh',
              maxWidth: '30%',
              opacity: 0.85,
              zIndex: 1,
            }}
          />
        </motion.div>
      </Container>
    </Box>
  )
}
