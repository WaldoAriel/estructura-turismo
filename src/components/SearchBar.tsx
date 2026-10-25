import { useState, useEffect, useRef } from 'react'
import { Box, TextField, InputAdornment, List, ListItem, ListItemText, Typography, Paper, ClickAwayListener } from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import SearchIcon from '@mui/icons-material/Search'
import { Link as RouterLink } from 'react-router-dom'
import { municipalPalette } from '../config/theme'

export interface SearchItem {
  id: string
  title: string
  description: string
  type: 'hacer' | 'evento' | 'informacion'
  url: string
  category?: string
}

export interface SearchBarProps {
  items: SearchItem[]
  placeholder?: string
}

export default function SearchBar({ items, placeholder = 'Buscar actividades, eventos, lugares...' }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([])
      setIsOpen(false)
      return
    }

    const q = query.toLowerCase().trim()
    const filtered = items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
    )

    setResults(filtered.slice(0, 8))
    setIsOpen(filtered.length > 0)
  }, [query, items])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false)
      inputRef.current?.blur()
    }
  }

  const typeLabels: Record<string, string> = {
    hacer: 'Qué Hacer',
    evento: 'Eventos',
    informacion: 'Información',
  }

  const typeColors: Record<string, string> = {
    hacer: municipalPalette.turquoise,
    evento: municipalPalette.orange,
    informacion: municipalPalette.teal,
  }

  const grouped = results.reduce<Record<string, SearchItem[]>>((acc, item) => {
    if (!acc[item.type]) acc[item.type] = []
    acc[item.type].push(item)
    return acc
  }, {})

  return (
    <Box sx={{ position: 'relative', width: '100%', maxWidth: 700, mx: 'auto' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        <ClickAwayListener onClickAway={() => setIsOpen(false)}>
          <Box sx={{ position: 'relative' }}>
            <TextField
              inputRef={inputRef}
              fullWidth
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              onFocus={() => query.trim().length >= 2 && results.length > 0 && setIsOpen(true)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(2px) saturate(100%)',
                  WebkitBackdropFilter: 'blur(4px) saturate(180%)',
                  color: '#FFFFFF',
                  borderRadius: '999px',
                  border: 'none',
                  '& fieldset': {
                    border: 'none',
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.25)',
                    border: 'none',
                  },
                  '&.Mui-focused': {
                    backgroundColor: 'rgba(255, 255, 255, 0.25)',
                    border: 'none',
                  },
                },
                '& .MuiInputBase-input::placeholder': {
                  color: 'rgba(255, 255, 255, 0.7)',
                  opacity: 1,
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'rgba(255, 255, 255, 0.9)' }} />
                  </InputAdornment>
                ),
              }}
            />
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                >
                  <Paper
                  sx={{
                    position: 'absolute',
                    top: '100%',
                    left: '4%',
                    right: '4%',
                    mt: 0,
                    backgroundColor: 'rgba(6, 40, 39, 0.95)',
                    backdropFilter: 'blur(4px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(4px) saturate(180%)',
                    border: 'none',
                    borderRadius: 'var(--border-radius-lg)',
                    maxHeight: 400,
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    zIndex: 1300,
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                    '&::-webkit-scrollbar': {
                      width: '3px',
                    },
                    '&::-webkit-scrollbar-track': {
                      background: 'rgba(255, 255, 255, 0.02)',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      background: 'rgba(255, 255, 255, 0.15)',
                      borderRadius: '2px',
                    },
                  }}
                  >
                    <List dense>
                      {Object.entries(grouped).map(([type, items]) => (
                        <Box key={type}>
                          <ListItem>
                            <ListItemText
                              primary={
                                <Typography
                                  sx={{
                                    fontSize: '0.7rem',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    color: typeColors[type] || '#FFFFFF',
                                  }}
                                >
                                  {typeLabels[type] || type}
                                </Typography>
                              }
                            />
                          </ListItem>
                          {items.map((item) => (
                            <ListItem
                              key={item.id}
                              component={RouterLink}
                              to={item.url}
                              sx={{
                                cursor: 'pointer',
                                borderRadius: 'var(--border-radius-sm)',
                                mx: 1,
                                mb: 0.5,
                                '&:hover': {
                                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                },
                              }}
                              onClick={() => {
                                setIsOpen(false)
                                setQuery('')
                              }}
                            >
                              <ListItemText
                                primary={
                                  <Typography sx={{ color: '#FFFFFF', fontWeight: 600, fontSize: '0.9rem' }}>
                                    {item.title}
                                  </Typography>
                                }
                                secondary={
                                  <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.8rem', mt: 0.2 }}>
                                    {item.description.substring(0, 80)}...
                                  </Typography>
                                }
                              />
                            </ListItem>
                          ))}
                        </Box>
                      ))}
                    </List>
                  </Paper>
                </motion.div>
              )}
            </AnimatePresence>
          </Box>
        </ClickAwayListener>
      </motion.div>
    </Box>
  )
}
