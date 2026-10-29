import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initHeroAnimation } from './hero';
import { initServicesAnimation } from './services';
import { initProcessAnimation, cleanupProcessAnimation } from './process';
import { initAboutAnimation, cleanupAboutAnimation } from './about';
import { initFAQAnimation } from './faq';
import { initServiceDetailAnimation } from './service-detail';

export function initMasterTimeline(): void {
  // Ensure ScrollTrigger is ready
  ScrollTrigger.refresh();

  // Initialize section animations with ~20-30% interlaced scroll triggers
  initHeroAnimation();
  initServicesAnimation();
  initProcessAnimation();
  initAboutAnimation();
  initFAQAnimation();
  initServiceDetailAnimation();
}

export function cleanupAnimations(): void {
  cleanupProcessAnimation();
  cleanupAboutAnimation();
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}
