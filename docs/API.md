# Portfolio API Documentation

The Wreative Showcase site exposes a small, read-only JSON API for its portfolio data.
It is built with **Astro File Endpoints** — every endpoint is prerendered into a static
`.json` file at build time, so no server runtime, database, or additional packages are
required.

- **Base URL:** `https://showcase.wreative.com`
- **Content type:** `application/json; charset=utf-8`
- **Caching:** `Cache-Control: public, max-age=3600` (1 hour)
- **Methods:** `GET` only (all endpoints are read-only). `HEAD` is handled automatically
  by Astro and returns the headers without the body.

---

## Endpoints Overview

| Method | Endpoint                                  | Description                                        |
| ------ | ----------------------------------------- | -------------------------------------------------- |
| GET    | `/api/portfolio.json`                     | Full portfolio collection with collection metadata |
| GET    | `/api/portfolio/{slug}.json`              | A single portfolio item by its slug                |
| GET    | `/api/categories.json`                    | All portfolio categories with per-platform totals  |
| GET    | `/api/portfolio/category/{category}.json` | Portfolio items filtered by category               |
| GET    | `/api/portfolio/platform/{platform}.json` | Portfolio items filtered by platform               |

> **Note on static endpoints:** These endpoints are prerendered at build time.
> Query parameters (e.g. `?platform=mobile`) are supported — filtering should be
> done client-side using the `platform`/`category` fields, or via the
> `/api/categories.json` summary.

---

## 1. Get All Portfolio Items

```
GET /api/portfolio.json
```

Returns the complete portfolio collection (currently **33 projects**: 27 websites and
6 mobile apps) together with collection metadata.

### Response

```json
{
  "success": true,
  "meta": {
    "total": 33,
    "platforms": {
      "website": 27,
      "mobile": 6
    },
    "categories": {
      "Business": 10,
      "E-Commerce": 6,
      "Education": 4,
      "Florist & Gardening": 2,
      "Government": 1,
      "Services": 10
    },
    "endpoints": [
      "https://showcase.wreative.com/api/portfolio.json",
      "https://showcase.wreative.com/api/portfolio/<slug>.json",
      "https://showcase.wreative.com/api/categories.json"
    ]
  },
  "data": [
    {
      "id": 1,
      "slug": "kontraktor-surabaya",
      "title": "Kontraktor Surabaya",
      "platform": "website",
      "category": "Services",
      "image": "https://showcase.wreative.com/_astro/kontraktor-surabaya.9ZCB6pCH.webp",
      "url": "https://kontraktorsurabaya.wreative.com/",
      "description": "Professional contracting services website for Surabaya region. ...",
      "descriptionId": "Situs web layanan kontraktor profesional untuk wilayah Surabaya. ...",
      "tags": ["WordPress", "Elementor", "SEO"],
      "gallery": [
        {
          "type": "image",
          "src": "https://showcase.wreative.com/_astro/kontraktor-surabaya.9ZCB6pCH.webp"
        }
      ]
    }
    // ... 32 more items
  ]
}
```

### `meta` fields

| Field        | Type                | Description                                                |
| ------------ | ------------------- | ---------------------------------------------------------- |
| `total`      | `number`            | Total number of portfolio items                            |
| `platforms`  | `Record<string, n>` | Item count grouped by platform (`website` / `mobile`)      |
| `categories` | `Record<string, n>` | Item count grouped by category, keys sorted alphabetically |
| `endpoints`  | `string[]`          | Convenience list of all available API URLs                 |

## 2. Get a Single Portfolio Item

```
GET /api/portfolio/{slug}.json
```

Returns one portfolio item by its slug. The slug is the same one used by the public
project pages (`/project/{slug}`). There is one prerendered file per project —
see the [full endpoint list](#5-all-project-endpoints) below.

### Path parameters

| Parameter | Type     | Description                                       |
| --------- | -------- | ------------------------------------------------- |
| `slug`    | `string` | URL-safe identifier of the project (e.g. `aviso`) |

### Example

```
GET /api/portfolio/kontraktor-surabaya.json
```

```json
{
  "success": true,
  "data": {
    "id": 1,
    "slug": "kontraktor-surabaya",
    "title": "Kontraktor Surabaya",
    "platform": "website",
    "category": "Services",
    "image": "https://showcase.wreative.com/_astro/kontraktor-surabaya.9ZCB6pCH.webp",
    "url": "https://kontraktorsurabaya.wreative.com/",
    "description": "Professional contracting services website for Surabaya region. Clean layout showcasing construction services, project portfolio, and client testimonials with easy contact integration.",
    "descriptionId": "Situs web layanan kontraktor profesional untuk wilayah Surabaya. Tata letak rapi yang menampilkan layanan konstruksi, portofolio proyek, dan testimoni klien dengan integrasi kontak yang mudah.",
    "tags": ["WordPress", "Elementor", "SEO"],
    "gallery": [
      {
        "type": "image",
        "src": "https://showcase.wreative.com/_astro/kontraktor-surabaya.9ZCB6pCH.webp"
      }
    ]
  }
}
```

### Errors

Only slugs that exist are prerendered, so in the deployed static site a request for an
unknown slug is served by the host's regular **404 page** (HTML, not JSON).
The endpoint handlers also contain a JSON 404 branch
(`{ "success": false, "error": "..." }` with status `404`) which becomes active if the
site is ever served with an SSR adapter.

---

## 3. Get Categories

```
GET /api/categories.json
```

Returns every portfolio category with its item total and a per-platform breakdown.
Useful for building filters or navigation without fetching the whole collection.

### Response

```json
{
  "success": true,
  "meta": { "total": 6 },
  "data": [
    { "name": "Business", "total": 10, "platforms": { "website": 9 } },
    { "name": "E-Commerce", "total": 6, "platforms": { "website": 4, "mobile": 2 } },
    { "name": "Education", "total": 4, "platforms": { "website": 3, "mobile": 1 } },
    { "name": "Florist & Gardening", "total": 2, "platforms": { "website": 2 } },
    { "name": "Government", "total": 1, "platforms": { "website": 1 } },
    { "name": "Services", "total": 10, "platforms": { "website": 8, "mobile": 2 } }
  ]
}
```

Categories are sorted alphabetically. The `platforms` object only includes platforms
that actually have items in that category.

---

## 4. Filter by Category or Platform

```
GET /api/portfolio/category/{category}.json
GET /api/portfolio/platform/{platform}.json
```

Returns portfolio items filtered by category or platform. One prerendered file exists
per category (from `/api/categories.json`) and per platform (`website`, `mobile`).
Category names with spaces or `&` (e.g. `Florist & Gardening`) must be URL-encoded.

### Path parameters

| Parameter  | Type                    | Description                          |
| ---------- | ----------------------- | ------------------------------------ |
| `category` | `string`                | Exact category name, e.g. `Business` |
| `platform` | `"website" \| "mobile"` | Project platform                     |

### Example

```
GET /api/portfolio/category/Business.json
GET /api/portfolio/platform/mobile.json
```

```json
{
  "success": true,
  "meta": { "total": 10, "category": "Business" },
  "data": [/* PortfolioItem[] */]
}
```

### Errors

Unknown category/platform values are never prerendered, so requesting one returns a
plain `404` from the static host (not the `{ "success": false }` envelope).

---

## Portfolio Item Schema

| Field           | Type                    | Always present | Description                                                               |
| --------------- | ----------------------- | -------------- | ------------------------------------------------------------------------- |
| `id`            | `number`                | ✅             | Stable numeric identifier (order of definition in the data files)         |
| `slug`          | `string`                | ✅             | URL-safe identifier, generated from the title                             |
| `title`         | `string`                | ✅             | Project display name                                                      |
| `platform`      | `"website" \| "mobile"` | ✅             | Project platform                                                          |
| `category`      | `string`                | ✅             | One of the categories listed in `/api/categories.json`                    |
| `image`         | `string` (URL)          | ✅             | Cover image, absolute URL                                                 |
| `url`           | `string` (URL)          | ✅             | Live project URL                                                          |
| `description`   | `string`                | ✅             | English description (default language)                                    |
| `descriptionId` | `string \| undefined`   | ➖             | Indonesian description, shown when the site language is switched to ID    |
| `tags`          | `string[]`              | ✅             | Tech stack / feature tags                                                 |
| `gallery`       | `GalleryItem[]`         | ✅             | Media gallery; falls back to `[{ type: "image", src: image }]` when empty |
| `playStoreUrl`  | `string \| undefined`   | ➖             | Google Play listing URL (mobile apps only)                                |
| `appStoreUrl`   | `string \| undefined`   | ➖             | App Store listing URL (mobile apps only)                                  |

### `GalleryItem`

A gallery is a mixed array of images and videos:

| Type    | Fields                            | Description                              |
| ------- | --------------------------------- | ---------------------------------------- |
| `image` | `type: "image"`, `src`            | Static image                             |
| `video` | `type: "video"`, `src`, `poster?` | Video; `poster` is an optional image URL |

All local media (`image`, `gallery[].src`, `gallery[].poster`) are resolved to
**absolute URLs** pointing at the build-optimized assets produced by Astro's image
pipeline (e.g. `https://showcase.wreative.com/_astro/<name>.<hash>.webp`). External
media URLs (e.g. demo videos) are passed through unchanged.

## 5. All Project Endpoints

Every prerendered single-project endpoint, in the same order as the collection
endpoint (custom-domain projects first, `*.wreative.com` projects last — matching the
ordering of the website itself).

| #   | Endpoint                                                     | Title                              | Platform | Category            |
| --- | ------------------------------------------------------------ | ---------------------------------- | -------- | ------------------- |
| 1   | `GET /api/portfolio/spesialis-karangan-bunga-indonesia.json` | Spesialis Karangan Bunga Indonesia | website  | Florist & Gardening |
| 2   | `GET /api/portfolio/be-mode-indonesia.json`                  | BE MODE Indonesia                  | website  | E-Commerce          |
| 3   | `GET /api/portfolio/sg-academy.json`                         | SG Academy                         | website  | Education           |
| 4   | `GET /api/portfolio/roby-saputra-grup.json`                  | Roby Saputra Grup                  | website  | Business            |
| 5   | `GET /api/portfolio/sg-academy-mobile.json`                  | SG Academy Mobile                  | mobile   | Education           |
| 6   | `GET /api/portfolio/be-mode-fashion-shopping.json`           | BE MODE — Fashion Shopping         | mobile   | E-Commerce          |
| 7   | `GET /api/portfolio/kontraktor-surabaya.json`                | Kontraktor Surabaya                | website  | Services            |
| 8   | `GET /api/portfolio/wase-bumi-indonesia.json`                | Wase Bumi Indonesia                | website  | Business            |
| 9   | `GET /api/portfolio/cubicle-toilet.json`                     | Cubicle Toilet                     | website  | Services            |
| 10  | `GET /api/portfolio/pt-adikarya-pesona-intinusa.json`        | PT. Adikarya Pesona Intinusa       | website  | Education           |
| 11  | `GET /api/portfolio/wreative-store.json`                     | Wreative Store                     | website  | E-Commerce          |
| 12  | `GET /api/portfolio/home-baraka.json`                        | Home Baraka                        | website  | Services            |
| 13  | `GET /api/portfolio/wreative.json`                           | Wreative                           | website  | Business            |
| 14  | `GET /api/portfolio/fajar-florist.json`                      | Fajar Florist                      | website  | Florist & Gardening |
| 15  | `GET /api/portfolio/first-media-surabaya.json`               | First Media Surabaya               | website  | Services            |
| 16  | `GET /api/portfolio/dpu-bina-marga-musi.json`                | DPU Bina Marga Musi                | website  | Government          |
| 17  | `GET /api/portfolio/chicken-explorer.json`                   | Chicken Explorer                   | website  | E-Commerce          |
| 18  | `GET /api/portfolio/kurir-pulsa.json`                        | Kurir Pulsa                        | website  | E-Commerce          |
| 19  | `GET /api/portfolio/panji-semesta.json`                      | Panji Semesta                      | website  | Business            |
| 20  | `GET /api/portfolio/dzata-lombok-transport.json`             | Dzata Lombok Transport             | website  | Services            |
| 21  | `GET /api/portfolio/pernikahan-ini.json`                     | Pernikahan Ini                     | website  | Services            |
| 22  | `GET /api/portfolio/pos-satpam.json`                         | Pos Satpam                         | website  | Services            |
| 23  | `GET /api/portfolio/toilet-portabel.json`                    | Toilet Portabel                    | website  | Services            |
| 24  | `GET /api/portfolio/pt-modern-coco-international.json`       | PT Modern Coco International       | website  | Business            |
| 25  | `GET /api/portfolio/sakpattana-jawa-timur.json`              | Sakpattana Jawa Timur              | website  | Business            |
| 26  | `GET /api/portfolio/cv-putra-kubota.json`                    | CV Putra Kubota                    | website  | Business            |
| 27  | `GET /api/portfolio/wahyu-dewanagari.json`                   | Wahyu Dewanagari                   | website  | Business            |
| 28  | `GET /api/portfolio/aviso.json`                              | Aviso                              | website  | Business            |
| 29  | `GET /api/portfolio/lpk-furinkazan.json`                     | LPK Furinkazan                     | website  | Education           |
| 30  | `GET /api/portfolio/wreative-app.json`                       | Wreative App                       | mobile   | Business            |
| 31  | `GET /api/portfolio/fooddash-food-delivery.json`             | FoodDash — Food Delivery           | mobile   | E-Commerce          |
| 32  | `GET /api/portfolio/weddingku-wedding-planner.json`          | WeddingKu — Wedding Planner        | mobile   | Services            |
| 33  | `GET /api/portfolio/lombokride-transport-booking.json`       | LombokRide — Transport Booking     | mobile   | Services            |

## Usage Examples

### cURL

```sh
# Full collection
curl https://showcase.wreative.com/api/portfolio.json

# Single project
curl https://showcase.wreative.com/api/portfolio/aviso.json

# Categories summary
curl https://showcase.wreative.com/api/categories.json
```

### JavaScript

```js
const res = await fetch('https://showcase.wreative.com/api/portfolio.json');
const { success, meta, data } = await res.json();

if (success) {
  console.log(`${meta.total} projects`);
  const mobileApps = data.filter((item) => item.platform === 'mobile');
  console.log(`${mobileApps.length} mobile apps`);
}
```

---

## Implementation Notes

- **Source of truth:** portfolio data lives in `src/data/portfolio/` (`websites.ts`,
  `mobiles.ts`, `types.ts`). The API serializes exactly this data — adding, editing, or
  removing an entry there automatically updates every endpoint on the next build.
- **Endpoint sources:**
  - `src/pages/api/portfolio.json.ts` — collection endpoint
  - `src/pages/api/portfolio/[slug].json.ts` — single-project endpoint (`getStaticPaths`)
  - `src/pages/api/categories.json.ts` — categories endpoint
  - `src/pages/api/portfolio/category/[category].json.ts` — category filter (`getStaticPaths`)
  - `src/pages/api/portfolio/platform/[platform].json.ts` — platform filter (`getStaticPaths`)
  - `src/lib/api.ts` — shared helpers (media URL resolution, response envelope)
- **Build output:** the prerendered files land in `dist/api/` and are deployed as plain
  static files alongside the HTML pages.
- **No runtime:** because the API is static, response payloads only change when the site
  is rebuilt. There is no query/filter support at request time.
- **Development:** in `astro dev` the resolved media URLs still point at the production
  domain (`https://showcase.wreative.com`), matching the JSON-LD behavior of the existing
  pages. Build and preview output is always correct.
