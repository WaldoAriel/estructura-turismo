import { Box, Typography, Container, Card, CardContent, Breadcrumbs, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
import { infoPages, sobreSantaRosaContent, contactInfo, usefulPhones, distancesFromSantaRosa, distancesToNearby, travelGuides, travelAgencies, busInfo, flightInfo, faqs } from '../data/infoData'
import { SPRING_STANDARD, STAGGER_FAST } from '../config/animations'
import Gallery from '../components/Gallery'

const pageImages: Record<string, string[]> = {
  'sobre-santa-rosa': ['/images/placeholder/santarosa.svg', '/images/placeholder/santarosa.svg', '/images/placeholder/santarosa.svg'],
  'como-llegar': ['/images/placeholder/como-llegar.svg'],
  'mapas': ['/images/placeholder/mapa.svg'],
  'agencias': ['/images/placeholder/agencias.svg'],
  'telefonos': ['/images/placeholder/telefonos.svg'],
  'galeria': ['/images/placeholder/santarosa.svg', '/images/placeholder/santarosa.svg'],
  'contacto': ['/images/placeholder/contacto.svg'],
}

export default function Informacion() {
  const { page } = useParams<{ page: string }>()
  const currentKey = page || 'sobre-santa-rosa'
  const currentPage = infoPages.find((p) => p.key === currentKey)

  if (!currentPage) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, mt: { xs: 8, sm: 10, md: 12 } }}>
        <Typography variant="h5" color="error">
          Página no encontrada
        </Typography>
      </Container>
    )
  }

  const images = pageImages[currentKey] || ['/images/placeholder/default-gallery.svg']

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          pt: { xs: 14, sm: 16, md: 18 },
          pb: { xs: 12, md: 18 },
          mb: { xs: 4, md: 6 },
          background: 'linear-gradient(135deg, #3AABB5 0%, #0A4D4C 50%, #7B4C9E 100%)',
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
              <Link href="/" underline="hover" sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem' }}>
                Inicio
              </Link>
              <Typography sx={{ color: '#FFFFFF', fontSize: '0.85rem', fontWeight: 600 }}>Información</Typography>
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
              {currentPage.title}
              <Box component="span" sx={{ display: 'block', color: '#E29578', fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' } }}>
                {currentPage.intro.split(' ').slice(0, 5).join(' ')}
              </Box>
            </Typography>
          </motion.div>
        </Container>
      </Box>

      <section style={{ padding: 'var(--spacing-xl) 0', background: 'var(--color-background)' }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
          {currentKey === 'sobre-santa-rosa' && (
            <>
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={SPRING_STANDARD}>
                <Gallery images={images} title={currentPage.title} fullHeight />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ ...SPRING_STANDARD, delay: 0.05 }}>
                <Box sx={{ mt: 4, mb: 4 }}>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, fontSize: '1.05rem', maxWidth: 900, mx: 'auto' }}>
                    {sobreSantaRosaContent.intro}
                  </Typography>
                </Box>
              </motion.div>
              <motion.div initial="hidden" animate="visible" variants={STAGGER_FAST}>
                <Box sx={{ display: 'grid', gap: 4, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
                  <Card sx={{ boxShadow: 'var(--shadow-md)', border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius-lg)', overflow: 'hidden' }}>
                    <Box sx={{ height: 200, width: '100%', background: 'linear-gradient(135deg, #a5d6a7, #388e3c)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Typography variant="h5" sx={{ color: '#FFFFFF', fontFamily: 'var(--font-display)', fontWeight: 700 }}>{sobreSantaRosaContent.citySection.title}</Typography>
                    </Box>
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                        {sobreSantaRosaContent.citySection.content}
                      </Typography>
                    </CardContent>
                  </Card>
                  <Card sx={{ boxShadow: 'var(--shadow-md)', border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius-lg)', overflow: 'hidden' }}>
                    <Box sx={{ height: 200, width: '100%', background: 'linear-gradient(135deg, #ffcc80, #ef6c00)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Typography variant="h5" sx={{ color: '#FFFFFF', fontFamily: 'var(--font-display)', fontWeight: 700 }}>{sobreSantaRosaContent.historySection.title}</Typography>
                    </Box>
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, fontStyle: 'italic', mb: 2 }}>
                        {sobreSantaRosaContent.historySection.subtitle}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                        {sobreSantaRosaContent.historySection.content}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              </motion.div>
            </>
          )}

          {currentKey === 'como-llegar' && (
            <>
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={SPRING_STANDARD}>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7, mb: 4, maxWidth: 900, mx: 'auto' }}>
                  Santa Rosa de Calamuchita se encuentra a 96 km de la ciudad de Córdoba, en el corazón del Valle de Calamuchita. La localidad es accesible por la ruta nacional 15, que conecta con la ruta nacional 9 en la localidad de Córdoba.
                </Typography>
              </motion.div>
              <motion.div initial="hidden" animate="visible" variants={STAGGER_FAST}>
                <Typography variant="h5" component="h2" sx={{ fontFamily: 'var(--font-display)', fontWeight: 700, mb: 3, textAlign: 'center', color: 'var(--color-text-primary)' }}>
                  Cómo llegar por carretera
                </Typography>
                <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' } }}>
                  {travelGuides.map((guide) => (
                    <Card key={guide.from} sx={{ boxShadow: 'var(--shadow-md)', border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius-lg)', overflow: 'hidden' }}>
                      <CardContent sx={{ p: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5, color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}>Desde {guide.from}</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>{guide.content}</Typography>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              </motion.div>
              <motion.div initial="hidden" animate="visible" variants={STAGGER_FAST} style={{ marginTop: '3rem' }}>
                <Typography variant="h5" component="h2" sx={{ fontFamily: 'var(--font-display)', fontWeight: 700, mb: 3, textAlign: 'center', color: 'var(--color-text-primary)' }}>{busInfo.title}</Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3, textAlign: 'center', maxWidth: 900, mx: 'auto' }}>{busInfo.intro}</Typography>
                <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' } }}>
                  {[
                    { label: 'Desde Córdoba', items: busInfo.fromCordoba },
                    { label: 'Desde Villa María', items: busInfo.fromVillaMaria },
                    { label: 'Desde Río IV', items: busInfo.fromRioIV },
                    { label: 'Desde Buenos Aires', items: busInfo.fromBuenosAires },
                    { label: 'Desde Rosario', items: busInfo.fromRosario },
                  ].map((section) => (
                    <Card key={section.label} sx={{ boxShadow: 'var(--shadow-md)', border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius-lg)', overflow: 'hidden' }}>
                      <CardContent sx={{ p: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}>{section.label}</Typography>
                        {section.items.map((item: { label: string; phone: string; web: string }) => (
                          <Box key={item.label} sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'var(--color-primary-dark)' }}>{item.label}</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>📞 {item.phone}</Typography>
                            {item.web && <Link href={`https://${item.web.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer" underline="hover" sx={{ fontSize: '0.8rem' }}>🌐 {item.web}</Link>}
                          </Box>
                        ))}
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              </motion.div>
              <motion.div initial="hidden" animate="visible" variants={STAGGER_FAST} style={{ marginTop: '3rem' }}>
                <Typography variant="h5" component="h2" sx={{ fontFamily: 'var(--font-display)', fontWeight: 700, mb: 3, textAlign: 'center', color: 'var(--color-text-primary)' }}>{flightInfo.title}</Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3, textAlign: 'center', maxWidth: 900, mx: 'auto' }}>{flightInfo.intro}</Typography>
                <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' } }}>
                  {[flightInfo.cordobaAirport, flightInfo.rioIVAirport].map((airport) => (
                    <Card key={airport.label} sx={{ boxShadow: 'var(--shadow-md)', border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius-lg)', overflow: 'hidden' }}>
                      <CardContent sx={{ p: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5, color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}>{airport.label}</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>{airport.content}</Typography>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              </motion.div>
              <motion.div initial="hidden" animate="visible" variants={STAGGER_FAST} style={{ marginTop: '3rem' }}>
                <Typography variant="h5" component="h2" sx={{ fontFamily: 'var(--font-display)', fontWeight: 700, mb: 3, textAlign: 'center', color: 'var(--color-text-primary)' }}>Distancias a ciudades cercanas</Typography>
                <TableContainer component={Paper} sx={{ boxShadow: 'var(--shadow-md)', border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius-lg)', overflow: 'hidden' }}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ background: 'var(--color-surface-alt)' }}>
                        <TableCell sx={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>Localidad</TableCell>
                        <TableCell align="right" sx={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>Distancia (km)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {distancesToNearby.map((item) => (
                        <TableRow key={item.city}>
                          <TableCell>{item.city}</TableCell>
                          <TableCell align="right">{item.distance}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </motion.div>
              <motion.div initial="hidden" animate="visible" variants={STAGGER_FAST} style={{ marginTop: '3rem' }}>
                <Typography variant="h5" component="h2" sx={{ fontFamily: 'var(--font-display)', fontWeight: 700, mb: 3, textAlign: 'center', color: 'var(--color-text-primary)' }}>Distancias desde otras ciudades del país</Typography>
                <TableContainer component={Paper} sx={{ boxShadow: 'var(--shadow-md)', border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius-lg)', overflow: 'hidden' }}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ background: 'var(--color-surface-alt)' }}>
                        <TableCell sx={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>Ciudad</TableCell>
                        <TableCell align="right" sx={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>Distancia (km)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {distancesFromSantaRosa.map((item) => (
                        <TableRow key={item.city}>
                          <TableCell>{item.city}</TableCell>
                          <TableCell align="right">{item.distance}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </motion.div>
            </>
          )}

          {currentKey === 'agencias' && (
            <motion.div initial="hidden" animate="visible" variants={STAGGER_FAST}>
              <Gallery images={images} title={currentPage.title} fullHeight />
              <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' } }}>
                {travelAgencies.map((agency) => (
                  <Card key={agency.name} sx={{ boxShadow: 'var(--shadow-md)', border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius-lg)', overflow: 'hidden' }}>
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5, color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}>{agency.name}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, mb: 1 }}><strong>📞 Teléfono:</strong> {agency.phone}</Typography>
                      {agency.web && <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}><strong>🌐 Web:</strong> {agency.web}</Typography>}
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </motion.div>
          )}

          {currentKey === 'telefonos' && (
            <motion.div initial="hidden" animate="visible" variants={STAGGER_FAST}>
              <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' } }}>
                {usefulPhones.map((phone) => (
                  <Card key={phone.label} sx={{ boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius-lg)', overflow: 'hidden' }}>
                    <CardContent sx={{ p: 2 }}>
                      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>{phone.label}</Typography>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: 'var(--color-primary-dark)' }}>{phone.number}</Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </motion.div>
          )}

          {currentKey === 'faq' && (
            <motion.div initial="hidden" animate="visible" variants={STAGGER_FAST}>
              <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
                {faqs.map((faq) => (
                  <Card key={faq.question} sx={{ boxShadow: 'var(--shadow-md)', border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius-lg)', overflow: 'hidden' }}>
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5, color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}>{faq.question}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, whiteSpace: 'pre-line' }}>{faq.answer}</Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </motion.div>
          )}

          {currentKey === 'contacto' && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={SPRING_STANDARD}>
              <Box sx={{ display: 'grid', gap: 4, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
                <Box>
                  <Gallery images={images} title={currentPage.title} fullHeight />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Card sx={{ boxShadow: 'var(--shadow-md)', border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius-lg)', overflow: 'hidden' }}>
                    <CardContent sx={{ p: 4 }}>
                      <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}><strong>📍 Dirección:</strong> {contactInfo.address}</Typography>
                      <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}><strong>📞 Teléfono:</strong> {contactInfo.phone}</Typography>
                      <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}><strong>🌐 Email:</strong> {contactInfo.email}</Typography>
                      <Typography variant="body1" sx={{ lineHeight: 1.8 }}><strong>⏰ Horarios:</strong> {contactInfo.schedule}</Typography>
                    </CardContent>
                  </Card>
                </Box>
              </Box>
            </motion.div>
          )}

          {(currentKey === 'mapas' || currentKey === 'galeria') && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={SPRING_STANDARD}>
              <Gallery images={images} title={currentPage.title} fullHeight />
            </motion.div>
          )}
        </Container>
      </section>
    </>
  )
}
