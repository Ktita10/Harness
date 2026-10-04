# Proposal: Page Animations & Smooth Scroll Orchestration (Phase 4)

## Intent

Implement the complete motion orchestration system specified in `SPEC.md` Section 9 and `AGENTS.md` Section 8. The system combines GSAP (ScrollTrigger) and Lenis smooth scrolling using a modular architecture (`src/scripts/animations/`) coordinated by master timelines per page. The design emphasizes non-blocking performance (zero LCP regression, zero CLS), strict progressive enhancement (content 100% visible and legible without JavaScript), and comprehensive support for `prefers-reduced-motion: reduce`.

## Scope

### In Scope
- **Smooth Scroll Integration (`src/scripts/smooth-scroll.ts`)**:
  - Initialize a single Lenis instance synchronized with GSAP's `ScrollTrigger.update` loop.
  - Automatically disconnect or bypass Lenis if `prefers-reduced-motion: reduce` is requested.
  - Clean lifecycle management for navigation events and page transitions.
- **Modular Animation Engine (`src/scripts/animations/`)**:
  - `hero.ts`: Subtle entry reveal for hero elements (`transform` and `opacity` only) without delaying LCP.
  - `services.ts`: Staggered card entrance and marquee velocity triggers on scroll.
  - `process.ts`: Sequential reveal of workflow steps with connected wire harness visual motif.
  - `trust.ts`: Smooth numeric counter tweens for metric figures (e.g., 95+, 100%, 0), settling on final static values.
  - `faq.ts`: Micro-interactions for accordion toggles.
  - `master-timeline.ts`: Coordinates section timelines to create 20–30% overlap as the user scrolls.
- **Progressive Enhancement & Accessibility**:
  - Initial hidden states (`opacity: 0` or translated states) MUST be applied via client-side JavaScript, NEVER in static CSS stylesheets, guaranteeing full legibility if JS fails or is disabled.
  - Strict compliance with `prefers-reduced-motion`: disable smooth scroll and keep all visual elements in their final resting state immediately.
  - Animate exclusively hardware-accelerated properties (`transform`, `opacity`); never `top`, `left`, `width`, or `height`.
- **Automated Verification (`tests/animations.spec.ts`)**:
  - Playwright test asserting content legibility with `javaScriptEnabled: false`.
  - Playwright test asserting instant display and zero scroll hijacking under `prefers-reduced-motion: reduce`.
  - Playwright test asserting zero horizontal overflow and stability of metrics on desktop and mobile viewports.

### Out of Scope
- Paid GSAP plugins (e.g. Club GreenSock `MorphSVGPlugin` or `SplitText`); all morphs and line reveals will be implemented using core GSAP, CSS, and SVG point transforms.
- Heavy WebGL, 3D canvas libraries (Three.js), or raster-based particle engines.

## Capabilities

### New Capabilities
- `motion-orchestration`: Central animation engine coordinating Lenis smooth scroll, GSAP ScrollTrigger timelines per section with 20–30% overlap, number counters, and reduced-motion fallbacks.

## Affected Areas

| Area | Impact | Description |
|---|---|---|
| `src/scripts/smooth-scroll.ts` | Create | Singleton Lenis smooth scrolling integrated with GSAP ticker |
| `src/scripts/animations/` | Create | Section animation modules (`hero.ts`, `services.ts`, `process.ts`, `trust.ts`, `master-timeline.ts`) |
| `src/layouts/Base.astro` | Modified | Conditionally load and mount client animation scripts |
| `src/components/sections/` | Modified | Add unobtrusive `data-animate` hooks and semantic targets without breaking SSR |
| `tests/animations.spec.ts` | Create | Playwright verification suite for JS-disabled fallbacks, reduced motion, and layout stability |

## Risks

| Risk | Likelihood | Mitigation |
|---|---|---|
| LCP degradation due to hero entrance animations | Medium | Ensure hero title is rendered in standard DOM without CSS `opacity: 0`; trigger animations asynchronously after hydration; never block rendering. |
| Content invisible if JS fails or is disabled | High | Prohibit static CSS hiding of elements (`.opacity-0` in HTML). GSAP `gsap.from()` or JS-applied initial states only. |
| ScrollTrigger desynchronization with Lenis | Medium | Bind `lenis.on('scroll', ScrollTrigger.update)` and register GSAP ticker with Lenis `raf` method. |
| Layout shifts (CLS) caused by dynamic transforms | Medium | Animate only compositor-only properties (`transform`, `opacity`) within fixed-size containers. |

## Rollback Plan

If animation bundle size or runtime performance introduces regressions:
1. Animation scripts are cleanly isolated in `src/scripts/`; removing the script tag in `Base.astro` instantly reverts the site to its verified Phase 3 static state.
2. All sections remain styled with static neo-brutalist CSS tokens without structural dependencies on GSAP.
