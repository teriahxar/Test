# VaultView

VaultView is a cute, highly interactive collectibles value tracker built with Next.js 14, TypeScript, Tailwind, Zustand, Recharts, Prisma, and SQLite. The app dynamically changes its full theme based on both collectible universe and release, and includes watchlists, alerts, drop tracking, recently viewed history, shareable item cards, and a no-login portfolio mode.

## Stack

- Next.js 14 App Router + TypeScript
- Tailwind CSS
- shadcn/ui-style primitives
- Zustand for theme, watchlist, collection mode, alerts, and recently viewed state
- Recharts for value history and sparklines
- Prisma ORM + SQLite for local development

## Features

- Full-screen anime-intro-style landing page with universe portal cards
- Theme packs by universe plus release-specific accent/background overrides
- Trending, biggest movers, new drops, all-items dashboard tabs
- Search typeahead, release switcher, and cute filter drawer
- Item profile pages with value history, confidence meter, market heat, authenticity tips, and alerts
- Watchlist page with heat badges and alert editing
- Drop calendar with hype scores and reminder toggles
- Collection Mode / Portfolio dashboard with Owned, Want, and Sold states
- Shareable item card module on detail pages
- Reduced motion and sound toggle settings

## Setup

```bash
npm install
copy .env.example .env
npx prisma generate
npx prisma db execute --file prisma/init.sql --schema prisma/schema.prisma
npm run seed
npm run dev
```

Open `http://localhost:3000`.

## Database notes

This local dev build uses SQLite. The Prisma schema is structured so it can be adapted to Postgres later without changing the app’s feature model.

If you change the schema and `prisma db push` is unreliable on your machine, you can continue using `prisma db execute` with the SQL files in `prisma/` for local bootstrap.

## Seeded content

- 3 universes
- 6 releases
- 18 items
- 30-90 price points per item
- 5-20 active listings per item
- 12 upcoming drops

## Image Attribution / Sources

VaultView does **not** scrape images.

For this MVP:

- Item artwork in `public/assets/items/*.svg` is original vector artwork created specifically for this demo.
- Official sites were used only as visual reference sources for styling direction and naming context.

Reference sources:

- Pop Mart official site: https://www.popmart.com/us
- Calico Critters official site: https://calicocritters.com/en-us/

## How to expand or replace images legally

Use one of these approaches:

1. Create your own original artwork or icon-based product cards and place them in `public/assets/items/`.
2. Use images you have explicit rights or licenses to distribute.
3. If you later use official or partner-supplied product images, store the source, license, and attribution details in your content pipeline and show them in the footer/README.

Do not scrape marketplace or retailer sites for images.

## API routes

- `GET /api/universes`
- `GET /api/releases?universe=pop-mart`
- `GET /api/items?release=skullpanda&query=moon&filters={"rarity":"Rare"}`
- `GET /api/items/[slug]`
- `GET /api/trending?release=skullpanda`
- `GET /api/drops?universe=pop-mart`
- `POST /api/watchlist`

## Mock valuation engine

Estimated value is computed from recent sold `PricePoint` rows using:

- recency weighting
- condition normalization
- volatility scoring
- confidence scoring from sample count and stability
- 7-day change computation for movers and heat

## Local persistence

- Watchlist, alerts, and recently viewed items use `localStorage`
- Collection Mode / Portfolio state uses `localStorage`
- Drop reminders use `localStorage`

## Commands

```bash
npm run dev
npm run build
npm run start
npm run seed
npm run db:studio
```
