/**
 * Transición "tarjeta → pantalla completa" para cualquier enlace con `data-card`.
 *
 * Al hacer click se crea un clon fijo con el fondo de la tarjeta que se expande
 * hasta cubrir el viewport; recién entonces se navega. El color queda guardado en
 * sessionStorage para que `#page-reveal` (Base.astro) arranque la página destino
 * con ese mismo color y lo desvanezca.
 *
 * El clon se monta directamente en su estado final (inset: 0, sin radio ni
 * transform) y solo se anima `transform` desde la geometría de la tarjeta, para
 * cumplir la regla de animar únicamente transform/opacity.
 */

export const TRANSITION_STORAGE_KEY = 'transition-color';
export const TRANSITION_BRAND_KEY = 'transition-brand';

/** Duración de la expansión (ms). */
const EXPAND_DURATION = 700;
/** Curva de la expansión. */
const EXPAND_EASING = 'cubic-bezier(0.76, 0, 0.24, 1)';
/** Porción inicial de la animación en la que el clon aparece sobre el contenido de la tarjeta. */
const CONTENT_CROSSFADE = 0.18;

const CLONE_ATTR = 'data-card-transition-clone';

let isAnimating = false;

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function isPlainLeftClick(event: MouseEvent, card: HTMLAnchorElement): boolean {
  return (
    event.button === 0 &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey &&
    (!card.target || card.target === '_self') &&
    !card.hasAttribute('download')
  );
}

/** Color o fondo completo (si hay gradiente/imagen) para clon y overlay destino. */
function readBackground(style: CSSStyleDeclaration): string {
  if (style.backgroundImage && style.backgroundImage !== 'none' && style.background) {
    return style.background;
  }
  return style.backgroundColor;
}

/** Rotación y escala uniforme visibles de la tarjeta (sin la traslación, que ya incluye el bounding rect). */
function readRotationAndScale(style: CSSStyleDeclaration): { angle: number; scale: number } {
  if (!style.transform || style.transform === 'none') return { angle: 0, scale: 1 };
  const m = new DOMMatrixReadOnly(style.transform);
  return {
    angle: Math.atan2(m.b, m.a) * (180 / Math.PI),
    scale: Math.hypot(m.a, m.b),
  };
}

function removeClones(): void {
  document.querySelectorAll(`[${CLONE_ATTR}]`).forEach((el) => el.remove());
}

/**
 * Capa con la marca, separada del clon para que no se deforme con su escala.
 */
function createBrandLayer(card: HTMLAnchorElement): { layer: HTMLElement } {
  const layer = document.createElement('div');
  layer.className = 'transition-brand';
  layer.setAttribute(CLONE_ATTR, '');
  layer.setAttribute('aria-hidden', 'true');
  layer.style.setProperty('--transition-brand-main', getComputedStyle(card).color);
  if (card.dataset.cardAccent) {
    layer.style.setProperty('--transition-brand-accent', card.dataset.cardAccent);
  }
  layer.innerHTML =
    '<div class="transition-brand__mark">' +
    '<span class="transition-brand__title">HARNESS</span>' +
    '</div>';
  document.body.appendChild(layer);

  return { layer };
}

function animateBrandMark(mark: HTMLElement | null): void {
  if (!mark) return;
  // El texto aparece solo a partir de que la tarjeta ya está casi cubriendo la pantalla (offset 0.55 en adelante)
  mark.animate(
    [
      { offset: 0, opacity: 0, transform: 'scale(0.96)' },
      { offset: 0.55, opacity: 0, transform: 'scale(0.96)' },
      { offset: 0.9, opacity: 1, transform: 'scale(1)' },
      { offset: 1, opacity: 1, transform: 'scale(1)' },
    ],
    { duration: EXPAND_DURATION, easing: 'ease-out', fill: 'forwards' }
  );
}

async function playTransition(card: HTMLAnchorElement): Promise<{ layer: HTMLElement }> {
  const style = getComputedStyle(card);
  const background = readBackground(style);
  const radius = parseFloat(style.borderTopLeftRadius) || 0;
  const { angle, scale } = readRotationAndScale(style);

  // Tamaño real sin rotación y centro visual de la tarjeta.
  const width = card.offsetWidth;
  const height = card.offsetHeight;
  const rect = card.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  // Capa 1 (Fondo): Clon para expansión geométrica hacia pantalla completa
  const clone = document.createElement('div');
  clone.setAttribute(CLONE_ATTR, '');
  clone.setAttribute('aria-hidden', 'true');
  Object.assign(clone.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    zIndex: '2147483646',
    pointerEvents: 'none',
    background,
    borderRadius: '0',
    transformOrigin: '50% 50%',
    transform: 'none',
    willChange: 'transform, opacity',
  });
  document.body.appendChild(clone);

  // Medimos el clon ya montado (viewport real, robusto ante barras móviles).
  const viewport = clone.getBoundingClientRect();
  const sx = (width * scale) / viewport.width;
  const sy = (height * scale) / viewport.height;
  const tx = centerX - (viewport.left + viewport.width / 2);
  const ty = centerY - (viewport.top + viewport.height / 2);

  // El radio se compensa por eje para que no se deforme con la escala no uniforme.
  const startRadius = `${(radius * scale) / sx}px / ${(radius * scale) / sy}px`;
  const startTransform = `translate(${tx}px, ${ty}px) rotate(${angle}deg) scale(${sx}, ${sy})`;
  const endTransform = 'translate(0px, 0px) rotate(0deg) scale(1, 1)';

  // Capa 2 (Logo/Texto): En capa fija superior independiente
  const { layer } = createBrandLayer(card);
  const mark = layer.querySelector<HTMLElement>('.transition-brand__mark');
  animateBrandMark(mark);

  // Animación del clon
  const animation = clone.animate(
    [
      { offset: 0, transform: startTransform, borderRadius: startRadius, opacity: 0 },
      { offset: CONTENT_CROSSFADE, opacity: 1 },
      { offset: 1, transform: endTransform, borderRadius: '0px / 0px', opacity: 1 },
    ],
    { duration: EXPAND_DURATION, easing: EXPAND_EASING, fill: 'forwards' }
  );

  await animation.finished;
  return { layer };
}

async function handleClick(event: MouseEvent): Promise<void> {
  if (event.defaultPrevented) return;
  const target = event.target;
  if (!(target instanceof Element)) return;

  const card = target.closest<HTMLAnchorElement>('a[data-card]');
  if (!card || !isPlainLeftClick(event, card)) return;

  // Con movimiento reducido dejamos que el navegador navegue directamente.
  if (prefersReducedMotion()) return;

  event.preventDefault();
  if (isAnimating) return;
  isAnimating = true;

  try {
    const { layer } = await playTransition(card);
    try {
      sessionStorage.setItem(TRANSITION_STORAGE_KEY, readBackground(getComputedStyle(card)));
    } catch {
      // sessionStorage no disponible (modo privado estricto): se navega igual.
    }

    // Suavizamos la salida del texto hacia el fondo pleno antes de cambiar de URL
    const mark = layer.querySelector<HTMLElement>('.transition-brand__mark');
    if (mark) {
      const fadeOut = mark.animate(
        [
          { opacity: 1, transform: 'scale(1)' },
          { opacity: 0, transform: 'scale(0.98)' },
        ],
        { duration: 200, easing: 'ease-out', fill: 'forwards' }
      );
      await fadeOut.finished;
    }
  } catch {
    removeClones();
  }

  window.location.href = card.href;
}

function handlePageShow(event: PageTransitionEvent): void {
  if (!event.persisted) return;
  // Volviendo con "atrás" desde bfcache: limpiamos el clon que quedó cubriendo la pantalla.
  removeClones();
  isAnimating = false;
  try {
    sessionStorage.removeItem(TRANSITION_STORAGE_KEY);
    sessionStorage.removeItem(TRANSITION_BRAND_KEY);
  } catch {
    // Ignorado.
  }
}

export function initCardTransitions(): void {
  document.addEventListener('click', (event) => void handleClick(event));
  window.addEventListener('pageshow', handlePageShow);
}
