import gsap from 'gsap';

export function initHeroAnimation(): gsap.core.Timeline | null {
  const hero = document.getElementById('hero');
  if (!hero) return null;

  const badge = hero.querySelector('[data-animate-hero-badge]') || hero.querySelector('.self-start');
  const subtitle = hero.querySelector('p');
  const ctas = hero.querySelectorAll('div.flex.flex-wrap.items-center.gap-4 a');
  const proofItems = hero.querySelectorAll('.border-t-3 > div');

  const tl = gsap.timeline({ defaults: { ease: 'power2.out', duration: 0.6 } });

  // Staggered reveal for supporting hero elements without blocking H1 LCP paint
  if (badge) {
    tl.from(badge, { y: -15, opacity: 0, duration: 0.5 }, 0.1);
  }

  if (subtitle) {
    tl.from(subtitle, { y: 15, opacity: 0, duration: 0.6 }, 0.2);
  }

  if (ctas.length > 0) {
    tl.from(ctas, { y: 15, opacity: 0, stagger: 0.1, duration: 0.5 }, 0.35);
  }

  if (proofItems.length > 0) {
    tl.from(proofItems, { y: 10, opacity: 0, stagger: 0.08, duration: 0.5 }, 0.5);
  }

  return tl;
}
