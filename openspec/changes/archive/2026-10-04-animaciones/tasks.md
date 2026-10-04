# Tasks: Page Animations & Motion Orchestration (Phase 4)

## Review Workload Forecast

| Field | Value |
|---|---|
| Estimated changed lines | ~320 lines |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | single-pr |
| Chain strategy | pending |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: pending
400-line budget risk: Low

## Phase 1: Smooth Scroll & Animation Core

- [x] 1.1 Create `src/scripts/smooth-scroll.ts` initializing Lenis with GSAP ScrollTrigger ticker integration and reduced-motion bypass.
- [x] 1.2 Create `src/scripts/animations/hero.ts` implementing LCP-safe entrance reveals for hero badges, subtitle, and CTA buttons.
- [x] 1.3 Create `src/scripts/animations/services.ts` implementing staggered card reveals and marquee scroll scrub.

## Phase 2: Process, Trust & Master Timeline

- [x] 2.1 Create `src/scripts/animations/process.ts` implementing step-by-step sequential illumination and wire harness line progress.
- [x] 2.2 Create `src/scripts/animations/trust.ts` implementing GSAP numeric counter tweens for `data-counter` targets.
- [x] 2.3 Create `src/scripts/animations/master-timeline.ts` coordinating interlaced section timelines with 20–30% overlap.
- [x] 2.4 Create `src/scripts/index.ts` bootstrapping the motion engine with `prefers-reduced-motion` checks.

## Phase 3: Component Hooks & Layout Mounting

- [x] 3.1 Update `src/components/sections/Trust.astro` to add `data-counter` and `data-counter-suffix` attributes to key metrics.
- [x] 3.2 Update `src/components/sections/Process.astro` and `ServicesSection.astro` with animation hook attributes without changing static CSS visibility.
- [x] 3.3 Update `src/layouts/Base.astro` to mount `src/scripts/index.ts`.

## Phase 4: Automated Verification & Testing

- [x] 4.1 Create `tests/animations.spec.ts` asserting no-JS content visibility (`javaScriptEnabled: false`), reduced motion behavior, counter animation completion, and layout stability.
- [x] 4.2 Run `npm run check`, `npm run lint`, `npm run build`, `npm run links`, and `npm run test` to achieve 100% green verification.
