# foundation-scaffold Specification

## Purpose

Defines the initial workspace setup, dependency manifests, build tooling, TypeScript compiler configuration, and script runners for Harness Studio.

## Requirements

### Requirement: Minimal Astro Static Architecture

The project MUST configure Astro with static site generation (`output: 'static'`) and zero client UI frameworks.

#### Scenario: Production build generation
- GIVEN a clean workspace with installed dependencies
- WHEN running `npm run build`
- THEN the static assets SHALL be output to `dist/` without client framework runtime chunks.

#### Scenario: Clean dependency tree
- GIVEN `package.json`
- WHEN inspecting runtime dependencies
- THEN client UI libraries such as React, Vue, or Svelte MUST NOT be present unless explicitly justified.

### Requirement: Verification and Script Contracts

The `package.json` MUST define standard lifecycle commands matching `AGENTS.md`: `dev`, `build`, `preview`, `lint`, `check`, `test`, and `links`.

#### Scenario: Type check execution
- GIVEN TypeScript configuration extending `astro/tsconfigs/strict`
- WHEN running `npm run check`
- THEN `astro check` SHALL complete with 0 diagnostic errors.

#### Scenario: Production preview server
- GIVEN a completed build in `dist/`
- WHEN running `npm run preview`
- THEN the preview server SHALL serve the static build on a local port.

### Requirement: Repository Exclusions

The repository MUST ignore build outputs, caches, dependency directories, and internal agent state via `.gitignore`.

#### Scenario: Git working tree cleanliness
- GIVEN `.gitignore` containing `node_modules/`, `dist/`, `.astro/`, and `.atl/`
- WHEN running `git status`
- THEN build outputs and agent metadata SHALL remain untracked.
