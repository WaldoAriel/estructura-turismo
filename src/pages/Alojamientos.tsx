import { useState } from 'react'
import { Box, Typography, Container, TextField, Pagination, Chip, Stack } from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'
import { motion } from 'framer-motion'
import { alojamientos, alojamientoCATEGORIES, getCountByCategory, searchAlojamientos, introText } from '../data/alojamientosData'
import EstablecimientoCard from '../components/EstablecimientoCard'
import { FADE_UP_CHILD, SPRING_STANDARD, STAGGER_FAST } from '../config/animations'
import { municipalGradients, municipalPalette } from '../config/theme'
import Footer from '../components/Footer'

const PER_PAGE = 12

const alojamientoCategoryColors: Record<string, string> = {
  hotel: municipalPalette.turquoise,
  aparthotel: municipalPalette.teal,
  posada: municipalPalette.limeGreen,
  hostería: municipalPalette.green,
  hospedaje: municipalPalette.amber,
  hostel: municipalPalette.orange,
  residencial: municipalPalette.clay,
  departamento: '#7C4DFF',
  cabaña: municipalPalette.green,
  'apart cabaña': '#00BCD4',
  'complejo de cabañas': '#4CAF50',
  colonia: '#8BC34A',
  camping: '#FF9800',
  'casa de alquiler': '#E91E63',
  casa: '#9C27B0',
  'agencias de viajes': '#607D8B',
}

export default function Alojamientos() {
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  const filtered = query.trim().length >= 2
    ? searchAlojamientos(query).filter((a) => !selectedCategory || a.categoria === selectedCategory)
    : selectedCategory
      ? alojamientos.filter((a) => a.categoria === selectedCategory)
      : alojamientos
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const pageItems = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const handleQueryChange = (val: string) => {
    setQuery(val)
    setPage(1)
  }

  const handleCategoryClick = (key: string) => {
    setSelectedCategory((prev) => (prev === key ? null : key))
    setPage(1)
  }

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          pt: { xs: 14, sm: 16, md: 18 },
          pb: { xs: 12, md: 18 },
          mb: { xs: 4, md: 6 },
          background: municipalGradients.ocean,
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
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={SPRING_STANDARD}>
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
              Alojamientos
              <Box component="span" sx={{ display: 'block', color: 'rgba(255,255,255,0.9)' }}>
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
          <motion.div initial="hidden" animate="visible" variants={STAGGER_FAST}>
            <motion.div variants={FADE_UP_CHILD} transition={SPRING_STANDARD}>
              <Box sx={{ mb: 5, maxWidth: 640, mx: 'auto', textAlign: 'center' }}>
                <TextField
                  placeholder="Buscá alojamientos por nombre, dirección o teléfono..."
                  value={query}
                  onChange={(e) => handleQueryChange(e.target.value)}
                  fullWidth
                  size="medium"
                  sx={{
                    mb: 2,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 14,
                      backgroundColor: '#FFFFFF',
                      boxShadow: 'var(--shadow-md)',
                      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--color-primary)' },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderWidth: 2, borderColor: 'var(--color-primary)' },
                    },
                  }}
                  InputProps={{ startAdornment: <SearchIcon sx={{ color: 'var(--color-text-secondary)', mr: 1 }} /> }}
                />
                <Typography variant="body2" color="text.secondary">
                  {filtered.length} {filtered.length === 1 ? 'alojamiento encontrado' : 'alojamientos encontrados'}
                </Typography>
              </Box>
            </motion.div>

            <motion.div variants={FADE_UP_CHILD} transition={SPRING_STANDARD}>
              <Stack direction="row" gap={1} flexWrap="wrap" justifyContent="center" sx={{ mb: 5 }}>
                {alojamientoCATEGORIES.map((cat) => {
                  const color = alojamientoCategoryColors[cat.key] || municipalPalette.turquoise
                  const isActive = selectedCategory === cat.key
                  return (
                    <Chip
                      key={cat.key}
                      label={`${cat.icon} ${cat.label} (${getCountByCategory(cat.key)})`}
                      size="small"
                      onClick={() => handleCategoryClick(cat.key)}
                      sx={{
                        backgroundColor: isActive ? color : `${color}20`,
                        color: isActive ? '#FFFFFF' : color,
                        border: `1.5px solid ${color}`,
                        fontWeight: 700,
                        fontSize: '0.78rem',
                        cursor: 'pointer',
                        transition: 'all 160ms cubic-bezier(0.23, 1, 0.32, 1)',
                        '&:hover': {
                          backgroundColor: color,
                          color: '#FFFFFF',
                          transform: 'translateY(-1px)',
                        },
                      }}
                    />
                  )
                })}
              </Stack>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={STAGGER_FAST}
              key={page}
            >
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)',
                    lg: 'repeat(4, 1fr)',
                  },
                  gap: { xs: 2, md: 2.5 },
                }}
              >
                {pageItems.map((item) => (
                  <EstablecimientoCard key={item.id} item={item} guideType="alojamientos" />
                ))}
              </Box>
            </motion.div>

            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(_, p) => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                  color="primary"
                  sx={{ '& .MuiPaginationItem-root': { borderRadius: 10, fontWeight: 600 } }}
                />
              </Box>
            )}
          </motion.div>
        </Container>
      </section>

      <Footer />
    </>
  )
}