export class ProcessContourCanvas {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null;
  private animationFrameId: number | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private time = 0;
  private width = 0;
  private height = 0;
  private dpr = 1;
  public scrollProgress = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.init();
  }

  private init(): void {
    if (!this.ctx) return;
    this.handleResize();

    this.resizeObserver = new ResizeObserver(() => {
      this.handleResize();
    });
    this.resizeObserver.observe(this.canvas.parentElement || this.canvas);

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      this.render();
      return;
    }

    this.start();
  }

  private handleResize(): void {
    const rect = this.canvas.getBoundingClientRect();
    this.dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    this.width = rect.width;
    this.height = rect.height;

    this.canvas.width = Math.floor(this.width * this.dpr);
    this.canvas.height = Math.floor(this.height * this.dpr);
  }

  public setScrollProgress(progress: number): void {
    this.scrollProgress = Math.max(0, Math.min(1, progress));
  }

  private start(): void {
    const loop = () => {
      this.time += 0.005;
      this.render();
      this.animationFrameId = requestAnimationFrame(loop);
    };
    this.animationFrameId = requestAnimationFrame(loop);
  }

  private render(): void {
    if (!this.ctx || this.width === 0 || this.height === 0) return;
    const ctx = this.ctx;

    ctx.save();
    ctx.scale(this.dpr, this.dpr);
    ctx.clearRect(0, 0, this.width, this.height);

    // 8 Generative aerodynamic contour curves
    const lineCount = 8;
    const p = this.scrollProgress;

    // Color transition:
    // Black background (p = 0): crisp white curves rgba(255, 255, 255, 0.09)
    // White background (p = 1): crisp dark graphite curves rgba(10, 10, 10, 0.07)
    const baseR = Math.round(255 - p * (255 - 10));
    const baseG = Math.round(255 - p * (255 - 10));
    const baseB = Math.round(255 - p * (255 - 10));
    const baseAlpha = 0.09 - p * 0.02;

    // Electric Orange telemetry trace (#FF5A00)
    const accentAlpha = 0.22 + p * 0.08;

    for (let i = 0; i < lineCount; i++) {
      const isAccent = i === 3;
      ctx.beginPath();

      if (isAccent) {
        ctx.strokeStyle = `rgba(255, 90, 0, ${accentAlpha})`;
        ctx.lineWidth = 1.5;
      } else {
        ctx.strokeStyle = `rgba(${baseR}, ${baseG}, ${baseB}, ${baseAlpha})`;
        ctx.lineWidth = 1;
      }

      // Base elevation
      const baseY = this.height * (0.12 + 0.76 * (i / (lineCount - 1)));
      const stepX = 14;
      let first = true;

      for (let x = 0; x <= this.width + stepX; x += stepX) {
        // Multi-frequency sinusoidal waves with generative time drift
        const w1 = Math.sin(x * 0.0018 + this.time + i * 0.55) * (26 + i * 3.5);
        const w2 = Math.cos(x * 0.0035 - this.time * 0.7 + i * 0.35) * 15;
        // Warp linked to scroll progress
        const scrollWarp = Math.sin(x * 0.0022 + p * Math.PI * 1.6 + i * 0.28) * (20 * (1 + p * 0.5));

        const y = baseY + w1 + w2 + scrollWarp;

        if (first) {
          ctx.moveTo(x, y);
          first = false;
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();
    }

    ctx.restore();
  }

  public destroy(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  }
}
