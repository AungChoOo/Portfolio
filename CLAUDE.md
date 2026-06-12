# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Dev server at http://localhost:4321
npm run build     # Production build to dist/
npm run preview   # Preview the build
```

No lint or test setup. **Toolchain note:** on Ubuntu run Node natively; on Windows there is no native Node — run commands through Docker. Ask which OS the session is on first.

## Stack

Astro 5 static site + Tailwind CSS 4 (via `@tailwindcss/vite` plugin in `astro.config.mjs` — no `tailwind.config.*`) + Alpine.js for interactivity. Single page: a responsive bento grid of cards.

## Architecture

- **Content** is data-driven: `src/data/portfolio.json` (personal info, social, skills, experience) and `src/content/projects/*.json` (one file per project, Zod schema in `src/content/config.ts`). Edit content there, not in components.
- **`src/pages/index.astro`** assembles the grid AND contains all modal markup (about/skills/experience/contact/projects). The root `x-data` there owns shared Alpine state: `modal`, `toast`, `showToast()`. Cards open modals by setting `modal = '<name>'`; Escape and backdrop click close them.
- **Cards** live in `src/components/cards/`. Shared `bento-card` / `tag` classes come from `src/styles/global.css`. UI primitives are in `src/components/ui/`: `Icon.astro` (inline SVGs by name, optional `strokeWidth`) and `Modal.astro` (shared modal shell, shown when Alpine `modal === name`).
- **RadioCard is the exception**: vanilla TypeScript + Web Audio API, no Alpine. The `AudioContext`/`createMediaElementSource` must only be created from a user gesture, or playback is silenced (see comments in `RadioCard.astro`). EQ bars fall back to CSS animation until Web Audio attaches. Mobile playback/copy-to-clipboard interactions here have a history of regressions — test on mobile after touching it.

## Styling & layout

- Theme colors are CSS variables in `src/styles/global.css` ("Midnight · Teal · Foam"; previous palettes archived in `Colors.md`). Use `var(--accent)` etc., or Tailwind's `text-(--accent)` arrow syntax — don't hardcode hex values.
- The `lg` breakpoint is overridden to **960px** in `global.css` `@theme`.
- Desktop grid is 4 cols × 6 rows, locked to viewport height (`lg:h-screen lg:overflow-hidden`); mobile is one column. Card spans are in card markup and documented in `LAYOUT.md` — check it before changing placement.
- Static assets go in `public/` (e.g. `/images/...`). The top-level `images/` folder is NOT served.
