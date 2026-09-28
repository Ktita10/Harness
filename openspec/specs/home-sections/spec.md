# home-sections Specification

## Purpose

Defines the requirements for the reusable UI primitives and the 8 modular page sections that constitute the Harness Studio homepage.

## Requirements

### Requirement: Fixed Accessible Navigation (Nav)

The system MUST provide a fixed top navigation bar containing the brand logo, navigation links (`Servicios`, `Cómo trabajamos`, `Confianza`, `FAQ`), a primary WhatsApp contact button, and an accessible mobile menu drawer.

#### Scenario: Desktop navigation rendering
- GIVEN viewport width ≥ 1024px
- WHEN rendering the navigation bar
- THEN navigation links and the WhatsApp CTA button SHALL be visible, and the mobile hamburger toggle SHALL be hidden.

#### Scenario: Mobile drawer toggle
- GIVEN viewport width < 768px
- WHEN the user activates the mobile menu button
- THEN the mobile navigation overlay SHALL open with accessible `aria-expanded` state update and full keyboard focus trapping.

### Requirement: Hero Section & Single H1 Authority

The Hero section MUST render the primary value proposition with a single `<h1>` tag in fluid display typography (`clamp()`), supporting subtitle, primary WhatsApp CTA, and secondary internal anchor link to `#servicios`.

#### Scenario: Primary heading hierarchy
- GIVEN the Hero section rendered on the page
- WHEN evaluating the DOM heading level
- THEN exactly one `<h1>` element SHALL be emitted in the Hero section.

#### Scenario: Secondary scroll anchor
- GIVEN the secondary CTA in the Hero
- WHEN clicked by the user
- THEN it SHALL target the `#servicios` section identifier.

### Requirement: Content-Driven Services Grid

The Services section MUST retrieve the 4 core services (`landing-pages`, `tiendanube`, `tienda-online`, `software-a-medida`) from Astro Content Collections and display each as a distinct neo-brutalist card with title, description, and link to its dedicated service slug (`/servicios/<slug>`).

#### Scenario: Four services rendered from collection
- GIVEN the services content collection populated with the 4 services
- WHEN the Services section renders
- THEN exactly 4 service cards SHALL be present with links matching `/servicios/<slug>`.

### Requirement: Numbered Process Section

The Process section MUST render the 5 linear workflow steps (Brief, Propuesta, Diseño, Desarrollo, Entrega y soporte) with bold numerical indicators and clear descriptions.

#### Scenario: Step sequencing
- GIVEN the Process section
- WHEN rendered in the browser
- THEN 5 distinct numbered steps SHALL be displayed in sequential order from 1 to 5.

### Requirement: Trust and Credibility Proofs

The Trust section MUST present verifiable credibility commitments (performance guarantees, clean code ownership, transparent pricing, direct WhatsApp communication) without fake customer reviews or unverified logos.

#### Scenario: Authentic commitments display
- GIVEN the Trust section
- WHEN inspected
- THEN all claims MUST represent verifiable operational policies and technical guarantees.

### Requirement: Accessible Accordion FAQs

The FAQ section MUST render 6 to 8 frequently asked questions using accessible accordion semantics (`<details>` and `<summary>` or `aria-expanded` buttons).

#### Scenario: Keyboard accordion expansion
- GIVEN an accordion item in the FAQ section
- WHEN the user presses Enter or Space on the summary trigger
- THEN the content panel SHALL expand and reveal the answer text.

### Requirement: Floating WhatsApp Widget

A floating WhatsApp contact button MUST be fixed to the bottom-right corner of the screen across all pages, with an accessible `aria-label`, high contrast, and safe margins preventing overlap with mobile footers.

#### Scenario: Floating button accessibility
- GIVEN the page rendered in any viewport
- WHEN inspecting the floating WhatsApp element
- THEN it MUST have an explicit `aria-label="Contactar por WhatsApp"` and `rel="noopener noreferrer"`.
