# SPEC — Web de HARNESS STUDIO

Versión 1.0 · Documento de especificación funcional, de diseño y técnica.

---

## 1. Resumen

HARNESS STUDIO es una startup dedicada al desarrollo web y de software. Este proyecto construye su sitio oficial: una **Home** y **cuatro páginas de servicio**, con estilo neo-brutalista / anti-diseño, animaciones entrelazadas entre secciones y una base de SEO técnico sólida.

### Objetivos

1. Presentar la marca y sus servicios de forma memorable.
2. Convertir visitas en contactos (WhatsApp como canal principal).
3. Posicionar cada servicio en buscadores con una página dedicada.
4. Tener una base escalable: sumar un servicio o sección no debe requerir rehacer nada.

### Fuera de alcance (v1)

- Blog, panel de administración, multiidioma, pasarela de pago, área de clientes.
- Formulario con backend (ver pregunta abierta P3).

---

## 2. Público y propuesta

- **Público**: pymes, emprendedores y comercios que necesitan una web, vender online o digitalizar un proceso.
- **Propuesta de valor**: web y software hechos a medida, con proceso claro, precios visibles y comunicación directa.
- **Tono de copy**: directo, claro, concreto.

---

## 3. Servicios

| # | Servicio | Slug | Para quién |
|---|---|---|---|
| 1 | Landing pages | `/servicios/landing-pages` | Quien necesita presencia o captar leads rápido |
| 2 | Personalización de Tienda Nube | `/servicios/tiendanube` | Quien ya vende en Tienda Nube y quiere una tienda distinta |
| 3 | Tienda online | `/servicios/tienda-online` | Quien quiere lanzar o migrar su tienda |
| 4 | Software a medida | `/servicios/software-a-medida` | Quien necesita automatizar o digitalizar procesos |

---

## 4. Mapa del sitio

```
/                                  Home
├─ /servicios/landing-pages
├─ /servicios/tiendanube
├─ /servicios/tienda-online
└─ /servicios/software-a-medida
/404
/robots.txt
/sitemap-index.xml
```

---

## 5. Home — especificación por sección

Orden fijo. Cada sección es un componente independiente en `src/components/sections/`.

| Sección | Contenido | Notas |
|---|---|---|
| **Nav** | Logo, enlaces a Servicios, Cómo trabajamos, Confianza, FAQ y botón de contacto | Fija, menú móvil a pantalla completa, foco visible |
| **Hero** | `h1` con tipografía gigante, subtítulo de una línea, CTA principal (WhatsApp) y secundario (ver servicios) | Es el LCP: sin animaciones que lo retrasen |
| **Servicios que ofrecemos** | 4 tarjetas, una por servicio, con título, una línea de descripción y enlace a su página | Se generan desde la collection `services` |
| **Cómo trabajamos** | Proceso en pasos numerados (sugerido: Brief → Propuesta → Diseño → Desarrollo → Entrega y soporte) | Numeración grande, una animación por paso |
| **Confianza** | Bloque de credibilidad: cifras, garantías, tecnologías, compromisos | Solo datos reales; ver P4 |
| **FAQ** | Acordeón con 6–8 preguntas frecuentes | Emite JSON-LD `FAQPage` |
| **CTA** | Llamado final con botón de WhatsApp | Un solo objetivo por pantalla |
| **Footer** | Logo, navegación, servicios, contacto, redes, año | Enlaces a las 4 páginas de servicio |

---

## 6. Página de servicio — especificación

Todas las páginas se generan con **una plantilla única** (`src/pages/servicios/[slug].astro`) alimentada por `src/content/services/<slug>.md`.

**Estructura** (igual que la Home, más la sección de precios):

1. Nav
2. Hero del servicio (`h1` propio, descripción, CTA con mensaje de WhatsApp específico)
3. **Qué incluye** (versión del bloque "Servicios" adaptada: sub-servicios y entregables de ese servicio)
4. **Precios** ← *sección adicional*
5. Cómo trabajamos (puede heredar el proceso global o sobreescribirlo)
6. Confianza
7. FAQ (específica del servicio)
8. CTA
9. Footer

### Sección de precios

- Planes o paquetes por servicio (sugerido: 2–3 planes por servicio) y, cuando aplique, extras individuales.
- Cada plan: nombre, precio (o "desde"), qué incluye, tiempo estimado y botón de contacto que abre WhatsApp con el plan preseleccionado en el mensaje.
- Los precios viven en el contenido, nunca en el componente.
- Moneda y criterio (ARS/USD, IVA, actualización) a definir; ver P1.

### Esquema del contenido (collection `services`)

```ts
{
  slug: string,
  nombre: string,
  metaTitle: string,        // ≤ 60
  metaDescription: string,  // ≤ 155
  h1: string,
  bajada: string,
  incluye: { titulo: string, descripcion: string }[],
  planes: {
    nombre: string,
    precio: string,          // texto: "Desde $X"
    incluye: string[],
    plazo: string,
    destacado?: boolean
  }[],
  proceso?: { titulo: string, descripcion: string }[],
  faqs: { pregunta: string, respuesta: string }[],
  whatsappMensaje: string
}
```

---

## 7. Funcionalidades transversales

| Función | Requisito |
|---|---|
| **WhatsApp flotante** | Botón fijo abajo a la derecha, en todas las páginas. Enlace `https://wa.me/<número>?text=<mensaje>` con mensaje distinto según la página. `aria-label` claro; no tapa el footer ni el contenido en móvil |
| **robots.txt** | Permite todo, declara el sitemap |
| **Sitemap** | Generado en build con `@astrojs/sitemap`, excluye `/404` |
| **404** | Página propia con el estilo de marca y enlaces de regreso a Home y servicios |
| **Responsive** | Mobile-first, verificado en 360 / 768 / 1280 px, sin scroll horizontal |
| **Jerarquía de headings** | Un `h1` por página; `h2` para secciones; `h3` para elementos internos; sin saltos |
| **Jerarquía de títulos y contenido** | Cada sección abre con un título claro y un texto de apoyo breve; el contenido más importante va primero |
| **Favicon** | SVG + PNG 32/192/512 + apple-touch-icon |
| **Meta description** | Única por página |
| **Open Graph / Twitter** | Imagen 1200×630 por defecto, editable por página |
| **JSON-LD** | Organization, Service, FAQPage, BreadcrumbList |
| **Enlaces rotos** | Verificación automática sobre el build; debe dar cero errores |
| **Canonical** | Absoluta en cada página |

---

## 8. Diseño

**Dirección**: neo-brutalismo / anti-diseño. Tipografía grande y creativa, composición audaz, sin excesos de profundidad.

### Paleta

| Token | Valor | Uso |
|---|---|---|
| `--black` | `#0A0A0A` | Texto, bordes, fondos oscuros |
| `--white` | `#FFFFFF` | Fondos, texto sobre negro |
| `--gray-100` | `#EDEDED` | Fondos alternos |
| `--gray-300` | `#BDBDBD` | Bordes secundarios |
| `--gray-500` | `#8A8A8A` | Texto de apoyo |
| `--gray-800` | `#2B2B2B` | Fondos oscuros secundarios |
| `--orange` | `#FF5A00` | Acento (un foco por pantalla) |

### Lenguaje visual

- Bordes negros gruesos (3–4 px).
- Sombras duras con offset y sin blur (`6px 6px 0 #000`) como única profundidad.
- Botones que se "hunden" al hover.
- Stickers o etiquetas rotadas, marquees de texto, numeración grande y grillas visibles.
- Bloques de color plano.
- Sin gradientes, sin blur, sin sombras suaves, sin efectos 3D.

### Tipografía

- Una familia display de gran tamaño para titulares (fluida con `clamp()`, interlineado ajustado, mayúsculas permitidas) y una familia simple y legible para el cuerpo. Máximo 2 familias.
- Candidatas display: Bricolage Grotesque, Anton, Unbounded, Space Grotesk. La elección final se valida en el prototipo (P2).

### Accesibilidad visual

- Contraste WCAG AA en todo texto (sobre naranja se usa negro).
- Foco visible con estilo propio.
- Tamaño mínimo de texto de cuerpo: 16 px.

---

## 9. Animaciones

- Librerías: GSAP (ScrollTrigger, Flip) y Lenis para scroll suave.
- **Entrelazadas**: cada página tiene un timeline maestro; las secciones se solapan ~20–30% y los elementos de una sección alimentan la siguiente (por ejemplo, el texto del Hero se transforma en el marquee de Servicios).
- Reveals de texto por línea, contadores en Confianza, acordeón animado en FAQ.
- Solo `transform` y `opacity`.
- `prefers-reduced-motion: reduce` desactiva las animaciones de scroll y muestra todo el contenido de inmediato.
- El sitio es legible y navegable sin JavaScript.

---

## 10. Requisitos no funcionales

| Área | Meta |
|---|---|
| Performance (móvil) | Lighthouse ≥ 95, LCP < 2,5 s, CLS = 0, INP < 200 ms |
| Accesibilidad | Lighthouse 100, navegación completa por teclado |
| SEO | Lighthouse 100, una sola `h1`, metadatos únicos, datos estructurados válidos |
| Compatibilidad | Últimas 2 versiones de Chrome, Safari, Firefox y Edge; iOS Safari y Chrome Android |
| Peso | JS inicial lo más bajo posible; imágenes en AVIF/WebP |
| Mantenibilidad | Contenido separado del código, plantilla única de servicio |

---

## 11. Stack y despliegue

- Astro (estático) + Tailwind + GSAP + Lenis.
- Content Collections para servicios y FAQs.
- Playwright para tests de humo y responsive.
- Despliegue en Vercel con previews por rama y dominio propio.
- Integración con Google Search Console y analítica (ver P5).

---

## 12. Plan por fases

| Fase | Entregable | Criterio de aceptación |
|---|---|---|
| **0. Fundaciones** | Repo, `AGENTS.md`, `SPEC.md`, skills, tokens, `Base.astro` | `build` en verde, tokens y tipografía aplicados |
| **1. Home estática** | Las 8 secciones con contenido real, sin animación | Responsive OK, un `h1`, Lighthouse dentro de metas |
| **2. Plantilla de servicio** | `[slug].astro` + collection + 4 servicios con precios | Las 4 páginas se generan desde contenido |
| **3. Funcionalidades** | WhatsApp flotante, 404, favicon, OG, JSON-LD | Cada una verificada por test |
| **4. Animaciones** | Timeline maestro por página, reduced-motion | Sin regresión de performance ni de CLS |
| **5. SEO y QA** | `robots.txt`, sitemap, revisión SEO, enlaces rotos, accesibilidad | Cero enlaces rotos, Lighthouse en metas |
| **6. Lanzamiento** | Deploy, dominio, Search Console | Sitio en producción, sitemap enviado |

---

## 13. Criterios de aceptación globales

- [ ] Home con las 8 secciones y 4 páginas de servicio con sección de precios.
- [ ] Cada servicio enlazado desde Home, Nav y Footer.
- [ ] WhatsApp flotante funcional en todas las páginas, con mensaje contextual.
- [ ] `robots.txt`, sitemap, 404, favicon y meta description en todas las páginas.
- [ ] Jerarquía de headings válida (un `h1` por página).
- [ ] Responsive sin scroll horizontal en 360 / 768 / 1280 px.
- [ ] Cero enlaces rotos.
- [ ] Paleta y estilo respetados (sin gradientes, blur ni sombras suaves).
- [ ] Animaciones entrelazadas y con `prefers-reduced-motion`.
- [ ] Lighthouse dentro de las metas.

---

## 14. Riesgos

| Riesgo | Mitigación |
|---|---|
| Animaciones pesadas que afecten performance | Solo `transform`/`opacity`, presupuesto de JS, pruebas en móvil |
| Tipografía display que dañe la legibilidad en móvil | `clamp()` con mínimos, pruebas en 360 px |
| Precios desactualizados | Viven en contenido, un único lugar de edición |
| Contenido comercial inventado | Regla explícita: no se inventan métricas, clientes ni testimonios |

---

## 15. Preguntas abiertas

- **P1.** ¿Precios y moneda (ARS/USD), y si se muestran "desde" o cerrados? ¿Cuántos planes por servicio?
- **P2.** ¿Tipografía display definitiva? (Se propone probar 2–3 en un prototipo del Hero.)
- **P3.** ¿Solo WhatsApp como contacto, o también formulario/correo?
- **P4.** ¿Qué datos reales hay para la sección Confianza (proyectos, clientes, años, tecnologías)?
- **P5.** ¿Analítica a usar (Plausible, GA4, otra)?
- **P6.** ¿Dominio definitivo y número de WhatsApp?
- **P7.** ¿Logo de HARNESS STUDIO ya definido o se diseña dentro del proyecto?
