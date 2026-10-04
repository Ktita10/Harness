import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initProcessAnimation(): gsap.core.Timeline | null {
  const section = document.getElementById('proceso');
  if (!section) return null;

  const header = section.querySelector('.mb-12, .mb-16');
  const stepCards = section.querySelectorAll('.grid > div');
  const wireLine = section.querySelector('[data-process-wire]');

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top 78%',
      toggleActions: 'play none none none',
    },
    defaults: { ease: 'power2.out' },
  });

  if (header) {
    tl.from(header, { y: 25, opacity: 0, duration: 0.6 });
  }

  if (wireLine) {
    tl.from(wireLine, { scaleX: 0, transformOrigin: 'left center', duration: 0.8 }, '-=0.3');
  }

  if (stepCards.length > 0) {
    tl.from(
      stepCards,
      {
        y: 35,
        opacity: 0,
        stagger: 0.14,
        duration: 0.6,
      },
      '-=0.4'
    );
  }

  return tl;
}
