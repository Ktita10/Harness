import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initFAQAnimation(): gsap.core.Timeline | null {
  const faqSection = document.getElementById('faq');
  const processSection = document.getElementById('proceso');
  if (!faqSection) return null;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null;

  // Cortina: #proceso queda fijo (pin en process.ts) y #faq sube por encima.
  // Aquí solo se oscurece progresivamente la sección cubierta.
  const overlay = processSection?.querySelector<HTMLElement>('[data-process-curtain-overlay]');
  if (overlay) {
    gsap.to(overlay, {
      opacity: 0.5,
      ease: 'none',
      scrollTrigger: {
        trigger: faqSection,
        start: 'top bottom',
        end: 'top top',
        scrub: true,
      },
    });
  }

  // Contenido del FAQ: entrada suave
  const header = faqSection.querySelector<HTMLElement>('[data-faq-header]');
  const items = faqSection.querySelectorAll<HTMLElement>('[data-faq-item]');

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: faqSection,
      start: 'top 40%',
      toggleActions: 'play none none none',
    },
    defaults: { ease: 'power3.out' },
  });

  if (header) tl.from(header, { y: 24, opacity: 0, duration: 0.7 });
  if (items.length > 0) {
    tl.from(items, { y: 20, opacity: 0, stagger: 0.08, duration: 0.5 }, '-=0.4');
  }

  return tl;
}
