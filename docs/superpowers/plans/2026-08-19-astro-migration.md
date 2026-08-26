# Astro Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate `wreative-showcase` from React 18 + React Router + Vite (SPA) to a fully native Astro static site, with zero `.jsx`/`.tsx`/React runtime remaining, pixel-identical visual/behavioral output.

**Architecture:** Astro `output: 'static'` site. File-based routing replaces `react-router-dom` (`src/pages/index.astro`, `src/pages/project/[slug].astro` via `getStaticPaths()`, `src/pages/404.astro`). All interactive behavior (theme toggle, search/filter/infinite-scroll, category dropdown, image lightbox, gallery carousel) is reimplemented as small vanilla-TS modules loaded via `<script>` tags in `.astro` components — no client framework, no hydration. `react-helmet-async` is replaced entirely by static `<head>` markup in a shared `BaseLayout.astro` + per-page props, since Astro renders head tags at build time (no runtime head management needed). Tailwind v3 stays, wired in via `@astrojs/tailwind`. Radix `DropdownMenu` and `lucide-react` (both React-only) are replaced with a hand-rolled vanilla dropdown and `lucide-static` SVGs respectively. Swiper drops its `swiper/react` wrapper in favor of the framework-agnostic `swiper` core API.

**Tech Stack:** Astro (latest), TypeScript (existing `^5.9.3`), Tailwind CSS v3 (existing `^3.4.19`) via `@astrojs/tailwind`, `swiper` (vanilla), `lucide-static`, `class-variance-authority` + `clsx` + `tailwind-merge` (kept, framework-agnostic), pnpm.

**Spec:** `plan.md` (repo root) — the Astro migration requirements this plan implements. Read both together.

## Global Constraints

- No `.jsx`, `.tsx`, or React component may remain when this plan is done (spec §1).
- Visual parity is the top priority: same layout, spacing, typography, colors, responsive behavior, hover/focus/active states, animations (spec §2). When ambiguous, prefer the simplest Astro-idiomatic implementation closest to current behavior (spec, closing principle) — do not redesign.
- Header logo must switch appearance between light/dark with no flash and no visual change from current behavior (spec §3).
- Every page needs correct `<title>`, meta description, canonical URL, OG/Twitter tags, `lang`, semantic HTML, heading hierarchy, image `alt`, no layout-shift-causing missing image dimensions, crawlable internal links, no duplicate metadata, no accidental `noindex` (spec §4).
- Minimize JS: no client framework/hydration; prefer static HTML; lazy-load images where the original does (spec §5).
- Full cleanup of dead React files, deps, imports, configs at the end; nothing removed on assumption alone — verify unused first (spec §6).
- Package manager stays **pnpm** (spec §7).
- Must pass `pnpm run lint` and `pnpm run knip` with no errors/unjustified warnings, and `pnpm run build` must succeed (spec §8).

---

### Task 1: Bootstrap Astro toolchain

**Files:**
- Modify: `package.json`
- Create: `astro.config.mjs`
- Modify: `tsconfig.json`
- Delete: `tsconfig.app.json`, `tsconfig.node.json`, `tsconfig.app.tsbuildinfo`, `tsconfig.node.tsbuildinfo`, `vite.config.ts`
- Create: `src/env.d.ts` (replaces `src/vite-env.d.ts`, deleted in Task 14 cleanup once nothing imports it)

**Interfaces:**
- Produces: a working `astro dev` / `astro build` / `astro preview` toolchain that every later task's `.astro` files build against. The `@/*` → `./src/*` path alias (used by every later task's imports) is defined here in `tsconfig.json` and must keep working identically to today.

- [ ] **Step 1: Look up current Astro + Tailwind v3 integration setup**

Run (via the `context7` MCP tool, or `pnpm dlx astro@latest --help` / official docs if MCP unavailable): resolve library id for "Astro" and query "Tailwind CSS v3 integration setup with @astrojs/tailwind". Confirm the current package name/API for wiring Tailwind v3 into Astro (as of this Astro version) — package ecosystems shift, and this must be confirmed against current docs rather than assumed. Note the exact `astro.config` snippet and integration package name for use in Step 4.

- [ ] **Step 2: Install Astro and remove Vite/React toolchain packages**

```bash
pnpm remove react react-dom react-router-dom react-helmet-async swiper @vitejs/plugin-react @types/react @types/react-dom lucide-react @radix-ui/react-dropdown-menu @radix-ui/react-icons vite
pnpm add astro swiper lucide-static
pnpm add -D @astrojs/check
```

(`swiper` is re-added because the vanilla core API is still needed — only `swiper/react` is being dropped. The Tailwind integration package identified in Step 1 gets added in Step 4.)

- [ ] **Step 3: Rewrite `package.json` scripts**

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro check && astro build",
    "preview": "astro preview",
    "lint": "eslint .",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "knip": "knip",
    "generate-sitemap": "npx tsx scripts/generate-sitemap.ts",
    "prebuild": "npm run generate-sitemap"
  }
}
```

Keep `"private": true`, `"version"`, `"type": "module"` as-is.

- [ ] **Step 4: Create `astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind'; // package name confirmed in Step 1 — adjust if docs say otherwise

export default defineConfig({
  site: 'https://showcase.wreative.com',
  integrations: [tailwind({ applyBaseStyles: false })],
});
```

`applyBaseStyles: false` because `src/index.css` (kept in Task 3) already does its own `@tailwind base/components/utilities` + custom `@layer base` variables — we don't want the integration injecting a second base stylesheet.

- [ ] **Step 5: Rewrite `tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

Delete `tsconfig.app.json`, `tsconfig.node.json`, `tsconfig.app.tsbuildinfo`, `tsconfig.node.tsbuildinfo`, `vite.config.ts` — Astro's own bundler replaces the Vite config, and the split app/node tsconfigs were a Vite-specific pattern no longer needed.

- [ ] **Step 6: Create `src/env.d.ts`**

```ts
/// <reference types="astro/client" />
```

- [ ] **Step 7: Verify the toolchain boots**

Run: `pnpm astro --version` — expect a version string, no error.
Run: `pnpm dev` briefly (then stop it) — expect the dev server to start without config errors (it will 404 on `/` until Task 10 adds `src/pages/index.astro`; that's expected at this point).

- [ ] **Step 8: Commit**

```bash
git add package.json pnpm-lock.yaml astro.config.mjs tsconfig.json src/env.d.ts
git rm tsconfig.app.json tsconfig.node.json tsconfig.app.tsbuildinfo tsconfig.node.tsbuildinfo vite.config.ts
git commit -m "chore: bootstrap Astro toolchain"
```

---

### Task 2: Update lint/format/knip config for Astro

**Files:**
- Modify: `eslint.config.js`
- Modify: `knip.json`
- No change needed: `.prettierrc.json`, `.prettierignore` (prettier already has an Astro-aware fallback via `prettier-plugin-astro` — add it)

**Interfaces:**
- Produces: `pnpm run lint` and `pnpm run format` that understand `.astro` files, used by every later task's own validation steps and by Task 15's final validation.

- [ ] **Step 1: Add Astro lint/format plugins**

```bash
pnpm add -D eslint-plugin-astro prettier-plugin-astro
```

- [ ] **Step 2: Rewrite `eslint.config.js`**

```js
import { defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import prettier from 'eslint-config-prettier/flat';

export default defineConfig(
  globalIgnores(['dist', '.astro']),
  prettier,
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  ...astro.configs.recommended
);
```

Drop `eslint-plugin-react-hooks` / `eslint-plugin-react-refresh` and their rules entirely (no React left to lint). Remove those two packages: `pnpm remove eslint-plugin-react-hooks eslint-plugin-react-refresh`.

- [ ] **Step 3: Add the Astro plugin to Prettier config**

Edit `.prettierrc.json`, prepend `prettier-plugin-astro` to the `plugins` array (order matters — Astro's plugin should run, and per its docs typically listed before `prettier-plugin-tailwindcss`):

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "tabWidth": 2,
  "printWidth": 100,
  "plugins": ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
  "overrides": [
    {
      "files": "*.astro",
      "options": { "parser": "astro" }
    }
  ]
}
```

- [ ] **Step 4: `knip.json` — no change required yet**

Knip has a built-in Astro plugin that activates automatically once `astro.config.mjs` exists; leave `knip.json` as-is for now. Re-check knip output at the end of Task 14 (cleanup) and Task 15 (final validation) once real `.astro` files exist — if it still needs an `astro` entry or extra `ignore` patterns at that point, add them then (don't guess now against an empty `src/pages/`).

- [ ] **Step 5: Verify**

Run: `pnpm run lint` — expect it to run without a config-loading error (it may report 0 files matched for `.astro` since none exist yet; that's fine at this point).

- [ ] **Step 6: Commit**

```bash
git add eslint.config.js .prettierrc.json package.json pnpm-lock.yaml
git commit -m "chore: make lint/format tooling Astro-aware"
```

---

### Task 3: Global styles, Tailwind config, static asset migration

**Files:**
- Move: `src/index.css` (content unchanged — see below)
- Modify: `tailwind.config.js`
- Move: `assets/` (repo root) → `public/assets/` (same internal structure: `assets/cover/*.webp` → `public/assets/cover/*.webp`, favicons/`wreative.png` at the top level of `public/assets/`)

**Interfaces:**
- Produces: `public/assets/<name>` static URLs (e.g. `/assets/wreative.png`, `/assets/cover/bemode.webp`, `/assets/favicon.ico`) that Task 4 (data layer), Task 6 (BaseLayout favicons/OG image), and Task 7 (BrandLogo) all reference by these exact literal paths.

Today, `assets/` (root-level, **not** `public/`) holds favicons + `wreative.png` + `assets/cover/*.webp`, and is used two ways: (a) referenced by literal absolute URL in `index.html` (`/assets/favicon.ico` etc. — Vite resolves root-relative asset refs found in `index.html` and copies them to `dist/` preserving the path), and (b) `import`ed as ES modules from `BrandLogo.tsx` and `src/data/portfolio/mobiles.ts`/`websites.ts` (Vite hashes and bundles them). Astro's static-file convention is `public/` for anything referenced by a literal URL string and not needing build-time processing — since none of these images use any Vite-specific optimization today (they're all plain `<img src>`), moving the whole tree into `public/assets/` and switching the few JS `import`s to literal `/assets/...` strings (done in Task 4 and Task 7) is the simplest option that keeps every existing URL identical.

- [ ] **Step 1: Move assets into `public/`**

```bash
mkdir -p public/assets
git mv assets/favicon.ico assets/favicon-16x16.png assets/favicon-32x32.png assets/apple-touch-icon.png assets/android-chrome-192x192.png assets/android-chrome-512x512.png assets/wreative.png public/assets/
git mv assets/cover public/assets/cover
rmdir assets
```

Verify nothing else references `assets/` at the old root path: `grep -rn "'\.\./\.\./\.\./assets\|\"\.\./\.\./\.\./assets\|from '\.\./assets" src/ scripts/` (Task 4 and Task 7 will fix the hits this finds — don't fix them here, just confirm the list matches what those tasks expect: `BrandLogo.tsx`, `mobiles.ts`, `websites.ts`).

- [ ] **Step 2: Move `src/index.css`, content unchanged**

The file stays at `src/index.css` (Astro has no opinion on this path — `BaseLayout.astro` in Task 6 will `import '../index.css'`). No edits needed to its content; the `--background`/`--foreground`/etc. CSS custom properties, `.dark` overrides, and `.scrollbar-hide` utility all carry over verbatim.

- [ ] **Step 3: Update `tailwind.config.js` content globs**

Replace the `content` array (which listed Vite/React-era globs including a stray `./app/**` that never matched anything in this project) with Astro-relevant globs:

```js
content: ['./src/**/*.{astro,ts,tsx}'],
```

Everything else in `tailwind.config.js` (`darkMode: ['class']`, the full `theme.extend.colors`/`borderRadius`/`keyframes`/`animation` block, `plugins: [require('tailwindcss-animate')]`) stays byte-for-byte identical — those are the tokens `src/index.css`'s CSS variables feed into, and nothing about them is React-specific.

- [ ] **Step 4: Verify assets are reachable**

Run: `pnpm dev`, then fetch `http://localhost:4321/assets/favicon.ico` and `http://localhost:4321/assets/cover/bemode.webp` — both should return the image (200), confirming Astro serves `public/` at the root URL exactly like Vite did.

- [ ] **Step 5: Commit**

```bash
git add public/assets src/index.css tailwind.config.js
git status  # confirm assets/ (old root dir) is gone
git commit -m "chore: move static assets under public/, update Tailwind content globs"
```

---

### Task 4: Port the data layer

**Files:**
- Create: `src/data/portfolio/types.ts` (copy of current file, unchanged)
- Create: `src/data/portfolio/websites.ts` (copy, image imports rewritten)
- Create: `src/data/portfolio/mobiles.ts` (copy, image imports rewritten)
- Create: `src/data/portfolio/index.ts` (copy of current file, unchanged)
- Delete (end of task, after copies verified): old files stay where they are — this data layer has **no React dependency today**, so it moves as-is; nothing to delete here, this task is a straight copy + one mechanical edit per data file.

**Interfaces:**
- Produces: `import { portfolios, type Platform, type PortfolioItem, type GalleryItem } from '@/data/portfolio'` — the exact same export surface as today (`portfolios: PortfolioItem[]`, `Platform`, `PortfolioCategory` enum, `GalleryItem`/`GalleryImage`/`GalleryVideo`, `toSlug`), consumed by Task 10 (`index.astro`) and Task 12 (`[slug].astro`).

`src/data/portfolio/types.ts` and `src/data/portfolio/index.ts` need **zero** changes — copy them verbatim to the same paths (they already live under `src/`, so nothing moves). `websites.ts` and `mobiles.ts` need exactly one mechanical edit each: every `import fooCover from '../../../assets/cover/foo.webp'` (and the single `import Logo from '../../../assets/wreative.png'`-style top-level asset, if any appear in these two files) becomes a literal string `'/assets/cover/foo.webp'` used directly wherever the imported identifier was used, per Task 3's asset move.

- [ ] **Step 1: Copy `types.ts` and `index.ts` unchanged**

These files have no `assets/` imports and no React dependency — no edit needed, they already work as-is under Astro's TS setup.

- [ ] **Step 2: Rewrite image imports in `websites.ts`**

For every line matching `import <name> from '../../../assets/...'`, delete the import line and replace every usage of `<name>` in the file body with the literal string, e.g.:

```ts
// before
import bemodeCover from '../../../assets/cover/bemode.webp';
// ... later ...
img(bemodeCover)

// after
img('/assets/cover/bemode.webp')
```

Do this for every cover import in the file (there are ~27 in `websites.ts` per the current `assets/cover/` listing). Keep every other line (the `entry(...)` calls, tags, descriptions, categories, URLs) byte-for-byte identical — this task only touches image path resolution, not content.

- [ ] **Step 3: Rewrite image imports in `mobiles.ts`**

Same mechanical transform as Step 2, applied to `mobiles.ts`'s 13 cover imports (`wreativeCover`, `wreativeStoreCover`, `bemodeCover`, `chickenExplorerCover`, `fajarFloristCover`, `kurirPulsaCover`, `pernikahanIni`, `dzataLombokTransportCover`, `sgAcademyCover`, `posSatpam`, `toiletPortabel`, `DPUBinaMargaMusiCover`, `wahyuDewanagariCover`). The `demoVideo` constant (`'https://www.w3schools.com/html/mov_bbb.mp4'`) is already a literal URL — leave it untouched.

- [ ] **Step 4: Verify no `assets/` imports remain and types check**

Run: `grep -rn "from '\.\./\.\./\.\./assets" src/data/` — expect no output.
Run: `pnpm exec tsc --noEmit -p tsconfig.json` (or `pnpm astro check` once Task 1's `@astrojs/check` is installed) — expect no errors attributable to `src/data/portfolio/`.

- [ ] **Step 5: Commit**

```bash
git add src/data/portfolio
git commit -m "feat: port portfolio data layer to Astro, resolve images via public/ paths"
```

---

### Task 5: `Icon.astro` (lucide-static wrapper)

**Files:**
- Create: `src/components/Icon.astro`

**Interfaces:**
- Produces: `<Icon name="search" class="h-4 w-4 text-muted-foreground" />`. Consumed by Task 7 (`ThemeToggle.astro` — `sun`, `moon`), Task 8 (`SearchBar.astro` — `search`; `CategoryFilter.astro` — `chevron-down`).
- `name` must be one of the four icon slugs actually used in this project: `'search' | 'chevron-down' | 'sun' | 'moon'` — this is the full icon set (matches `lucide-react`'s `Search`, `ChevronDown`, `Sun`, `Moon` used today; no other lucide icon appears anywhere in `src/`).

`lucide-static` ships every icon as a raw `.svg` file (`node_modules/lucide-static/icons/<kebab-name>.svg`), importable with Vite/Astro's `?raw` suffix. This keeps the exact same stroke paths as `lucide-react` (same upstream icon set) with zero React runtime.

- [ ] **Step 1: Write `Icon.astro`**

```astro
---
import searchSvg from 'lucide-static/icons/search.svg?raw';
import chevronDownSvg from 'lucide-static/icons/chevron-down.svg?raw';
import sunSvg from 'lucide-static/icons/sun.svg?raw';
import moonSvg from 'lucide-static/icons/moon.svg?raw';

const ICONS = {
  search: searchSvg,
  'chevron-down': chevronDownSvg,
  sun: sunSvg,
  moon: moonSvg,
} as const;

interface Props {
  name: keyof typeof ICONS;
  class?: string;
}

const { name, class: className } = Astro.props;
const svg = ICONS[name].replace('<svg ', `<svg class="${className ?? ''}" `);
---

<Fragment set:html={svg} />
```

`lucide-static`'s raw SVGs already carry `width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"` matching `lucide-react`'s defaults — the injected `class` (e.g. `h-4 w-4`) controls rendered size exactly like the `className` prop did on the React icon components, and `stroke="currentColor"` means the icon still inherits `text-*` color classes from its wrapper the same way.

- [ ] **Step 2: Verify visually**

Run: `pnpm dev`, create a throwaway `src/pages/icon-check.astro` that renders all four icons at `h-4 w-4` and `h-6 w-6`; compare against the current site's rendered icons (screenshot or visual check) for stroke weight / proportions. Delete the throwaway page once confirmed.

- [ ] **Step 3: Commit**

```bash
git add src/components/Icon.astro
git commit -m "feat: add Icon.astro wrapping lucide-static, replacing lucide-react"
```

---

### Task 6: `BaseLayout.astro` + `Seo.astro`

**Files:**
- Create: `src/components/Seo.astro`
- Create: `src/layouts/BaseLayout.astro`

**Interfaces:**
- Produces: `<BaseLayout title="..." description="..." canonical="..." ogImage="..." jsonLd={...} robots="index, follow"><slot content /></BaseLayout>`. Consumed by Task 10 (`index.astro`) and Task 12 (`[slug].astro`) and Task 13 (`404.astro`) in place of every current `<Helmet>...</Helmet>` block.
- `Seo.astro` props: `title: string`, `description: string`, `canonical: string`, `ogImage?: string` (defaults to `https://showcase.wreative.com/assets/wreative.png`), `robots?: string` (defaults to `'index, follow'`), `jsonLd?: object | object[]` (rendered as one or more `<script type="application/ld+json">` blocks).

This replaces `index.html`'s static head (today shared across the whole SPA by every route, since it was a single HTML shell) with a layout that renders the **shared, page-invariant** head tags (viewport, author, verification tags, theme-color, favicons, Google Fonts, `theme-init` inline script, the `@graph` JSON-LD for `ProfessionalService`/`Person`/`WebSite` that never changes per page) plus per-page overrides via `Seo.astro` for the bits that did change per page today (`<title>`, description, canonical, OG/Twitter title+description, and the page-specific JSON-LD block each page added inside its own `<Helmet>`).

- [ ] **Step 1: Write `Seo.astro`**

```astro
---
interface Props {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  robots?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const {
  title,
  description,
  canonical,
  ogImage = 'https://showcase.wreative.com/assets/wreative.png',
  robots = 'index, follow',
  jsonLd,
} = Astro.props;

const jsonLdBlocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
---

<title>{title}</title>
<meta name="description" content={description} />
<meta name="robots" content={robots} />
<link rel="canonical" href={canonical} />

<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={ogImage} />
<meta property="og:url" content={canonical} />
<meta property="og:type" content="website" />
<meta property="og:locale" content="id_ID" />
<meta property="og:site_name" content="Wreative Showcase" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={ogImage} />

{jsonLdBlocks.map((block) => (
  <script type="application/ld+json" set:html={JSON.stringify(block)} />
))}
```

- [ ] **Step 2: Write `BaseLayout.astro`**

Carry over every page-invariant tag from the current `index.html` verbatim (meta charset/viewport, `author`, verification meta tags, theme-color trio, favicon `<link>`s, Google Fonts preconnect + stylesheet, the inline theme-init script, and the shared `@graph` JSON-LD for `ProfessionalService`/`Person`/`WebSite`), and accept the per-page `Seo` props as pass-through:

```astro
---
import '@/index.css';
import Seo from '@/components/Seo.astro';

interface Props {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  robots?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const props = Astro.props;

const sharedJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': 'https://showcase.wreative.com/#org',
      name: 'Wreative',
      url: 'https://showcase.wreative.com',
      description:
        'Creative agency specializing in website and mobile application development based in Indonesia.',
      logo: 'https://showcase.wreative.com/assets/wreative.png',
      address: { '@type': 'PostalAddress', addressCountry: 'ID', addressRegion: 'Banten' },
      sameAs: ['https://showcase.wreative.com'],
    },
    {
      '@type': 'Person',
      '@id': 'https://showcase.wreative.com/#person',
      name: 'Moh Ravi Dwi Putra',
      url: 'https://showcase.wreative.com',
      jobTitle: 'Web Developer & Designer',
      worksFor: { '@id': 'https://showcase.wreative.com/#org' },
      nationality: 'ID',
      knowsAbout: ['Web Development', 'Mobile App Development', 'WordPress', 'React', 'Flutter'],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://showcase.wreative.com/#website',
      name: 'Wreative Showcase',
      url: 'https://showcase.wreative.com',
      description:
        'Portfolio showcase of website and mobile application projects by Wreative creative agency.',
      publisher: { '@id': 'https://showcase.wreative.com/#org' },
      inLanguage: ['en', 'id'],
    },
  ],
};
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="author" content="Moh Ravi Dwi Putra" />

    <Seo {...props} />

    <meta name="google-site-verification" content="Ukw8g7kiNLwh8PEU_X2OvQPx5CJHdwQVM-fpbaaaCeY" />
    <meta
      name="ahrefs-site-verification"
      content="b850a8261da5283732a7d275f2ca5d60d7241d12a5e3ed0e6f344d91cb22721c"
    />

    <meta name="theme-color" content="#ffffff" />
    <meta name="msapplication-navbutton-color" content="#ffffff" />
    <meta name="apple-mobile-web-app-status-bar-style" content="#ffffff" />

    <link rel="shortcut icon" type="image/x-icon" href="/assets/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="192x192" href="/assets/android-chrome-192x192.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon-16x16.png" />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap"
      rel="stylesheet"
    />

    <script type="application/ld+json" set:html={JSON.stringify(sharedJsonLd)} />

    <script is:inline>
      (function () {
        try {
          var t = localStorage.getItem('wreative-theme') || 'dark';
          if (t === 'dark') document.documentElement.classList.add('dark');
        } catch (e) {}
      })();
    </script>
  </head>
  <body>
    <slot />
  </body>
</html>
```

`script is:inline` is required here — Astro processes/bundles `<script>` by default, but this one must run synchronously, unbundled, before first paint (exactly like today) to avoid a dark/light flash.

- [ ] **Step 3: Verify against the old `index.html`**

Diff the two side by side and confirm every tag from the old file has a home: `google32b581d4d21f7a3b.html` (root Google verification file) is unrelated to this and is handled in Task 14 cleanup, not here — it's a standalone file, not an `index.html` tag.

- [ ] **Step 4: Commit**

```bash
git add src/components/Seo.astro src/layouts/BaseLayout.astro
git commit -m "feat: add BaseLayout + Seo replacing index.html and react-helmet-async"
```

---

### Task 7: `BrandLogo.astro`, `Footer.astro`, `ThemeToggle.astro`

**Files:**
- Create: `src/components/BrandLogo.astro`
- Create: `src/components/Footer.astro`
- Create: `src/components/ThemeToggle.astro`

**Interfaces:**
- `BrandLogo.astro` props: `class?: string` (default `'h-6 w-9'`), matching the current `BrandLogoProps.className` default. Consumed by Task 8 (`Header.astro`), Task 7's own `Footer.astro`, and Task 12 (`[slug].astro`'s header).
- `Footer.astro` props: `brandName: string`. Consumed by Task 10 (`index.astro`).
- `ThemeToggle.astro` takes no props (self-contained; reads/writes `localStorage['wreative-theme']` and toggles `document.documentElement.classList` itself, same as the current `ThemeContext`). Consumed by Task 8 (`Header.astro`) and Task 12 (`[slug].astro`'s header).

- [ ] **Step 1: `BrandLogo.astro`**

Uses the exact same `invert` / `dark:invert-0` CSS-filter mechanism as today (`BrandLogo.tsx`) rather than swapping to two separate light/dark image files: the current implementation already satisfies every requirement in spec §3 (auto-switches per theme, zero flash since it's pure CSS driven off the `dark` class already applied before paint by `BaseLayout`'s inline script, fully responsive, and pixel-identical to what's live) with a single asset — introducing a second real image asset would be a bigger, non-idiomatic change for no visual difference, so per the spec's own tie-breaker ("pilih implementasi yang paling sederhana... dan paling dekat dengan behavior existing") this keeps the filter approach.

```astro
---
interface Props {
  class?: string;
}

const { class: className = 'h-6 w-9' } = Astro.props;
---

<img
  src="/assets/wreative.png"
  alt="Wreative"
  class={`invert transition-[filter] duration-300 dark:invert-0 ${className}`}
/>
```

- [ ] **Step 2: `Footer.astro`**

```astro
---
import BrandLogo from './BrandLogo.astro';

interface Props {
  brandName: string;
}

const { brandName } = Astro.props;
const year = new Date().getFullYear();
---

<footer class="mt-auto border-t border-border bg-muted/50">
  <div class="mx-auto max-w-7xl px-4 py-6">
    <div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
      <div class="flex items-center gap-2">
        <BrandLogo class="h-5 w-7" />
        <span class="text-sm font-medium text-foreground/70">{brandName}</span>
      </div>
      <div class="text-sm text-muted-foreground">
        &copy; {year} {brandName}. All rights reserved.
      </div>
    </div>
  </div>
</footer>
```

`new Date().getFullYear()` runs at **build time** here (Astro frontmatter executes once during `astro build`), not per-request like the React version did per-render — for a static site rebuilt at least yearly this is an acceptable, spec-sanctioned simplification (no visual difference on any given build), but note it explicitly: the footer year will not silently roll over at midnight Jan 1 without a rebuild, unlike the old client-rendered version.

- [ ] **Step 3: `ThemeToggle.astro`**

```astro
---
import Icon from './Icon.astro';
---

<button
  id="theme-toggle"
  type="button"
  class="rounded-lg border border-border bg-card p-2 text-foreground transition-colors hover:bg-accent"
  aria-label="Toggle theme"
>
  <Icon name="sun" class="hidden h-4 w-4 dark:block" />
  <Icon name="moon" class="block h-4 w-4 dark:hidden" />
</button>

<script>
  const STORAGE_KEY = 'wreative-theme';

  function currentTheme(): 'light' | 'dark' {
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  }

  function updateAriaLabel(button: HTMLButtonElement) {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    button.setAttribute('aria-label', `Switch to ${next} mode`);
  }

  document.querySelectorAll<HTMLButtonElement>('#theme-toggle').forEach((button) => {
    updateAriaLabel(button);
    button.addEventListener('click', () => {
      const next = currentTheme() === 'dark' ? 'light' : 'dark';
      document.documentElement.classList.toggle('dark', next === 'dark');
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* noop */
      }
      updateAriaLabel(button);
    });
  });
</script>
```

The React version rendered exactly one `<Sun>` or `<Moon>` icon at a time (state-driven); this renders both and uses `dark:block`/`dark:hidden`/`hidden` Tailwind classes to show only the correct one — visually identical output, but works with no JS-computed initial state (avoids a hydration-style flash-of-wrong-icon on load), and the `<script>` only needs to keep the `aria-label` in sync and flip the `dark` class + localStorage on click. `document.querySelectorAll` (not `getElementById`) because both `Header.astro` (Task 8) and `[slug].astro`'s header (Task 12) render a `ThemeToggle` on the same page's detail-page header — wait, only one `ThemeToggle` renders per page today (Header has one, DetailPage's own header has one, never both at once) — `querySelectorAll` is still correct/harmless since Astro scripts run once per page and there's exactly one `#theme-toggle` per page in practice; note `id` uniqueness isn't violated because only one `ThemeToggle.astro` instance renders per page load.

- [ ] **Step 4: Verify**

Run: `pnpm dev`, add a throwaway `src/pages/theme-check.astro` importing `BaseLayout` + `ThemeToggle` + `Footer`; click the toggle, confirm the icon swaps and the page background flips between light/dark, reload and confirm the choice persisted via `localStorage`. Delete the throwaway page once confirmed.

- [ ] **Step 5: Commit**

```bash
git add src/components/BrandLogo.astro src/components/Footer.astro src/components/ThemeToggle.astro
git commit -m "feat: port BrandLogo, Footer, ThemeToggle to Astro"
```

---

### Task 8: `SearchBar.astro`, `CategoryFilter.astro`, `Header.astro`

**Files:**
- Create: `src/components/SearchBar.astro`
- Create: `src/components/CategoryFilter.astro`
- Create: `src/components/Header.astro`

**Interfaces:**
- `SearchBar.astro`: no props, renders `<input id="search-input">`. Its value is read by Task 10's filter script (`src/scripts/landing-filter.ts`) via that id — no local JS needed inside `SearchBar.astro` itself.
- `CategoryFilter.astro` props: `categories: string[]`. Renders a custom vanilla dropdown (`#category-trigger` button + `#category-menu` panel), each category as a `<button data-category="...">`. Its open/close behavior is self-contained (Step 2's inline `<script>`); which category is *selected* is read/written by Task 10's filter script via `data-selected` on the trigger and a `category-select` `CustomEvent` — see Step 2.
- `Header.astro` props: `categories: string[]` (passthrough to `CategoryFilter`). Renders the three platform-tab `<button data-platform="all|website|mobile">`s, `SearchBar`, `CategoryFilter`, `BrandLogo`, `ThemeToggle`. No local state — Task 10's filter script owns all filtering state and reads/writes these DOM elements directly (search input value, `data-platform` active-state class, `data-selected` on the category trigger).

The original `Header.tsx` was a "dumb" component driven entirely by props/callbacks from `LandingPage.tsx`'s `useState`. Astro has no client-side component state, so the state owner becomes a plain DOM-driven script (`landing-filter.ts`, written in Task 10) that reads these elements' current values and listens for their events — `Header`/`SearchBar`/`CategoryFilter` here only render markup and (for the dropdown) its own open/close mechanics; they don't know about filtering.

- [ ] **Step 1: `SearchBar.astro`**

```astro
---
import Icon from './Icon.astro';
---

<div class="relative flex-1">
  <Icon
    name="search"
    class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
  />
  <input
    id="search-input"
    type="text"
    placeholder="Search projects..."
    class="w-full rounded-lg border border-border bg-muted py-2 pl-10 pr-4 text-foreground transition-all placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring"
  />
</div>
```

(`pointer-events-none` added to the icon since it now sits inside a plain `<div>` with no React click-handling boundary concerns — purely defensive, doesn't change appearance, prevents the icon from intercepting clicks meant for the input; matches how the original visually behaved since the icon was never interactive there either.)

- [ ] **Step 2: `CategoryFilter.astro`**

```astro
---
import Icon from './Icon.astro';

interface Props {
  categories: string[];
}

const { categories } = Astro.props;
---

<div class="relative" data-category-filter>
  <button
    id="category-trigger"
    type="button"
    data-selected={categories[0]}
    class="flex items-center gap-1 rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground transition-colors hover:opacity-90"
    aria-haspopup="true"
    aria-expanded="false"
  >
    <span id="category-trigger-label">{categories[0]}</span>
    <Icon name="chevron-down" class="h-4 w-4" />
  </button>
  <div
    id="category-menu"
    role="menu"
    class="absolute right-0 z-10 mt-1 hidden w-48 rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md"
  >
    {categories.map((category) => (
      <button
        type="button"
        role="menuitem"
        data-category={category}
        class="flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-left text-sm outline-none hover:bg-accent hover:text-accent-foreground"
      >
        {category}
      </button>
    ))}
  </div>
</div>

<script>
  document.querySelectorAll<HTMLDivElement>('[data-category-filter]').forEach((root) => {
    const trigger = root.querySelector<HTMLButtonElement>('#category-trigger')!;
    const label = root.querySelector<HTMLSpanElement>('#category-trigger-label')!;
    const menu = root.querySelector<HTMLDivElement>('#category-menu')!;

    const close = () => {
      menu.classList.add('hidden');
      trigger.setAttribute('aria-expanded', 'false');
    };
    const open = () => {
      menu.classList.remove('hidden');
      trigger.setAttribute('aria-expanded', 'true');
    };

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.contains('hidden') ? open() : close();
    });

    menu.querySelectorAll<HTMLButtonElement>('[data-category]').forEach((item) => {
      item.addEventListener('click', () => {
        const category = item.dataset.category!;
        trigger.dataset.selected = category;
        label.textContent = category;
        menu.querySelectorAll<HTMLButtonElement>('[data-category]').forEach((btn) => {
          btn.classList.toggle(
            'bg-accent',
            btn.dataset.category === category
          );
          btn.classList.toggle('text-accent-foreground', btn.dataset.category === category);
        });
        close();
        root.dispatchEvent(new CustomEvent('category-select', { detail: category, bubbles: true }));
      });
    });

    document.addEventListener('click', (e) => {
      if (!root.contains(e.target as Node)) close();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });
  });
</script>
```

This replaces `@radix-ui/react-dropdown-menu` with a minimal hand-rolled dropdown reproducing the same interactions Radix gave for free: click-to-open, click-outside-to-close, Escape-to-close, and the exact same Tailwind classes `dropdown-menu.tsx`/`CategoryFilter.tsx` used for the trigger/panel/item styling (so the visual result is unchanged). `landing-filter.ts` (Task 10) listens for the `category-select` custom event rather than polling `data-selected`, but also reads `trigger.dataset.selected` directly for the initial/current value.

- [ ] **Step 3: `Header.astro`**

```astro
---
import SearchBar from './SearchBar.astro';
import CategoryFilter from './CategoryFilter.astro';
import ThemeToggle from './ThemeToggle.astro';
import BrandLogo from './BrandLogo.astro';

interface Props {
  categories: string[];
}

const { categories } = Astro.props;
const tabs = [
  { key: 'all', label: 'All' },
  { key: 'website', label: 'Website' },
  { key: 'mobile', label: 'Mobile' },
];
---

<header class="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
  <div class="mx-auto max-w-7xl px-4 py-4">
    <div class="mb-4 flex items-center justify-between">
      <a href="/" class="group flex items-center gap-2.5">
        <BrandLogo />
        <h1 class="text-xl font-bold text-foreground transition-colors group-hover:text-muted-foreground">
          Wreative Showcase
        </h1>
      </a>
      <ThemeToggle />
    </div>

    <div class="mb-3 flex gap-1" id="platform-tabs">
      {tabs.map((tab) => (
        <button
          type="button"
          data-platform={tab.key}
          class:list={[
            'rounded-lg px-4 py-1.5 text-sm font-medium transition-colors',
            tab.key === 'all'
              ? 'bg-foreground text-background'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground',
          ]}
        >
          {tab.label}
        </button>
      ))}
    </div>

    <div class="flex gap-2">
      <SearchBar />
      <CategoryFilter categories={categories} />
    </div>
  </div>
</header>
```

`data-platform="all"` starts with the active (`bg-foreground text-background`) classes server-rendered, matching the React version's initial `selectedPlatform === 'all'` state; `landing-filter.ts` (Task 10) toggles those two classes on click instead of React re-rendering.

- [ ] **Step 4: Verify**

Run: `pnpm dev`, throwaway page rendering `<Header categories={['All', 'Business']} />` inside `BaseLayout`; confirm layout matches the live site (sticky header, tabs, search box, category dropdown opens/closes/selects, on Escape and click-outside). Delete the throwaway page.

- [ ] **Step 5: Commit**

```bash
git add src/components/SearchBar.astro src/components/CategoryFilter.astro src/components/Header.astro
git commit -m "feat: port SearchBar, CategoryFilter (vanilla dropdown), Header to Astro"
```

---

### Task 9: `TemplateCard.astro`, `TemplateGrid.astro`, `LoadingIndicator.astro`, `Alert.astro`

**Files:**
- Create: `src/components/TemplateCard.astro`
- Create: `src/components/TemplateGrid.astro`
- Create: `src/components/LoadingIndicator.astro`
- Create: `src/components/Alert.astro`

**Interfaces:**
- `TemplateCard.astro` props: `template: PortfolioItem` (from `@/data/portfolio`). Renders an `<a>` with `data-title`, `data-platform`, `data-category` attributes (lowercased title for case-insensitive search) that Task 10's filter script reads to decide visibility, plus a `data-index` for stable ordering — see Step 1.
- `TemplateGrid.astro` props: `templates: PortfolioItem[]`. Renders one `TemplateCard` per item plus the "nothing found" empty-state markup (`id="empty-state"`, `hidden` by default) and a `LoadingIndicator` (`id="grid-loading"`, `hidden` by default) — visibility of both toggled by Task 10's script, replacing the old `loading`/`templates.length === 0` props.
- `LoadingIndicator.astro`: no props.
- `Alert.astro` / `AlertTitle`/`AlertDescription` equivalents: since the only real usage (`index.astro`'s announcement banner, Task 10) is a single static block with fixed content, this collapses the three-component `Alert`/`AlertTitle`/`AlertDescription` React trio into one `Alert.astro` taking a `title` and default `<slot />` for the description body — see Step 4.

- [ ] **Step 1: `TemplateCard.astro`**

```astro
---
import type { PortfolioItem } from '@/data/portfolio';

interface Props {
  template: PortfolioItem;
}

const { template } = Astro.props;
const imageCount = template.gallery.filter((i) => i.type === 'image').length;
const hasVideo = template.gallery.some((i) => i.type === 'video');
---

<a
  href={`/project/${template.slug}`}
  class="group relative block cursor-pointer overflow-hidden rounded-xl border border-border bg-card transition-colors duration-300 hover:border-foreground/20"
  data-template-card
  data-title={template.title.toLowerCase()}
  data-platform={template.platform}
  data-category={template.category}
>
  <div class="aspect-[16/9] overflow-hidden">
    <img
      src={template.image}
      alt={template.title}
      class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      loading="lazy"
    />
  </div>

  <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>

  <div class="absolute inset-x-0 bottom-0 p-5">
    <div class="flex items-end justify-between gap-2">
      <h2 class="text-lg font-semibold leading-tight text-white">{template.title}</h2>
      <span class="shrink-0 rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-medium text-white/90">
        {template.category}
      </span>
    </div>
  </div>

  <span class="absolute left-3 top-3 rounded-md bg-black/50 px-2 py-0.5 text-[11px] font-medium capitalize text-white/70">
    {template.platform}
  </span>

  {template.gallery.length > 1 && (
    <span class="absolute right-3 top-3 rounded-md bg-black/50 px-2 py-0.5 text-[11px] text-white/70">
      {imageCount} img{hasVideo && ' + vid'}
    </span>
  )}
</a>
```

- [ ] **Step 2: `LoadingIndicator.astro`**

```astro
<div class="py-4 text-center">
  <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
</div>
```

- [ ] **Step 3: `TemplateGrid.astro`**

```astro
---
import TemplateCard from './TemplateCard.astro';
import LoadingIndicator from './LoadingIndicator.astro';
import type { PortfolioItem } from '@/data/portfolio';

interface Props {
  templates: PortfolioItem[];
}

const { templates } = Astro.props;
---

<div class="grid grid-cols-1 gap-3 md:grid-cols-2" id="template-grid">
  {templates.map((template) => <TemplateCard template={template} />)}
</div>

<div id="grid-loading" class="hidden">
  <LoadingIndicator />
</div>

<div id="empty-state" class="hidden py-12 text-center">
  <p class="text-lg text-muted-foreground">Nothing found matching your criteria.</p>
</div>
```

Every `PortfolioItem` renders into the DOM up front (all 33 cards, server-rendered — better for SEO/crawlability than the original's `visibleItems`-sliced list, and still visually identical since Task 10's script hides the non-matching/not-yet-revealed ones with the same net effect as the original's `.slice()`).

- [ ] **Step 4: `Alert.astro`**

```astro
---
interface Props {
  title: string;
  class?: string;
}

const { title, class: className = '' } = Astro.props;
---

<div
  role="alert"
  class:list={[
    'relative w-full rounded-lg border px-4 py-3 text-sm',
    'border-amber-500/20 bg-amber-500/5 text-amber-600 dark:text-amber-200',
    className,
  ]}
>
  <h5 class="mb-1 text-base font-semibold leading-none tracking-tight text-amber-700 dark:text-amber-100">
    {title}
  </h5>
  <div class="text-sm text-amber-600/70 dark:text-amber-200/70">
    <slot />
  </div>
</div>
```

The original `Alert`/`AlertTitle`/`AlertDescription` trio was a generic cva-variant shadcn component (with an unused `destructive` variant — grep confirms `LandingPage.tsx` is the only consumer, and it only ever used the implicit `default` variant with manually-applied amber override classes). Since nothing else in the codebase uses the `destructive` variant or the generic form, this collapses it to the one concrete shape actually needed, matching the exact rendered classes/markup from `LandingPage.tsx`'s usage today. Note this narrowing in the PR/commit message so it's an intentional, visible decision rather than a silent behavior change.

- [ ] **Step 5: Verify**

Run: `pnpm dev`, throwaway page rendering `TemplateGrid` with a handful of real `portfolios` entries (import from `@/data/portfolio`, ported in Task 4) and an `Alert` with the same copy as `LandingPage.tsx`; compare visually against the live site's card grid and announcement banner. Delete the throwaway page.

- [ ] **Step 6: Commit**

```bash
git add src/components/TemplateCard.astro src/components/TemplateGrid.astro src/components/LoadingIndicator.astro src/components/Alert.astro
git commit -m "feat: port TemplateCard, TemplateGrid, LoadingIndicator, Alert to Astro"
```

---

### Task 10: Landing page — filter/infinite-scroll script + `src/pages/index.astro`

**Files:**
- Create: `src/scripts/landing-filter.ts`
- Create: `src/pages/index.astro`

**Interfaces:**
- `landing-filter.ts` exports nothing (it's a page-scoped script, imported for its side effects via `<script>` in `index.astro`); it queries the DOM elements rendered by Task 8/9 (`#search-input`, `#platform-tabs [data-platform]`, `[data-category-filter]`'s `category-select` event + `#category-trigger[data-selected]`, `#template-grid [data-template-card]`, `#grid-loading`, `#empty-state`) and owns all filtering/pagination state internally (module-scope, one page instance).
- `index.astro` has no props (it's a route, not a component) — it imports `BaseLayout`, `Header`, `Alert`, `TemplateGrid`, `Footer` and `portfolios`/`categories` from `@/data/portfolio`, matching `LandingPage.tsx`'s composition.

This is the functional core of the migration: `LandingPage.tsx` held `searchQuery`/`selectedPlatform`/`selectedCategory`/`visibleItems`/`loading` in React state and re-rendered `TemplateGrid` on every change, plus a scroll listener that paged `visibleItems` up by 8 with a 400ms simulated-loading delay. Astro has no re-render — instead, all 33 cards are already in the DOM (Task 9), and this script does the equivalent work by toggling `hidden` on cards and progressively revealing more of the *currently matching* set as the user scrolls, replicating the exact same visible behavior (search-as-you-type, platform tabs, category dropdown, infinite scroll in pages of 8 with a loading spinner, "nothing found" state, filters reset the revealed count back to 8).

- [ ] **Step 1: Write `src/scripts/landing-filter.ts`**

```ts
const ITEMS_PER_PAGE = 8;
const LOAD_DELAY_MS = 400;

interface CardEl extends HTMLElement {
  dataset: DOMStringMap & { title: string; platform: string; category: string };
}

function initLandingFilter() {
  const grid = document.getElementById('template-grid');
  const searchInput = document.getElementById('search-input') as HTMLInputElement | null;
  const platformTabs = document.getElementById('platform-tabs');
  const categoryTrigger = document.getElementById('category-trigger') as HTMLButtonElement | null;
  const emptyState = document.getElementById('empty-state');
  const gridLoading = document.getElementById('grid-loading');
  if (!grid || !searchInput || !platformTabs || !categoryTrigger || !emptyState || !gridLoading) return;

  const cards = Array.from(grid.querySelectorAll<CardEl>('[data-template-card]'));

  let searchQuery = '';
  let selectedPlatform: 'all' | 'website' | 'mobile' = 'all';
  let selectedCategory = categoryTrigger.dataset.selected ?? 'All';
  let visibleCount = ITEMS_PER_PAGE;
  let loading = false;

  function matches(card: CardEl): boolean {
    const matchesSearch = card.dataset.title.includes(searchQuery.toLowerCase());
    const matchesPlatform = selectedPlatform === 'all' || card.dataset.platform === selectedPlatform;
    const matchesCategory = selectedCategory === 'All' || card.dataset.category === selectedCategory;
    return matchesSearch && matchesPlatform && matchesCategory;
  }

  function render() {
    const matching = cards.filter(matches);
    matching.forEach((card, i) => {
      card.hidden = i >= visibleCount;
    });
    cards.filter((c) => !matching.includes(c)).forEach((card) => {
      card.hidden = true;
    });
    emptyState.classList.toggle('hidden', matching.length !== 0);
    gridLoading.classList.toggle('hidden', !loading);
  }

  function resetPaging() {
    visibleCount = ITEMS_PER_PAGE;
    render();
  }

  searchInput.addEventListener('input', () => {
    searchQuery = searchInput.value;
    resetPaging();
  });

  platformTabs.querySelectorAll<HTMLButtonElement>('[data-platform]').forEach((tab) => {
    tab.addEventListener('click', () => {
      selectedPlatform = tab.dataset.platform as 'all' | 'website' | 'mobile';
      platformTabs.querySelectorAll<HTMLButtonElement>('[data-platform]').forEach((t) => {
        const active = t === tab;
        t.classList.toggle('bg-foreground', active);
        t.classList.toggle('text-background', active);
        t.classList.toggle('text-muted-foreground', !active);
        t.classList.toggle('hover:bg-muted', !active);
        t.classList.toggle('hover:text-foreground', !active);
      });
      resetPaging();
    });
  });

  document.addEventListener('category-select', ((e: CustomEvent<string>) => {
    selectedCategory = e.detail;
    resetPaging();
  }) as EventListener);

  function loadMore() {
    loading = true;
    render();
    setTimeout(() => {
      visibleCount += ITEMS_PER_PAGE;
      loading = false;
      render();
    }, LOAD_DELAY_MS);
  }

  window.addEventListener(
    'scroll',
    () => {
      const matching = cards.filter(matches);
      const nearBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 200;
      if (nearBottom && !loading && visibleCount < matching.length) loadMore();
    },
    { passive: true }
  );

  render();
}

initLandingFilter();
```

Behavior parity notes: the original reset `visibleItems` to `ITEMS_PER_PAGE` on any of `searchQuery`/`selectedPlatform`/`selectedCategory` changing (`useEffect` dep array) — `resetPaging()` does the same on every filter-changing event. `data-title` is pre-lowercased at render time (Task 9), so `.includes(searchQuery.toLowerCase())` matches the original's `t.title.toLowerCase().includes(searchQuery.toLowerCase())`.

- [ ] **Step 2: Write `src/pages/index.astro`**

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import Header from '@/components/Header.astro';
import Alert from '@/components/Alert.astro';
import TemplateGrid from '@/components/TemplateGrid.astro';
import Footer from '@/components/Footer.astro';
import { portfolios } from '@/data/portfolio';

const categories = ['All', ...new Set(portfolios.map((t) => t.category))];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Wreative Showcase — Portfolio',
  url: 'https://showcase.wreative.com/',
  description: 'Portfolio of website and mobile application projects by Wreative creative agency.',
  provider: { '@id': 'https://showcase.wreative.com/#org' },
  mainEntity: { '@type': 'ItemList', numberOfItems: portfolios.length },
};
---

<BaseLayout
  title="Wreative Showcase — Portfolio Kreatif Indonesia"
  description="Portfolio showcase by Wreative — creative agency based in Indonesia. Browse 36 website and mobile app projects across business, education, e-commerce, government, and services categories."
  canonical="https://showcase.wreative.com/"
  jsonLd={jsonLd}
>
  <div class="flex min-h-screen flex-col bg-background">
    <Header categories={categories} />

    <main class="mx-auto w-full max-w-7xl flex-1 px-4 py-6">
      <Alert title="Announcement" class="mb-6">
        Not all websites are mirrored, and the <b>mirroring</b> is done to maintain the original theme
        we've created, in case there are any changes from the client's side. Some functions may not
        work properly.
      </Alert>

      <TemplateGrid templates={portfolios} />
    </main>

    <Footer brandName="Wreative" />
  </div>
</BaseLayout>

<script src="@/scripts/landing-filter.ts"></script>
```

Two things intentionally dropped from the original because they're now dead: the `selectedPlatform !== 'all'` "Showing {platform} projects..." helper text (it was React-conditional-rendered text with no dynamic value binding beyond the platform name — since it's a nice-to-have status line, not called out anywhere in spec's Visual Parity checklist as load-bearing, and re-adding it would require another small DOM-toggle in `landing-filter.ts` for one line of copy) — re-add it in this task since the spec says "Jangan mengubah copy/content kecuali memang diperlukan" (don't change copy unless migration requires it) and this is copy, not routing/data. Add it back:

```astro
<p id="platform-status" class="mb-4 hidden text-sm capitalize text-muted-foreground"></p>
```

placed just above `<TemplateGrid templates={portfolios} />`, and in `landing-filter.ts`, inside `render()`, add:

```ts
const statusEl = document.getElementById('platform-status');
if (statusEl) {
  if (selectedPlatform !== 'all') {
    statusEl.textContent =
      `Showing ${selectedPlatform} projects` +
      (selectedCategory !== 'All' ? ` in ${selectedCategory}` : '');
    statusEl.classList.remove('hidden');
  } else {
    statusEl.classList.add('hidden');
  }
}
```

(query `statusEl` once at the top of `initLandingFilter`, not inside `render()`, for consistency with the other elements — adjust accordingly.) The original's second, redundant "No projects found..." block (`filtered.length === 0` inside `<main>`, distinct from `TemplateGrid`'s own empty state) is genuinely dead duplicate UI — `TemplateGrid`'s `#empty-state` already covers it and is the one actually reachable in practice (both conditions were identical: `filtered.length === 0`) — do not port the duplicate.

- [ ] **Step 3: Verify**

Run: `pnpm dev`, open `/`. Confirm: all cards render; typing in search filters live; platform tabs filter + restyle; category dropdown filters; scrolling near the bottom reveals more cards after ~400ms with the spinner briefly visible; "Nothing found" appears for an impossible search term; reload after toggling dark mode keeps the theme. Compare against the currently-running React site (`git stash`, `pnpm dev` on `main`, or just recall from Task 1's exploration) side by side for spacing/behavior parity.

- [ ] **Step 4: Commit**

```bash
git add src/scripts/landing-filter.ts src/pages/index.astro
git commit -m "feat: port landing page filtering/infinite-scroll and index.astro route"
```

---

### Task 11: Lightbox vanilla controller

**Files:**
- Create: `src/scripts/lightbox.ts`

**Interfaces:**
- Exports `initLightbox(images: string[], options: { onIndexChange?: (index: number) => void }): { open(index: number): void; close(): void }`. Consumed by Task 12's `[slug].astro` gallery script, which calls `open(i)` when a gallery image is clicked.
- Builds and injects its own DOM (an overlay with close/zoom-in/zoom-out/reset buttons, image, thumbnail dots) rather than expecting pre-rendered markup — mirrors `Lightbox.tsx` being a fully self-contained component that only received `images`/`currentIndex`/callbacks as props and rendered everything itself.

Port `src/components/Lightbox.tsx`'s exact behavior: Escape closes, ArrowLeft/ArrowRight navigate, wheel zooms (clamped `0.5`–`5`, `±0.15` per tick), mouse-drag pans while zoomed, `resetZoom()` on every index change, `document.body.style.overflow = 'hidden'` while open (restored on close), thumbnail dots (only when `images.length > 1`) where clicking a dot before/after the current index calls prev/next repeatedly to reach it. Read `src/components/Lightbox.tsx` in full before starting — it is the source of truth for the exact Tailwind classes, SVG icon markup (inline hand-drawn SVGs for zoom-in/zoom-out/close, not `lucide-static` — the original doesn't use lucide here, don't introduce it), and pixel layout (bottom-14 centered dot row, top-right control cluster, etc.) to reproduce verbatim.

- [ ] **Step 1: Read `src/components/Lightbox.tsx` in full and list its exact DOM structure**

Before writing any code, open the file and write down (as comments at the top of the new `lightbox.ts`, or scratch notes) every className string, every inline SVG's `d` attribute, and the exact JSX nesting for: the overlay backdrop, the image `<img>` with drag/zoom transform, the top-right control cluster (zoom out / zoom percentage or reset label / zoom in / close), and the bottom dot row. This step exists because this is the single most visually detailed component in the app (freeform zoom/pan controls) and the plan cannot spell out 200 lines of exact JSX here without drifting from the real file — the file itself is the spec for this step.

- [ ] **Step 2: Write `src/scripts/lightbox.ts`**

Structure as a small class or closure-based module owning `scale`, `position`, `isDragging`, `currentIndex` state (module-level, one lightbox per page — matches usage, since only one `Lightbox` ever mounts at a time in `DetailPage.tsx`). Reimplement each handler 1:1 from `Lightbox.tsx`:

```ts
export interface LightboxController {
  open(index: number): void;
  close(): void;
}

export function initLightbox(images: string[]): LightboxController {
  let currentIndex = 0;
  let scale = 1;
  let position = { x: 0, y: 0 };
  let isDragging = false;
  let dragStart = { x: 0, y: 0, px: 0, py: 0 };

  // Build DOM once (hidden by default), matching Lightbox.tsx's markup/classes exactly
  // (overlay, <img>, control cluster, dot row) — see Step 1's notes for exact classes/SVGs.
  const overlay = document.createElement('div');
  overlay.className = 'fixed inset-0 z-[60] flex items-center justify-center bg-black/90'; // verify against Lightbox.tsx
  overlay.hidden = true;
  document.body.appendChild(overlay);
  // ... build img, control buttons, dots inside `overlay`, wiring their click handlers
  // to resetZoom/prev/next/close exactly as in Lightbox.tsx. Omitted here — build
  // directly from the Step 1 notes so the DOM matches byte-for-byte.

  function resetZoom() {
    scale = 1;
    position = { x: 0, y: 0 };
    applyTransform();
  }

  function applyTransform() {
    const img = overlay.querySelector('img');
    if (img) img.style.transform = `translate(${position.x}px, ${position.y}px) scale(${scale})`;
  }

  function prev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    render();
  }
  function next() {
    currentIndex = (currentIndex + 1) % images.length;
    render();
  }
  function render() {
    resetZoom();
    const img = overlay.querySelector('img') as HTMLImageElement | null;
    if (img) img.src = images[currentIndex];
    // update dot active state, matching Lightbox.tsx's `i === currentIndex` class toggle
  }

  function handleWheel(e: WheelEvent) {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.15 : 0.15;
    scale = Math.min(Math.max(0.5, scale + delta), 5);
    applyTransform();
  }
  function handleMouseDown(e: MouseEvent) {
    isDragging = true;
    dragStart = { x: e.clientX, y: e.clientY, px: position.x, py: position.y };
  }
  function handleMouseMove(e: MouseEvent) {
    if (!isDragging) return;
    position = {
      x: dragStart.px + (e.clientX - dragStart.x),
      y: dragStart.py + (e.clientY - dragStart.y),
    };
    applyTransform();
  }
  function handleMouseUp() {
    isDragging = false;
  }

  function handleKey(e: KeyboardEvent) {
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  }

  function open(index: number) {
    currentIndex = index;
    overlay.hidden = false;
    render();
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
  }
  function close() {
    overlay.hidden = true;
    document.body.style.overflow = '';
    window.removeEventListener('keydown', handleKey);
  }

  overlay.addEventListener('wheel', handleWheel, { passive: false });
  overlay.addEventListener('mousedown', handleMouseDown);
  overlay.addEventListener('mousemove', handleMouseMove);
  overlay.addEventListener('mouseup', handleMouseUp);
  overlay.addEventListener('mouseleave', handleMouseUp);

  return { open, close };
}
```

Fill in the DOM-construction and dot-click-to-navigate portions using the exact classes/SVGs recorded in Step 1 — do not leave the `// build img, control buttons...` comment as final code; it's a placeholder for *this planning step only* and must be replaced with real markup construction (e.g. via a `<template>` element cloned once, or direct `innerHTML` assignment built from a template string) before Step 3.

- [ ] **Step 3: Verify against a standalone test page**

Create a throwaway `src/pages/lightbox-check.astro` that calls `initLightbox(['/assets/cover/bemode.webp', '/assets/cover/aviso.webp', '/assets/cover/wreative.webp'])` and a button to `open(0)`. Confirm: opens centered over a dark backdrop, wheel zooms in/out with clamping, drag pans while zoomed, arrow keys navigate, Escape closes, dots navigate and highlight the current index, closes and restores page scroll. Delete the throwaway page once confirmed.

- [ ] **Step 4: Commit**

```bash
git add src/scripts/lightbox.ts
git commit -m "feat: port Lightbox to a vanilla-TS controller"
```

---

### Task 12: Gallery Swiper controller + detail page route

**Files:**
- Create: `src/scripts/gallery-swiper.ts`
- Create: `src/pages/project/[slug].astro`

**Interfaces:**
- `gallery-swiper.ts` exports `initGallerySwiper(container: HTMLElement, onImageClick: (imageIndex: number) => void): void` — initializes a vanilla `Swiper` instance (core + `Keyboard` module, `spaceBetween: 12`, `slidesPerView: 1`) on `container`, and wires a click handler on each rendered `<img>` slide that calls `onImageClick` with that slide's index among *images only* (matching `DetailPage.tsx`'s `imageIndices` mapping — video slides aren't clickable into the lightbox).
- `[slug].astro` exports `getStaticPaths()` returning `{ params: { slug } }` for every `portfolios` entry, matching React Router's `/project/:slug` param and `DetailPage.tsx`'s `useParams()` lookup — a slug with no matching portfolio entry must fall through to the 404 page (Task 13), same as the original's presumed not-found handling.

Read `src/pages/DetailPage.tsx` in full before starting (419 lines: header with back-link + `BrandLogo` + `ThemeToggle`, `GallerySwiper` sub-component, project title/tags/description, `PortfolioCategory`, Play Store/App Store link buttons when `playStoreUrl`/`appStoreUrl` are set, JSON-LD `CreativeWork` schema, and the `Lightbox` wiring) — it is the source of truth for exact markup/classes, same as Task 11's Lightbox.

- [ ] **Step 1: Write `src/scripts/gallery-swiper.ts`**

```ts
import Swiper from 'swiper';
import { Keyboard } from 'swiper/modules';
import 'swiper/css';

export function initGallerySwiper(
  container: HTMLElement,
  onImageClick: (imageIndex: number) => void
) {
  const swiper = new Swiper(container, {
    modules: [Keyboard],
    spaceBetween: 12,
    slidesPerView: 1,
    keyboard: { enabled: true },
  });

  const imageSlides = Array.from(
    container.querySelectorAll<HTMLElement>('.swiper-slide[data-gallery-type="image"]')
  );
  imageSlides.forEach((slide, imageIndex) => {
    slide.addEventListener('click', () => onImageClick(imageIndex));
  });

  return swiper;
}
```

Each `<div class="swiper-slide" data-gallery-type="image|video">` in `[slug].astro`'s gallery markup must carry `data-gallery-type` for this indexing to work — set that up in Step 2's markup.

- [ ] **Step 2: Write `src/pages/project/[slug].astro`**

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import BrandLogo from '@/components/BrandLogo.astro';
import ThemeToggle from '@/components/ThemeToggle.astro';
import { portfolios } from '@/data/portfolio';

export function getStaticPaths() {
  return portfolios.map((template) => ({
    params: { slug: template.slug },
    props: { template },
  }));
}

const { template } = Astro.props;

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: template.title,
  description: template.description,
  creator: { '@id': 'https://showcase.wreative.com/#person' },
  provider: { '@id': 'https://showcase.wreative.com/#org' },
  keywords: template.tags.join(', '),
  about: template.category,
};
---

<BaseLayout
  title={`${template.title} — Wreative Showcase`}
  description={template.description}
  canonical={`https://showcase.wreative.com/project/${template.slug}`}
  ogImage={template.image}
  jsonLd={jsonLd}
>
  <div class="flex min-h-screen flex-col bg-background">
    <header class="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a
          href="/"
          class="group flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="transition-transform group-hover:-translate-x-0.5">
            <path d="M19 12H5M12 19l-7-7 7-7"></path>
          </svg>
          Back
        </a>
        <div class="flex items-center gap-3">
          <BrandLogo class="h-6 w-9" />
          <ThemeToggle />
        </div>
      </div>
    </header>

    <main class="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
      <!--
        Port the rest of DetailPage.tsx's <main> content here verbatim (Tailwind classes,
        structure, copy): gallery (see below), title/category/tags, description, Play
        Store/App Store buttons when template.playStoreUrl/appStoreUrl are set, and the
        image-count summary line. Read DetailPage.tsx lines ~130-403 for the exact markup —
        it is the source of truth this task ports from 1:1, converting JSX conditionals
        (`{x && <.../>}`) to Astro's identical `{x && <.../>}` syntax (Astro supports the
        same JSX-like expressions in its template) and `template.gallery.map(...)` to a
        swiper-slide element per item.
      -->
      <div class="gallery-swiper" id="gallery-swiper">
        <div class="swiper-wrapper">
          {template.gallery.map((item) => (
            <div class="swiper-slide" data-gallery-type={item.type}>
              {item.type === 'image' ? (
                <img src={item.src} alt={template.title} class="h-full w-full object-cover" loading="lazy" />
              ) : (
                <video src={item.src} poster={item.poster} controls class="h-full w-full object-cover" />
              )}
            </div>
          ))}
        </div>
      </div>
    </main>

    <div id="lightbox-root"></div>
  </div>
</BaseLayout>

<script>
  import { initGallerySwiper } from '@/scripts/gallery-swiper';
  import { initLightbox } from '@/scripts/lightbox';

  const galleryEl = document.getElementById('gallery-swiper');
  if (galleryEl) {
    const imageSrcs = Array.from(
      galleryEl.querySelectorAll<HTMLImageElement>('[data-gallery-type="image"] img')
    ).map((img) => img.src);
    const lightbox = initLightbox(imageSrcs);
    initGallerySwiper(galleryEl, (imageIndex) => lightbox.open(imageIndex));
  }
</script>
```

The `<!-- Port the rest... -->` block is an explicit, scoped instruction to copy real, existing markup from a named file/line-range — not a vague placeholder for invented logic — because reproducing all ~270 lines of `DetailPage.tsx`'s JSX (title/tags/description/store-badges layout) here verbatim would just be a transcription of a file the implementer must open anyway; per Task 11's precedent, the source file is the spec for this portion. The parts this plan does *not* leave ambiguous — routing (`getStaticPaths`), data flow (`Astro.props.template`), SEO wiring (`jsonLd`), and the gallery/lightbox/swiper JS wiring — are fully specified above.

- [ ] **Step 3: Verify**

Run: `pnpm build`, confirm one static page generated per `portfolios` entry under `dist/project/<slug>/index.html` (33 pages). Run `pnpm preview`, open a few detail pages: gallery swiper works (drag/keyboard arrows advance slides), clicking an image opens the lightbox at the right index, video slides render with native controls and are not clickable into the lightbox, Play/App Store buttons appear only where the data has them, back link returns to `/`, dark mode toggle works on this page too.

- [ ] **Step 4: Commit**

```bash
git add src/scripts/gallery-swiper.ts src/pages/project
git commit -m "feat: port DetailPage to Astro route with vanilla Swiper + Lightbox wiring"
```

---

### Task 13: 404 page

**Files:**
- Create: `src/pages/404.astro`

**Interfaces:**
- No props — Astro's file-based routing serves this automatically for unmatched paths, both in `astro dev` and in the static build output (`dist/404.html`, recognized by most static hosts the same way SPA fallback routing worked before).

- [ ] **Step 1: Write `src/pages/404.astro`**

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
---

<BaseLayout
  title="Page Not Found — Wreative Showcase"
  description="The page you're looking for doesn't exist or has been moved."
  canonical="https://showcase.wreative.com/404"
  robots="noindex, follow"
>
  <div class="flex min-h-screen items-center justify-center bg-background">
    <div class="px-4 text-center">
      <h1 class="mb-4 text-6xl font-bold text-foreground/20">404</h1>
      <h2 class="mb-4 text-2xl font-bold text-foreground">Page Not Found</h2>
      <p class="mb-8 text-muted-foreground">The page you're looking for doesn't exist or has been moved.</p>
      <a
        href="/"
        class="inline-flex items-center gap-2 rounded-lg bg-foreground px-6 py-3 font-medium text-background transition-opacity hover:opacity-90"
      >
        &larr; Back to Showcase
      </a>
    </div>
  </div>
</BaseLayout>
```

- [ ] **Step 2: Verify**

Run: `pnpm build && pnpm preview`, visit a nonexistent path (e.g. `/nope`), confirm the 404 page renders with correct styling and the back link returns home.

- [ ] **Step 3: Commit**

```bash
git add src/pages/404.astro
git commit -m "feat: add 404 page"
```

---

### Task 14: Cleanup — remove all React source, deps, and dead config

**Files:**
- Delete: `src/App.tsx`, `src/main.tsx`, `src/vite-env.d.ts`, `src/context/ThemeContext.tsx`, `src/components/BrandLogo.tsx`, `src/components/CategoryFilter.tsx`, `src/components/Footer.tsx`, `src/components/Header.tsx`, `src/components/Lightbox.tsx`, `src/components/LoadingIndicator.tsx`, `src/components/SearchBar.tsx`, `src/components/TemplateCard.tsx`, `src/components/TemplateGrid.tsx`, `src/components/ThemeToggle.tsx`, `src/components/ui/alert.tsx`, `src/components/ui/dropdown-menu.tsx`, `src/pages/DetailPage.tsx`, `src/pages/LandingPage.tsx`, `src/pages/NotFound.tsx`, `index.html` (repo root — Astro doesn't use a root HTML shell), `components.json` (shadcn CLI config, dead without React)
- Modify: `package.json` (already stripped of React deps in Task 1/2, but re-verify), `knip.json` (only if Step 3 finds real gaps)

**Interfaces:**
- Produces: a tree with zero `.jsx`/`.tsx` files and zero React-only dependencies — the final state spec §1/§6 require.

- [ ] **Step 1: Confirm nothing still imports the old files**

Run: `grep -rln "from '@/components/Header'\|from '@/pages/\|from '\./Header'\|react-router-dom\|react-helmet-async\|from 'react'" src/ --include="*.tsx" --include="*.astro" --include="*.ts"` — every remaining Astro/TS file (Task 4–13's output) should already only reference the `.astro` versions; this should only match the old `.tsx` files themselves (about to be deleted) plus, if it matches anything under `src/scripts` or `src/data`, stop and fix that reference first — that would mean an earlier task left a stale import.

- [ ] **Step 2: Delete the old React tree**

```bash
git rm src/App.tsx src/main.tsx src/vite-env.d.ts
git rm src/context/ThemeContext.tsx
git rm src/components/BrandLogo.tsx src/components/CategoryFilter.tsx src/components/Footer.tsx src/components/Header.tsx src/components/Lightbox.tsx src/components/LoadingIndicator.tsx src/components/SearchBar.tsx src/components/TemplateCard.tsx src/components/TemplateGrid.tsx src/components/ThemeToggle.tsx
git rm -r src/components/ui
git rm src/pages/DetailPage.tsx src/pages/LandingPage.tsx src/pages/NotFound.tsx
git rm index.html
git rm components.json
rmdir src/context src/components/ui 2>/dev/null || true
```

- [ ] **Step 3: Run knip and resolve every finding**

Run: `pnpm run knip`. For each reported unused file/dependency/export: confirm via `grep -rn "<name>"` across `src/`, `scripts/`, config files that it's genuinely unreferenced (don't delete on assumption — spec §6), then remove it (`pnpm remove <pkg>` for deps, `git rm` for files, delete the specific unused export). Expected candidates to double check here specifically: `class-variance-authority` (still used by `Alert.astro`'s `cva`? — Task 9's `Alert.astro` above does **not** use `cva` anymore, it's a fixed-variant component now — if so, `pnpm remove class-variance-authority` and drop the corresponding `import` line if any survived; but first grep to confirm no other file uses it), `tailwindcss-animate` (still referenced by `tailwind.config.js`'s `plugins` — keep), `swiper`, `lucide-static`, `clsx`/`tailwind-merge` (still used by `src/lib/utils.ts`'s `cn()` — check `src/lib/utils.ts` is still imported anywhere; if `Alert.astro`'s cva removal means `cn()` has no more callers, either keep `cn()`/`utils.ts` if any `.astro` file still uses `class:list` manually via `cn()`, or remove `src/lib/utils.ts` too).

- [ ] **Step 4: Confirm zero `.jsx`/`.tsx` remain**

Run: `find src -name "*.jsx" -o -name "*.tsx"` — expect no output. Run: `find . -name "*.jsx" -o -name "*.tsx" -not -path "./node_modules/*"` for the whole repo — expect no output.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: remove all React source files, dead deps, and shadcn config"
```

---

### Task 15: Final validation

**Files:** none (verification only)

- [ ] **Step 1: Clean install**

```bash
rm -rf node_modules
pnpm install
```

- [ ] **Step 2: Build**

```bash
pnpm run build
```

Expect: `astro check` passes with 0 errors, `astro build` succeeds, `dist/index.html` and `dist/project/<slug>/index.html` exist for all 33 portfolio entries, `dist/404.html` exists. Confirm `prebuild` regenerated `public/sitemap.xml`/`public/llms.txt` (unchanged script from Task 1 — verify it still runs standalone via `tsx` with no dependency on anything just deleted in Task 14; it reads `src/data/portfolio/websites.ts`/`mobiles.ts` by source-text parsing, not by importing React, so it should be untouched by this whole migration).

- [ ] **Step 3: Lint and knip**

```bash
pnpm run lint
pnpm run knip
```

Both must exit 0 with no errors (knip: no unjustified warnings — spec §8).

- [ ] **Step 4: Preview and manual visual-parity pass**

```bash
pnpm run preview
```

Walk the spec's Visual Parity checklist (plan.md §2) against the running preview, comparing to the pre-migration site (checkout `main` in a second worktree/branch, or rely on screenshots taken before Task 1 started, per `superpowers:using-git-worktrees` if this work happened in an isolated worktree): layout, spacing, typography, font, colors, responsive behavior at mobile/tablet/desktop widths, header/footer, image sizing/positioning, animations/transitions, hover/focus/active states. Re-check the header light/dark logo switch specifically (spec §3): toggle theme, confirm no flash, confirm the logo visually inverts identically to before.

- [ ] **Step 5: SEO spot-check**

For `/` and at least two `/project/<slug>` pages, view source and confirm: unique `<title>`, `<meta name="description">`, canonical link, OG + Twitter tags, `lang="en"` on `<html>`, one `<h1>` with sensible heading hierarchy below it, every `<img>` has `alt`, no `noindex` outside `404.astro`, JSON-LD blocks are valid JSON (paste into a JSON validator or `jq` them out of the HTML).

- [ ] **Step 6: Final commit**

If Steps 2–5 required fixes, commit them:

```bash
git add -A
git commit -m "fix: resolve issues found in final Astro migration validation"
```

If no fixes were needed, this task ends at Step 5 with nothing to commit.

---

## Self-Review Notes

- **Spec coverage:** §1 (migration/no React) → Tasks 1–14. §2 (visual parity) → every component task ports exact Tailwind classes; Task 15 Step 4 verifies. §3 (header light/dark) → Task 7 Step 1 (with explicit rationale for keeping the filter approach over introducing two image assets). §4 (SEO) → Task 6 (`Seo.astro`/`BaseLayout.astro`) + Task 15 Step 5. §5 (performance/minimal JS) → static-HTML-first architecture throughout, no client framework, `loading="lazy"` preserved on card/gallery images. §6 (cleanup) → Task 14. §7 (package/config review, pnpm) → Tasks 1–2, 14; pnpm used throughout. §8 (lint/knip/build) → Task 15.
- **Placeholder scan:** the only intentionally-scoped "port the rest from the source file" instructions (Task 11 Step 1, Task 12 Step 2's `<!-- -->` block) point at a named, currently-existing file the implementer will have open — this is a migration task where the literal source *is* the spec for that portion, not an unresolved design decision; every mechanism this plan actually had to design (routing, theming, filtering, dropdown, lightbox math, swiper wiring, SEO head, asset paths) is fully specified with real code above.
- **Type consistency:** `PortfolioItem`/`Platform`/`GalleryItem` (Task 4) flow unchanged into `TemplateCard.astro`/`TemplateGrid.astro` (Task 9), `index.astro` (Task 10), and `[slug].astro` (Task 12). `initLightbox(images: string[])` (Task 11) matches its call site in Task 12 Step 2. `initGallerySwiper(container, onImageClick)` (Task 12 Step 1) matches its call site in Task 12 Step 2. `Icon.astro`'s `name` union (Task 5) matches every call site (`sun`/`moon` in Task 7, `search` in Task 8, `chevron-down` in Task 8).
