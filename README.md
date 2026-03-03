# VaultView

VaultView is a Next.js 14 collectibles market tracker with a dynamic theme pack system, mocked market valuation engine, Prisma + SQLite data model, watchlist alerts, and release-aware dashboards.

## Stack

- Next.js 14 App Router + TypeScript
- Tailwind CSS
- shadcn/ui-style component primitives
- Zustand for theme, watchlist, alerts, and recently viewed state
- Recharts for value history and sparklines
- Prisma ORM + SQLite for local development

## Commands

```bash
npm install
copy .env.example .env
npx prisma db push
npm run seed
npm run dev
```

Optional:

```bash
npm run build
npm run start
npm run db:studio
```

## Included mocked functionality

- 3 universes
- 6 seeded releases
- 18 seeded items
- 30-90 price points per item
- 5-20 active listings per item
- 12 upcoming drops in the calendar
- Daily-rotating trending order
- Weighted value estimation and confidence scoring from sold comps
- Persistent theme packs, watchlist entries, alert thresholds, and reminders

## API routes

- `GET /api/universes`
- `GET /api/releases?universe=pop-mart`
- `GET /api/items?release=skullpanda&query=moon&filters=Rare`
- `GET /api/items/[slug]`
- `GET /api/trending?release=skullpanda`
- `GET /api/drops?universe=pop-mart`
- `POST /api/watchlist`

## Mock valuation model

The app computes `estimatedValue` from recent sold `PricePoint` rows using:

- recency weighting so newer sales matter more
- condition normalization to compare sold prices across listing quality
- volatility analysis from normalized sold prices
- a confidence score that increases with sample count and decreases with volatility

## Swapping in real marketplace integrations later

The current schema is already normalized around `PricePoint` and `Listing`, so replacing mock generation with real ingestion is straightforward:

1. Add provider adapters that map external sold comps into `PricePoint`.
2. Add provider adapters that map current listings into `Listing`.
3. Schedule import jobs per universe/release/item.
4. Preserve the valuation pipeline in `lib/valuation.ts` so UI contracts stay stable.
5. Extend sources such as eBay sold comps, Whatnot, Mercari, StockX-like marketplaces, or retailer drop feeds by normalizing provider-specific fields before persistence.

## Notes

- Theme packs are controlled through CSS variables on the root element and persisted with Zustand.
- Release themes can override accent and background styling while keeping the base universe identity.
- Watchlist alerts and reminders are intentionally client-side for local dev without auth.
