import { Box, Typography, Container } from '@mui/material'

export default function Home() {
  return (
    <Box sx={{ position: 'relative', height: '100vh', width: '100%', overflow: 'hidden' }}>
      <Box
        component="video"
        src="/videos/santa-rosa-bg.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        sx={{ zIndex: 0, pointerEvents: 'none' }}
      />
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: { xs: 3, sm: 4, md: 8 }, mt: { xs: 2, sm: 4, md: 8 } }}>
        <Box sx={{ textAlign: 'center', mb: { xs: 4, sm: 6 } }}>
          <Typography variant="h3" component="h1" sx={{ color: '#ffffff', fontWeight: 700, fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }, mb: 2 }}>
            Bienvenido a Santa Rosa de Calamuchita
          </Typography>
          <Typography variant="h6" color="#ffffff" sx={{ fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' } }}>
            Tu destino turístico favorito en la provincia de Córdoba
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}
