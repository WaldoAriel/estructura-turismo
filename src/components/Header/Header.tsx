import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
  Menu,
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
import { SPRING_STANDARD, SPRING_GENTLE } from '../../config/animations'

const BANNER_STORAGE_KEY = 'bannerDismissed'

const isExternalLink = (href: string): boolean => {
  return href.startsWith('http://') || href.startsWith('https://')
}

const getLinkProps = (href: string) => {
  return isExternalLink(href)
    ? { target: '_blank', rel: 'noopener noreferrer' as const }
    : {}
}

const appBarVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
}

const logoVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
}

const hamburgerVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
}

const menuItemVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0 },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.05,
    },
  },
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

function MegaMenuCard({ item, handleClose, index }: { item: NavItem; handleClose: () => void; index: number }) {
  if (!item.children || item.children.length === 0) {
    return (
      <Box
        key={item.label}
        component="a"
        href={item.href || '#'}
        {...getLinkProps(item.href || '#')}
        onClick={handleClose}
        sx={{
          pl: 1.5,
          py: 0.75,
          display: 'block',
          color: 'var(--color-text-primary)',
          fontWeight: 500,
          '&:hover': {
            backgroundColor: 'var(--color-primary)1A',
            color: 'var(--color-primary)',
          },
          borderRadius: '8px',
          margin: '0 4px',
        }}
      >
        {item.label}
      </Box>
    )
  }

  return (
    <motion.div
      key={item.label}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.03 }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: 700,
          color: 'var(--color-text-secondary)',
          pl: 1.5,
          py: 1,
          mb: 0.5,
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}
      >
        {item.label}
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gap: 1,
          pl: 1,
          pr: 2,
          pb: 1.5,
        }}
      >
        {item.children.map((child, childIndex) => (
          <motion.div
            key={child.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: childIndex * 0.02 }}
          >
            <Box
              component="a"
              href={child.href || '#'}
              {...getLinkProps(child.href || '#')}
              onClick={handleClose}
              sx={{
                p: 1.5,
                display: 'flex',
                flexDirection: 'column',
                gap: 0.5,
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: '12px',
                cursor: 'pointer',
                textDecoration: 'none',
                color: 'var(--color-text-primary)',
                transition: 'all 0.2s cubic-bezier(0.23, 1, 0.32, 1)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 'var(--shadow-md)',
                  borderColor: 'var(--color-primary)',
                  backgroundColor: 'var(--color-surface)',
                },
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  color: 'var(--color-text-primary)',
                }}
              >
                {child.label}
              </Typography>
              {child.description && (
                <Typography
                  variant="body2"
                  sx={{
                    color: 'var(--color-text-secondary)',
                    fontSize: '0.8rem',
                    lineHeight: 1.5,
                  }}
                >
                  {child.description}
                </Typography>
              )}
            </Box>
          </motion.div>
        ))}
      </Box>
    </motion.div>
  )
}

function renderMegaMenuChildren(items: NavItem[], handleClose: () => void) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, p: 2 }}>
      {items.map((item, index) => (
        <MegaMenuCard key={item.label} item={item} handleClose={handleClose} index={index} />
      ))}
    </Box>
  )
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
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleClick = () => {
    if (item.children && item.children.length > 0) {
      setActiveDropdown(isOpen ? null : item.label)
    }
  }

  // Special handling for Clima widget
  if (item.label === 'Clima') {
    return (
      <motion.div variants={menuItemVariants}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title="Temperatura actual">
            <motion.div
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', damping: 25, stiffness: 400 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1 }}>
                <WeatherSunny sx={{ fontSize: 20, color: '#ffeb3b' }} />
                <Cloud sx={{ fontSize: 20, color: '#90caf9' }} />
              </Box>
            </motion.div>
          </Tooltip>
        </Box>
      </motion.div>
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
        ref={buttonRef}
        color="inherit"
        onClick={handleClick}
        sx={{
          textTransform: 'none',
          fontWeight: 500,
          fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
          backgroundColor: isOpen ? 'rgba(255,255,255,0.1)' : 'transparent',
          borderRadius: '8px',
          py: 1,
          px: 1.5,
          transition: 'background-color 0.2s',
        }}
      >
        {item.label}
      </Button>
      <Menu
        anchorEl={buttonRef.current}
        open={isOpen}
        onClose={handleClose}
        MenuListProps={{
          sx: {
            bgcolor: 'transparent',
            color: 'var(--color-text-primary)',
            width: '100vw',
            maxWidth: '100vw',
            maxHeight: 'calc(100vh - 120px)',
            overflowY: 'auto',
            py: 2,
            pt: 0,
          },
        }}
        PaperProps={{
          sx: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100vw',
            maxWidth: '100vw',
            bgcolor: 'var(--color-background)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
            borderBottom: '1px solid var(--color-border)',
            zIndex: 10000,
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          },
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        BackdropProps={{
          sx: {
            backgroundColor: 'rgba(0,0,0,0.3)',
          },
        }}
      >
        {renderMegaMenuChildren(item.children, handleClose)}
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
      <motion.div
        variants={appBarVariants}
        initial="hidden"
        animate="visible"
        transition={SPRING_GENTLE}
      >
        <AppBar
          position="fixed"
          elevation={0}
          className="glass"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: 'rgba(26, 32, 44, 0.6)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            boxShadow: 'none',
          }}
        >
          <Toolbar sx={{ height: { xs: 64, sm: 80, md: 120 }, px: 2 }}>
            <motion.div
              variants={logoVariants}
              initial="hidden"
              animate="visible"
              transition={SPRING_GENTLE}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <motion.div
                  variants={hamburgerVariants}
                  initial="hidden"
                  animate="visible"
                  transition={SPRING_GENTLE}
                >
                  <IconButton
                    color="inherit"
                    edge="start"
                    onClick={() => setDrawerOpen(true)}
                    sx={{ mr: 1, display: { md: 'none' } }}
                  >
                    <MenuIcon />
                  </IconButton>
                </motion.div>
                <motion.div
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 400 }}
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    window.location.href = '/'
                  }}
                  role="link"
                  aria-label="Volver al inicio"
                >
                  <Box
                    component="img"
                    src="/logo-muni.svg"
                    alt="Logo Municipal - Volver al inicio"
                    sx={{ height: { xs: 32, sm: 36, md: 40 } }}
                    onError={(e) => {
                      ;(e.target as HTMLImageElement).style.display = 'none'
                    }}
                  />
                </motion.div>
              </Box>
            </motion.div>

            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                flexDirection: 'column',
                justifyContent: 'center',
                gap: 1,
                ml: 'auto',
              }}
            >
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                transition={SPRING_STANDARD}
                style={{ display: 'flex', gap: '1rem' }}
              >
                {topMenuItems.map((item) => (
                  <DesktopMenuButton
                    key={item.label}
                    item={item}
                    activeDropdown={activeDropdown}
                    setActiveDropdown={setActiveDropdown}
                  />
                ))}
              </motion.div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                transition={SPRING_STANDARD}
                style={{ display: 'flex', gap: '1rem' }}
              >
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
              </motion.div>
            </Box>
          </Toolbar>
        </AppBar>
      </motion.div>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <Modal
        open={bannerOpen}
        onClose={handleBannerClose}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
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
        </motion.div>
      </Modal>
    </>
  )
}