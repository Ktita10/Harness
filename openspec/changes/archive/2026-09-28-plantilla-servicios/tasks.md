# Tasks: Plantilla de Servicios (Phase 2)

## Review Workload Forecast

| Field | Value |
|---|---|
| Estimated changed lines | ~350 lines |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | single-pr |
| Chain strategy | pending |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: pending
400-line budget risk: Low

## Phase 1: Structured Data & Layout Wiring

- [x] 1.1 Update `src/components/seo/JsonLd.astro` to add `Service` and `BreadcrumbList` schemas.
- [x] 1.2 Update `src/layouts/Base.astro` to accept `service` and `breadcrumbs` props and pass them to `JsonLd`.

## Phase 2: Content Collections Enrichment

- [x] 2.1 Enrich `src/content/services/landing-pages.md` with 3 tiered plans, deliverables, and tailored FAQs.
- [x] 2.2 Enrich `src/content/services/tiendanube.md` with 3 tiered plans, deliverables, and tailored FAQs.
- [x] 2.3 Enrich `src/content/services/tienda-online.md` with 3 tiered plans, deliverables, and tailored FAQs.
- [x] 2.4 Enrich `src/content/services/software-a-medida.md` with 3 tiered plans, deliverables, and tailored FAQs.

## Phase 3: Service Template Architecture

- [x] 3.1 Refactor `src/pages/servicios/[slug].astro` to implement all 9 canonical sections (Nav, Hero with Breadcrumbs, Qué incluye, Precios con planes y enlaces contextuales a WhatsApp, Cómo trabajamos, Confianza, FAQs, CTA final, Footer).

## Phase 4: Automated Verification

- [x] 4.1 Create `tests/services.spec.ts` verifying all 4 routes, single H1, breadcrumbs, plan-specific WhatsApp links, JSON-LD schemas, and viewport responsiveness (360px, 768px, 1280px).
- [x] 4.2 Run `check`, `lint`, `build`, `links`, and `test` to achieve 100% green verification.
