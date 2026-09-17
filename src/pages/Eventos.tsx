import { Box, Typography, Container, Grid, Card, CardContent, CardActionArea, Breadcrumbs, Link } from '@mui/material'
import { motion } from 'framer-motion'
import { eventosItems } from '../components/Header/menuData'

const seasonGradient: Record<string, string> = {
  'Verano': 'linear-gradient(135deg, #fff9c4, #ffeb3b)',
  'Otoño': 'linear-gradient(135deg, #ffe082, #ff9800)',
  'Invierno': 'linear-gradient(135deg, #bbdefb, #2196f3)',
  'Primavera': 'linear-gradient(135deg, #c8e6c9, #4caf50)',
}

export default function Eventos() {
  return (
    <Container maxWidth="lg" sx={{ py: 4, mt: { xs: 8, sm: 10, md: 12 } }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
          <Link href="/" underline="hover" color="inherit" sx={{ cursor: 'pointer' }}>
            Inicio
          </Link>
          <Typography color="text.primary">Eventos</Typography>
        </Breadcrumbs>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
      >
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 4, textAlign: 'center' }}>
          Eventos por Estación
        </Typography>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.15,
              delayChildren: 0.2,
            },
          },
        }}
      >
        <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
          {eventosItems.map((item) => (
            <motion.div
              key={item.label}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              whileHover={{ scale: 1.02 }}
            >
              <Grid item xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: '100%',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    border: '1px solid #e2e8f0',
                    overflow: 'hidden',
                    transition: 'box-shadow 0.2s ease',
                    '&:hover': {
                      boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                    },
                  }}
                >
                  <CardActionArea
                    component="a"
                    href={item.href || '#'}
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
                  >
                    <Box
                      sx={{
                        width: '100%',
                        height: { xs: 100, sm: 120, md: 140 },
                        background: seasonGradient[item.label] || '#e2e8f0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 700,
                          color: '#1a202c',
                          fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.75rem' },
                        }}
                      >
                        {item.label}
                      </Typography>
                    </Box>
                    <CardContent sx={{ flexGrow: 1, width: '100%' }}>
                      <Typography variant="h6" component="h2" sx={{ fontWeight: 600, mb: 1 }}>
                        {item.label}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Descubrí los eventos y actividades más destacadas de {item.label.toLowerCase()} en Santa Rosa de Calamuchita.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            </motion.div>
          ))}
        </Grid>
      </motion.div>
    </Container>
  )
}
