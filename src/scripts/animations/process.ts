import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Single source of truth: every text/stroke in the section reads these CSS
// variables, so tweening them on the section drives all colors in sync.
const DARK = { bg: '#0A0A0A', text: '#FFFFFF', muted: '#A1A1AA' };
const LIGHT = { bg: '#FFFFFF', text: '#0A0A0A', muted: '#52525B' };

function addColorTransition(tl: gsap.core.Timeline, section: HTMLElement, total: number): void {
  // Background glides across the whole scroll.
  // fromTo: GSAP cannot read the initial value of custom properties reliably
  // (it resolves them to transparent), so the start state is explicit.
  tl.fromTo(
    section,
    { '--process-bg': DARK.bg, backgroundColor: DARK.bg },
    { '--process-bg': LIGHT.bg, backgroundColor: LIGHT.bg, ease: 'none', duration: total },
    0
  );

  // Text flips in a short window around the midpoint, while the background is
  // mid-gray, so contrast never collapses for a long stretch.
  tl.fromTo(
    section,
    { '--process-text': DARK.text, '--process-muted': DARK.muted },
    { '--process-text': LIGHT.text, '--process-muted': LIGHT.muted, ease: 'power2.inOut', duration: total * 0.2 },
    total * 0.4
  );
}

export function initProcessAnimation(): gsap.core.Timeline | null {
  const section = document.getElementById('proceso');
  if (!section) return null;

  const track = section.querySelector<HTMLElement>('[data-process-track]');
  const mm = gsap.matchMedia();

  // Desktop: pinned horizontal glide
  mm.add('(min-width: 1024px)', () => {
    if (!track) return;

    const scrollDistance = () => track.scrollWidth - window.innerWidth;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1,
        start: 'top top',
        end: () => `+=${scrollDistance() + 400}`,
        invalidateOnRefresh: true,
      },
    });

    tl.to(track, { x: () => -scrollDistance(), ease: 'none', duration: 1 }, 0);
    addColorTransition(tl, section, 1);

    return () => {
      gsap.set(section, { clearProps: '--process-bg,--process-text,--process-muted,backgroundColor' });
    };
  });

  // Mobile / tablet: vertical flow
  mm.add('(max-width: 1023px)', () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        end: 'bottom 85%',
        scrub: 1,
      },
    });

    addColorTransition(tl, section, 1);

    return () => {
      gsap.set(section, { clearProps: '--process-bg,--process-text,--process-muted,backgroundColor' });
    };
  });

  return null;
}
