import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProcessContourCanvas } from './process-canvas';

gsap.registerPlugin(ScrollTrigger);

const DARK = { bg: '#0A0A0A', text: '#FFFFFF', muted: '#A1A1AA' };
const LIGHT = { bg: '#FFFFFF', text: '#0A0A0A', muted: '#52525B' };

let activeContourCanvas: ProcessContourCanvas | null = null;

export function cleanupProcessAnimation(): void {
  if (activeContourCanvas) {
    activeContourCanvas.destroy();
    activeContourCanvas = null;
  }
}

function addColorTransition(
  tl: gsap.core.Timeline,
  section: HTMLElement,
  contourCanvas: ProcessContourCanvas | null,
  total: number
): void {
  // Background glides across the whole scroll.
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

  // Contour lines scroll progress (color & aerodynamic wave warping)
  if (contourCanvas) {
    tl.to(
      contourCanvas,
      {
        scrollProgress: 1,
        ease: 'none',
        duration: total,
      },
      0
    );
  }
}

export function initProcessAnimation(): gsap.core.Timeline | null {
  const section = document.getElementById('proceso');
  if (!section) return null;

  // Clean up previous canvas if any
  cleanupProcessAnimation();

  const track = section.querySelector<HTMLElement>('[data-process-track]');
  const canvasEl = section.querySelector<HTMLCanvasElement>('[data-process-canvas]');
  if (canvasEl) {
    activeContourCanvas = new ProcessContourCanvas(canvasEl);
  }

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
    addColorTransition(tl, section, activeContourCanvas, 1);

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

    addColorTransition(tl, section, activeContourCanvas, 1);

    return () => {
      gsap.set(section, { clearProps: '--process-bg,--process-text,--process-muted,backgroundColor' });
    };
  });

  return null;
}
