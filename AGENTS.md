# AGENTS.md — HARNESS STUDIO

Guía para cualquier agente (o desarrollador) que trabaje en este repositorio. Leé este archivo completo antes de tocar código. La especificación funcional completa está en `SPEC.md`; si hay conflicto entre ambos, `SPEC.md` manda en producto y este archivo manda en cómo se trabaja.

---

## 1. Contexto

- **Qué es**: sitio web oficial de HARNESS STUDIO, una startup de desarrollo web y de software.
- **Qué vende**: (1) landing pages, (2) personalización de Tienda Nube, (3) tienda online, (4) software a medida.
- **Para quién**: pymes y emprendedores que necesitan presencia web, vender online o digitalizar procesos.
- **Objetivo del sitio**: generar contactos (WhatsApp como canal principal) y posicionar en buscadores cada servicio en su propia página.
- **Idioma**: español (es-AR). Todo el contenido, `lang="es-AR"` en `<html>`.
- **Tono del copy**: directo, claro y concreto. Frases cortas, sin jerga innecesaria.

## 2. Stack

| Capa | Tecnología |
|---|---|
| Framework | Astro (salida estática, islas React solo si son imprescindibles) |
| Estilos | Tailwind CSS + variables CSS (tokens) |
| Animación | GSAP (ScrollTrigger, Flip) + Lenis para scroll suave |
| Contenido | Astro Content Collections (`src/content/`) |
| SEO | `@astrojs/sitemap`, JSON-LD propio, `robots.txt` |
| Tests | Playwright (e2e y responsive) |
| Hosting | Vercel |

No agregues dependencias nuevas sin justificarlo en el PR/mensaje. Preferí HTML/CSS nativo antes que una librería.

## 3. Comandos

```bash
npm install          # instalar
npm run dev          # desarrollo
npm run build        # build de producción (debe pasar sin warnings)
npm run preview      # servir el build
npm run lint         # lint
npm run check        # astro check (tipos)
npm run test         # Playwright
npm run links        # verificación de enlaces rotos sobre el build
```

Antes de dar una tarea por terminada corré: `check`, `lint`, `build` y `links`.

## 4. Estructura del repo

```
src/
  components/
    sections/     Nav, Hero, Services, Process, Trust, FAQ, Pricing, CTA, Footer
    ui/           Button, Sticker, Marquee, WhatsAppFloat, Accordion, Badge
    seo/          SEO.astro, JsonLd.astro
  content/
    services/     un archivo por servicio (fuente única de contenido)
    faqs/         FAQs globales
  layouts/        Base.astro (head, meta, favicon, JSON-LD base)
  pages/
    index.astro
    servicios/[slug].astro   plantilla única para todos los servicios
    404.astro
  styles/         tokens.css, global.css
  scripts/        animations/ (un módulo por sección), smooth-scroll.ts
public/           favicon, og-image, robots.txt
tests/            specs de Playwright
SPEC.md
AGENTS.md
```

Regla de escalabilidad: **agregar un servicio = agregar un archivo en `src/content/services/`**. No se crean páginas a mano por servicio.

## 5. Rutas

- `/` Home
- `/servicios/landing-pages`
- `/servicios/tiendanube`
- `/servicios/tienda-online`
- `/servicios/software-a-medida`
- `/404`

Slugs en minúsculas, sin acentos, con guiones. Cada página con URL canónica absoluta.

## 6. Sistema de diseño

Estilo: **neo-brutalismo / anti-diseño**. Tipografía enorme y creativa, composición audaz, sin profundidad excesiva.

### Tokens (fuente única en `src/styles/tokens.css`)

```css
:root {
  --black: #0A0A0A;
  --white: #FFFFFF;
  --gray-100: #EDEDED;
  --gray-300: #BDBDBD;
  --gray-500: #8A8A8A;
  --gray-800: #2B2B2B;
  --orange: #FF5A00;      /* único color de acento */

  --border: 3px solid var(--black);
  --shadow-hard: 6px 6px 0 var(--black);
  --shadow-hard-hover: 2px 2px 0 var(--black);
}
```

### Reglas

- **Solo** estos colores. Prohibido introducir otros. El naranja es acento: no más de un foco naranja dominante por pantalla.
- **Sin blur, sin gradientes, sin sombras suaves, sin glassmorphism, sin 3D.** La única "profundidad" es la sombra dura con offset (`--shadow-hard`).
- Bordes gruesos y negros en tarjetas, botones e inputs.
- Botones: al hover se "hunden" (la sombra se reduce y el elemento se traslada).
- Tipografía display grande (`clamp()` fluido), interlineado ajustado, mayúsculas permitidas en titulares. Cuerpo en una fuente simple y legible. Máximo 2 familias.
- Elementos permitidos: stickers/etiquetas rotadas, marquees de texto, grillas visibles, numeración grande, bloques de color plano.
- Mantener contraste WCAG AA (texto sobre naranja: usar negro).
- Nada de sombras o efectos que simulen volumen realista.

## 7. Contenido, headings y SEO

- **Un solo `<h1>` por página.** Jerarquía `h1 > h2 > h3` sin saltar niveles. Los niveles se eligen por semántica, no por tamaño visual (el tamaño se controla con clases).
- **Title** único por página (≤ 60 caracteres) y **meta description** única (≤ 155 caracteres), definidos en el frontmatter del contenido.
- `<link rel="canonical">`, Open Graph y Twitter Card en todas las páginas.
- **JSON-LD**: `Organization` (global), `Service` (páginas de servicio), `FAQPage` (donde haya FAQ), `BreadcrumbList` (páginas de servicio).
- **Favicon**: SVG + PNG 32/192/512 + `apple-touch-icon`, declarados en `Base.astro`.
- `robots.txt` en `public/` apuntando al sitemap. Sitemap generado con `@astrojs/sitemap` (excluir `/404`).
- Todas las imágenes con `alt` descriptivo (o `alt=""` si son decorativas), dimensiones explícitas y `astro:assets`.
- Enlaces internos con rutas absolutas relativas al sitio (`/servicios/...`). Enlaces externos con `rel="noopener noreferrer"`.
- Cero enlaces rotos: `npm run links` debe pasar.
- Texto de enlaces descriptivo (nada de "click acá").

## 8. Animaciones

- Todo con GSAP; scroll suave con Lenis inicializado una sola vez.
- Un módulo por sección en `src/scripts/animations/`, y un **timeline maestro** por página que las entrelaza (las secciones se solapan ~20–30%, los elementos de una sección alimentan la siguiente).
- Animar solo `transform` y `opacity`. Nunca `top/left/width/height`.
- Respetar `prefers-reduced-motion: reduce`: sin animación de scroll y con contenido visible de inmediato.
- El contenido debe ser legible **sin JavaScript** (estados iniciales ocultos se aplican por JS, no por CSS).
- Limpiar ScrollTriggers en navegaciones y `astro:before-swap` si se usan transiciones de vista.
- Prohibido animar cosas que retrasen el LCP.

## 9. Accesibilidad y performance

- HTML semántico: `header`, `nav`, `main`, `section` (con `aria-labelledby`), `footer`.
- Navegación completa por teclado, foco visible (estilo propio consistente con el diseño).
- El botón flotante de WhatsApp: `aria-label` claro, no debe tapar contenido ni el footer en móvil.
- FAQ como acordeón accesible (`button` + `aria-expanded`).
- Metas Lighthouse (móvil): Performance ≥ 95, Accessibility 100, Best Practices ≥ 95, SEO 100.
- CLS = 0, fuentes con `font-display: swap` y precarga de la fuente display.
- JS mínimo: nada de islas React salvo necesidad real.

## 10. Convenciones de código

- TypeScript estricto. Componentes `.astro` por defecto.
- Nombres de componentes en PascalCase, archivos de utilidades en kebab-case.
- Estilos: clases de Tailwind + tokens; no hardcodear colores hexadecimales fuera de `tokens.css`.
- Mobile-first. Breakpoints de prueba: 360, 768, 1280 px.
- Sin código muerto ni comentarios obsoletos. Commits pequeños, en imperativo (`feat:`, `fix:`, `chore:`).
- El contenido (textos, precios, FAQs) vive en `src/content/`, **no** dentro de los componentes.

## 11. Skills que debe usar el agente

- **Diseño**: `frontend-design` al crear o rediseñar UI; `design:accessibility-review` antes de cerrar cada sección; `design:design-critique` para revisar jerarquía y consistencia.
- **SEO y contenido**: `marketing:seo-audit` al terminar cada página y antes del deploy; `marketing:draft-content` para el copy de servicios.
- Si una skill no está disponible, seguir igualmente las reglas de este archivo.

## 12. Flujo de trabajo del agente

1. Leer `SPEC.md` y la sección relevante de este archivo.
2. Proponer un plan breve si la tarea toca más de un componente.
3. Implementar en cambios pequeños y verificables.
4. Correr `check`, `lint`, `build`, `links` (y `test` si aplica).
5. Revisar visualmente en 360 / 768 / 1280 px.
6. Reportar: qué cambió, qué se verificó y qué queda pendiente.

Si algo de la especificación es ambiguo o falta un dato (precios, textos, número de WhatsApp), **preguntá**; no inventes contenido comercial.

## 13. Definition of Done

- [ ] Cumple lo pedido en `SPEC.md`.
- [ ] Un solo `h1`, jerarquía de headings correcta.
- [ ] Title y meta description únicos.
- [ ] Responsive verificado en 360 / 768 / 1280 px.
- [ ] Sin enlaces rotos, sin errores de consola.
- [ ] Contraste AA y navegación por teclado.
- [ ] Animaciones respetan `prefers-reduced-motion`.
- [ ] `check`, `lint`, `build`, `links` en verde.
- [ ] Lighthouse dentro de las metas.

## 14. Prohibido

- Colores fuera de la paleta, gradientes, blur o sombras suaves.
- Instalar dependencias pesadas sin necesidad.
- Duplicar páginas de servicio en vez de usar la plantilla única.
- Inventar precios, métricas, testimonios o logos de clientes.
- Dejar texto placeholder (`Lorem ipsum`) en producción.
- Modificar `SPEC.md` sin acuerdo explícito.
