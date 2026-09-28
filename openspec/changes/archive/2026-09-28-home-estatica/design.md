# Design: Home Estática (Phase 1)

## Technical Approach

Build the static homepage for Harness Studio using clean, modular Astro components without client framework islands. All content is driven by Astro Content Collections and strictly constrained by the neo-brutalist design tokens.

## Architecture Decisions

| Decision | Choice | Alternatives Considered | Rationale |
|---|---|---|---|
| **Accordion Component** | HTML `<details>` and `<summary>` | React Accordion, Headless UI | Native browser support; 0 KB JS; accessible by default; styled with neo-brutalist borders. |
| **Mobile Navigation** | Lightweight Vanilla JS toggle | React Dialog, headless UI | Minimal inline script (~15 lines); traps focus; no framework bundle penalty. |
| **Structured Data** | `JsonLd.astro` component | Manual script tags | Reusable, type-safe serialization of Organization and FAQPage schemas. |
| **Card Data Sourcing** | Astro `getCollection('services')` | Hardcoded markup in component | Single source of truth in `src/content/services/`; automatic sync with service pages. |

## Data Flow

```text
src/content/services/*.md ──→ getCollection('services') ──→ ServicesSection.astro
src/content/faqs/*.md     ──→ getCollection('faqs')     ──→ FAQSection.astro & JsonLd.astro
                                                                   │
                                                                   ▼
                                                            src/pages/index.astro
                                                                   │
                                                                   ▼
                                                            Base.astro layout
```

## File Changes

| File | Action | Description |
|---|---|---|
| `src/components/ui/Button.astro` | Create | Neo-brutalist button with `--border`, `--shadow-hard`, and sunken hover. |
| `src/components/ui/Badge.astro` | Create | Angled / sticker badges with high-contrast borders. |
| `src/components/ui/Accordion.astro` | Create | Native accessible accordion with plus/minus indicator. |
| `src/components/ui/WhatsAppFloat.astro` | Create | Floating bottom-right contact button with safe viewport margins. |
| `src/components/ui/Marquee.astro` | Create | Pure CSS marquee text banner. |
| `src/components/seo/JsonLd.astro` | Create | Component to emit JSON-LD for Organization and FAQPage. |
| `src/components/sections/Nav.astro` | Create | Fixed header with brand logo, anchor links, and mobile menu. |
| `src/components/sections/Hero.astro` | Create | Giant display H1, subtitle, and dual CTAs. |
| `src/components/sections/ServicesSection.astro` | Create | 4 service cards with tags, descriptions, and `/servicios/<slug>` links. |
| `src/components/sections/Process.astro` | Create | 5-step numbered development workflow. |
| `src/components/sections/Trust.astro` | Create | 4 credibility blocks highlighting guarantees and real commitments. |
| `src/components/sections/FAQSection.astro` | Create | 6–8 FAQ items rendered via `Accordion.astro`. |
| `src/components/sections/CTASection.astro` | Create | High-impact closing call to action. |
| `src/components/sections/Footer.astro` | Create | Complete site footer with all service links, legal info, and year. |
| `src/content/services/` | Modify | Complete content for the 4 core services. |
| `src/content/faqs/` | Modify | 7 structured FAQ items. |
| `src/pages/index.astro` | Modify | Assemble all 8 sections and structured data. |
| `tests/home.spec.ts` | Create | Playwright tests for sections, single H1, and 360/768/1280px responsive checks. |

## Interfaces / Contracts

```astro
---
// src/components/ui/Button.astro
interface Props {
  href?: string;
  variant?: 'primary' | 'secondary' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  class?: string;
  target?: string;
  rel?: string;
}
---
```

## Testing Strategy

| Layer | What to Test | Approach |
|---|---|---|
| **Type Check** | Collection data and Astro props | `npm run check` (0 errors) |
| **Build Integrity** | Static compilation and sitemap | `npm run build` (0 warnings) |
| **Links Validation** | Internal anchor links and service URLs | `npm run links` (0 broken links) |
| **E2E & Responsive** | 8 sections present, single H1, skip-link, 360px overflow | Playwright test (`tests/home.spec.ts`) |

## Migration / Rollout

No migration required.
