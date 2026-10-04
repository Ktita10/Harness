import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initTrustAnimation(): gsap.core.Timeline | null {
  const section = document.getElementById('confianza');
  if (!section) return null;

  const header = section.querySelector('.mb-12, .mb-16');
  const cards = section.querySelectorAll('.grid > div');
  const counterElements = section.querySelectorAll<HTMLElement>('[data-counter]');

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

  if (cards.length > 0) {
    tl.from(
      cards,
      {
        y: 35,
        opacity: 0,
        stagger: 0.12,
        duration: 0.6,
      },
      '-=0.3'
    );
  }

  // Animate numeric counters smoothly up to their target values
  counterElements.forEach((el) => {
    const target = parseFloat(el.getAttribute('data-counter') || '0');
    const suffix = el.getAttribute('data-counter-suffix') || '';
    const prefix = el.getAttribute('data-counter-prefix') || '';
    const proxy = { val: 0 };

    tl.to(
      proxy,
      {
        val: target,
        duration: 1.4,
        ease: 'power2.out',
        onUpdate: () => {
          el.textContent = `${prefix}${Math.round(proxy.val)}${suffix}`;
        },
        onComplete: () => {
          el.textContent = `${prefix}${target}${suffix}`;
        },
      },
      '-=0.5'
    );
  });

  return tl;
}
