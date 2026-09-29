import { Box, Typography, Container, Link, Chip } from '@mui/material'
import { motion } from 'framer-motion'
import { Link as RouterLink } from 'react-router-dom'
import { introText, hacerCategories, hacerCategoryGradients } from '../data/hacerData'
import { SPRING_STANDARD, STAGGER_FAST, FADE_UP_CHILD } from '../config/animations'

export default function Hacer() {
  return (
    <>
      <Box
        sx={{
          position: 'relative',
          pt: { xs: 14, sm: 16, md: 18 },
          pb: { xs: 12, md: 18 },
          mb: { xs: 4, md: 6 },
          background: 'linear-gradient(135deg, #7B4C9E 0%, #9A6EDC 50%, #3AABB5 100%)',
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
              Qué Hacer
              <Box component="span" sx={{ display: 'block', color: '#E29578' }}>
                en Santa Rosa
              </Box>
            </Typography>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SPRING_STANDARD, delay: 0.02 }}
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
              {introText}
            </Typography>
          </motion.div>
        </Container>
      </Box>

      <section style={{ padding: 'var(--spacing-xl) 0', background: 'var(--color-background)' }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={STAGGER_FAST}
          >
            {hacerCategories.map((category, index) => {
              const categoryGradient = hacerCategoryGradients[category.label] || 'linear-gradient(135deg, #e0e0e0, #bdbdbd)'
              const itemCount = category.items?.length || 0
              const isEven = index % 2 === 0

              return (
                <motion.div key={category.name} variants={FADE_UP_CHILD} transition={SPRING_STANDARD}>
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
                          background: categoryGradient,
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
                            {category.label[0]}
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
                          {category.label}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'var(--color-text-secondary)',
                            lineHeight: 1.7,
                            mb: 3,
                          }}
                        >
                          {category.description}
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap', alignItems: 'center' }}>
                          <Chip
                            label={`${itemCount} ${itemCount === 1 ? 'actividad' : 'actividades'}`}
                            size="small"
                            sx={{
                              backgroundColor: 'rgba(58, 171, 181, 0.1)',
                              color: 'var(--color-primary-dark)',
                              fontWeight: 600,
                              fontSize: '0.75rem',
                              border: '1px solid rgba(58, 171, 181, 0.3)',
                            }}
                          />
                          <Link
                            component={RouterLink}
                            to={`/hacer/${category.name}`}
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
                            Ver actividades →
                          </Link>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </motion.div>
              )
            })}
          </motion.div>
        </Container>
      </section>
    </>
  )
}
