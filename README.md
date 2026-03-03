# VaultView

VaultView is a cute, highly interactive collectibles value tracker built as a static Next.js export for GitHub Pages. It uses local generated data, local SVG artwork, dynamic universe/release theming, watchlists, drop reminders, a shareable card module, and a no-login portfolio mode.

## Stack

- Next.js 14 App Router + TypeScript
- Tailwind CSS
- shadcn/ui-style primitives
- Zustand for theme, watchlist, alerts, reminders, and collection state
- Recharts for charts and sparklines

## GitHub Pages deployment

This project is configured for a repository Pages site at:

`https://teriahxar.github.io/Test/`

The export config is in [next.config.mjs](c:\Projects\Test\next.config.mjs) and currently uses the repository base path `/Test`.

If you rename the repository, update:

- `basePath`
- `assetPrefix`

in [next.config.mjs](c:\Projects\Test\next.config.mjs).

### Automatic deploy

The workflow in [.github/workflows/deploy-pages.yml](c:\Projects\Test\.github\workflows\deploy-pages.yml) builds the static export from `main` and publishes the `out/` directory to GitHub Pages.

In GitHub:

1. Open repository `Settings`.
2. Open `Pages`.
3. Set `Source` to `GitHub Actions`.
4. Push to `main`.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Static production build

```bash
npm run build:pages
```

The static site output is generated in `out/`.

## Architecture notes

This GitHub Pages version is static-only:

- no Prisma runtime
- no SQLite runtime
- no API routes
- all item, release, pricing, and drop data is generated from local TypeScript modules at build time

The static data source lives in:

- [lib/catalog.ts](c:\Projects\Test\lib\catalog.ts)
- [lib/static-data.ts](c:\Projects\Test\lib\static-data.ts)
- [lib/mock-drops.ts](c:\Projects\Test\lib\mock-drops.ts)

## Features

- anime-intro-style landing page with universe portal cards
- universe + release theme switching via CSS variables
- trending, movers, new drops, and all-items dashboards
- search typeahead and release switcher
- watchlist, alerts, reminders, and recently viewed
- item detail pages with confidence meter, heat badge, authenticity tips, and shareable card
- collection mode with Owned / Want / Sold and portfolio summary

## Images and attribution

VaultView does **not** scrape images.

For this MVP:

- item visuals in `public/assets/items/*.svg` are original SVG illustrations created for this project
- official product sites were used only as styling and reference inspiration

Reference sources:

- Pop Mart official site: https://www.popmart.com/us
- Calico Critters official site: https://calicocritters.com/en-us/

The in-app footer also includes this attribution.

## How to replace or expand images legally

Use one of these approaches:

1. Add your own original SVG or licensed artwork to `public/assets/items/`.
2. Use images you have explicit redistribution rights for.
3. Keep source and attribution records for any future official partner assets.

Do not scrape retailer or marketplace websites for imagery.
