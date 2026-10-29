import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DARK = { bg: '#0A0A0A', text: '#FFFFFF', muted: '#A1A1AA', accent: '#FF5A00' };
const LIGHT = { bg: '#F5F5F2', text: '#0A0A0A', muted: '#52525B', accent: '#C2410C' };

export function cleanupProcessAnimation(): void {
  // Cleanup hook
}

function addColorTransition(tl: gsap.core.Timeline, section: HTMLElement, total: number): void {
  const topoContainer = section.querySelector<HTMLElement>('[data-topo-container]');

  // Transición suave del fondo y del shader WebGL topográfico procedural
  tl.fromTo(
    section,
    {
      '--process-bg': DARK.bg,
      '--topo-theme': 0,
      backgroundColor: DARK.bg,
    },
    {
      '--process-bg': LIGHT.bg,
      '--topo-theme': 1,
      backgroundColor: LIGHT.bg,
      ease: 'none',
      duration: total,
      onUpdate: () => {
        const val = parseFloat(section.style.getPropertyValue('--topo-theme') || '0');
        if (topoContainer && (topoContainer as any).__setTopoTheme) {
          (topoContainer as any).__setTopoTheme(val);
        }
      },
    },
    0
  );

  // El texto y acento transicionan con una curva fluida cerca del punto medio
  tl.fromTo(
    section,
    {
      '--process-text': DARK.text,
      '--process-muted': DARK.muted,
      '--process-accent': DARK.accent,
    },
    {
      '--process-text': LIGHT.text,
      '--process-muted': LIGHT.muted,
      '--process-accent': LIGHT.accent,
      ease: 'power2.inOut',
      duration: total * 0.3,
    },
    total * 0.35
  );
}

export function initProcessAnimation(): gsap.core.Timeline | null {
  const section = document.getElementById('proceso');
  if (!section) return null;

  const track = section.querySelector<HTMLElement>('[data-process-track]');
  if (!track) return null;
  const mm = gsap.matchMedia();

  // Desktop (>= 1024px): un único pin para el recorrido horizontal de #proceso.
  // Si existe #nosotros después de #proceso, la ventana de cortina hacia #faq la maneja #nosotros.
  mm.add('(min-width: 1024px)', () => {
    if (!track) return;

    const hasAboutSection = Boolean(document.getElementById('nosotros'));
    const scrollDistance = () => track.scrollWidth - window.innerWidth;

    ScrollTrigger.create({
      trigger: section,
      pin: true,
      start: 'top top',
      end: () => `+=${scrollDistance() + (hasAboutSection ? 0 : window.innerHeight)}`,
      invalidateOnRefresh: true,
    });

    // Avance horizontal + color: solo durante el tramo horizontal del pin
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        scrub: 1,
        start: 'top top',
        end: () => `+=${scrollDistance()}`,
        invalidateOnRefresh: true,
      },
    });

    tl.to(track, { x: () => -scrollDistance(), ease: 'none', duration: 1 }, 0);
    addColorTransition(tl, section, 1);

    return () => {
      gsap.set(section, {
        clearProps:
          '--process-bg,--process-text,--process-muted,--process-accent,--topo-theme,backgroundColor',
      });
    };
  });

  // Mobile / tablet (< 1024px): flujo vertical con transición de color
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
      gsap.set(section, {
        clearProps:
          '--process-bg,--process-text,--process-muted,--process-accent,--topo-theme,backgroundColor',
      });
    };
  });

  return null;
}
