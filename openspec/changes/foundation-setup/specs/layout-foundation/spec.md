# layout-foundation Specification

## Purpose

Defines the semantic HTML5 layout structure, technical SEO tags, local font preloads, and accessibility requirements for `src/layouts/Base.astro`.

## Requirements

### Requirement: Semantic HTML5 Structure and Language Declaration

The layout `Base.astro` MUST define the document structure containing `<html lang="es-AR">`, `<head>`, `<header>`, `<main id="main-content">`, and `<footer>`.

#### Scenario: Heading hierarchy and single H1
- GIVEN a page rendered using `Base.astro`
- WHEN evaluating the DOM heading tree
- THEN exactly one `<h1>` element MUST be present on the page.

#### Scenario: Semantic landmarks
- GIVEN a page rendered using `Base.astro`
- WHEN inspecting ARIA landmarks
- THEN `<header>`, `<main>`, and `<footer>` elements SHALL be present with appropriate roles.

### Requirement: Technical SEO and Metadata Tags

The `<head>` section of `Base.astro` MUST inject:
- `<link rel="canonical">` with an absolute canonical URL
- Dynamic `<title>` (≤ 60 chars) and `<meta name="description">` (≤ 155 chars)
- Viewport configuration: `width=device-width, initial-scale=1`
- Open Graph (`og:title`, `og:description`, `og:type`, `og:url`, `og:image`)
- Twitter Cards (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`)
- Favicon links (`favicon.svg`, apple touch icon)

#### Scenario: Absolute canonical link generation
- GIVEN a request for route `/servicios/landing-pages`
- WHEN the page HTML is generated
- THEN the canonical link href MUST be an absolute URL ending with `/servicios/landing-pages`.

### Requirement: Accessible Skip Navigation

The layout MUST provide a keyboard-accessible "Skip to content" link as the first focusable element on the page.

#### Scenario: Keyboard focus activation
- GIVEN a keyboard-only user navigating the page with Tab key
- WHEN the first focus event triggers
- THEN the skip link MUST become visible on screen with high-contrast outline and link directly to `#main-content`.
