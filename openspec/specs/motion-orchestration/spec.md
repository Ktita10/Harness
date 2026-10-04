# Capability: Motion Orchestration & Animations

## Requirements

### Requirement: Smooth Scroll Integration with Lenis
The application SHALL provide smooth scrolling powered by Lenis, unified with GSAP ScrollTrigger ticker.

#### Scenario: Lenis initialization and scroll synchronization
- GIVEN the site is loaded on a client browser where motion is permitted
- WHEN scrolling through the page
- THEN Lenis SHALL smoothly interpolate the scroll position
- AND Lenis scroll events SHALL notify `ScrollTrigger.update()`
- AND Lenis animation frames SHALL be driven by GSAP ticker.

#### Scenario: Smooth scroll bypass on reduced motion
- GIVEN a user with `prefers-reduced-motion: reduce` enabled
- WHEN the page loads
- THEN Lenis SHALL NOT be instantiated or SHALL be disabled immediately
- AND native browser scrolling behavior SHALL be preserved.

### Requirement: Progressive Enhancement and No-JS Legibility
The site SHALL be fully legible and interactable when JavaScript is disabled or fails to load.

#### Scenario: Rendering without JavaScript
- GIVEN a client browser with JavaScript disabled (`javaScriptEnabled: false`)
- WHEN navigating to any page (Home, Service pages, 404)
- THEN all text content, headings, and cards SHALL be 100% visible (`opacity: 1`)
- AND no content SHALL be hidden offscreen or clipped (`visibility: visible`, `display: block|flex|grid`)
- AND all interactive links and buttons SHALL function normally.

### Requirement: Non-Blocking Master Timeline and Section Animations
The site SHALL organize animations into modular section modules linked by a master page timeline with 20–30% overlap between adjacent sections.

#### Scenario: Scroll-driven entrance reveals
- GIVEN a visitor scrolling through the home or service page
- WHEN a section enters the viewport threshold (`top 80%` or similar)
- THEN elements within that section SHALL animate into view using exclusively `transform` and `opacity`
- AND adjacent sections SHALL overlap their trigger windows by approximately 20–30%
- AND no animation SHALL mutate layout-triggering properties (`top`, `left`, `width`, `height`).

#### Scenario: Metric counters in Trust section
- GIVEN the Trust section enters viewport
- WHEN the animation trigger fires
- THEN metric figures (e.g. `95+`, `100%`, `0`) SHALL animate from 0 up to their target values over 1.2–1.8 seconds
- AND if animations are disabled or interrupted, the target values SHALL remain displayed without rounding errors.

### Requirement: Strict Reduced-Motion Compliance
The site MUST respect the user's operating system accessibility setting for reduced motion.

#### Scenario: Instant display on reduced motion
- GIVEN `prefers-reduced-motion: reduce` is active
- WHEN any page is visited or scrolled
- THEN no scroll-triggered entrance tweens SHALL execute
- AND all text reveals, counters, and cards SHALL render directly in their final resting state
- AND no performance penalty or layout shift SHALL occur.

### Requirement: Automated Verification
The motion system SHALL be validated via automated Playwright tests in `tests/animations.spec.ts`.

#### Scenario: Motion test suite execution
- GIVEN `tests/animations.spec.ts`
- WHEN `npx playwright test tests/animations.spec.ts` executes
- THEN all tests verifying no-JS legibility, reduced motion fallback, and layout stability SHALL pass with 0 failures.
