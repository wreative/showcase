# Knip/Astro-Check Cleanup & Astro Image Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `pnpm run knip` and `pnpm astro check` report zero findings, and replace every raw `<img>` element in the codebase with Astro's `<Image />` component so cover/logo images are actually optimized at build time (not just re-labeled).

**Architecture:** Two independent fixes. (1) `knip.json` gets one more entry in its existing `ignore` list, matching the precedent already set for `src/scripts/landing-filter.ts` — both files are loaded via `<script src="@/scripts/...">` in `.astro` markup, which knip's static graph doesn't trace. (2) All raster images that are rendered as `<img>` (portfolio covers + the two brand-logo PNGs) move from `public/assets/` into `src/assets/` so Astro's build pipeline can actually process them, then every consumer switches from `<img src="...">` (string path) to `astro:assets`'s `<Image src={...}>` (imported `ImageMetadata`). Two of those images' file paths are also embedded as absolute URL strings for `og:image`/JSON-LD `logo` outside any `<img>` tag — those call sites are updated to derive the URL from the same imported asset (`new URL(image.src, Astro.site).href`) so they keep working after the move.

**Tech Stack:** Astro 7 (`astro:assets` `<Image>` component, `import.meta.glob`), TypeScript, knip 6.

**Spec:** No separate spec doc — this plan implements the user's direct request verbatim: run `pnpm run knip` and `pnpm astro check` and make both clean, and make sure images use Astro's `Image` component for performance. Investigation findings that inform the tasks below:
- `pnpm run knip` currently reports exactly one finding: `Unused files (1): src/scripts/pwa.ts`. Root cause: it's referenced only via `<script src="@/scripts/pwa.ts">` in `src/layouts/BaseLayout.astro:110`, which knip cannot trace (same situation as `src/scripts/landing-filter.ts`, already whitelisted).
- `pnpm astro check` currently reports `0 errors` (no warnings/hints either) — it is already clean and needs no fix. It stays part of the final verification gate so a regression during this work is caught immediately.
- Three raw `<img>` call sites exist: `src/components/TemplateCard.astro:24`, `src/components/BrandLogo.astro:9-10`, `src/pages/project/[slug].astro:67`.
- All 27 portfolio cover images referenced from `src/data/portfolio/websites.ts` and `src/data/portfolio/mobiles.ts` (as `/assets/cover/*.webp` strings) currently live in `public/assets/cover/` — verified 1:1, no orphans and no missing files.
- `template.image` / gallery `item.src` strings are also passed straight through as `ogImage` (`src/pages/project/[slug].astro:32`) and as a `<video poster>` (`src/pages/project/[slug].astro:69`) — both must keep resolving to a working URL after the source files move.
- `wreative-light.png` is additionally hardcoded as an absolute URL in two places outside any `<img>` tag: `src/components/Seo.astro:15` (default `ogImage`) and `src/layouts/BaseLayout.astro:28` (JSON-LD `logo`).
- `sharp` (Astro's image-processing engine) is already present in `node_modules` via pnpm (declared as an `optionalDependency` of `astro`), so no new dependency install is required.
- No test runner exists in this project (no vitest/jest/playwright, confirmed via `package.json` and file search) — verification for every task is `pnpm run knip`, `pnpm astro check`, `pnpm run lint`, and `pnpm run build` (which itself runs `astro check && astro build`), plus reading the rendered output where noted.

## Global Constraints
- Every task must end with `pnpm run knip` and `pnpm astro check` both reporting zero findings (this is the acceptance bar the user asked for).
- Use `git mv` for every file relocation so history follows the file.
- Don't touch `public/assets/android-chrome-*.png`, `apple-touch-icon.png`, `favicon*.png/ico` — those are only ever referenced via `<link rel="icon">`/PWA manifest entries, never `<img>`, and are out of scope.
- Don't change any visual output (classes, `loading="lazy"`, alt text) — only swap the element/import mechanics.

---

### Task 1: Fix the knip `pwa.ts` unused-file finding

**Files:**
- Modify: `knip.json`

**Interfaces:** None — standalone config change.

- [ ] **Step 1: Confirm the current finding**
  Run: `pnpm run knip`
  Expected output includes:
  ```
  Unused files (1)
  src/scripts/pwa.ts
  ```

- [ ] **Step 2: Add `src/scripts/pwa.ts` to the ignore list**
  In `knip.json`, change:
  ```json
  {
    "$schema": "https://unpkg.com/knip@6/schema.json",
    "tags": ["-lintignore"],
    "ignore": ["src/scripts/landing-filter.ts"]
  }
  ```
  to:
  ```json
  {
    "$schema": "https://unpkg.com/knip@6/schema.json",
    "tags": ["-lintignore"],
    "ignore": ["src/scripts/landing-filter.ts", "src/scripts/pwa.ts"]
  }
  ```

- [ ] **Step 3: Verify knip is clean**
  Run: `pnpm run knip`
  Expected: exit code `0`, no "Unused files" section printed.

- [ ] **Step 4: Commit**
  ```bash
  git add knip.json
  git commit -m "chore: ignore src/scripts/pwa.ts in knip (loaded via script src, untraceable)"
  ```

---

### Task 2: Move portfolio cover images into `src/assets` and migrate `TemplateCard.astro` to `<Image>`

**Files:**
- Move: all 27 files in `public/assets/cover/*.webp` → `src/assets/cover/*.webp`
- Create: `src/lib/covers.ts`
- Modify: `src/components/TemplateCard.astro`

**Interfaces:**
- Produces: `getCoverImage(path: string): ImageMetadata` from `src/lib/covers.ts` — later tasks (Task 3) import and reuse this exact function. `path` is the raw string stored in portfolio data, e.g. `"/assets/cover/wreative.webp"`; it throws if no matching file is found.

- [ ] **Step 1: Move the cover image files**
  Run:
  ```bash
  mkdir -p src/assets/cover
  git mv public/assets/cover/*.webp src/assets/cover/
  rmdir public/assets/cover
  ```
  Expected: `git status` shows 27 renames from `public/assets/cover/...` to `src/assets/cover/...`, and `public/assets/cover/` no longer exists.

- [ ] **Step 2: Create the cover-image resolver**
  Create `src/lib/covers.ts`:
  ```ts
  // Resolves a portfolio cover image's data path (e.g. "/assets/cover/foo.webp", as
  // stored in src/data/portfolio) to its build-optimized ImageMetadata, so components
  // can pass it straight into <Image>. The files live in src/assets/cover so Astro's
  // image pipeline can process them; import.meta.glob is required here because the
  // exact filename isn't known until a specific portfolio entry is being rendered.
  const covers = import.meta.glob<{ default: ImageMetadata }>('/src/assets/cover/*.webp', {
    eager: true,
  });

  export function getCoverImage(path: string): ImageMetadata {
    const key = path.replace('/assets/cover/', '/src/assets/cover/');
    const mod = covers[key];
    if (!mod) {
      throw new Error(`getCoverImage: no image found for "${path}" (looked up "${key}")`);
    }
    return mod.default;
  }
  ```

- [ ] **Step 3: Migrate `TemplateCard.astro` to `<Image>`**
  In `src/components/TemplateCard.astro`, change the frontmatter imports from:
  ```astro
  ---
  import type { PortfolioItem } from '@/data/portfolio';
  ```
  to:
  ```astro
  ---
  import { Image } from 'astro:assets';
  import { getCoverImage } from '@/lib/covers';
  import type { PortfolioItem } from '@/data/portfolio';
  ```
  and change the markup from:
  ```astro
    <img
      src={template.image}
      alt={template.title}
      class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      loading="lazy"
    />
  ```
  to:
  ```astro
    <Image
      src={getCoverImage(template.image)}
      alt={template.title}
      class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      loading="lazy"
    />
  ```

- [ ] **Step 4: Verify the build and lints are clean**
  Run: `pnpm astro check && pnpm run lint && pnpm run knip`
  Expected: `astro check` → `0 errors`; `lint` → no output/exit `0`; `knip` → exit `0`, no "Unused files" for anything under `src/assets/cover/` or `src/lib/covers.ts` (both are now referenced — glob-imported and directly imported, respectively). If knip does report any `src/assets/cover/*.webp` file as unused, add `"src/assets/cover/**"` to the `ignore` array in `knip.json` (knip's dynamic-glob resolution can miss `import.meta.glob` targets in some configurations) and re-run.
  Then run: `pnpm run build` and open the homepage in the built/dev output (`pnpm run dev`) to confirm portfolio card thumbnails render.

- [ ] **Step 5: Commit**
  ```bash
  git add src/assets/cover src/lib/covers.ts src/components/TemplateCard.astro
  git status  # confirm public/assets/cover deletions are staged too
  git add -A public/assets/cover
  git commit -m "feat: move portfolio covers into src/assets, render via astro:assets Image"
  ```

---

### Task 3: Migrate the project-detail gallery (`[slug].astro`) to `<Image>`

**Files:**
- Modify: `src/pages/project/[slug].astro`

**Interfaces:**
- Consumes: `getCoverImage(path: string): ImageMetadata` from `src/lib/covers.ts` (Task 2).

- [ ] **Step 1: Add the imports**
  In `src/pages/project/[slug].astro`, change:
  ```astro
  ---
  import BaseLayout from '@/layouts/BaseLayout.astro';
  import BrandLogo from '@/components/BrandLogo.astro';
  import ThemeToggle from '@/components/ThemeToggle.astro';
  import { portfolios } from '@/data/portfolio';
  ```
  to:
  ```astro
  ---
  import { Image } from 'astro:assets';
  import BaseLayout from '@/layouts/BaseLayout.astro';
  import BrandLogo from '@/components/BrandLogo.astro';
  import ThemeToggle from '@/components/ThemeToggle.astro';
  import { portfolios } from '@/data/portfolio';
  import { getCoverImage } from '@/lib/covers';
  ```

- [ ] **Step 2: Resolve the `ogImage` prop**
  Change:
  ```astro
    ogImage={template.image}
  ```
  to:
  ```astro
    ogImage={getCoverImage(template.image).src}
  ```

- [ ] **Step 3: Migrate the gallery image branch and the video poster**
  Change:
  ```astro
            {template.gallery.map((item) => (
              <div class="swiper-slide" data-gallery-type={item.type}>
                {item.type === 'image' ? (
                  <img src={item.src} alt={template.title} class="h-full w-full object-cover" loading="lazy" />
                ) : (
                  <video src={item.src} poster={item.poster} controls class="h-full w-full object-cover" />
                )}
              </div>
            ))}
  ```
  to:
  ```astro
            {template.gallery.map((item) => (
              <div class="swiper-slide" data-gallery-type={item.type}>
                {item.type === 'image' ? (
                  <Image src={getCoverImage(item.src)} alt={template.title} class="h-full w-full object-cover" loading="lazy" />
                ) : (
                  <video
                    src={item.src}
                    poster={item.poster ? getCoverImage(item.poster).src : undefined}
                    controls
                    class="h-full w-full object-cover"
                  />
                )}
              </div>
            ))}
  ```
  Note: `item.src` for `type === 'video'` items is an external `.mp4` URL (e.g. `https://www.w3schools.com/...`), not a cover path — it is deliberately left untouched on the `<video src={item.src}>` line.

- [ ] **Step 4: Verify**
  Run: `pnpm astro check && pnpm run lint && pnpm run knip`
  Expected: `astro check` → `0 errors`; `lint` and `knip` → clean, same as Task 2's gate.
  Then run: `pnpm run dev`, open a project detail page (e.g. `/project/wreative`, which has a multi-image + video gallery per `wreativeGallery` in `src/data/portfolio/websites.ts`), and confirm: gallery images render, the video's poster image renders before playback, and the page's `<meta property="og:image">` tag (view page source) points at a resolvable `/_astro/...` path rather than a broken `/assets/cover/...` path.

- [ ] **Step 5: Commit**
  ```bash
  git add src/pages/project/[slug].astro
  git commit -m "feat: render project gallery covers via astro:assets Image"
  ```

---

### Task 4: Migrate `BrandLogo.astro` to `<Image>` and fix the two hardcoded logo URLs

**Files:**
- Move: `public/assets/wreative-light.png` → `src/assets/wreative-light.png`
- Move: `public/assets/wreative-dark.png` → `src/assets/wreative-dark.png`
- Modify: `src/components/BrandLogo.astro`
- Modify: `src/components/Seo.astro`
- Modify: `src/layouts/BaseLayout.astro`

**Interfaces:** None new — each file imports the moved PNGs directly (no glob needed; only two, both known at author time).

- [ ] **Step 1: Move the logo files**
  Run: `git mv public/assets/wreative-light.png src/assets/wreative-light.png && git mv public/assets/wreative-dark.png src/assets/wreative-dark.png`

- [ ] **Step 2: Migrate `BrandLogo.astro`**
  Replace the full contents of `src/components/BrandLogo.astro` with:
  ```astro
  ---
  import { Image } from 'astro:assets';
  import wreativeLight from '@/assets/wreative-light.png';
  import wreativeDark from '@/assets/wreative-dark.png';

  interface Props {
    class?: string;
  }

  const { class: className = 'h-6 w-9' } = Astro.props;
  ---

  <Image src={wreativeLight} alt="Wreative" class={`block dark:hidden ${className}`} />
  <Image src={wreativeDark} alt="Wreative" class={`hidden dark:block ${className}`} />
  ```

- [ ] **Step 3: Fix the default `ogImage` in `Seo.astro`**
  In `src/components/Seo.astro`, change:
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
    ogImage = 'https://showcase.wreative.com/assets/wreative-light.png',
    robots = 'index, follow',
    jsonLd,
  } = Astro.props;
  ```
  to:
  ```astro
  ---
  import wreativeLight from '@/assets/wreative-light.png';

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
    ogImage = new URL(wreativeLight.src, Astro.site).href,
    robots = 'index, follow',
    jsonLd,
  } = Astro.props;
  ```

- [ ] **Step 4: Fix the JSON-LD `logo` URL in `BaseLayout.astro`**
  In `src/layouts/BaseLayout.astro`, change the import block:
  ```astro
  ---
  import '@/index.css';
  import Seo from '@/components/Seo.astro';
  import { ClientRouter } from 'astro:transitions';
  import { pwaInfo } from 'virtual:pwa-info';
  ```
  to:
  ```astro
  ---
  import '@/index.css';
  import Seo from '@/components/Seo.astro';
  import { ClientRouter } from 'astro:transitions';
  import { pwaInfo } from 'virtual:pwa-info';
  import wreativeLight from '@/assets/wreative-light.png';
  ```
  and change:
  ```ts
      logo: 'https://showcase.wreative.com/assets/wreative-light.png',
  ```
  to:
  ```ts
      logo: new URL(wreativeLight.src, Astro.site).href,
  ```

- [ ] **Step 5: Verify**
  Run: `pnpm astro check && pnpm run lint && pnpm run knip`
  Expected: all three clean, as in prior tasks.
  Then run: `pnpm run dev`, load any page, and in the page source confirm: the header brand logo renders in both light and dark mode (toggle via the theme switcher), `<meta property="og:image">` resolves to a `/_astro/...`-based absolute URL (not a 404 on `/assets/wreative-light.png`), and the `application/ld+json` block's `Organization.logo` field is the same resolvable absolute URL.

- [ ] **Step 6: Commit**
  ```bash
  git add src/assets/wreative-light.png src/assets/wreative-dark.png src/components/BrandLogo.astro src/components/Seo.astro src/layouts/BaseLayout.astro
  git add -A public/assets
  git commit -m "feat: render brand logo via astro:assets Image, fix absolute logo URLs"
  ```

---

### Task 5: Final full verification pass

**Files:** None (verification only).

**Interfaces:** None.

- [ ] **Step 1: Run every quality gate from a clean state**
  Run:
  ```bash
  pnpm run knip
  pnpm astro check
  pnpm run lint
  pnpm run format:check
  pnpm run build
  ```
  Expected: every command exits `0`; `knip` prints no findings; `astro check` prints `0 errors` (and no warnings/hints); `lint` and `format:check` print nothing; `build` completes and produces `dist/`.

- [ ] **Step 2: Confirm no raw `<img>` elements remain**
  Run: `grep -rn "<img" src --include="*.astro"`
  Expected: no output.

- [ ] **Step 3: Confirm no stray references to the old public paths remain**
  Run: `grep -rn "assets/cover/\|assets/wreative-light.png\|assets/wreative-dark.png" src scripts`
  Expected: only matches inside `src/data/portfolio/*.ts` (the data layer, which intentionally still stores `"/assets/cover/..."` strings — those are looked up through `getCoverImage`, not served directly) and `src/lib/covers.ts` itself. No matches inside `.astro` files as a literal string passed straight to an attribute.

- [ ] **Step 4: Manual smoke test**
  Run: `pnpm run dev`, then visit:
  - `/` — portfolio grid thumbnails load.
  - `/project/wreative` (or any slug from `src/data/portfolio/websites.ts`) — gallery images, video + poster, and og:image meta all resolve.
  Confirm in browser devtools Network tab that cover images are served from `/_astro/*.webp` (optimized, hashed) rather than `/assets/cover/*.webp`.

- [ ] **Step 5: Commit (only if Steps 1–4 required any fix-up changes)**
  ```bash
  git add -A
  git commit -m "chore: final verification pass for knip/astro-check/image cleanup"
  ```
  If no changes were needed, skip this step — Tasks 1–4 already committed everything.
