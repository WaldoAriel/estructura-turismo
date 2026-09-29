# Plan: Apple Design + Emil Design Engineering Improvements

## Estado Actual
- Duraciones reducidas a 200ms con easing `EASING_OUT` ✅ (en componentes de página)
- Hover scale eliminado en cards ✅ (solo box-shadow CSS)
- Stagger reducido a 0.03 ✅ en grids
- Build pasa correctamente ✅ (`npm run build` exitoso)

## Principios a aplicar
| Fuente | Principio |
| --- | --- |
| `apple-design` | Springs sobre tweens, interruptibilidad, velocity handoff, spatial consistency, reduced motion, materials translúcidos |
| `emil-design-eng` | Taste es entrenado, details invisibles compiten, buttons press feedback, transform-origin aware |

## Tareas de Implementación

### 1. Crear config/animations.ts (centralizar valores)
**Nuevo archivo:** `src/config/animations.ts`

```ts
export const EASING_OUT = [0.23, 1, 0.32, 1] as const

export const SPRING_STANDARD = {
  type: 'spring' as const,
  damping: 25,
  stiffness: 300,
  restDelta: 2,
}

export const STAGGER_FAST = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.03, delayChildren: 0.05 },
  },
}

export const FADE_UP_CHILD = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
}

export const HOVER_SHADOW_CSS = 'box-shadow 160ms cubic-bezier(0.23, 1, 0.32, 1)'
```

**Archivos afectados:** Nuevo archivo

### 2. Reemplazar transitions en componentes principales
**Archivo:** `src/pages/HacerDetalle.tsx`

- Importar `SPRING_STANDARD` desde `../config/animations`
- Reemplazar `transition={{ duration: 0.2, ease: EASING_OUT }}` con `transition={SPRING_STANDARD}`
- Reemplazar stagger `0.03` con `STAGGER_FAST`

**Archivo:** `src/pages/VisitarDetalle.tsx`
- Mismo reemplazo de transitions → springs

**Archivo:** `src/pages/Visitar.tsx`
- Mismo reemplazo

**Archivo:** `src/pages/Hacer.tsx`
- Mismo reemplazo

**Archivo:** `src/pages/Eventos.tsx`
- Mismo reemplazo

### 3. Header.tsx - Materials translúcidos + dropdown animation + press feedback
**Archivo:** `src/components/Header/Header.tsx`

a) AppBar backdrop-filter:
```jsx
sx={{
  background: 'rgba(26, 32, 44, 0.6)',
  backdropFilter: 'blur(20px) saturate(180%)',
  WebkitBackdropFilter: 'blur(20px) saturate(180%)', // Safari prefix
}}
```

b) Dropdown: reemplazar MUI `Menu` con framer-motion `AnimatePresence` para scale desde trigger

c) Logo hover → `whileTap={{ scale: 0.97 }}` (feedback en pointer-down, no hover)

d) AppBar motion: reemplazar `duration: 0.5` con `SPRING_GENTLE`

### 4. Global CSS - Typography + reduced motion
**Archivo:** `src/index.css`

```css
@media (prefers-reduced-motion: reduce) {
  .motion-div {
    transition: none !important;
    animation: none !important;
  }
}

@media (prefers-reduced-transparency: reduce) {
  .glass {
    background: rgba(255, 255, 255, 0.95) !important;
    backdrop-filter: none !important;
  }
}

:root {
  font-feature-settings: "kern" auto;
  font-synthesis: none;
}
```

### 5. Home.tsx - spring transitions
**Archivo:** `src/pages/Home.tsx`

- Reemplazar `duration: 0.8` con `SPRING_STANDARD`
- Mapa SVG: mantener entrada con delay pero usar spring

## Validación
- `npm run build` - TypeScript + Vite
- `npm run dev` - Verificar en localhost:5173
- DevTools → Rendering → `prefers-reduced-motion: reduce`
- Verificar backdrop-filter en Chrome/Firefox/Safari

## Riesgos
- Springs pueden ser más pesados: `restDelta: 2` limita frames
- backdrop-filter: agregar fallback `backgroundColor` para Safari/Firefox
