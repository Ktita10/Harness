export function initHeadingFit(): void {
  if (typeof window === 'undefined') return;

  function fitAll() {
    const pairs = document.querySelectorAll<HTMLElement>('[data-heading-pair]');
    pairs.forEach((container) => {
      const topEl = container.querySelector<HTMLElement>('[data-heading-top]');
      const bottomEl = container.querySelector<HTMLElement>('[data-heading-bottom]');
      if (!topEl || !bottomEl) return;

      // Reset to base 1em to measure natural unscaled widths
      topEl.style.fontSize = '1em';
      bottomEl.style.fontSize = '1em';

      const wTop = topEl.offsetWidth;
      const wBottom = bottomEl.offsetWidth;
      if (wTop <= 0 || wBottom <= 0) return;

      let topScale = 1;
      let bottomScale = 1;

      // Increase the size of the shorter line so both ends match flush
      if (wBottom < wTop) {
        bottomScale = wTop / wBottom;
      } else if (wTop < wBottom) {
        topScale = wBottom / wTop;
      }

      // Cap maximum expansion if container width is narrower (e.g., 360px mobile)
      const parentEl = container.parentElement;
      const availableWidth = parentEl ? parentEl.clientWidth : window.innerWidth - 32;
      const targetWidth = Math.max(wTop, wBottom);

      if (availableWidth > 0 && targetWidth > availableWidth) {
        const shrink = (availableWidth / targetWidth) * 0.98;
        topScale *= shrink;
        bottomScale *= shrink;
      }

      topEl.style.fontSize = `${topScale.toFixed(4)}em`;
      bottomEl.style.fontSize = `${bottomScale.toFixed(4)}em`;
    });
  }

  fitAll();

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(fitAll).catch(() => {});
  }

  window.addEventListener('resize', fitAll, { passive: true });
}
