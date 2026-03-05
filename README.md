# TRinket

TRinket is a minimal-but-whimsical collectibles value tracker for Pop Mart and Calico Critters.  
It ships with mocked market data, transparent valuation cues, local image assets, item-level theme overrides, and local-first watchlist/collection workflows.

## Tech Stack

- Next.js 14 App Router + TypeScript
- Tailwind CSS + CSS variable theming
- shadcn/ui primitives
- Zustand (theme, watchlist, alerts, collection)
- Recharts (history + sparkline charts)
- Prisma ORM + SQLite (schema ready for Postgres later)

## Run Locally

```bash
npm install
npx prisma generate
npx prisma db push
npm run seed
npm run dev
```

Open `http://localhost:3000`.

## Database Models

Defined in `prisma/schema.prisma`:

- `Universe`
- `Release`
- `Item`
- `PricePoint`
- `Listing`

The `Item` model includes:

- `imageLocalPath`
- `officialProductPageUrl`
- `imageCreditText`
- `brandName`
- `itemAccentColor`
- `itemBgStyle`

## Seed Data (MVP)

- 2 universes: Pop Mart, Calico Critters
- 6 releases total
- 24 items total (12 per universe)
- 30-90 price points per item
- 5-20 listings per item
- 12 upcoming drops

Source files:

- `lib/catalog.ts`
- `lib/static-data.ts`
- `lib/mock-drops.ts`
- `prisma/seed.ts`

## Pages

- `/` landing portal experience
- `/pop-mart` universe dashboard
- `/calico-critters` universe dashboard
- `/item/[slug]` item detail with per-item theme
- `/trending`
- `/watchlist`
- `/collection`
- `/drops`
- `/methodology`
- `/attribution`

## API Routes

- `GET /api/universes`
- `GET /api/releases?universe=slug`
- `GET /api/items?release=slug&query=&filters=`
- `GET /api/items/[slug]`
- `GET /api/trending?universe=slug`
- `GET /api/movers?universe=slug`
- `GET /api/drops?universe=slug`

## Add New Items

1. Add/update release + item entries in `lib/catalog.ts`.
2. Set item metadata:
   - `imageLocalPath`
   - `officialProductPageUrl`
   - `imageCreditText`
   - `brandName`
   - `itemAccentColor`
   - `itemBgStyle`
3. Re-seed:
```bash
npm run seed
```

## Image Policy + Attribution

TRinket does not scrape marketplaces or official stores for images.

- MVP visuals are local assets in `public/assets/items`.
- Every item record stores attribution fields and official product link metadata.
- Attribution is visible:
  - in the app footer
  - on each item detail page
  - on `/attribution`

Reference sources used for official-page linking and catalog context:

- Pop Mart official site: https://www.popmart.com/us
- Calico Critters official site: https://calicocritters.com/en-us/

When replacing images:

- only use assets you created or have rights to use
- keep `imageCreditText` and `officialProductPageUrl` accurate
- do not remove attribution from data records

## Methodology Summary

Estimated value is a weighted average of recent price points with condition normalization.

- Condition multipliers: Mint 1.08x, Excellent 1.0x, Good 0.92x, Fair 0.81x
- Confidence score uses sample density + volatility
- UI always surfaces last-updated timestamp + source labels

MVP data is mocked and should not be treated as real-time trading guidance.

## GitHub Pages Deployment (Static-Only, Stable)

Use branch publishing for predictable deploys:

1. GitHub -> `Settings` -> `Pages`
2. Source: `Deploy from a branch`
3. Branch: `gh-pages`
4. Folder: `/(root)`
5. Save

Publish latest UI changes from local `main`:

```bash
npm install
npm run publish:pages
```

This publish flow:

- builds static output with `basePath=/Test`
- temporarily excludes `app/api` during static export
- publishes `out/` contents to the `gh-pages` branch
- avoids queued/failing custom Pages workflow runs

Notes:

- Old workflow entries can still appear in Actions history; they are historical.
- This approach does not modify your latest app UI code on `main`; it only updates deployment artifacts on `gh-pages`.

## Future Real Integrations

The model is designed to swap mocked ingestion with real pipelines:

1. Add marketplace adapters that ingest sold comps and active listings.
2. Write normalized events into `PricePoint` and `Listing`.
3. Add scheduled jobs and source reliability weighting.
4. Keep attribution + methodology transparency in UI.
