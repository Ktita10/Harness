# design-system-tokens Specification

## Purpose

Enforces the neo-brutalist / anti-design aesthetic, strict color palette tokens, high-contrast borders, hard offset shadows, and typography standards.

## Requirements

### Requirement: Neo-Brutalist CSS Token Definitions

The stylesheet `src/styles/tokens.css` MUST define exactly the design tokens specified in `SPEC.md` Section 8:
- Palette: `--black: #0A0A0A`, `--white: #FFFFFF`, `--gray-100: #EDEDED`, `--gray-300: #BDBDBD`, `--gray-500: #8A8A8A`, `--gray-800: #2B2B2B`, and `--orange: #FF5A00`.
- Borders: `--border: 3px solid var(--black)`.
- Shadows: `--shadow-hard: 6px 6px 0 var(--black)` and hover `--shadow-hard-hover: 2px 2px 0 var(--black)`.

#### Scenario: Visual depth restrictions
- GIVEN the stylesheet definitions
- WHEN inspecting elements styled with design tokens
- THEN elements MUST NOT include blur, gradients, or soft drop shadows.

#### Scenario: Button hover state transition
- GIVEN an interactive button styled with `--shadow-hard`
- WHEN the user hovers over the button
- THEN the shadow SHALL reduce to `--shadow-hard-hover` and the element SHALL translate accordingly.

### Requirement: Typography Stack and Local Loading

The typography system MUST load Bricolage Grotesque for display titles and a clean sans-serif for body copy. Fonts MUST be bundled locally via `@fontsource` with `font-display: swap` and link preloads.

#### Scenario: Responsive fluid typography
- GIVEN viewport sizes between 360px and 1280px
- WHEN rendering display headings
- THEN font sizes MUST scale fluidly using `clamp()` without causing horizontal overflow.

### Requirement: Color Contrast and Accent Discipline (WCAG AA)

Every text element MUST achieve a minimum WCAG AA contrast ratio (≥ 4.5:1 for body copy). The orange accent color (`--orange: #FF5A00`) MUST NOT have more than one dominant focal point per screen, and text on top of orange MUST be black (`#0A0A0A`).

#### Scenario: High-contrast accent readability
- GIVEN a component styled with background color `--orange`
- WHEN text is rendered inside the component
- THEN the foreground text color MUST be `--black` (`#0A0A0A`).
