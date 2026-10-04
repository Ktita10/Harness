# Tasks: Transversal Features & Technical SEO Assets (Phase 3)

## Review Workload Forecast

| Field | Value |
|---|---|
| Estimated changed lines | ~280 lines |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | single-pr |
| Chain strategy | pending |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: pending
400-line budget risk: Low

## Phase 1: Asset Suite Generation

- [x] 1.1 Create `scripts/generate-assets.py` using Python Pillow to programmatically generate pixel-perfect PNG assets adhering to brand color tokens (`#0A0A0A`, `#FFFFFF`, `#FF5A00`).
- [x] 1.2 Generate `public/favicon-32x32.png`, `public/favicon-192x192.png`, `public/favicon-512x512.png`, and `public/apple-touch-icon.png`.
- [x] 1.3 Generate 1200x630 branded social share image `public/og-image.png`.

## Phase 2: Layout, Metadata & Structured Data Hardening

- [x] 2.1 Update `src/layouts/Base.astro` to declare the full set of favicon `<link>` tags (`svg`, `32x32`, `192x192`, `512x512`, `apple-touch-icon`).
- [x] 2.2 Update `src/layouts/Base.astro` to add explicit `og:image:width`, `og:image:height`, and `og:image:alt` tags.
- [x] 2.3 Centralize `<WhatsAppFloat>` inside `src/layouts/Base.astro` accepting an optional `whatsappMessage` prop.
- [x] 2.4 Update `src/components/ui/WhatsAppFloat.astro` with responsive spacing (`bottom-4 right-4 sm:bottom-6 sm:right-6`) and touch targets.
- [x] 2.5 Fix logo URL resolution in `src/components/seo/JsonLd.astro` using `new URL('/favicon.svg', siteUrl).href`.

## Phase 3: Route Alignment & 404 Polish

- [x] 3.1 Update `src/pages/404.astro` to pass contextual WhatsApp message to `Base` and ensure single `<h1>` hierarchy.
- [x] 3.2 Remove redundant manual `<WhatsAppFloat />` instances from `src/pages/index.astro` and `src/pages/servicios/[slug].astro`.
- [x] 3.3 Verify that `/404` is excluded from `sitemap-index.xml`.

## Phase 4: Automated Verification & Test Runner

- [x] 4.1 Update `playwright.config.ts` to isolate test server on port 4322 (`reuseExistingServer: false`) preventing collision with local dev servers.
- [x] 4.2 Create `tests/features.spec.ts` testing floating WhatsApp across all routes, 404 error page, favicon links, OG image preview, and JSON-LD validity.
- [x] 4.3 Run `check`, `lint`, `build`, `links`, and `test` to achieve 100% green verification across desktop and mobile viewports.
