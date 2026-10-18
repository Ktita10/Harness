import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Debe coincidir con HeroObject3D (el hero se fija durante ese tramo; en desktop incluye ventana de cortina).
const getHeroScrollLength = () => (window.innerWidth >= 1024 ? '+=280%' : '+=190%');

function hasWebGL(): boolean {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

export function initHeroAnimation(): gsap.core.Timeline | null {
  const hero = document.getElementById('hero');
  if (!hero) return null;

  // Sin animación de scroll: la frase queda visible desde el inicio (contenido legible).
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !hasWebGL()) return null;

  const left = hero.querySelectorAll<HTMLElement>('[data-hero-phrase-left] [data-hero-word]');
  const right = hero.querySelectorAll<HTMLElement>('[data-hero-phrase-right] [data-hero-word]');
  const indicator = hero.querySelector<HTMLElement>('[data-hero-scroll]');
  if (!left.length && !right.length && !indicator) return null;

  // Estado inicial: solo el cubo en pantalla
  if (left.length || right.length) {
    gsap.set([...left, ...right], { opacity: 0, x: -48 });
  }

  const tl = gsap.timeline({
    defaults: { ease: 'power2.out' },
    scrollTrigger: {
      trigger: hero,
      start: 0,
      end: getHeroScrollLength,
      scrub: 1,
      invalidateOnRefresh: true,
    },
  });

  // El indicador se desvanece en cuanto empieza el scroll
  if (indicator) tl.to(indicator, { opacity: 0, y: 8, duration: 0.08 }, 0);

  // Mitad izquierda: aparece de izquierda a derecha
  if (left.length) tl.to(left, { opacity: 1, x: 0, duration: 0.2, stagger: 0.07 }, 0.18);
  // Mitad derecha: continúa el recorrido, más abajo
  if (right.length) tl.to(right, { opacity: 1, x: 0, duration: 0.2, stagger: 0.07 }, 0.5);

  // Padding final para que dure exactamente el tramo fijado
  tl.set({}, {}, 1);

  return tl;
}
