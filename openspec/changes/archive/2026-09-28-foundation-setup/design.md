# Design: Foundation & Project Scaffolding (Phase 0)

## Technical Approach

Implement the minimal, high-performance static foundation using Astro 5, Tailwind CSS, and local font loading. The implementation introduces zero client UI frameworks (no React/Vue islands) to ensure 0 KB client runtime overhead and meet Lighthouse mobile score ≥ 95.

## Architecture Decisions

| Decision | Choice | Alternatives Considered | Rationale |
|---|---|---|---|
| **Client Runtime** | Pure Astro (Native HTML/JS) | React (`@astrojs/react`), Svelte | Eliminates ~45KB client JS overhead, strictly honors `AGENTS.md` minimal JS rule. |
| **Typography Delivery** | `@fontsource/bricolage-grotesque` | Google Fonts CDN | Local font files eliminate 3rd-party DNS latency and prevent layout shifts (CLS). |
| **Content Modeling** | Astro Content Collections (Zod) | Raw JSON / Markdown frontmatter | Type safety at build time; rejects invalid lengths (e.g., metaTitle > 60 chars) immediately. |
| **Styling Architecture** | Tailwind CSS + `tokens.css` | CSS Modules, Styled Components | Strict adherence to neo-brutalism design tokens while maintaining utility speed. |

## Data Flow

```text
src/content/services/*.md ──→ Astro Content Collections (Zod Validation)
src/content/faqs/*.md     ──→ [src/content/config.ts]
                                      │
                                      ▼
src/styles/tokens.css     ──→ src/layouts/Base.astro ──→ dist/ (Static HTML + CSS)
src/styles/global.css                 ▲
                                      │
src/pages/index.astro     ────────────┘
```

## File Changes

| File | Action | Description |
|---|---|---|
| `package.json` | Create | Project dependencies, devDependencies, and lifecycle scripts (`dev`, `build`, `check`, etc.). |
| `astro.config.mjs` | Create | Astro configuration with static output, Tailwind, and `@astrojs/sitemap`. |
| `tsconfig.json` | Create | Strict TypeScript configuration extending `astro/tsconfigs/strict`. |
| `src/styles/tokens.css` | Create | Neo-brutalist CSS variables (`--black`, `--white`, `--orange`, `--border`, `--shadow-hard`). |
| `src/styles/global.css` | Create | Base reset, font face declarations, and focus visible styles. |
| `src/content/config.ts` | Create | Zod validation schemas for `services` and `faqs` collections. |
| `src/layouts/Base.astro` | Create | Semantic HTML5 shell (`<html lang="es-AR">`), SEO tags, skip link, and slots. |
| `src/pages/index.astro` | Create | Smoke test placeholder page verifying layout, fonts, and tokens render cleanly. |

## Interfaces / Contracts

```ts
// src/content/config.ts contract
import { z, defineCollection } from 'astro:content';

export const serviceSchema = z.object({
  slug: z.string(),
  nombre: z.string(),
  metaTitle: z.string().max(60),
  metaDescription: z.string().max(155),
  h1: z.string(),
  bajada: z.string(),
  incluye: z.array(z.object({
    titulo: z.string(),
    descripcion: z.string(),
  })),
  planes: z.array(z.object({
    nombre: z.string(),
    precio: z.string(),
    incluye: z.array(z.string()),
    plazo: z.string(),
    destacado: z.boolean().optional(),
  })),
  proceso: z.array(z.object({
    titulo: z.string(),
    descripcion: z.string(),
  })).optional(),
  faqs: z.array(z.object({
    pregunta: z.string(),
    respuesta: z.string(),
  })),
  whatsappMensaje: z.string(),
});
```

## Testing Strategy

| Layer | What to Test | Approach |
|---|---|---|
| **Static Verification** | TypeScript types and Astro components | Run `npm run check` (`astro check`). Zero errors allowed. |
| **Build Integrity** | Static asset bundling and HTML output | Run `npm run build`. Build must output to `dist/` with 0 warnings. |
| **SEO & Links** | Link integrity across build output | Run `npm run links` on static build output. Zero broken links. |
| **E2E Smoke** | Viewport responsiveness and heading hierarchy | Playwright smoke test checking mobile (360px), tablet (768px), desktop (1280px). |

## Migration / Rollout

No migration required (greenfield repository).
