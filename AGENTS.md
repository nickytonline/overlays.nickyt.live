# Repository Guidelines

## Project Structure & Module Organization
- `src/pages/` holds route entry points (`index.astro`, `guest-info.astro`). Each `.astro` file maps to a URL.
- `src/layouts/` contains shared page wrappers like `Layout.astro`.
- `src/utils/` hosts shared logic, e.g. `guest-info.ts` for Turso data access.
- `public/` contains static assets served as-is (e.g. `public/favicon.svg`).
- Config lives at the root: `astro.config.mjs`, `tailwind.config.mjs`, `tsconfig.json`.

## Build, Test, and Development Commands
- `npm install`: install dependencies.
- `npm run dev` or `npm start`: run the Astro dev server (default `http://localhost:4321`).
- `npm run build`: run `astro check` then build to `dist/`.
- `npm run preview`: serve the production build locally.
- `npm run astro -- <command>`: Astro CLI utilities (e.g. `npm run astro -- check`).

## Coding Style & Naming Conventions
- Use 2-space indentation in `.astro` and `.ts` files.
- Prefer double quotes and semicolons, matching existing files.
- Keep filenames kebab-case where applicable (`guest-info.astro`, `guest-info.ts`).
- Tailwind utility classes are used directly in markup; prefer composition over custom CSS unless needed.

## Testing Guidelines
- No dedicated test framework is configured yet.
- Validation currently happens via `astro check` (TypeScript + Astro diagnostics) during `npm run build`.
- If you add tests, place them near the feature (e.g. `src/utils/__tests__/guest-info.test.ts`) and document the new command in this file.

## Commit & Pull Request Guidelines
- Commit messages follow a Conventional Commits style (e.g. `chore: created a homepage`, `chore(deps): bump vite...`).
- For PRs, include a concise description, link related issues, and add screenshots for UI changes (especially `src/pages/`).
- Keep PRs focused; separate dependency bumps from feature work when possible.

## Configuration & Environment
- `src/utils/guest-info.ts` expects `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` to be set via environment variables.
- Use an `.env` file locally (not committed) or configure these in your hosting provider.
