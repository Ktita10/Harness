# Tasks: Foundation & Project Scaffolding (Phase 0)

## Review Workload Forecast

| Field | Value |
|---|---|
| Estimated changed lines | ~250 lines |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | single-pr |
| Chain strategy | pending |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: pending
400-line budget risk: Low

## Phase 1: Tooling & Package Setup

- [x] 1.1 Create `package.json` with lifecycle scripts (`dev`, `build`, `preview`, `check`, `lint`, `test`, `links`) and Astro 5 dependencies.
- [x] 1.2 Create `astro.config.mjs` configuring static output, sitemap integration, and Tailwind CSS.
- [x] 1.3 Create `tsconfig.json` extending `astro/tsconfigs/strict`.
- [x] 1.4 Install project dependencies using `npm install`.

## Phase 2: Design Tokens & Styling Architecture

- [x] 2.1 Create `src/styles/tokens.css` defining neo-brutalist variables (`--black`, `--white`, `--orange`, `--border`, `--shadow-hard`).
- [x] 2.2 Create `src/styles/global.css` with font-face imports (`@fontsource/bricolage-grotesque`), reset, and accessible focus outlines.

## Phase 3: Content Collections & Schemas

- [x] 3.1 Create `src/content/config.ts` defining Zod schemas for `services` and `faqs` collections per `SPEC.md`.
- [x] 3.2 Add initial stub files in `src/content/services/` and `src/content/faqs/` to test schema parsing.

## Phase 4: Layout & Smoke Verification

- [x] 4.1 Create `src/layouts/Base.astro` with HTML5 landmarks (`<header>`, `<main>`, `<footer>`), SEO meta tags, and accessible skip link.
- [x] 4.2 Create `src/pages/index.astro` using `Base.astro` to verify rendering and styling.
- [x] 4.3 Run `npm run check` and `npm run build` to confirm zero type errors and clean static generation.
