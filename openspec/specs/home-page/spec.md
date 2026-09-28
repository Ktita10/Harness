# home-page Specification

## Purpose

Defines the requirements for the static homepage composition (`src/pages/index.astro`), structured data injection, and full responsive behavior.

## Requirements

### Requirement: Complete Page Assembly and Section Order

The `src/pages/index.astro` page MUST assemble all 8 sections in the exact sequence specified in `SPEC.md` Section 5:
1. `Nav`
2. `Hero`
3. `Services` (`#servicios`)
4. `Process` (`#proceso`)
5. `Trust` (`#confianza`)
6. `FAQ` (`#faq`)
7. `CTA`
8. `Footer`
Plus the fixed `WhatsAppFloat` widget.

#### Scenario: Section ordering validation
- GIVEN the rendered homepage DOM
- WHEN traversing the top-level `<section>` elements within `<main>`
- THEN they SHALL appear in the exact order: Hero, Services, Process, Trust, FAQ, CTA.

### Requirement: Structured Data (JSON-LD)

The homepage MUST emit JSON-LD script tags representing the `Organization` schema and `FAQPage` schema.

#### Scenario: FAQPage schema generation
- GIVEN the FAQ collection rendered on the homepage
- WHEN inspecting `<script type="application/ld+json">` in the HTML document
- THEN a valid JSON-LD graph containing `"@type": "FAQPage"` with question/answer entities SHALL be present.

### Requirement: Responsive Viewport Compliance

The page MUST render without horizontal scrollbars or element clipping across 360px (mobile), 768px (tablet), and 1280px (desktop) viewports.

#### Scenario: Mobile viewport horizontal boundary
- GIVEN a mobile viewport width of 360px
- WHEN inspecting `document.documentElement.scrollWidth` versus `window.innerWidth`
- THEN `scrollWidth` SHALL equal `innerWidth` (zero horizontal overflow).
