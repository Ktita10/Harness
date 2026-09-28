# Proposal: Foundation & Project Scaffolding (Phase 0)

## Intent

Establish the core technical foundation and developer environment for the Harness Studio website to enable reliable, reproducible development across subsequent phases in compliance with `AGENTS.md` and `SPEC.md`.

## Scope

### In Scope
- Initialize `package.json` with Astro 5, Tailwind CSS, GSAP, Lenis, and Playwright dependencies.
- Configure scripts: `dev`, `build`, `preview`, `lint`, `check`, `test`, `links`.
- Set up strict TypeScript configuration (`tsconfig.json`).
- Implement neo-brutalism design tokens in `src/styles/tokens.css` and global styling in `src/styles/global.css`.
- Define Astro Content Collections schemas with Zod for `services` and `faqs` in `src/content/config.ts`.
- Create root layout `src/layouts/Base.astro` with HTML5 semantics, meta tags, and local font preloads.
- Verify that `npm run check` and `npm run build` pass with zero errors.

### Out of Scope
- Complete page UI implementations (Home, service pages, 404).
- Interactive GSAP animations and Lenis initialization.
- Real content files for services and FAQs (handled in Phase 1 & Phase 2).
- CI/CD workflow and production domain deployment.

## Capabilities

### New Capabilities
- `foundation-scaffold`: Project package setup, scripts, TypeScript configuration, and build tooling.
- `design-system-tokens`: CSS custom properties for palette, typography, borders, and hard shadows.
- `content-collections-schema`: Zod validation schemas for services and global FAQs.
- `layout-foundation`: Base HTML layout with SEO tags, font preloads, and structured data stubs.

### Modified Capabilities
- None

## Approach

1. **Scaffold Minimal Astro Project**: Install Astro 5 and minimal runtime dependencies without UI framework overhead.
2. **Style & Token System**: Define CSS variables directly matching `SPEC.md` Section 8. Integrate Tailwind CSS for utility classes.
3. **Strict Content Modeling**: Enforce the exact TypeScript shape for services (`slug`, `planes`, `faqs`, `whatsappMensaje`) via Astro Content Collections.
4. **Accessible Root Layout**: Build `Base.astro` with mobile-first viewport, meta tags, and semantic landmark tags (`<header>`, `<main>`, `<footer>`).

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `package.json` | New | Scripts and dev/prod dependencies |
| `astro.config.mjs` | New | Astro configuration and integrations |
| `tsconfig.json` | New | Strict TypeScript configuration |
| `src/styles/tokens.css` | New | Neo-brutalist CSS tokens |
| `src/styles/global.css` | New | Global base styles and font setup |
| `src/content/config.ts` | New | Zod content collection schemas |
| `src/layouts/Base.astro` | New | Master HTML document layout |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Font loading CLS | Medium | Use local `@fontsource` with preloads and `font-display: swap` |
| Overly complex tooling | Low | Zero client UI libraries (React/Vue omitted); native Astro only |

## Rollback Plan

Revert generated files with `git checkout main` and remove unstaged files via `git clean -fd`.

## Dependencies

- Node.js ≥ 22.x
- npm ≥ 10.x

## Success Criteria

- [ ] `npm run check` executes `astro check` with 0 type errors.
- [ ] `npm run build` generates static HTML output in `dist/` with 0 warnings.
- [ ] CSS design tokens conform to `tokens.css` spec without prohibited styles.
