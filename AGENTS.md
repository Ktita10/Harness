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

El sitio se construye sobre un sistema de diseño modular, escalable y guiado por tokens en `src/styles/tokens.css`. La arquitectura visual no está acoplada a una estética fija, sino que sirve de guía para cualquier dirección de diseño que se defina, priorizando coherencia, jerarquía y accesibilidad.

### Tokens (fuente única en `src/styles/tokens.css`)

Toda propiedad visual (colores, tipografía, espaciado, bordes, radios y sombras) debe declararse mediante variables CSS y consumirse a través de Tailwind:

```css
:root {
  /* Paleta semántica y neutros */
  --bg-primary: #FFFFFF;
  --bg-secondary: #F8F9FA;
  --text-primary: #0A0A0A;
  --text-muted: #6B7280;
  --accent: #FF5A00;
  --accent-contrast: #FFFFFF;

  /* Superficies, bordes y elevación */
  --border-color: #E5E7EB;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --shadow-subtle: 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-card: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
```

*Nota: Los valores concretos de los tokens se adaptan a la identidad visual acordada, pero siempre deben consumirse centralizadamente.*

### Reglas

- **Fidelidad al sistema de tokens**: Prohibido hardcodear colores, espaciados o estilos arbitrarios en los componentes. Toda propiedad visual debe provenir de `tokens.css` o del tema de Tailwind.
- **Componentes reutilizables**: Construir mediante componentes atómicos y modulares (botones, tarjetas, badges, contenedores) con variantes claras y consistentes.
- **Jerarquía y ritmo visual**: Cada pantalla debe tener un punto focal claro. Mantener una escala tipográfica coherente y espaciados armónicos para asegurar legibilidad y orden.
- **Estados interactivos**: Botones, enlaces e interactivos deben contar con estados claros de hover, active y focus visible, manteniendo coherencia de respuesta en todo el sitio.
- **Tipografía**: Máximo 2 familias tipográficas (titulares y cuerpo de texto). Titulares con escala fluida (`clamp()`) y cuerpo optimizado para legibilidad (mínimo 16px).
- **Accesibilidad visual**: Garantizar ratio de contraste WCAG AA en todas las combinaciones de texto y fondo.
- **Adaptabilidad responsive**: Diseño mobile-first con verificación obligatoria en 360, 768 y 1280 px.

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

- Colores, espaciados o estilos hardcodeados fuera del sistema de tokens (`tokens.css`) o Tailwind.
- Romper la coherencia visual del sistema de diseño acordado con estilos ad-hoc.
- Instalar dependencias pesadas sin necesidad.
- Duplicar páginas de servicio en vez de usar la plantilla única.
- Inventar precios, métricas, testimonios o logos de clientes.
- Dejar texto placeholder (`Lorem ipsum`) en producción.
- Modificar `SPEC.md` sin acuerdo explícito.
