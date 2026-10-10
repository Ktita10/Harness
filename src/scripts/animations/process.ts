import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initProcessAnimation(): gsap.core.Timeline | null {
  const section = document.getElementById('proceso');
  if (!section) return null;

  const track = section.querySelector<HTMLElement>('[data-process-track]');
  const wirePath = section.querySelector<SVGPathElement>('[data-process-wire-path]');
  const nodes = section.querySelectorAll<SVGGElement>('.process-node');
  const headings = section.querySelectorAll<HTMLElement>('#process-title, h3');
  const numbers = section.querySelectorAll<HTMLElement>('[data-process-number]');
  const paragraphs = section.querySelectorAll<HTMLElement>('p');
  const borders = section.querySelectorAll<HTMLElement>('div[data-process-header], [data-process-slide], div[data-process-desktop] > div:last-child');
  const mobileProgress = section.querySelector<HTMLElement>('[data-process-mobile-progress]');

  const mm = gsap.matchMedia();

  // Desktop (min-width: 1024px): Pinned horizontal slide track with wire draw & color transition
  mm.add('(min-width: 1024px)', () => {
    if (!track) return;

    const scrollDistance = () => track.scrollWidth - window.innerWidth;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1.2,
        start: 'top top',
        end: () => `+=${Math.max(window.innerHeight * 1.5, scrollDistance() + 400)}`,
        invalidateOnRefresh: true,
      },
    });

    // 1. Horizontal track movement
    tl.to(
      track,
      {
        x: () => -scrollDistance(),
        ease: 'none',
      },
      0
    );

    // 2. Continuous wire line draw
    if (wirePath) {
      tl.to(
        wirePath,
        {
          strokeDashoffset: 0,
          ease: 'none',
        },
        0
      );
    }

    // 3. Section background transition from deep black (#0A0A0A) to pure white (#FFFFFF)
    tl.to(
      section,
      {
        backgroundColor: '#FFFFFF',
        ease: 'none',
      },
      0
    );

    // 4. Invert text, numbers, and border colors to guarantee WCAG AA contrast throughout
    tl.to(
      section,
      {
        '--process-bg': '#FFFFFF',
        '--process-text': '#0A0A0A',
        '--process-muted': '#52525B',
        '--process-border': 'rgba(10, 10, 10, 0.12)',
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
    if (borders.length > 0) {
      tl.to(borders, { borderColor: 'rgba(10, 10, 10, 0.12)', ease: 'power1.inOut' }, 0.15);
    }

    // 5. Staggered node illumination along the wire
    nodes.forEach((node, idx) => {
      const position = (idx + 0.5) / Math.max(1, nodes.length);
      tl.fromTo(
        node,
        { scale: 0.9, opacity: 0.5 },
        { scale: 1.3, opacity: 1, duration: 0.1, yoyo: true, repeat: 1, ease: 'power2.out' },
        Math.max(0, position - 0.05)
      );
    });
  });

  // Mobile / Tablet (< 1024px): Vertical scroll with background transition to white
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
        '--process-border': 'rgba(10, 10, 10, 0.12)',
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
    if (borders.length > 0) {
      mobileTl.to(borders, { borderColor: 'rgba(10, 10, 10, 0.12)', ease: 'power1.inOut' }, 0.15);
    }

    if (mobileProgress) {
      mobileTl.to(
        mobileProgress,
        {
          height: '100%',
          ease: 'none',
        },
        0
      );
    }
  });

  return null;
}
