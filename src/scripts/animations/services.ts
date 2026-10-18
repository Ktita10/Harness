import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initServicesAnimation(): gsap.core.Timeline | null {
  const section = document.getElementById('servicios');
  if (!section) return null;

  // 1. Cortina: #hero queda fijo y ServicesProcess ([data-topo-unified-wrapper]) sube por encima
  // Oscurecimiento progresivo del hero cubierto (data-hero-curtain-overlay)
  const heroSection = document.getElementById('hero');
  const overlay = heroSection?.querySelector<HTMLElement>('[data-hero-curtain-overlay]');
  const curtain = document.querySelector<HTMLElement>('[data-topo-unified-wrapper]');

  if (overlay && curtain && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px)', () => {
      gsap.to(overlay, {
        opacity: 0.65,
        ease: 'none',
        scrollTrigger: {
          trigger: curtain,
          start: 'top bottom',
          end: 'top top',
          scrub: true,
        },
      });
    });
  }

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
