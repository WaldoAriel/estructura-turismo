export const EASING_OUT = [0.23, 1, 0.32, 1] as const

export const SPRING_STANDARD = {
  type: 'spring' as const,
  damping: 25,
  stiffness: 300,
  restDelta: 2,
}

export const SPRING_PRESS = {
  type: 'spring' as const,
  damping: 25,
  stiffness: 400,
}

export const SPRING_GENTLE = {
  type: 'spring' as const,
  damping: 30,
  stiffness: 200,
}

export const STAGGER_FAST = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.05,
    },
  },
}

export const FADE_UP_CHILD = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
}

export const HOVER_SHADOW = {
  '&:hover': {
    boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
  },
} as const

export const HOVER_SHADOW_CSS = 'box-shadow 160ms cubic-bezier(0.23, 1, 0.32, 1)'
