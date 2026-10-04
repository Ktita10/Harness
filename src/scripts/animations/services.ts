import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initServicesAnimation(): gsap.core.Timeline | null {
  const section = document.getElementById('servicios');
  if (!section) return null;

  const header = section.querySelector('.mb-12, .mb-16');
  const cards = section.querySelectorAll('article');
  const marquee = document.querySelector('[data-marquee-track]');

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
    defaults: { ease: 'power2.out' },
  });

  if (header) {
    tl.from(header, { y: 25, opacity: 0, duration: 0.6 });
  }

  if (cards.length > 0) {
    tl.from(
      cards,
      {
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.7,
      },
      '-=0.3'
    );
  }

  // Interactive marquee velocity boost on scroll
  if (marquee) {
    gsap.to(marquee, {
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2,
      },
      xPercent: -15,
      ease: 'none',
    });
  }

  return tl;
}
