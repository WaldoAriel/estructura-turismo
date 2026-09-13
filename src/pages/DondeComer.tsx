import { Box, Typography, Container, Grid, Card, CardContent, CardActionArea, Breadcrumbs, Link } from '@mui/material'
import { dondeComerItems } from '../components/Header/menuData'

export default function DondeComer() {
  return (
    <Container maxWidth="lg" sx={{ py: 4, mt: { xs: 8, sm: 10, md: 12 } }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
        <Link href="/" underline="hover" color="inherit" sx={{ cursor: 'pointer' }}>
          Inicio
        </Link>
        <Typography color="text.primary">Dónde Comer</Typography>
      </Breadcrumbs>

      <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 4, textAlign: 'center' }}>
        Dónde Comer en Santa Rosa de Calamuchita
      </Typography>

      <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
        {dondeComerItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.label}>
            <Card sx={{ height: '100%', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0' }}>
              <CardActionArea component="a" href={item.href || '#'} sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
<Box
                sx={{
                  width: '100%',
                  height: { xs: 100, sm: 120, md: 140 },
                  backgroundColor: '#e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                  <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 600 }}>
                    {item.label}
                  </Typography>
                </Box>
                <CardContent sx={{ flexGrow: 1, width: '100%' }}>
                  <Typography variant="h6" component="h2" sx={{ fontWeight: 600, mb: 1 }}>
                    {item.label}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Explorá las mejores opciones de {item.label.toLowerCase()} en Santa Rosa de Calamuchita.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
