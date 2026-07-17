# Deployment — two domains, one codebase

This repo ships the **same site** under two domains that differ by a single word:

| Domain               | Term | Build command   | `VITE_VARIANT`   |
| -------------------- | ---- | --------------- | ---------------- |
| howuniqueisaguid.com | GUID | `npm run build` | _(unset → GUID)_ |
| howuniqueisauuid.com | UUID | `npm run build` | `UUID`           |

There is **no fork and no branch drift** — the terminology lives in one file
(`src/lib/term-config.ts`) and is selected at build time by the `VITE_VARIANT`
environment variable. Every future feature is written once and both sites get it.

## How it works

- `src/lib/term-config.ts` — pure vocabulary map (`GUID` ↔ `UUID`, plurals,
  "also called…", acronym expansion, title). No browser/Vite APIs, so it's
  imported by both the app and the build config.
- `src/lib/term.ts` — binds `TERM` for the app from `import.meta.env.VITE_VARIANT`
  (defaults to `GUID`). Components render `{TERM.names}` etc. instead of hardcoding.
- `vite.config.ts` — a `transformIndexHtml` plugin replaces `%TERM_TITLE%`,
  `%TERM_NAME%`, `%TERM_OG_IMAGE%` in `index.html` at build time, so each domain
  gets **correct static `<title>` and Open Graph tags**. (This is why it's a
  build-time swap, not a runtime `location.hostname` check — social-media
  scrapers don't run JS, so the OG title/image must be baked into the HTML.)
- `src/lib/og-image.ts` — the Open Graph share image, generated from the term
  and emitted to `dist/og-image-<VARIANT>.svg` at build time (and served in dev
  via a middleware). Like the title, the share image derives from the term, so
  the two sites can't drift.

## Local testing

```bash
npm run dev          # GUID site at http://localhost:5173
npm run dev:uuid     # UUID site
npm run build        # GUID production build -> dist/
npm run build:uuid   # UUID production build -> dist/
npm run preview:uuid # preview the UUID build
```

## Cloudflare Pages — adding the UUID project

The existing GUID Pages project needs **no changes**. To add the UUID site:

1. Create a **second Pages project** connected to this same GitHub repo.
2. Build settings (identical to the GUID project):
   - Build command: `npm run build`
   - Build output directory: `dist`
3. Add an environment variable (Production **and** Preview):
   - `VITE_VARIANT` = `UUID`
   - (Cloudflare's build env var overrides the default, so the build produces the UUID variant.)
4. Point the custom domain `howuniqueisauuid.com` at this project.

That's it — pushes to the repo redeploy both projects; each bakes its own term.
