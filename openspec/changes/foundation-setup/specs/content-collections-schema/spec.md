# content-collections-schema Specification

## Purpose

Defines strict type-safe content schemas using Astro Content Collections and Zod for services and global FAQs in `src/content/config.ts`.

## Requirements

### Requirement: Services Content Schema

The `services` collection MUST validate frontmatter matching the schema defined in `SPEC.md` Section 6:
- `slug`: string (lowercase, hyphenated)
- `nombre`: string
- `metaTitle`: string (maximum 60 characters)
- `metaDescription`: string (maximum 155 characters)
- `h1`: string
- `bajada`: string
- `incluye`: array of objects with `titulo` (string) and `descripcion` (string)
- `planes`: array of objects with `nombre` (string), `precio` (string), `incluye` (array of strings), `plazo` (string), and optional `destacado` (boolean)
- `proceso`: optional array of objects with `titulo` (string) and `descripcion` (string)
- `faqs`: array of objects with `pregunta` (string) and `respuesta` (string)
- `whatsappMensaje`: string

#### Scenario: Valid service document validation
- GIVEN a markdown file in `src/content/services/`
- WHEN Astro parses the collection at build time
- THEN all fields MUST strictly conform to the Zod schema.

#### Scenario: Metadata length restriction enforcement
- GIVEN a service document with `metaTitle` longer than 60 characters
- WHEN running `npm run check` or `npm run build`
- THEN the build MUST fail with a clear validation error indicating the title length violation.

### Requirement: FAQs Content Schema

The `faqs` collection MUST validate global questions with `pregunta` (string), `respuesta` (string), and `orden` (number).

#### Scenario: Global FAQ retrieval
- GIVEN markdown files in `src/content/faqs/`
- WHEN querying the FAQs collection in a template
- THEN items SHALL be returned with typed questions and answers sortable by `orden`.
