import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initProcessAnimation(): gsap.core.Timeline | null {
  const section = document.getElementById('proceso');
  if (!section) return null;

  const track = section.querySelector<HTMLElement>('[data-process-track]');
  const headings = section.querySelectorAll<HTMLElement>('#process-title, h2, h3');
  const numbers = section.querySelectorAll<HTMLElement>('[data-process-number]');
  const paragraphs = section.querySelectorAll<HTMLElement>('p, span');

  const mm = gsap.matchMedia();

  // Desktop (>= 1024px): Pinned horizontal track glide with background color scrub
  mm.add('(min-width: 1024px)', () => {
    if (!track) return;

    const scrollDistance = () => track.scrollWidth - window.innerWidth;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1.2,
        start: 'top top',
        end: () => `+=${scrollDistance() + 400}`,
        invalidateOnRefresh: true,
      },
    });

    // 1. Fluid horizontal slide
    tl.to(
      track,
      {
        x: () => -scrollDistance(),
        ease: 'none',
      },
      0
    );

    // 2. Background transition from deep black (#0A0A0A) to pure white (#FFFFFF)
    tl.to(
      section,
      {
        backgroundColor: '#FFFFFF',
        ease: 'none',
      },
      0
    );

    // 3. Invert text and numbers for AA contrast
    tl.to(
      section,
      {
        '--process-bg': '#FFFFFF',
        '--process-text': '#0A0A0A',
        '--process-muted': '#52525B',
        ease: 'power1.inOut',
      },
      0.15
    );

    if (headings.length > 0) {
      tl.to(headings, { color: '#0A0A0A', ease: 'power1.inOut' }, 0.15);
    }
    if (numbers.length > 0) {
      tl.to(numbers, { color: '#0A0A0A', ease: 'power1.inOut' }, 0.15);
    }
    if (paragraphs.length > 0) {
      tl.to(paragraphs, { color: '#52525B', ease: 'power1.inOut' }, 0.15);
    }
  });

  // Mobile (< 1024px): Vertical flow with background transition to white
  mm.add('(max-width: 1023px)', () => {
    const mobileTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        end: 'bottom 85%',
        scrub: 1.2,
      },
    });

    mobileTl.to(
      section,
      {
        backgroundColor: '#FFFFFF',
        ease: 'none',
      },
      0
    );

    mobileTl.to(
      section,
      {
        '--process-bg': '#FFFFFF',
        '--process-text': '#0A0A0A',
        '--process-muted': '#52525B',
        ease: 'power1.inOut',
      },
      0.15
    );

    if (headings.length > 0) {
      mobileTl.to(headings, { color: '#0A0A0A', ease: 'power1.inOut' }, 0.15);
    }
    if (numbers.length > 0) {
      mobileTl.to(numbers, { color: '#0A0A0A', ease: 'power1.inOut' }, 0.15);
    }
    if (paragraphs.length > 0) {
      mobileTl.to(paragraphs, { color: '#52525B', ease: 'power1.inOut' }, 0.15);
    }
  });

  return null;
}
