import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initServiceDetailAnimation(): void {
  const page = document.querySelector<HTMLElement>('[data-service-page]');
  if (!page) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // 1. Hero Editorial: revelación tipográfica lateral de izquierda a derecha
  const heroItems = page.querySelectorAll<HTMLElement>('[data-service-hero-reveal]');
  if (heroItems.length > 0) {
    gsap.fromTo(
      heroItems,
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
        clearProps: 'transform,opacity,clipPath',
      }
    );
  }

  // 2. Encabezados de sección (H2 + bajadas): barrido lateral x: -60 -> 0 + clip-path
  const sectionHeaders = page.querySelectorAll<HTMLElement>('[data-service-section-header]');
  sectionHeaders.forEach((header) => {
    const texts = header.querySelectorAll<HTMLElement>('[data-service-reveal-text]');
    if (!texts.length) return;

    gsap.fromTo(
      texts,
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
          trigger: header,
          start: 'top 84%',
          toggleActions: 'play none none none',
        },
        onComplete: () => {
          gsap.set(texts, { clearProps: 'transform,opacity,clipPath' });
        },
      }
    );
  });

  // 3. Aparición + Parallax al scrollear en los 4 ítems de "Qué incluye"
  const scopeSection = page.querySelector<HTMLElement>('#alcance');
  const scopeGrid = page.querySelector<HTMLElement>('[data-service-scope-grid]');
  const scopeCards = page.querySelectorAll<HTMLElement>('[data-service-scope-card]');
  const scopeUp = page.querySelectorAll<HTMLElement>('[data-scope-parallax="up"]');
  const scopeDown = page.querySelectorAll<HTMLElement>('[data-scope-parallax="down"]');

  if (scopeGrid && scopeCards.length > 0) {
    gsap.fromTo(
      scopeCards,
      {
        y: 44,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: scopeGrid,
          start: 'top 84%',
          toggleActions: 'play none none none',
        },
      }
    );
  }

  if (scopeSection) {
    if (scopeUp.length > 0) {
      gsap.fromTo(
        scopeUp,
        { yPercent: 10 },
        {
          yPercent: -12,
          ease: 'none',
          scrollTrigger: {
            trigger: scopeSection,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.1,
          },
        }
      );
    }

    if (scopeDown.length > 0) {
      gsap.fromTo(
        scopeDown,
        { yPercent: -8 },
        {
          yPercent: 14,
          ease: 'none',
          scrollTrigger: {
            trigger: scopeSection,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.1,
          },
        }
      );
    }
  }

  // 4. Animación del Mazo de Cartas de Planes: suben apiladas desde el centro abajo y se abren en abanico (idéntico a ServicesProcess.astro)
  const fanContainer = page.querySelector<HTMLElement>('[data-service-deck-fan]');
  const cardEntries = Array.from(page.querySelectorAll<HTMLElement>('[data-service-deck-entry]'));
  const innerCards = cardEntries.map((el) => el.querySelector<HTMLElement>('.deck-card')!);

  if (fanContainer && cardEntries.length) {
    const mm = gsap.matchMedia();

    // Desktop (>= 1024px): Salen apiladas en el centro desde abajo y se despliegan en abanico
    mm.add('(min-width: 1024px)', () => {
      const targetRotations = [-8, 0, 8];
      const targetY = [24, -6, 24];
      const targetX = [18, 0, -18];

      const getStackOffsetX = (index: number) => {
        const containerRect = fanContainer.getBoundingClientRect();
        const containerCenter = containerRect.left + containerRect.width / 2;
        const cardRect = cardEntries[index].getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        return containerCenter - cardCenter;
      };

      innerCards.forEach((c) => (c.style.transition = 'none'));

      gsap.set(cardEntries, {
        x: (i) => getStackOffsetX(i),
        y: 260,
        opacity: 0,
        scale: 0.88,
      });

      gsap.set(innerCards, {
        rotate: 0,
        y: 0,
        x: 0,
      });

      const deckTl = gsap.timeline({
        scrollTrigger: {
          trigger: fanContainer,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        onComplete: () => {
          innerCards.forEach((c) => {
            c.style.transition = '';
            gsap.set(c, { clearProps: 'transform' });
          });
          cardEntries.forEach((w) => gsap.set(w, { clearProps: 'transform,opacity' }));
        },
      });

      // FASE 1: Salen todas juntas desde abajo hacia el centro
      deckTl.to(cardEntries, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.75,
        ease: 'power3.out',
        stagger: 0.03,
      });

      // FASE 2: Se despliegan hacia los lados tomando sus posiciones y ángulos de abanico
      deckTl.to(
        cardEntries,
        {
          x: 0,
          duration: 0.85,
          ease: 'back.out(1.4)',
        },
        '-=0.15'
      );

      deckTl.to(
        innerCards,
        {
          rotate: (i) => targetRotations[i] ?? 0,
          y: (i) => targetY[i] ?? 0,
          x: (i) => targetX[i] ?? 0,
          duration: 0.85,
          ease: 'back.out(1.4)',
        },
        '<'
      );
    });

    // Mobile / Tablet (< 1024px): Suben desde abajo con ligero despliegue
    mm.add('(max-width: 1023px)', () => {
      gsap.set(cardEntries, { y: 120, opacity: 0, scale: 0.92 });

      gsap.to(cardEntries, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: fanContainer,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
        onComplete: () => {
          cardEntries.forEach((w) => gsap.set(w, { clearProps: 'transform,opacity' }));
        },
      });
    });
  }

  // 5. Efecto Cortina idéntico a la Home:
  // En desktop (>= 1024px), #precios se fija en pantalla (pin: true) durante 1 viewport (100vh).
  // La cortina unificada [data-faq-cta-unified] (con service-curtain y lg:-mt-[100vh]) sube físicamente
  // cubriendo la sección de precios, dando la sensación física exacta de que la cortina sube.
  const pricingSection = page.querySelector<HTMLElement>('#precios');
  const curtainSection = page.querySelector<HTMLElement>('[data-faq-cta-unified]');

  if (pricingSection && curtainSection) {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      // Pin de la sección de precios en la parte superior del viewport
      ScrollTrigger.create({
        trigger: pricingSection,
        pin: true,
        start: 'top top',
        end: () => `+=${window.innerHeight}`,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });

      // Oscurecimiento gradual de la sección fija a medida que la cortina crema asciende
      const overlay = pricingSection.querySelector<HTMLElement>('[data-pricing-curtain-overlay]');
      if (overlay) {
        gsap.to(overlay, {
          opacity: 0.6,
          ease: 'none',
          scrollTrigger: {
            trigger: curtainSection,
            start: 'top bottom',
            end: 'top top',
            scrub: true,
          },
        });
      }
    });
  }
}
