# Design: Plantilla de Servicios (Phase 2)

## Architectural Approach

We utilize Astro 5's dynamic static path generation (`getStaticPaths`) with Content Collections to generate all 4 service routes from a single, robust, zero-JS template at `src/pages/servicios/[slug].astro`.

```
                    ┌─────────────────────────┐
                    │  src/content/services/  │
                    │   - landing-pages.md    │
                    │   - tiendanube.md       │
                    │   - tienda-online.md    │
                    │   - software-a-medida.md│
                    └───────────┬─────────────┘
                                │ getCollection('services')
                                ▼
               ┌─────────────────────────────────┐
               │ src/pages/servicios/[slug].astro│
               └────────┬──────────────┬─────────┘
                        │              │
           ┌────────────▼──────┐   ┌───▼────────────────┐
           │ Section Hierarchy │   │ Structured Data    │
           │ 1. Nav            │   │ - Organization     │
           │ 2. Hero + Crumbs  │   │ - Service          │
           │ 3. Qué incluye    │   │ - BreadcrumbList   │
           │ 4. Precios        │   │ - FAQPage          │
           │ 5. Proceso        │   └────────────────────┘
           │ 6. Trust          │
           │ 7. FAQs           │
           │ 8. CTA            │
           │ 9. Footer         │
           └───────────────────┘
```

## Detailed Component Specifications

### 1. Unified Route (`src/pages/servicios/[slug].astro`)
- Dynamic route generation via `getStaticPaths()`:
  ```ts
  export async function getStaticPaths() {
    const services = await getCollection('services');
    return services.map((entry) => ({
      params: { slug: (entry.data.slug || entry.id).replace(/\.md$/, '') },
      props: { entry },
    }));
  }
  ```
- **Breadcrumb Navigation**:
  - Accessible `<nav aria-label="Breadcrumb" class="mb-6 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-500">`
  - Links: `<a href="/" class="hover:text-black">Inicio</a> <span>/</span> <span class="text-orange">Servicios</span> <span>/</span> <span class="text-black">{data.nombre}</span>`
- **Hero Section**:
  - Single `<h1>` with `font-display font-black uppercase text-black text-4xl sm:text-6xl lg:text-7xl leading-tight`.
  - Subtitle (`bajada`) in `text-xl sm:text-2xl text-gray-800 font-medium`.
  - Primary button: WhatsApp inquiry with `encodeURIComponent(data.whatsappMensaje)`.
  - Secondary button: Anchor to `#precios`.
- **"Qué incluye" Section**:
  - `<h2>` title: `Qué incluye el servicio`.
  - Grid of cards: `border-brutal shadow-brutal p-6 sm:p-8 bg-white`.
  - Heading: `<h3>` with orange neo-brutalist checkmark tag (`✔`).
- **"Precios" Section**:
  - `<h2>` title: `Planes y estimaciones`.
  - Subtitle: `Transparencia total. Sin costos ocultos. Adaptado al tamaño de tu proyecto.`
  - 2–3 tiered pricing cards:
    - Normal card: `bg-white border-brutal shadow-brutal`.
    - Featured card (`destacado: true`): `bg-orange/5 border-3 border-orange shadow-[6px_6px_0_var(--orange)]` with "Recomendado" badge.
    - Each plan CTA links to WhatsApp with a pre-filled message:
      `Hola, me interesa el plan "${plan.nombre}" para ${data.nombre}. ¿Podemos coordinar?`
- **"Cómo trabajamos" Section**:
  - If `data.proceso` exists and is non-empty, render the service's custom workflow.
  - If not provided, cleanly reuse `<Process />` from `src/components/sections/Process.astro`.
- **"Confianza" & "FAQs" Sections**:
  - Embed `<Trust />`.
  - Embed `<Accordion />` list for `data.faqs` under `<h2>Preguntas sobre este servicio</h2>`.
- **"CTA Final" & "Footer"**:
  - Embed `<CTASection />`.
  - Embed `<Footer slot="footer" />`.
  - Embed `<WhatsAppFloat message={data.whatsappMensaje} />`.

### 2. SEO & Structured Data Enhancements (`JsonLd.astro` & `Base.astro`)
- Add schema generator for `BreadcrumbList`:
  ```json
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Inicio", "item": siteUrl },
      { "@type": "ListItem", "position": 2, "name": "Servicios", "item": `${siteUrl}#servicios` },
      { "@type": "ListItem", "position": 3, "name": serviceName, "item": currentUrl }
    ]
  }
  ```
- Add schema generator for `Service`:
  ```json
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceName,
    "description": serviceDescription,
    "provider": { "@type": "Organization", "name": "HARNESS STUDIO" },
    "serviceType": serviceName,
    "url": currentUrl
  }
  ```
- In `Base.astro`, receive `service?: { name: string; description: string; url: string }` and `breadcrumbs?: { name: string; item: string }[]` and forward to `<JsonLd />`.

### 3. Content Collections Enrichment (`src/content/services/`)
- **`landing-pages.md`**:
  - Plans: "Landing Express" (1 página, 5 días), "Landing Pro" (A/B testing ready, copywriting, 7 días), "Full Funnel" (Multi-step, tracking avanzado, 12 días).
- **`tiendanube.md`**:
  - Plans: "Custom CSS & Look" (Ajustes visuales, 5 días), "Rediseño Integral" (Plantilla personalizada, UX checkout, 10 días), "Tienda Pro" (Integraciones API, scripts a medida, 15 días).
- **`tienda-online.md`**:
  - Plans: "Catálogo Online" (Hasta 50 productos, checkout simple), "E-commerce Completo" (Mercado Pago, envíos, stock automático), "E-commerce Scale" (Custom features, multi-moneda).
- **`software-a-medida.md`**:
  - Plans: "MVP Rápido" (Panel de gestión o prototipo funcional, 3 semanas), "Aplicación Web Completa" (Arquitectura modular, roles, APIs), "Consultoría & Desarrollo Continuo" (Soporte y evolución por sprint).

## Verification Strategy
1. Automated Playwright test suite `tests/services.spec.ts`:
   - Iterate through all 4 URLs: `/servicios/landing-pages`, `/servicios/tiendanube`, `/servicios/tienda-online`, `/servicios/software-a-medida`.
   - Verify single `<h1>` per page.
   - Verify visual and accessible `<nav aria-label="Breadcrumb">`.
   - Verify presence of "Qué incluye", "Precios", and plan cards.
   - Verify plan CTA links contain URI-encoded text mentioning the plan and service.
   - Verify JSON-LD scripts for `Organization`, `Service`, `BreadcrumbList`, and `FAQPage`.
   - Verify zero horizontal overflow at 360px, 768px, and 1280px.
2. Full build verification: `npm run check && npm run build && npm run links && npm run test`.
