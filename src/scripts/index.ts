import { initSmoothScroll, destroySmoothScroll } from './smooth-scroll';
import { initMasterTimeline, cleanupAnimations } from './animations/master-timeline';
import { initHeadingFit } from './animations/heading-fit';

function bootstrapMotion(): void {
  if (typeof window === 'undefined') return;

  // Always pair two-font headings regardless of motion preference
  initHeadingFit();

  // Strict compliance with prefers-reduced-motion: reduce
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    return;
  }

  // Initialize Lenis smooth scroll
  initSmoothScroll();

  // Initialize master animation timeline
  initMasterTimeline();
}

function teardownMotion(): void {
  destroySmoothScroll();
  cleanupAnimations();
}

// Bootstrap on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrapMotion);
} else {
  bootstrapMotion();
}

// Astro view transition lifecycle support (if enabled now or in future)
document.addEventListener('astro:page-load', bootstrapMotion);
document.addEventListener('astro:before-swap', teardownMotion);
