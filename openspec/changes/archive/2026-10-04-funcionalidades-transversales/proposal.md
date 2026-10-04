# Proposal: Transversal Features & Technical SEO Assets (Phase 3)

## Intent

Implement all transversal features and technical SEO assets defined in `SPEC.md` Section 7 and Phase 3 roadmap. This includes standardizing the floating WhatsApp button across all application routes with contextual messaging and non-obstructive mobile positioning, finalizing the branded 404 error page, generating and declaring the complete favicon asset suite (SVG, PNG 32/192/512, Apple Touch Icon), supplying the branded 1200x630 Open Graph preview card, hardening structured data (JSON-LD) generation, and creating an automated Playwright test suite to verify every functionality.

## Scope

### In Scope
- **Floating WhatsApp Component (`src/components/ui/WhatsAppFloat.astro` & Layout Integration)**:
  - Standardize injection via `src/layouts/Base.astro` ensuring presence on every page (`/`, `/servicios/*`, and `/404`).
  - Contextual default message per route (Home, Service, 404).
  - Mobile responsiveness: non-obstructive positioning (`bottom-4 right-4 sm:bottom-6 sm:right-6`) avoiding overlap with primary content and footer actions.
  - Full keyboard and screen reader accessibility (`aria-label`, `rel="noopener noreferrer"`).
- **Branded 404 Error Page (`src/pages/404.astro`)**:
  - Neo-brutalist styling adhering strictly to tokens (single `<h1>`, `--border`, `--shadow-hard`, `--orange` accent).
  - Clear return actions: "Volver a la Home" and "Ver Servicios".
  - Contextual WhatsApp float ("Hola Harness Studio, me perdí en la web...").
  - Verification that `/404` is omitted from `sitemap-index.xml`.
- **Favicon Asset Suite & Declarations (`public/` & `src/layouts/Base.astro`)**:
  - Generate and serve `favicon.svg`, `favicon-32x32.png`, `favicon-192x192.png`, `favicon-512x512.png`, and `apple-touch-icon.png`.
  - Declare all variants in `<head>` of `Base.astro` with appropriate `sizes`, `type`, and `rel` attributes.
- **Open Graph / Twitter Card Image (`public/og-image.png`)**:
  - Generate branded 1200x630 PNG preview image following neo-brutalist visual identity.
  - Absolute URL resolution in `Base.astro` for both `og:image` and `twitter:image`.
- **Structured Data Hardening (`src/components/seo/JsonLd.astro`)**:
  - Guarantee robust URL resolution (preventing concatenation errors when `siteUrl` lacks a trailing slash).
  - Validate schema output for `Organization`, `Service`, `BreadcrumbList`, and `FAQPage`.
- **Automated Verification Suite (`tests/features.spec.ts`)**:
  - E2E Playwright test suite covering floating WhatsApp across all routes, 404 page rendering and return navigation, favicon/OG meta tag declarations, and JSON-LD validity.

### Out of Scope
- GSAP master timelines and scroll animations (deferred to Phase 4).
- Production deployment and Search Console integration (deferred to Phase 6).

## Capabilities

### New Capabilities
- `transversal-features`: Standardized floating WhatsApp across all routes, branded 404 page, favicon suite, 1200x630 OG preview card, and comprehensive Playwright verification suite.

### Modified Capabilities
- `layout-foundation`: Enhanced `<head>` with full favicon suite and robust absolute URL resolution for OG images and JSON-LD structured data.

## Affected Areas

| Area | Impact | Description |
|---|---|---|
| `public/` | Modified | Add `favicon-32x32.png`, `favicon-192x192.png`, `favicon-512x512.png`, `apple-touch-icon.png`, and `og-image.png` |
| `src/layouts/Base.astro` | Modified | Inject complete favicon `<link>` tags, robust OG absolute URLs, and integrate WhatsApp floating trigger |
| `src/components/ui/WhatsAppFloat.astro` | Modified | Adjust responsive positioning and layout margins for mobile devices |
| `src/pages/404.astro` | Modified | Integrate contextual WhatsApp float and verify single H1 compliance |
| `src/components/seo/JsonLd.astro` | Modified | Fix safe URL concatenation for logo and entity IDs |
| `tests/features.spec.ts` | New | Comprehensive Playwright test suite for all transversal features |

## Risks

| Risk | Likelihood | Mitigation |
|---|---|---|
| Floating WhatsApp button overlapping footer or buttons on mobile | Medium | Use responsive bottom/right padding and test tap target collision on 360px viewport. |
| Incomplete favicon bundle causing browser or mobile bookmark warnings | Low | Provide all 5 standard asset sizes conforming to modern web standards and AGENTS.md. |
| Broken OG image URL if siteUrl is relative or malformed | Low | Use `new URL(path, siteUrl).href` for canonical resolution across all environments. |
| Playwright test port collision with running dev server | Medium | Ensure tests target `preview` server on dedicated port or configure `reuseExistingServer: false` in CI/test runner. |
