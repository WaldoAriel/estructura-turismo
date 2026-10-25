export const municipalPalette = {
  turquoise: '#3AABB5',
  teal: '#0E98AE',
  orange: '#F37335',
  amber: '#F89C32',
  limeGreen: '#B9CF41',
  green: '#92C14A',
  clay: '#E29578',
  clayDark: '#C16A5A',
  sand: '#F8F5F3',
  success: '#4CAF50',
  warning: '#FFC107',
  error: '#E53935',
  info: '#0288D1',
} as const

const BASE_COLORS = {
  turquoise: municipalPalette.turquoise,
  teal: municipalPalette.teal,
  orange: municipalPalette.orange,
  amber: municipalPalette.amber,
  limeGreen: municipalPalette.limeGreen,
  green: municipalPalette.green,
  clay: municipalPalette.clay,
} as const

function genScale(hex: string) {
  const c = hex.replace('#', '')
  const r = parseInt(c.slice(0, 2), 16)
  const g = parseInt(c.slice(2, 4), 16)
  const b = parseInt(c.slice(4, 6), 16)
  const hsl = rgbToHsl(r, g, b)
  const scale: Record<number, string> = {}
  const steps = [
    { key: 50, lightness: 0.95 },
    { key: 100, lightness: 0.90 },
    { key: 200, lightness: 0.80 },
    { key: 300, lightness: 0.65 },
    { key: 400, lightness: 0.50 },
    { key: 500, lightness: null },
    { key: 600, lightness: 0.30 },
    { key: 700, lightness: 0.20 },
    { key: 800, lightness: 0.10 },
    { key: 900, lightness: 0.05 },
  ]
  steps.forEach(({ key, lightness }) => {
    if (key === 500) {
      scale[key] = hex
    } else {
      const [h, s] = hsl
      const { r: r2, g: g2, b: b2 } = hslToRgb(h, s, lightness!)
      scale[key] = `#${r2.toString(16).padStart(2, '0')}${g2.toString(16).padStart(2, '0')}${b2.toString(16).padStart(2, '0')}`
    }
  })
  return scale
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h = 0, s = 0, l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
    }
    h /= 6
  }
  return [h, s, l]
}

function hslToRgb(h: number, s: number, l: number) {
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1; if (t > 1) t -= 1
    if (t < 1/6) return p + (q - p) * 6 * t
    if (t < 1/2) return q
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
    return p
  }
  let r, g, b
  if (s === 0) { r = g = b = l }
  else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1/3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1/3)
  }
  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) }
}

const colorScales = {
  turquoise: genScale(BASE_COLORS.turquoise),
  teal: genScale(BASE_COLORS.teal),
  orange: genScale(BASE_COLORS.orange),
  amber: genScale(BASE_COLORS.amber),
  limeGreen: genScale(BASE_COLORS.limeGreen),
  green: genScale(BASE_COLORS.green),
  clay: genScale(BASE_COLORS.clay),
} as const

const tealScale = colorScales.teal

export const municipalGradients: Record<string, string> = {
  principal: 'linear-gradient(135deg, #3AABB5 0%, #0E98AE 100%)',
  secundario: 'linear-gradient(135deg, #0E98AE 0%, #3AABB5 100%)',
  naturaleza: 'linear-gradient(135deg, #92C14A 0%, #B9CF41 100%)',
  turquesa: 'linear-gradient(135deg, #3AABB5 0%, #F37335 100%)',
  hero: 'linear-gradient(135deg, rgba(248, 245, 243, 0.95) 0%, rgba(248, 245, 243, 0.9) 100%)',
  sunset: 'linear-gradient(135deg, #F37335 0%, #F89C32 100%)',
  forest: 'linear-gradient(135deg, #92C14A 0%, #B9CF41 100%)',
  ocean: 'linear-gradient(135deg, #0E98AE 0%, #3AABB5 100%)',
  citrus: 'linear-gradient(135deg, #F89C32 0%, #B9CF41 100%)',
  tropical: 'linear-gradient(135deg, #F37335 0%, #3AABB5 100%)',
  fresh: 'linear-gradient(135deg, #B9CF41 0%, #3AABB5 100%)',
}

export const MUNICIPAL_COLORS = {
  ...municipalPalette,
  ...municipalGradients,
  scales: colorScales,
  neutral: {
    50: tealScale[50],
    100: tealScale[100],
    200: tealScale[200],
    300: tealScale[300],
    400: tealScale[400],
    500: tealScale[500],
    600: tealScale[600],
    700: tealScale[700],
    800: tealScale[800],
    900: tealScale[900],
  },
  text: {
    primary: tealScale[900],
    secondary: tealScale[600],
    inverse: '#ffffff',
    disabled: `${tealScale[900]}61`,
  },
  background: {
    default: municipalPalette.sand,
    paper: '#FFFFFF',
    dark: tealScale[900],
  },
  divider: `${tealScale[900]}1F`,
  action: {
    hover: `${tealScale[900]}0A`,
    selected: `${tealScale[900]}14`,
    disabled: `${tealScale[900]}42`,
  },
} as const

export type MunicipalColor = keyof typeof municipalPalette

export const cardBorderRadius = {
  lg: '16px',
  md: '12px',
  sm: '8px',
  asymmetric: '20px 4px 20px 4px',
}

export const spacing = {
  xs: '0.5rem',
  sm: '1rem',
  md: '1.5rem',
  lg: '2rem',
  xl: '3rem',
  xxl: '4rem',
  xxxl: '7rem',
}

export const shadows = {
  sm: `0 1px 2px ${tealScale[900]}0D`,
  md: `0 4px 12px ${tealScale[900]}1A`,
  lg: `0 8px 24px ${tealScale[900]}1F`,
  xl: `0 16px 48px ${tealScale[900]}26`,
  card: `0 2px 8px ${tealScale[900]}14`,
  cardHover: `0 12px 32px ${tealScale[900]}26`,
}

export const transitions = {
  fast: '120ms cubic-bezier(0.23, 1, 0.32, 1)',
  standard: '160ms cubic-bezier(0.23, 1, 0.32, 1)',
  slow: '240ms cubic-bezier(0.23, 1, 0.32, 1)',
}

export const zIndex = {
  dropdown: 1000,
  sticky: 1100,
  modal: 1300,
  popover: 1400,
  tooltip: 1500,
}

export const breakpoints = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
}

export const cssVariables = `
:root {
  --color-turquoise: ${municipalPalette.turquoise};
  --color-teal: ${municipalPalette.teal};
  --color-teal-50: ${tealScale[50]};
  --color-teal-100: ${tealScale[100]};
  --color-teal-200: ${tealScale[200]};
  --color-teal-300: ${tealScale[300]};
  --color-teal-400: ${tealScale[400]};
  --color-teal-500: ${tealScale[500]};
  --color-teal-600: ${tealScale[600]};
  --color-teal-700: ${tealScale[700]};
  --color-teal-800: ${tealScale[800]};
  --color-teal-900: ${tealScale[900]};
  --color-orange: ${municipalPalette.orange};
  --color-amber: ${municipalPalette.amber};
  --color-lime-green: ${municipalPalette.limeGreen};
  --color-green: ${municipalPalette.green};
  --color-clay: ${municipalPalette.clay};
  --color-clay-dark: ${municipalPalette.clayDark};
  --color-sand: ${municipalPalette.sand};
  --color-text-primary: ${tealScale[900]};
  --color-text-secondary: ${tealScale[600]};
  --color-primary: ${municipalPalette.turquoise};
  --color-primary-dark: ${tealScale[700]};
  --color-secondary: ${tealScale[800]};
  --color-accent: ${municipalPalette.clay};
  --color-accent-dark: ${municipalPalette.clayDark};
  --color-background: ${municipalPalette.sand};
  --color-surface: #FFFFFF;
  --color-surface-alt: ${tealScale[100]};
  --color-border: ${tealScale[200]};
  --color-border-light: ${tealScale[300]};
  --shadow-sm: ${shadows.sm};
  --shadow-md: ${shadows.md};
  --shadow-lg: ${shadows.lg};
  --shadow-xl: ${shadows.xl};
  --transition-fast: ${transitions.fast};
  --transition-normal: ${transitions.standard};
  --border-radius-sm: ${cardBorderRadius.sm};
  --border-radius-md: ${cardBorderRadius.md};
  --border-radius-lg: ${cardBorderRadius.lg};
  --border-radius-asymmetric: ${cardBorderRadius.asymmetric};
  --spacing-xs: ${spacing.xs};
  --spacing-sm: ${spacing.sm};
  --spacing-md: ${spacing.md};
  --spacing-lg: ${spacing.lg};
  --spacing-xl: ${spacing.xl};
  --spacing-xxl: ${spacing.xxl};
  --spacing-xxxl: ${spacing.xxxl};
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --gradient-principal: ${municipalGradients.principal};
  --gradient-secundario: ${municipalGradients.secundario};
  --gradient-naturaleza: ${municipalGradients.naturaleza};
  --gradient-turquesa: ${municipalGradients.turquesa};
  --gradient-hero: ${municipalGradients.hero};
  --gradient-sunset: ${municipalGradients.sunset};
  --gradient-forest: ${municipalGradients.forest};
  --gradient-ocean: ${municipalGradients.ocean};
  --gradient-citrus: ${municipalGradients.citrus};
  --gradient-tropical: ${municipalGradients.tropical};
  --gradient-fresh: ${municipalGradients.fresh};
}
`.trim()

import { createTheme } from '@mui/material/styles'

export type ThemeMode = 'light' | 'dark'

export function getMuiTheme(mode: ThemeMode = 'light') {
  const isDark = mode === 'dark'
  return createTheme({
    palette: {
      mode,
      common: {
        white: '#FFFFFF',
        black: '#000000',
      },
      primary: {
        main: municipalPalette.turquoise,
        light: tealScale[300],
        dark: tealScale[700],
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: tealScale[800],
        light: tealScale[400],
        dark: tealScale[900],
        contrastText: '#FFFFFF',
      },
      error: {
        main: municipalPalette.error,
      },
      warning: {
        main: municipalPalette.warning,
      },
      info: {
        main: municipalPalette.info,
      },
      success: {
        main: municipalPalette.success,
      },
      background: {
        default: isDark ? tealScale[900] : municipalPalette.sand,
        paper: isDark ? tealScale[700] : '#FFFFFF',
      },
      text: {
        primary: isDark ? '#F8F5F3' : tealScale[900],
        secondary: isDark ? 'rgba(248,245,243,0.7)' : tealScale[600],
        disabled: isDark ? 'rgba(248,245,243,0.38)' : `${tealScale[900]}61`,
      },
      divider: isDark ? 'rgba(248,245,243,0.12)' : `${tealScale[900]}1F`,
      action: {
        hover: isDark ? 'rgba(248,245,243,0.08)' : `${tealScale[900]}0A`,
        selected: isDark ? 'rgba(248,245,243,0.16)' : `${tealScale[900]}14`,
        disabled: isDark ? 'rgba(248,245,243,0.3)' : `${tealScale[900]}42`,
      },
    },
    typography: {
      fontFamily: "'Inter', 'system-ui', sans-serif",
      h1: { fontWeight: 800, fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.15 },
      h2: { fontWeight: 700, fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.2 },
      h3: { fontWeight: 700, fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', lineHeight: 1.25 },
      h4: { fontWeight: 700, fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', lineHeight: 1.3 },
      h5: { fontWeight: 600, fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', lineHeight: 1.35 },
      h6: { fontWeight: 600, fontSize: '1.125rem', lineHeight: 1.4 },
      body1: { fontSize: '1rem', lineHeight: 1.7 },
      body2: { fontSize: '0.875rem', lineHeight: 1.6 },
      button: { textTransform: 'none', fontWeight: 600, fontSize: '0.9375rem' },
    },
    shape: {
      borderRadius: 12,
    },
    shadows: [
      'none',
      shadows.sm,
      shadows.md,
      shadows.lg,
      shadows.xl,
      shadows.card,
      `0 4px 16px ${tealScale[900]}1F`,
      `0 8px 20px ${tealScale[900]}24`,
      `0 12px 28px ${tealScale[900]}29`,
      `0 16px 36px ${tealScale[900]}2E`,
      `0 20px 44px ${tealScale[900]}33`,
      `0 24px 52px ${tealScale[900]}38`,
      `0 28px 60px ${tealScale[900]}3D`,
      `0 32px 68px ${tealScale[900]}42`,
      `0 36px 76px ${tealScale[900]}47`,
      `0 40px 84px ${tealScale[900]}4D`,
      `0 44px 92px ${tealScale[900]}52`,
      `0 48px 100px ${tealScale[900]}57`,
      `0 52px 108px ${tealScale[900]}5C`,
      `0 56px 116px ${tealScale[900]}61`,
      `0 60px 124px ${tealScale[900]}66`,
      `0 64px 132px ${tealScale[900]}6B`,
      `0 68px 140px ${tealScale[900]}70`,
      `0 72px 148px ${tealScale[900]}75`,
      `0 76px 156px ${tealScale[900]}7A`,
      `0 80px 164px ${tealScale[900]}80`,
    ] as any,
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            padding: '10px 24px',
            fontSize: '0.9375rem',
            fontWeight: 600,
          },
          contained: {
            boxShadow: shadows.md,
            '&:hover': { boxShadow: shadows.lg },
          },
          outlined: {
            borderWidth: 2,
            '&:hover': { borderWidth: 2 },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: shadows.card,
            border: '1px solid rgba(6,40,39,0.06)',
            transition: 'box-shadow 160ms cubic-bezier(0.23, 1, 0.32, 1), transform 160ms cubic-bezier(0.23, 1, 0.32, 1)',
            '&:hover': { boxShadow: shadows.cardHover },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 12,
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: municipalPalette.turquoise,
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderWidth: 2,
                borderColor: municipalPalette.turquoise,
              },
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            fontWeight: 500,
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(6,40,39,0.08)',
          },
        },
      },
    },
})
}