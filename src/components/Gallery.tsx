import { useState } from 'react'
import { Box, Modal, Typography, IconButton } from '@mui/material'
import { motion } from 'framer-motion'
import { SPRING_GENTLE, SPRING_STANDARD } from '../config/animations'

interface GalleryProps {
  images: string[]
  title?: string
  fullHeight?: boolean
}

export default function Gallery({ images, title = 'Galería', fullHeight = false }: GalleryProps) {
  const [selected, setSelected] = useState<number | null>(null)
  const validImages = images?.filter(Boolean) || []
  const displayImages = validImages.length > 0 ? validImages : ['/images/placeholder/default-gallery.svg']

  return (
    <>
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={SPRING_GENTLE}
        sx={{
          mb: 4,
          cursor: 'pointer',
          borderRadius: 2,
          overflow: 'hidden',
          position: 'relative',
          height: fullHeight ? { xs: 200, sm: 240, md: 280 } : { xs: 160, sm: 180, md: 200 },
          '&:hover': {
            '& .gallery-overlay': {
              opacity: 1,
            },
          },
        }}
        onClick={() => setSelected(0)}
      >
        <Box
          component="img"
          src={displayImages[0]}
          alt={title}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
        {displayImages.length > 1 && (
          <Box
            className="gallery-overlay"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              opacity: 0,
              transition: 'opacity 160ms cubic-bezier(0.23, 1, 0.32, 1)',
              zIndex: 1,
            }}
          >
            {displayImages.slice(0, Math.min(displayImages.length, 4)).map((img, idx) => (
              <Box
                key={idx}
                component="img"
                src={img}
                alt={`${title} ${idx + 1}`}
                sx={{
                  width: { xs: 40, sm: 56, md: 64 },
                  height: { xs: 40, sm: 56, md: 64 },
                  objectFit: 'cover',
                  borderRadius: 1,
                  border: '2px solid rgba(255, 255, 255, 0.8)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                  transition: 'transform 160ms cubic-bezier(0.23, 1, 0.32, 1)',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  },
                }}
              />
            ))}
            {displayImages.length > 4 && (
              <Typography
                variant="caption"
                sx={{
                  position: 'absolute',
                  bottom: 8,
                  right: 8,
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                }}
              >
                +{displayImages.length - 3} fotos
              </Typography>
            )}
          </Box>
        )}
        {displayImages.length > 1 && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 8,
              left: 8,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              px: 1,
              py: 0.25,
              borderRadius: 1,
              fontSize: '0.7rem',
              fontWeight: 600,
            }}
          >
            {displayImages.length} fotos
          </Box>
        )}
      </Box>

      <Modal
        open={selected !== null}
        onClose={() => setSelected(null)}
        closeAfterTransition
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={SPRING_STANDARD}
          style={{
            maxWidth: 900,
            width: '100%',
            maxHeight: '90vh',
            outline: 'none',
            position: 'relative',
          }}
        >
          {selected !== null && (
            <Box
              component="img"
              src={displayImages[selected]}
              alt={title}
              sx={{
                width: '100%',
                height: 'auto',
                maxHeight: '80vh',
                objectFit: 'contain',
                borderRadius: 1,
                display: 'block',
              }}
            />
          )}
          <IconButton
            onClick={() => setSelected(null)}
            sx={{
              position: 'absolute',
              top: -40,
              right: 0,
              color: 'white',
            }}
          >
            <Box
              component="span"
              sx={{
                fontSize: '1.5rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              ×
            </Box>
          </IconButton>
        </motion.div>
      </Modal>
    </>
  )
}
