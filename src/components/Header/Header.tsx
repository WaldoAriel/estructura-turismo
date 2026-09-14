import { useState, useEffect } from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Modal,
  Tooltip,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Close from '@mui/icons-material/Close'
import WeatherSunny from '@mui/icons-material/WbSunny'
import Cloud from '@mui/icons-material/Cloud'
import { topMenuItems, drawerMenuSections, type MenuItem as NavItem, type TopMenuItem } from './menuData'

const BANNER_STORAGE_KEY = 'bannerDismissed'

const DROPDOWN_BG = '#1a202c'
const DROPDOWN_TEXT = '#f7fafc'
const DROPDOWN_HOVER = 'rgba(255,255,255,0.08)'
const DROPDOWN_BORDER = '#2d3748'

const isExternalLink = (href: string): boolean => {
  return href.startsWith('http://') || href.startsWith('https://')
}

const getLinkProps = (href: string) => {
  return isExternalLink(href)
    ? { target: '_blank', rel: 'noopener noreferrer' as const }
    : {}
}

function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const renderMenuItem = (item: NavItem, depth = 0) => {
    if (!item.children || item.children.length === 0) {
      return (
        <ListItem key={item.label} disablePadding>
          <ListItemButton component="a" href={item.href || '#'} {...getLinkProps(item.href || '#')} sx={{ pl: 2 + depth * 2 }}>
            <ListItemText primary={item.label} />
          </ListItemButton>
        </ListItem>
      )
    }

    return (
      <ListItem key={item.label} disablePadding sx={{ display: 'block' }}>
        <Accordion disableGutters elevation={0} sx={{ '&:before': { display: 'none' } }}>
          <AccordionSummary expandIcon={<ExpandMore />} sx={{ minHeight: 48, pl: 2 + depth * 2 }}>
            <Typography variant={depth === 0 ? 'subtitle1' : 'body1'} sx={{ fontWeight: depth === 0 ? 600 : 400 }}>
              {item.label}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0 }}>
            <List disablePadding>
              {item.children.map((child) => renderMenuItem(child, depth + 1))}
            </List>
          </AccordionDetails>
        </Accordion>
      </ListItem>
    )
  }

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box sx={{ width: { xs: 280, sm: 300 }, pt: 2 }} role="presentation">
        {topMenuItems.map((item) => renderMenuItem(item))}
        <Divider sx={{ my: 1 }} />
        {drawerMenuSections.map((section, idx) => (
          <Box key={idx}>
            {section.map((menuItem) => renderMenuItem(menuItem))}
            {idx < drawerMenuSections.length - 1 && <Divider sx={{ my: 1 }} />}
          </Box>
        ))}
      </Box>
    </Drawer>
  )
}

function renderDropdownChildren(items: NavItem[], depth = 0, handleClose: () => void) {
  return items.map((item) => {
    if (!item.children || item.children.length === 0) {
      return (
        <MenuItem
          key={item.label}
          component="a"
          href={item.href || '#'}
          {...getLinkProps(item.href || '#')}
          onClick={handleClose}
          sx={{
            pl: 2 + depth,
            color: DROPDOWN_TEXT,
            '&:hover': {
              backgroundColor: DROPDOWN_HOVER,
            },
          }}
        >
          {item.label}
        </MenuItem>
      )
    }

    return (
      <Box key={item.label} sx={{ mb: { xs: 2, md: 3 }, width: '100%' }}>
        <Typography
          variant="subtitle1"
          sx={{
            color: DROPDOWN_TEXT,
            fontWeight: 600,
            pl: 2 + depth,
            pb: 1,
          }}
        >
          {item.label}
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr 1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
            gap: 1,
            pl: 2 + depth,
            pr: 2,
          }}
        >
          {item.children.map((child) => {
            if (!child.children || child.children.length === 0) {
              return (
                <MenuItem
                  key={child.label}
                  component="a"
                  href={child.href || '#'}
                  {...getLinkProps(child.href || '#')}
                  onClick={handleClose}
                  sx={{
                    color: DROPDOWN_TEXT,
                    '&:hover': {
                      backgroundColor: DROPDOWN_HOVER,
                    },
                  }}
                >
                  {child.label}
                </MenuItem>
              )
            }

            return (
              <Box
                key={child.label}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: DROPDOWN_TEXT,
                    fontWeight: 600,
                    mb: 0.5,
                  }}
                >
                  {child.label}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  {child.children.map((grandChild) => (
                    <MenuItem
                      key={grandChild.label}
                      component="a"
                      href={grandChild.href || '#'}
                      {...getLinkProps(grandChild.href || '#')}
                      onClick={handleClose}
                      sx={{
                        pl: 2,
                        color: DROPDOWN_TEXT,
                        '&:hover': {
                          backgroundColor: DROPDOWN_HOVER,
                        },
                      }}
                    >
                      {grandChild.label}
                    </MenuItem>
                  ))}
                </Box>
              </Box>
            )
          })}
        </Box>
      </Box>
    )
  })
}

function DesktopMenuButton({
  item,
  activeDropdown,
  setActiveDropdown,
}: {
  item: TopMenuItem & { openBannerModal?: boolean }
  activeDropdown: string | null
  setActiveDropdown: (label: string | null) => void
}) {
  const isOpen = activeDropdown === item.label
  const handleClose = () => setActiveDropdown(null)

  const handleClick = () => {
    if (item.children && item.children.length > 0) {
      setActiveDropdown(isOpen ? null : item.label)
    }
  }

  // Special handling for Clima widget
  if (item.label === 'Clima') {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Tooltip title="Temperatura actual">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1 }}>
            <WeatherSunny sx={{ fontSize: 20, color: '#ffeb3b' }} />
            <Cloud sx={{ fontSize: 20, color: '#90caf9' }} />
          </Box>
        </Tooltip>
      </Box>
    )
  }

  if (!item.children || item.children.length === 0) {
    return (
      <Button
        color="inherit"
        href={item.href || '#'}
        {...getLinkProps(item.href || '#')}
        sx={{ textTransform: 'none', fontWeight: 500, fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1.1rem' } }}
      >
        {item.label}
      </Button>
    )
  }

  return (
    <>
      <Button
        color="inherit"
        onClick={handleClick}
        sx={{
          textTransform: 'none',
          fontWeight: 500,
          fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
          backgroundColor: isOpen ? 'rgba(255,255,255,0.1)' : 'transparent',
          borderRadius: '4px',
        }}
      >
        {item.label}
      </Button>
      <Menu
        anchorEl={null}
        open={isOpen}
        onClose={handleClose}
        MenuListProps={{
          sx: {
            bgcolor: DROPDOWN_BG,
            color: DROPDOWN_TEXT,
            width: '100vw',
            maxWidth: '100vw',
            maxHeight: 'calc(100vh - 120px)',
            overflowY: 'auto',
            py: 2,
          },
        }}
        PaperProps={{
          sx: {
            position: 'fixed',
            top: { xs: 64, sm: 80, md: 120 },
            left: 0,
            width: '100vw',
            maxWidth: '100vw',
            bgcolor: DROPDOWN_BG,
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            borderBottom: `1px solid ${DROPDOWN_BORDER}`,
          },
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        BackdropProps={{
          sx: {
            backgroundColor: 'rgba(0,0,0,0.4)',
          },
        }}
      >
        {renderDropdownChildren(item.children, 0, handleClose)}
      </Menu>
    </>
  )
}

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [bannerOpen, setBannerOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    if (!localStorage.getItem(BANNER_STORAGE_KEY) && window.location.pathname === '/') {
      setBannerOpen(true)
    }
  }, [])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null)
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  const handleBannerClose = () => {
    localStorage.setItem(BANNER_STORAGE_KEY, 'true')
    setBannerOpen(false)
  }

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundImage: 'linear-gradient(to bottom, rgba(26, 32, 44, 0.5) 0%, rgba(26, 32, 44, 0) 100%)',
          backgroundColor: 'transparent',
          boxShadow: 'none',
        }}
      >
        <Toolbar sx={{ height: { xs: 64, sm: 80, md: 120 }, px: 2 }}>
          {/* Left side: Logo only (title removed) */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setDrawerOpen(true)}
              sx={{ mr: 1, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Box
              component="img"
              src="/logo-muni.svg"
              alt="Logo Municipal"
              sx={{ height: { xs: 32, sm: 36, md: 40 } }}
              onError={(e) => {
                ;(e.target as HTMLImageElement).style.display = 'none'
              }}
            />
          </Box>

          {/* Right side: Two lines of menu items with proper spacing */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 1,
              ml: 'auto',
            }}
          >
            {/* Top row: Main navigation items (Eventos, Dónde Comer, etc.) */}
            <Box sx={{ display: 'flex', gap: 2 }}>
              {topMenuItems.map((item) => (
                <DesktopMenuButton
                  key={item.label}
                  item={item}
                  activeDropdown={activeDropdown}
                  setActiveDropdown={setActiveDropdown}
                />
              ))}
            </Box>

            {/* Bottom row: Section menu items (Información, Qué Hacer, Qué Visitar) */}
            <Box sx={{ display: 'flex', gap: 2 }}>
              {drawerMenuSections.map((section) => {
                const item = section[0]
                return (
                  <DesktopMenuButton
                    key={item.label}
                    item={item as TopMenuItem & { openBannerModal?: boolean }}
                    activeDropdown={activeDropdown}
                    setActiveDropdown={setActiveDropdown}
                  />
                )
              })}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <Modal
        open={bannerOpen}
        onClose={handleBannerClose}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}
      >
        <Box
          sx={{
            position: 'relative',
            bgcolor: 'secondary.main',
            color: 'secondary.contrastText',
            p: 4,
            borderRadius: 2,
            maxWidth: 600,
            width: '100%',
            textAlign: 'center',
            boxShadow: 24,
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleBannerClose}
            sx={{ position: 'absolute', top: 8, right: 8, color: 'secondary.contrastText' }}
          >
            <Close />
          </IconButton>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 1 }}>
            IMAGEN DEL EVENTO PRÓXIMO / ACTUAL PROMOCIÓN
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            Descubrí todo lo que Santa Rosa de Calamuchita tiene para ofrecerte. ¡No te lo pierdas!
          </Typography>
        </Box>
      </Modal>
    </>
  )
}
