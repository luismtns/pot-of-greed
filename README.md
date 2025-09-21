![Pot of Greed](./pot-of-greed.png)

# Pot Of Greed

A lightweight Next.js landing-page scaffold focused on producing 100% static HTML/CSS/JS exports suitable for CDN hosting (S3 + CloudFront, Netlify, Vercel static, etc.). This repository contains a minimal scaffold and guidelines for creating static landing pages using the Next.js App Router.

## Key Goals

- Generate fully static landing pages at build time (`next build && next export`).
- Keep runtime footprint zero — no internal server APIs or server-side-only features.
- Make it easy for non-developers to add content via simple JSON/MDX files.

## Project Structure

- `app/` — Next.js App Router pages and layout.
- `public/` — Static assets (images, icons, OG defaults).
- `src/` — App source files (components, styles).
- `agents.md` — Project agents, guidelines and rules for creating LPs (read this to follow constraints).

## Getting Started

Install dependencies and start the dev server:

```powershell
yarn install
yarn run dev
```

Open `http://localhost:3000` in your browser.

## Common Commands

- `yarn run dev` — Start development server.
- `yarn run build` — Build the Next.js app.
- `yarn run export` — Export a static HTML site (requires `next.config.mjs` with `output: 'export'`).
- `yarn run build:html` — Run `build` then `export`.

## How To Add A New Landing Page

1. Add a file in `content/lps/<slug>.mdx` describing `title` and `description` in the frontmatter and page content in MDX.
2. Ensure any images are placed in `public/` and referenced with a relative path.
3. Confirm `generateStaticParams()` (if present) includes the new slug.

See `agents.md` for the full scaffold rules and recommended folder layout.

## Notes & Constraints

- The scaffold assumes `next.config.mjs` is configured for static export: `output: 'export'` and `images.unoptimized = true`.
- Do not add API routes under `app/api/*`. Use external form providers for submissions.
- Use local fonts (`@font-face` or `next/font/local`) when possible to avoid runtime network dependency.

## License

This project does not include a license file. Add a `LICENSE` if you want to make the repository open source.

## Next Steps

- Add `content/lps/` JSON files for each landing page.
- Create reusable `components/sections/` for page building blocks.
- Run `yarn run build:html` and verify the `out/` folder contains static HTML for deployment.

If you want, I can update `package.json` scripts to match the `agents.md` example or scaffold `content/` and `components/` directories next.
