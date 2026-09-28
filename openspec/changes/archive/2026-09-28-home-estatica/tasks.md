# Tasks: Home Estática (Phase 1)

## Review Workload Forecast

| Field | Value |
|---|---|
| Estimated changed lines | ~450 lines |
| 400-line budget risk | Medium |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | single-pr |
| Chain strategy | pending |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: pending
400-line budget risk: Medium

## Phase 1: Content Collections Population

- [x] 1.1 Complete all 4 service markdown files in `src/content/services/` (`landing-pages.md`, `tiendanube.md`, `tienda-online.md`, `software-a-medida.md`).
- [x] 1.2 Populate 7 global FAQ items in `src/content/faqs/`.

## Phase 2: UI Primitives & SEO Helpers

- [x] 2.1 Create `src/components/ui/Button.astro` with variants (`primary`, `secondary`, `dark`), `--border`, and sunken hover.
- [x] 2.2 Create `src/components/ui/Badge.astro` for tags and status stickers.
- [x] 2.3 Create `src/components/ui/Accordion.astro` with native accessible `<details>`/`<summary>`.
- [x] 2.4 Create `src/components/ui/WhatsAppFloat.astro` with bottom-right floating position and safe mobile margins.
- [x] 2.5 Create `src/components/ui/Marquee.astro` for pure CSS ticker banner.
- [x] 2.6 Create `src/components/seo/JsonLd.astro` for `Organization` and `FAQPage` schemas.

## Phase 3: Section Components

- [x] 3.1 Create `src/components/sections/Nav.astro` with logo, navigation links, and accessible mobile drawer.
- [x] 3.2 Create `src/components/sections/Hero.astro` with giant display typography, single `h1`, and dual CTAs.
- [x] 3.3 Create `src/components/sections/ServicesSection.astro` rendering 4 cards from Astro Content Collections.
- [x] 3.4 Create `src/components/sections/Process.astro` with 5-step numbered workflow.
- [x] 3.5 Create `src/components/sections/Trust.astro` with 4 credibility blocks (performance guarantee, clean code, transparent pricing, direct WhatsApp).
- [x] 3.6 Create `src/components/sections/FAQSection.astro` rendering the FAQs with accordions.
- [x] 3.7 Create `src/components/sections/CTASection.astro` with high-impact closing call to action.
- [x] 3.8 Create `src/components/sections/Footer.astro` with full navigation, 4 service links, and copyright.

## Phase 4: Integration & Verification

- [x] 4.1 Assemble all 8 sections and structured data into `src/pages/index.astro`.
- [x] 4.2 Create `tests/home.spec.ts` testing 8 sections, single H1, and responsiveness at 360px, 768px, and 1280px.
- [x] 4.3 Run `check`, `lint`, `build`, `links`, and `test` to achieve 100% green verification.
