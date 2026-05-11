# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server at http://localhost:4321
npm run build     # Production build
npm run preview   # Preview production build locally
```

No lint or test commands are configured.

## Architecture

This is a personal portfolio built with **Astro 5**, **Tailwind CSS 4**, and **Alpine.js**. It renders as a bento-grid of interactive cards.

### Data flow

All personal content lives in two places:
- [src/data/portfolio.json](src/data/portfolio.json) — name, email, phone, resume URL, social links, skills (with `category: "skills" | "tools"`), and experience entries
- [src/content/projects/](src/content/projects/) — one JSON file per project, validated by the Zod schema in [src/content/config.ts](src/content/config.ts)

Cards read from these sources at build time via Astro's content collections API.

### Component model

[src/pages/index.astro](src/pages/index.astro) assembles the grid by importing card components from [src/components/cards/](src/components/cards/). Each card is a self-contained `.astro` file with its own Alpine.js `x-data` scope for modals, clipboard, or toast state.

The single shared UI primitive is [src/components/ui/Icon.astro](src/components/ui/Icon.astro), which renders inline SVGs by name.

### Styling

Global CSS variables (color palette, fonts) are defined in [src/styles/global.css](src/styles/global.css). The theme is "Midnight · Teal · Foam." Tailwind 4 is integrated via the Vite plugin (`@tailwindcss/vite`) in [astro.config.mjs](astro.config.mjs) — there is no `tailwind.config.*` file.

### Layout

The grid is responsive: single column on mobile, 4-column bento on desktop. Row/column spans per card are defined directly in the card markup and documented in [LAYOUT.md](LAYOUT.md). Consult that file before changing grid placement.

### Static assets

Files in [public/](public/) are served at the site root. Images referenced from CSS/HTML (e.g. `/images/music.jpg`) live in `public/images/`, not the top-level `images/` folder.

### Local toolchain

The user works on this project from two machines. On **Ubuntu**, Node.js is installed natively — run `npm` / `npx` / `node` directly. On **Windows**, there is no native Node; commands must run inside a Docker container. Ask which OS the session is on before invoking the toolchain.
