# Plan: Reemplazar video de hero por imagen estática (hero.jpg)

## Contexto
El hero de la página de inicio (`src/pages/Home.tsx`) usa actualmente un video (`public/videos/sta-rosa-bg.mp4`, 31MB) que se sirve a cada visitante. Esto consume la cuota de transferencia de la tier gratuita de Netlify, generando costos excesivos.

El usuario agregó una foto estática alternativa: `public/hero.jpg` (356kB, foto aérea de la ciudad con el río en la parte inferior).

## Objetivo
Reemplazar el video por la imagen estática, reduciendo el consumo de bandwidth a casi cero y mejorando la carga inicial de la página.

## Cambios requeridos

### 1. `src/pages/Home.tsx` — Reemplazar video por imagen
- Sustituir el elemento `<Box component="video">` por un `<Box component="img">` con:
  - `src="/hero.jpg"`
  - `alt="Vista aérea de Santa Rosa de Calamuchita"`
  - Mantener los estilos de posición absoluta, cobertura total (`width: 100%`, `height: 100%`), `objectFit: 'cover'`, `zIndex: 0`, `pointerEvents: 'none'`
- Eliminar los atributos del video (`autoPlay`, `muted`, `loop`, `playsInline`, `aria-hidden`)

### 2. (Opcional) Limpiar el archivo de video
- Eliminar `public/videos/sta-rosa-bg.mp4` si no se usará en otra parte
- Verificar primero con `grep` que no existan otras referencias al video en el código

## Validación
1. `npm run build` — Verificar que TypeScript y Vite compilen sin errores
2. `npm run dev` — Confirmar que la página de inicio carga la imagen correctamente y no hay errores de consola
3. Revisar visualmente que la imagen cubra todo el hero sin distorsión ni bordes

## Riesgos
- La imagen puede no tener la misma proporción que el video (16:9). Usar `objectFit: 'cover'` mitiga esto, pero puede recortar partes de la foto. Si el recorte es unacceptable, se puede cambiar a `objectFit: 'contain'` con un color de fondo oscuro.
- El usuario confirmó que la foto es "una foto aérea donde se la ciudad y una porción del río en la parte inferior". Con `cover` la parte inferior (río) podría cortarse. **Decisión pendiente:** ¿Usar `cover` o `contain`?