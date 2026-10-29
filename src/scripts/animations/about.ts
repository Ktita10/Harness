import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type CleanupFn = () => void;
let aboutCleanups: CleanupFn[] = [];

export function cleanupAboutAnimation(): void {
  aboutCleanups.forEach((fn) => fn());
  aboutCleanups = [];
}

export function initAboutAnimation(): void {
  cleanupAboutAnimation();

  const section = document.getElementById('nosotros');
  if (!section) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  // 1. Revelación lateral editorial de los textos de encabezado
  const revealTexts = section.querySelectorAll<HTMLElement>('[data-about-reveal]');
  if (revealTexts.length > 0) {
    gsap.fromTo(
      revealTexts,
      {
        x: -60,
        opacity: 0,
        clipPath: 'inset(0 100% 0 0)',
      },
      {
        x: 0,
        opacity: 1,
        clipPath: 'inset(0 0% 0 0)',
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '[data-about-header]',
          start: 'top 84%',
          toggleActions: 'play none none none',
        },
        onComplete: () => {
          gsap.set(revealTexts, { clearProps: 'transform,opacity,clipPath' });
        },
      }
    );
  }

  // 2. Aparición escalonada de las 2 tarjetas de desarrolladores
  const cards = Array.from(section.querySelectorAll<HTMLElement>('[data-about-card]'));
  if (cards.length > 0) {
    gsap.fromTo(
      cards,
      {
        y: 64,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.85,
        stagger: 0.16,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cards[0],
          start: 'top 86%',
          toggleActions: 'play none none none',
        },
        onComplete: () => {
          gsap.set(cards, { clearProps: 'transform,opacity' });
        },
      }
    );
  }

  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // 3A. Desktop con puntero fino: Seguimiento del ratón (Mouse Tracking Parallax 3D)
  if (canHover) {
    cards.forEach((card) => {
      const stage = card.querySelector<HTMLElement>('[data-about-stage]');
      const bg = card.querySelector<HTMLElement>('[data-about-bg]');
      const portrait = card.querySelector<HTMLElement>('[data-about-portrait]');
      const glass = card.querySelector<HTMLElement>('[data-about-glass]');

      if (!stage || !bg || !portrait || !glass) return;

      gsap.set(card, { transformPerspective: 1000 });

      // Interpoladores suaves con física tipo resorte/inercia (solo transform)
      const bgX = gsap.quickTo(bg, 'x', { duration: 0.65, ease: 'power3.out' });
      const bgY = gsap.quickTo(bg, 'y', { duration: 0.65, ease: 'power3.out' });

      const portraitX = gsap.quickTo(portrait, 'x', { duration: 0.55, ease: 'power3.out' });
      const portraitY = gsap.quickTo(portrait, 'y', { duration: 0.55, ease: 'power3.out' });
      const portraitScale = gsap.quickTo(portrait, 'scale', { duration: 0.55, ease: 'power3.out' });

      const glassX = gsap.quickTo(glass, 'x', { duration: 0.5, ease: 'power3.out' });
      const glassY = gsap.quickTo(glass, 'y', { duration: 0.5, ease: 'power3.out' });

      const stageRotX = gsap.quickTo(stage, 'rotationX', { duration: 0.6, ease: 'power3.out' });
      const stageRotY = gsap.quickTo(stage, 'rotationY', { duration: 0.6, ease: 'power3.out' });

      const onMouseMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;

        // Coordenadas normalizadas entre -0.5 y +0.5
        const relX = (e.clientX - rect.left) / rect.width - 0.5;
        const relY = (e.clientY - rect.top) / rect.height - 0.5;

        // Capa 1 (Fondo): acompaña la dirección del cursor
        bgX(relX * 26);
        bgY(relY * 22);

        // Capa 2 (Retrato Cutout): se mueve en dirección OPUESTA al cursor para crear profundidad 3D
        portraitX(-relX * 30);
        portraitY(-relY * 18);
        portraitScale(1.035);

        // Capa 3 (Panel Glassmorphism): plano frontal con leve paralaje positivo
        glassX(relX * 12);
        glassY(relY * 8);

        // Inclinación 3D sutil del contenedor base
        stageRotY(relX * 6);
        stageRotX(-relY * 6);
      };

      const onMouseLeave = () => {
        bgX(0);
        bgY(0);
        portraitX(0);
        portraitY(0);
        portraitScale(1);
        glassX(0);
        glassY(0);
        stageRotX(0);
        stageRotY(0);
      };

      card.addEventListener('mousemove', onMouseMove, { passive: true });
      card.addEventListener('mouseleave', onMouseLeave, { passive: true });

      aboutCleanups.push(() => {
        card.removeEventListener('mousemove', onMouseMove);
        card.removeEventListener('mouseleave', onMouseLeave);
      });
    });
  }

  // 4. Efecto Cortina hacia FAQ en Desktop (>= 1024px):
  // Como #nosotros es ahora la última sección del bloque oscuro antes de #faq (que tiene lg:-mt-[100vh]),
  // fijamos #nosotros durante 1 viewport al llegar al final para que la cortina crema de #faq suba cubriéndola.
  const faqSection = document.getElementById('faq');
  const overlay = section.querySelector<HTMLElement>('[data-about-curtain-overlay]');

  if (faqSection) {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      ScrollTrigger.create({
        trigger: section,
        pin: true,
        start: 'bottom bottom',
        end: () => `+=${window.innerHeight}`,
        invalidateOnRefresh: true,
      });

      if (overlay) {
        gsap.to(overlay, {
          opacity: 0.55,
          ease: 'none',
          scrollTrigger: {
            trigger: faqSection,
            start: 'top bottom',
            end: 'top top',
            scrub: true,
          },
        });
      }
    });

    aboutCleanups.push(() => mm.revert());
  }
}

