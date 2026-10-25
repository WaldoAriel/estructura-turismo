import { Box, Typography, Container, Card, CardContent, Breadcrumbs, Link, Chip } from '@mui/material'
import { motion } from 'framer-motion'
import { Link as RouterLink, useParams } from 'react-router-dom'
import {
  visitarCategories,
  visitarCategoryGradients,
  visitarSubcategoryGradients,
  type HacerItem,
  type VisitSubcategory,
  type VisitCategory,
} from '../data/hacerData'
import { SPRING_STANDARD, STAGGER_FAST, FADE_UP_CHILD } from '../config/animations'
import { municipalGradients, municipalPalette } from '../config/theme'
import Gallery from '../components/Gallery'
import Footer from '../components/Footer'

export default function VisitarDetalle() {
  const { category, subcategory, item: itemParam } = useParams<{
    category: string
    subcategory: string
    item: string
  }>()

  const categoryData: VisitCategory | undefined = visitarCategories.find((c) => c.name === category)

  if (!categoryData) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, mt: { xs: 8, sm: 10, md: 12 } }}>
        <Typography variant="h5" color="error">
          Categoría no encontrada
        </Typography>
      </Container>
    )
  }

  const allItems: HacerItem[] = []
  if (categoryData.items) {
    allItems.push(...categoryData.items)
  }
  categoryData.subcategories?.forEach((sub) => {
    if (sub.items) {
      allItems.push(...sub.items)
    }
  })

  let singleItem: HacerItem | null = null
  let itemsToShow: HacerItem[] = []
  let currentLabel: string = categoryData.label
  let currentSubcategory: VisitSubcategory | undefined
  let breadcrumbs: { label: string; href?: string }[] = [
    { label: 'Inicio', href: '/' },
    { label: 'Qué Visitar', href: '/visitar' },
    { label: categoryData.label },
  ]

  const slugify = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[áàâäãå]/g, 'a')
      .replace(/[éèêë]/g, 'e')
      .replace(/[íìîï]/g, 'i')
      .replace(/[óòôöõ]/g, 'o')
      .replace(/[úùûü]/g, 'u')
      .replace(/ñ/g, 'n')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  const foundItemBySlug = (slug: string, items: HacerItem[]): HacerItem | undefined => {
    return items.find((i) => slugify(i.title) === slug)
  }

  const foundSubcategoryBySlug = (slug: string): VisitSubcategory | undefined => {
    return categoryData.subcategories?.find((s) => slugify(s.label) === slug)
  }

  const baseBreadcrumbs = [
    { label: 'Inicio', href: '/' },
    { label: 'Qué Visitar', href: '/visitar' },
    { label: categoryData.label, href: `/visitar/${categoryData.name}` },
  ]

  const resolveItem = (item: HacerItem) => {
    const catSub = categoryData.subcategories?.find((s) => s.items?.some((i) => i.title === item.title))
    breadcrumbs = [...baseBreadcrumbs]
    if (catSub) {
      breadcrumbs.push({ label: catSub.label, href: `/visitar/${categoryData.name}/${slugify(catSub.label)}` })
      currentSubcategory = catSub
    }
    if (item.children && item.children.length > 0) {
      itemsToShow = item.children
      currentLabel = item.title
      singleItem = item
      breadcrumbs.push({ label: item.title })
    } else {
      singleItem = item
      itemsToShow = [item]
      breadcrumbs.push({ label: item.title })
      currentLabel = item.title
    }
  }

  const resolveSubcategory = (sub: VisitSubcategory) => {
    itemsToShow = sub.items || []
    currentLabel = sub.label
    currentSubcategory = sub
    breadcrumbs = [...baseBreadcrumbs, { label: sub.label }]
  }

  const paramToResolve = itemParam || subcategory
  const slugToResolve: string | undefined = paramToResolve

  if (slugToResolve) {
    const resolvedItem = foundItemBySlug(slugToResolve, allItems)
    const resolvedSub = foundSubcategoryBySlug(slugToResolve)
    if (resolvedItem) {
      resolveItem(resolvedItem)
    } else if (resolvedSub) {
      resolveSubcategory(resolvedSub)
    }
  } else {
    itemsToShow = allItems
  }

  const baseGradient = visitarCategoryGradients[categoryData.label] || municipalGradients.ocean
  const subGradient = visitarSubcategoryGradients[currentLabel as string]
  const gradient = subGradient || baseGradient

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          pt: { xs: 14, sm: 16, md: 18 },
          pb: { xs: 12, md: 18 },
          mb: { xs: 4, md: 6 },
          background: municipalGradients.principal,
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
              {breadcrumbs.map((bc, idx) =>
                bc.href ? (
                  <Link key={idx} href={bc.href} underline="hover" sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem' }}>
                    {bc.label}
                  </Link>
                ) : (
                  <Typography key={idx} sx={{ color: '#FFFFFF', fontSize: '0.85rem', fontWeight: 600 }}>
                    {bc.label}
                  </Typography>
                )
              )}
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
              {currentLabel}
              <Box component="span" sx={{ display: 'block', color: '#E29578' }}>
                {categoryData.label}
              </Box>
            </Typography>
          </motion.div>

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
              {(() => {
                const desc: string = categoryData.description
                const item = singleItem as HacerItem | null
                if (item && item.description) {
                  return item.description
                }
                const sub = currentSubcategory as VisitSubcategory | undefined
                if (sub && sub.description) {
                  return sub.description
                }
                return desc
              })()}
            </Typography>
          </motion.div>
        </Container>
      </Box>

      <section style={{ padding: 'var(--spacing-xl) 0', background: 'var(--color-background)' }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
          {!subcategory && !itemParam && categoryData.subcategories && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...SPRING_STANDARD, delay: 0.06 }}
            >
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center', mb: 6 }}>
                {categoryData.subcategories.map((sub) => (
                  <Chip
                    key={sub.name}
                    label={sub.label}
                    clickable
                    component="a"
                    href={`/visitar/${categoryData.name}/${slugify(sub.label)}`}
                    sx={{
                      backgroundColor: 'rgba(58, 171, 181, 0.1)',
                      color: 'var(--color-primary-dark)',
                      fontWeight: 600,
                      border: '1px solid rgba(58, 171, 181, 0.3)',
                    }}
                  />
                ))}
              </Box>
            </motion.div>
          )}

          <motion.div
            initial="hidden"
            animate="visible"
            variants={STAGGER_FAST}
          >
            {itemsToShow.map((item: HacerItem, index: number) => {
              const isChildItem = item.children && singleItem?.children !== item.children
              const isSingle = singleItem && !singleItem.children?.length
              const isEven = index % 2 === 0

              if (isChildItem) {
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
                           border: '1px solid var(--color-border)',
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
                              maxWidth: { md: 320 },
                            }}
                          >
                            {item.description}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap', alignItems: 'center' }}>
                            <Chip
                              label={`+${item.children!.length} lugares`}
                              size="small"
                              sx={{
                                backgroundColor: `rgba(${parseInt(municipalPalette.orange.slice(1, 3), 16)}, ${parseInt(municipalPalette.orange.slice(3, 5), 16)}, ${parseInt(municipalPalette.orange.slice(5, 7), 16)}, 0.1)`,
                                color: municipalPalette.amber,
                                fontWeight: 600,
                                fontSize: '0.75rem',
                              }}
                            />
                            <Link
                              component={RouterLink}
                              to={`/visitar/${categoryData.name}/${slugify(currentSubcategory?.label || categoryData.label)}/${slugify(item.title)}`}
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
                              Ver lugares →
                            </Link>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </motion.div>
                )
              }

              if (isSingle) {
                return (
                  <motion.div key={item.title} variants={FADE_UP_CHILD} transition={SPRING_STANDARD}>
                    <Card
                      sx={{
                        mb: { xs: 4, md: 6 },
                        boxShadow: 'var(--shadow-md)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--border-radius-lg)',
                      }}
                    >
                      {item.gallery && item.gallery.length > 0 ? (
                        <Gallery images={item.gallery} title={item.title} fullHeight />
                      ) : (
                        <Box
                          sx={{
                            height: { xs: 200, sm: 260, md: 320 },
                            width: '100%',
                            background: gradient,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                          }}
                        >
                          <Box
                            sx={{
                              position: 'absolute',
                              inset: 0,
                              background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.15) 0%, transparent 70%)',
                            }}
                          />
                          <Typography
                            variant="h2"
                            sx={{
                              color: 'var(--color-text-primary)',
                              fontWeight: 800,
                              fontFamily: 'var(--font-display)',
                              position: 'relative',
                            }}
                          >
                            {item.title}
                          </Typography>
                        </Box>
                      )}
                      <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                        <Typography variant="h5" component="h2" sx={{ fontFamily: 'var(--font-display)', fontWeight: 700, mb: 2, color: 'var(--color-text-primary)', fontSize: { xs: '1.5rem', md: '2rem' } }}>
                          {item.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, mb: 3, maxWidth: 800 }}>
                          {item.description}
                        </Typography>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
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
                          {item.web && (
                            <Typography variant="body2" color="text.secondary">
                              <strong>🌐 Web:</strong> {item.web}
                            </Typography>
                          )}
                          {item.hours && (
                            <Typography variant="body2" color="text.secondary">
                              <strong>⏰ Horarios:</strong> {item.hours}
                            </Typography>
                          )}
                          {item.recommendations && (
                            <Typography variant="body2" color="text.secondary">
                              <strong>⚠️ </strong> {item.recommendations}
                            </Typography>
                          )}
                        </Box>

                        <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap', mb: 2 }}>
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
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              }

              return (
                <motion.div key={item.title} variants={FADE_UP_CHILD} transition={SPRING_STANDARD}>
                  <Box
                    sx={{
                      mb: { xs: 4, md: 6 },
                      position: 'relative',
                      borderRadius: 'var(--border-radius-lg)',
                      overflow: 'hidden',
                      boxShadow: 'var(--shadow-md)',
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: isEven ? '3fr 2fr' : '2fr 3fr' },
                           borderRadius: 'var(--border-radius-lg)',
                           overflow: 'hidden',
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
