import { Box, Typography, Container, Breadcrumbs, Link, Chip } from '@mui/material'
import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
import { hacerCategories, hacerCategoryGradients, type HacerItem } from '../data/hacerData'
import { SPRING_STANDARD, STAGGER_FAST, FADE_UP_CHILD } from '../config/animations'
import { municipalGradients, municipalPalette } from '../config/theme'
import Footer from '../components/Footer'

export default function HacerDetalle() {
  const { category } = useParams<{ category: string }>()

  const categoryData = hacerCategories.find((c: { name: string }) => c.name === category)

  if (!categoryData) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, mt: { xs: 8, sm: 10, md: 12 } }}>
        <Typography variant="h5" color="error">
          Categoría no encontrada
        </Typography>
      </Container>
    )
  }

  const gradient = hacerCategoryGradients[categoryData.label] || municipalGradients.ocean
  const items: HacerItem[] = categoryData.items

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          pt: { xs: 14, sm: 16, md: 18 },
          pb: { xs: 12, md: 18 },
          mb: { xs: 4, md: 6 },
          background: municipalGradients.secundario,
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
              <Link href="/hacer" underline="hover" sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem' }}>
                Qué Hacer
              </Link>
              <Typography sx={{ color: '#FFFFFF', fontSize: '0.85rem', fontWeight: 600 }}>
                {categoryData.label}
              </Typography>
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
              {categoryData.label}
            </Typography>
          </motion.div>

          {categoryData.description && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...SPRING_STANDARD, delay: 0.04 }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(248, 245, 243, 0.9)',
                  maxWidth: 700,
                  mx: 'auto',
                  lineHeight: 1.7,
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                }}
              >
                {categoryData.description}
              </Typography>
            </motion.div>
          )}
        </Container>
      </Box>

      <section style={{ padding: 'var(--spacing-xl) 0', background: 'var(--color-background)' }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={STAGGER_FAST}
          >
            {items.map((item: HacerItem, index: number) => {
              const isEven = index % 2 === 0

              return (
                <motion.div key={item.title} variants={FADE_UP_CHILD} transition={SPRING_STANDARD}>
                  <Box
                    sx={{
                      mb: { xs: 4, md: 6 },
                      position: 'relative',
                      borderRadius: 'var(--border-radius-lg)',
                      boxShadow: 'var(--shadow-md)',
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: isEven ? '3fr 2fr' : '2fr 3fr' },
                        borderRadius: 'var(--border-radius-lg)',
                        minHeight: { xs: 260, md: 320 },
                        backgroundColor: 'var(--color-surface)',
                      }}
                    >
                      <Box
                        sx={{
                          position: 'relative',
                          minWidth: 0,
                          background: gradient,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          p: { xs: 3, md: 4 },
                          ...(!isEven ? { order: { xs: 1, md: 2 } } : {}),
                        }}
                      >
                        <Box
                          sx={{
                            position: 'absolute',
                            inset: 0,
                            background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.12) 0%, transparent 70%)',
                          }}
                        />
                        <Box
                          sx={{
                            position: 'relative',
                            width: 80,
                            height: 80,
                            borderRadius: '50%',
                            background: 'rgba(255,255,255,0.85)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                          }}
                        >
                          <Typography
                            variant="h3"
                            sx={{
                              color: 'var(--color-text-primary)',
                              fontWeight: 800,
                              fontFamily: 'var(--font-display)',
                            }}
                          >
                            {item.title[0]}
                          </Typography>
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          p: { xs: 3, md: 4 },
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          backgroundColor: 'var(--color-surface)',
                          ...(isEven ? { order: { xs: 1, md: 2 } } : {}),
                        }}
                      >
                        {item.subcategory && (
                          <Chip
                            label={item.subcategory}
                            size="small"
                            sx={{
                              mb: 1,
                              backgroundColor: `rgba(${parseInt(municipalPalette.turquoise.slice(1, 3), 16)}, ${parseInt(municipalPalette.turquoise.slice(3, 5), 16)}, ${parseInt(municipalPalette.turquoise.slice(5, 7), 16)}, 0.1)`,
                              color: municipalPalette.teal,
                              fontWeight: 600,
                              fontSize: '0.75rem',
                              alignSelf: 'flex-start',
                            }}
                          />
                        )}
                        <Typography
                          variant="h5"
                          component="h3"
                          sx={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 700,
                            mb: 2,
                            color: 'var(--color-text-primary)',
                            fontSize: { xs: '1.4rem', md: '1.75rem' },
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'var(--color-text-secondary)',
                            lineHeight: 1.7,
                            mb: 3,
                          }}
                        >
                          {item.description}
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap', alignItems: 'center' }}>
                          {item.address && (
                            <Typography variant="body2" color="text.secondary">
                              <strong>📍 Dirección:</strong> {item.address}
                            </Typography>
                          )}
                          {item.phone && (
                            <Typography variant="body2" color="text.secondary">
                              <strong>📞 Teléfono:</strong> {item.phone}
                            </Typography>
                          )}
                          {item.hours && (
                            <Typography variant="body2" color="text.secondary">
                              <strong>⏰ Horarios:</strong> {item.hours}
                            </Typography>
                          )}
                        </Box>

                        <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap', mt: 1 }}>
                          {item.difficulty && (
                            <Chip label={`Dificultad: ${item.difficulty}`} size="small" variant="outlined" sx={{ fontSize: '0.75rem' }} />
                          )}
                          {item.duration && (
                            <Chip label={`Duración: ${item.duration}`} size="small" variant="outlined" sx={{ fontSize: '0.75rem' }} />
                          )}
                          {item.distance && (
                            <Chip label={`Distancia: ${item.distance}`} size="small" variant="outlined" sx={{ fontSize: '0.75rem' }} />
                          )}
                          {item.category === 'senderismo' && item.price && (
                            <Chip
                              label={`Precio: $${item.price}`}
                              size="small"
                              sx={{
                                backgroundColor: `rgba(${parseInt(municipalPalette.green.slice(1, 3), 16)}, ${parseInt(municipalPalette.green.slice(3, 5), 16)}, ${parseInt(municipalPalette.green.slice(5, 7), 16)}, 0.1)`,
                                color: municipalPalette.limeGreen,
                                fontSize: '0.75rem',
                              }}
                            />
                          )}
                        </Box>

                        {item.mapUrl && (
                          <Box sx={{ mt: 1.5 }}>
                            <Link href={item.mapUrl} target="_blank" rel="noopener noreferrer" underline="none">
                              <Chip
                                label="Ver en Google Maps"
                                size="small"
                                sx={{
                                  backgroundColor: 'var(--color-primary)1A',
                                  color: 'var(--color-primary)',
                                  cursor: 'pointer',
                                }}
                              />
                            </Link>
                          </Box>
                        )}
                      </Box>
                    </Box>
                  </Box>
                </motion.div>
              )
            })}
          </motion.div>
        </Container>
      </section>

      <Footer />
    </>
  )
}
