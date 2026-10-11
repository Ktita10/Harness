import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initTrustAnimation(): gsap.core.Timeline | null {
  const section = document.getElementById('confianza');
  if (!section) return null;

  const header = section.querySelector<HTMLElement>('[data-trust-header]');
  const leftRows = section.querySelectorAll<HTMLElement>('[data-trust-row][data-align="left"]');
  const rightRows = section.querySelectorAll<HTMLElement>('[data-trust-row][data-align="right"]');

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
    defaults: { ease: 'power3.out' },
  });

  if (header) {
    tl.from(header, { y: 30, opacity: 0, duration: 0.7 });
  }

  // Interleaved entrance: left rows from left, right rows from right
  if (leftRows.length > 0) {
    tl.from(
      leftRows,
      {
        x: -40,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
      },
      '-=0.4'
    );
  }

  if (rightRows.length > 0) {
    tl.from(
      rightRows,
      {
        x: 40,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
      },
      '-=0.6'
    );
  }

  return tl;
}
