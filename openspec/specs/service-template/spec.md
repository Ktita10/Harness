# Capability: Service Template & Structured Data

## Requirements

### Requirement: Unified Dynamic Service Route
The site SHALL serve all 4 services via a single static template at `src/pages/servicios/[slug].astro` generating static routes for:
- `/servicios/landing-pages`
- `/servicios/tiendanube`
- `/servicios/tienda-online`
- `/servicios/software-a-medida`

#### Scenario: Static route generation
- Given the 4 service documents in `src/content/services/`
- When `astro build` executes
- Then static HTML pages for all 4 paths SHALL be generated under `dist/servicios/*/index.html`
- And no duplicate service page files SHALL exist outside the single template.

### Requirement: 9-Section Semantic Page Structure
Each service page SHALL adhere to the structured order defined in `SPEC.md` Section 6:
1. `Nav` (Fixed header with navigation)
2. `Hero` (Breadcrumbs, service badge, unique single `<h1>`, description, WhatsApp CTA, anchor button to `#precios`)
3. `Qué incluye` (Deliverables grid with clear sub-service descriptions)
4. `Precios` (2–3 pricing tiers with badges, price tags, delivery time, feature bullets, and plan-specific WhatsApp CTAs)
5. `Cómo trabajamos` (Contextual process steps if provided in frontmatter, or global 5-step `<Process />`)
6. `Confianza` (`<Trust />` credibility block)
7. `Preguntas frecuentes` (Service-specific `<Accordion />` items)
8. `CTA final` (Closing conversion block)
9. `Footer` (Standard footer with full links)

#### Scenario: Heading hierarchy and single H1
- Given any service page
- When rendered in the browser
- Then exactly one `<h1>` element SHALL exist on the page within the service Hero
- And all subsequent major section titles SHALL be `<h2>`
- And nested cards (deliverables, plans, process steps, FAQ questions) SHALL be `<h3>` without skipping levels.

### Requirement: Service-Specific Pricing & Pre-Filled WhatsApp CTAs
Each pricing card SHALL provide clear commercial guidance and a pre-configured WhatsApp contact trigger.

#### Scenario: Plan-specific WhatsApp contact link
- Given a user browsing a specific plan (e.g., "Esencial") on a service page (e.g., "Landing Pages")
- When the user clicks the CTA button on that plan card
- Then the link SHALL direct to WhatsApp (`https://wa.me/?text=...`)
- And the query parameter SHALL be URI-encoded with text explicitly mentioning both the plan name and the service name.

### Requirement: Breadcrumb Navigation & Semantics
Each service page SHALL provide both visual and semantic breadcrumb navigation.

#### Scenario: Visual and accessible breadcrumbs
- Given a service page at `/servicios/<slug>`
- When rendered
- Then an accessible navigation element `<nav aria-label="Breadcrumb">` SHALL be visible near the top of the hero
- And it SHALL contain links pointing to Home (`/`) and the current service name.

### Requirement: Structured Data (JSON-LD)
Each service page SHALL include rich structured data embedded in the `<head>` of the document.

#### Scenario: Schema.org entity validation
- Given any service page
- When the page is inspected
- Then `<script type="application/ld+json">` elements SHALL be present
- And they SHALL validate against schema.org definitions for:
  - `Organization` (name, url, logo)
  - `Service` (name, description, provider, serviceType)
  - `BreadcrumbList` (ItemListElement with Home and current service)
  - `FAQPage` (when FAQs are present on that service).

### Requirement: Neo-Brutalist Visual Design & Zero Horizontal Scroll
Each service page SHALL strictly adhere to the neo-brutalist token system (`--border: 3px solid var(--black)`, `--shadow-hard: 6px 6px 0 var(--black)`, `--orange: #FF5A00`).

#### Scenario: Multi-viewport responsiveness
- Given viewports at 360px (mobile), 768px (tablet), and 1280px (desktop)
- When any service page is rendered
- Then the page width SHALL equal the viewport width
- And `document.documentElement.scrollWidth` SHALL equal `document.documentElement.clientWidth` (zero horizontal overflow).
