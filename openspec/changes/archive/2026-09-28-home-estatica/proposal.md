# Proposal: Home Estática (Phase 1)

## Intent

Implement the complete static homepage for Harness Studio with all 8 specified sections and real marketing content, establishing brand presence and lead-generation channels via WhatsApp without client runtime overhead, strictly adhering to `SPEC.md` and `AGENTS.md`.

## Scope

### In Scope
- Build UI primitives in `src/components/ui/`: `Button.astro`, `Badge.astro`, `Accordion.astro`, `WhatsAppFloat.astro`, and `Marquee.astro`.
- Implement all 8 modular sections in `src/components/sections/`:
  1. `Nav.astro` — Fixed header, logo, navigation links, accessible mobile drawer.
  2. `Hero.astro` — Giant display typography (`h1`), value prop, primary/secondary CTAs.
  3. `ServicesSection.astro` — 4 cards mapped from Astro Content Collections linking to `/servicios/<slug>`.
  4. `Process.astro` — 5-step numbered workflow (Brief → Propuesta → Diseño → Desarrollo → Entrega).
  5. `Trust.astro` — Concrete proof points, guarantees, tech stack commitments (zero fake testimonials).
  6. `FAQSection.astro` — Accessible accordion with 6–8 questions + JSON-LD `FAQPage`.
  7. `CTASection.astro` — High-impact closing call to action.
  8. `Footer.astro` — Complete navigation, service links, social links, and copyright.
- Populate initial content collections for all 4 services and global FAQs in `src/content/`.
- Assemble sections in `src/pages/index.astro`.
- Verify responsive layout at 360px, 768px, and 1280px with Playwright.

### Out of Scope
- Scroll-driven GSAP animations and Lenis smooth scrolling (deferred to Phase 4).
- Dedicated service subpages `src/pages/servicios/[slug].astro` (deferred to Phase 2).
- Dynamic backend form submission.

## Capabilities

### New Capabilities
- `home-sections`: Modular UI primitives and 8 page sections adhering strictly to neo-brutalism tokens.
- `home-page`: Home page composition in `src/pages/index.astro` with single H1, semantic landmarks, and structured JSON-LD.

### Modified Capabilities
- None

## Approach

1. **Component Modularization**: Create atomic UI components (`Button`, `Badge`, `Accordion`) and section components in `src/components/`.
2. **Accessible Native HTML**: Implement the FAQ accordion using native `<details>`/`<summary>` elements with neo-brutalist borders and accessible keyboard navigation.
3. **Data-Driven Services**: Render services directly from Astro's `getCollection('services')` so adding or modifying a service never touches section code.
4. **Performance First**: Zero client-side framework libraries. Keep LCP instantaneous by delivering pure static HTML and CSS.

## Affected Areas

| Area | Impact | Description |
|---|---|---|
| `src/components/ui/` | New | UI building blocks (`Button`, `Badge`, `Accordion`, `WhatsAppFloat`) |
| `src/components/sections/` | New | 8 section components |
| `src/components/seo/JsonLd.astro` | New | Structured data component for Organization & FAQPage |
| `src/content/services/` | Modified | Add remaining 3 services (`tiendanube`, `tienda-online`, `software-a-medida`) |
| `src/content/faqs/` | Modified | Add full suite of 6-8 global FAQ items |
| `src/pages/index.astro` | Modified | Compose the full homepage from sections |
| `tests/home.spec.ts` | New | Comprehensive Playwright test suite for home sections & responsiveness |

## Risks

| Risk | Likelihood | Mitigation |
|---|---|---|
| Unintentional style bloat | Low | Enforce tokens from `tokens.css`; forbid gradients, blur, and soft shadows |
| Heading hierarchy violations | Low | Strict audit: single `h1` in Hero, `h2` for section headings, `h3` for internal cards |

## Rollback Plan

Revert git changes with `git checkout main` or remove branch changes cleanly.

## Dependencies

- Phase 0 foundation (`Base.astro`, `tokens.css`, `services` collection schema).

## Success Criteria

- [ ] All 8 sections render with real, non-placeholder copy.
- [ ] Heading hierarchy contains exactly one `h1` and valid `h2`/`h3` order.
- [ ] Responsive without horizontal scroll at 360px, 768px, and 1280px.
- [ ] `npm run check`, `npm run lint`, `npm run build`, `npm run links`, and `npm run test` pass with 0 errors.
