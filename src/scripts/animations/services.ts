import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initServicesAnimation(): gsap.core.Timeline | null {
  const section = document.getElementById('servicios');
  if (!section) return null;

  const header = section.querySelector('[data-services-header]');
  const cardsDown = section.querySelectorAll('[data-parallax-dir="down"]');
  const cardsUp = section.querySelectorAll('[data-parallax-dir="up"]');

  // Entrance reveal
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
    defaults: { ease: 'power3.out', duration: 0.8 },
  });

  if (header) {
    tl.from(header, { y: 25, opacity: 0 });
  }

  // Counter-directional parallax movement on scroll
  if (cardsDown.length > 0) {
    gsap.to(cardsDown, {
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2,
      },
      y: '+=65',
      ease: 'none',
    });
  }

  if (cardsUp.length > 0) {
    gsap.to(cardsUp, {
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2,
      },
      y: '-=65',
      ease: 'none',
    });
  }

  return tl;
}
