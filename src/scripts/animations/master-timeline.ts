import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initHeroAnimation } from './hero';
import { initServicesAnimation } from './services';
import { initProcessAnimation, cleanupProcessAnimation } from './process';
import { initFAQAnimation } from './faq';
import { initServiceDetailAnimation } from './service-detail';

export function initMasterTimeline(): void {
  // Ensure ScrollTrigger is ready
  ScrollTrigger.refresh();

  // Initialize section animations with ~20-30% interlaced scroll triggers
  initHeroAnimation();
  initServicesAnimation();
  initProcessAnimation();
  initFAQAnimation();
  initServiceDetailAnimation();
}

export function cleanupAnimations(): void {
  cleanupProcessAnimation();
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}
