# Proposal: Plantilla de Servicios (Phase 2)

## Intent

Implement the full dynamic service page architecture at `/servicios/[slug]` driven entirely by Astro Content Collections (`src/content/services/`), strictly fulfilling `SPEC.md` and `AGENTS.md`. Each service page will feature an accessible, single-H1 neo-brutalist layout with service-specific hero, deliverables grid ("Qué incluye"), multi-tier pricing section with pre-filled WhatsApp links, contextual workflow, trust signals, service-specific FAQs, and structured data (`Service`, `BreadcrumbList`, `Organization`, and `FAQPage`).

## Scope

### In Scope
- **Unified Dynamic Route (`src/pages/servicios/[slug].astro`)**:
  - Semantic breadcrumb navigation: Home (`/`) > Servicios > `[Service Name]`.
  - Service Hero: Unique `<h1>`, subtitle, service badge, and dual CTAs (direct WhatsApp enquiry & anchor to `#precios`).
  - "Qué incluye": Deliverables & sub-services grid with neo-brutal checkboxes.
  - "Precios y planes": 2–3 tiered packages per service with badge, pricing/timing, included bullets, and plan-specific WhatsApp CTAs.
  - "Cómo trabajamos": Contextual process steps if provided by collection; fallback to global `<Process />`.
  - "Confianza": Integration of `<Trust />`.
  - "Preguntas frecuentes": Service-specific FAQ accordion using accessible `<Accordion />`.
  - "CTA final": High-impact closing call to action before footer.
- **Structured Data & SEO (`src/components/seo/JsonLd.astro` & `src/layouts/Base.astro`)**:
  - Add schema support for `Service` (provider, name, description, offers).
  - Add schema support for `BreadcrumbList` (Home -> Service).
  - Inject both alongside `Organization` and `FAQPage` in `<head>`.
  - Ensure canonical URL, Open Graph, and Twitter metadata per service.
- **Content Collections Enrichment (`src/content/services/`)**:
  - Enrich all 4 services (`landing-pages`, `tiendanube`, `tienda-online`, `software-a-medida`) with 2–3 concrete plans, realistic Argentine market phrasing ("Consultar" / "Desde $X"), deliverables, and tailored FAQs.
- **Automated Verification**:
  - `tests/services.spec.ts` testing all 4 generated routes, H1 hierarchy, breadcrumbs, pricing WhatsApp buttons, JSON-LD schemas, and viewport responsiveness (360px, 768px, 1280px).

### Out of Scope
- Global animations with GSAP ScrollTrigger and Lenis smooth scrolling (deferred to Phase 3).
- Client-side currency converter or e-commerce checkout.

## Capabilities

### New Capabilities
- `service-template`: Unified dynamic page template rendering all 4 service routes from Markdown collections with full SEO, breadcrumbs, pricing plans, and contextual WhatsApp CTAs.
- `service-structured-data`: Rich JSON-LD generation for `Service` and `BreadcrumbList` in `JsonLd.astro`.

### Modified Capabilities
- `content-collections-schema`: Enhanced content in `src/content/services/` with comprehensive tiers and deliverables conforming to existing Zod schema.

## Affected Areas

| Area | Impact | Description |
|---|---|---|
| `src/pages/servicios/[slug].astro` | Modified | Expand into full 9-part section template conforming to `SPEC.md` |
| `src/components/seo/JsonLd.astro` | Modified | Add `Service` and `BreadcrumbList` schema generators |
| `src/layouts/Base.astro` | Modified | Support passing `service` and `breadcrumbs` props to `JsonLd` |
| `src/content/services/*.md` | Modified | Populate full plan tiers, deliverables, and FAQs for all 4 services |
| `tests/services.spec.ts` | New | Comprehensive Playwright test suite for service pages |

## Risks

| Risk | Likelihood | Mitigation |
|---|---|---|
| Inconsistent slugs between links and files | Low | Strict routing contract: `getStaticPaths` uses `(entry.data.slug || entry.id).replace(/\.md$/, '')`. Verified via `npm run links`. |
| Missing or duplicate H1 | Low | Single `<h1>` in Service Hero; all section titles use `<h2>` with inner `<h3>`. Checked in Playwright suite. |
| Malformed WhatsApp URL encoding | Low | Use standard `encodeURIComponent` for all plan-specific and general WhatsApp message parameters. |
| Schema validation errors | Low | Validate JSON-LD output structure against schema.org specification in Playwright test suite. |
