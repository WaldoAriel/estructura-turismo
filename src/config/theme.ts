export const municipalPalette = {
  turquoise: '#3AABB5',
  teal: '#0E98AE',
  tealDark: '#0A4D4C',
  tealLight: '#6BB7BA',
  orange: '#F37335',
  amber: '#F89C32',
  limeGreen: '#B9CF41',
  green: '#92C14A',
  violet: '#7B4C9E',
  violetLight: '#9A6EDC',
  clay: '#E29578',
  clayDark: '#C16A5A',
  sand: '#F8F5F3',
  textPrimary: '#2D2B45',
  textSecondary: '#6B6B8A',
  success: '#4CAF50',
  warning: '#FFC107',
}

export const municipalGradients: Record<string, string> = {
  principal: 'linear-gradient(135deg, #3AABB5 0%, #0A4D4C 100%)',
  secundario: 'linear-gradient(135deg, #7B4C9E 0%, #9A6EDC 100%)',
  naturaleza: 'linear-gradient(135deg, #E29578 0%, #C16A5A 100%)',
  turquesa: 'linear-gradient(135deg, #3AABB5 0%, #F37335 100%)',
  hero: 'linear-gradient(135deg, rgba(248, 245, 243, 0.95) 0%, rgba(248, 245, 243, 0.9) 100%)',
}

export const MUNICIPAL_COLORS = {
  ...municipalPalette,
  ...municipalGradients,
  neutral: {
    50: '#F8F5F3',
    100: '#F2EFE9',
    200: '#E5DED1',
    300: '#D0C9B3',
    400: '#A9A288',
    500: '#827B6D',
    600: '#6B6B8A',
    700: '#5A5A70',
    800: '#3A3A4A',
    900: '#2D2B45',
  },
  text: {
    primary: '#2D2B45',
    secondary: '#6B6B8A',
    inverse: '#ffffff',
  },
} as const

export type MunicipalColor = keyof typeof municipalPalette

export const cardBorderRadius = {
  lg: '16px',
  md: '12px',
  sm: '8px',
  asymmetric: '20px 4px 20px 4px',
}
