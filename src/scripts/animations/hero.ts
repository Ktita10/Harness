import gsap from 'gsap';

export function initHeroAnimation(): gsap.core.Timeline | null {
  const hero = document.getElementById('hero');
  if (!hero) return null;

  const blocks = hero.querySelectorAll('.grid > div:not(#hero-3d-slot)');
  const h1 = hero.querySelector('#hero-title');

  const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.7 } });

  if (blocks.length > 0) {
    tl.from(blocks, { y: 25, opacity: 0, stagger: 0.15, duration: 0.8 }, 0.1);
  }

  if (h1) {
    tl.from(h1, { y: 40, opacity: 0, duration: 1, ease: 'power3.out' }, 0.25);
  }

  return tl;
}
