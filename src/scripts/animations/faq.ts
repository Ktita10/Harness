import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initFAQAnimation(): gsap.core.Timeline | null {
  const section = document.getElementById('faq');
  if (!section) return null;

  const header = section.querySelector('.mb-12, .mb-16');
  const detailsList = section.querySelectorAll('details');

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

  if (detailsList.length > 0) {
    tl.from(
      detailsList,
      {
        y: 20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.5,
      },
      '-=0.3'
    );
  }

  return tl;
}
