import { RELEASE_THEME_OVERRIDES } from "@/lib/themes";
import { SEEDED_UNIVERSES } from "@/lib/catalog";
import { UPCOMING_DROPS } from "@/lib/mock-drops";
import type { Condition, Item, Listing, PricePoint, Release, Universe } from "@/lib/data-model";
import { slugify } from "@/lib/utils";

const conditions: Condition[] = ["MINT", "EXCELLENT", "GOOD", "FAIR"];
const conditionMultipliers: Record<Condition, number> = {
  MINT: 1.08,
  EXCELLENT: 1,
  GOOD: 0.92,
  FAIR: 0.81
};

function seededNumber(seed: string, min: number, max: number) {
  const value = Array.from(seed).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const fraction = ((Math.sin(value) + 1) / 2) % 1;
  return min + fraction * (max - min);
}

function makeId(...parts: string[]) {
  return parts.join("__");
}

const universes: Universe[] = SEEDED_UNIVERSES.map((universe) => ({
  id: makeId("universe", universe.slug),
  name: universe.name,
  slug: universe.slug,
  description: universe.description
}));

const releases: Release[] = SEEDED_UNIVERSES.flatMap((universe) => {
  const universeRecord = universes.find((entry) => entry.slug === universe.slug)!;
  return universe.releases.map((release) => {
    const override = RELEASE_THEME_OVERRIDES[release.slug];
    return {
      id: makeId("release", release.slug),
      universeId: universeRecord.id,
      name: release.name,
      slug: release.slug,
      releaseDate: new Date(release.releaseDate).toISOString(),
      themeAccent: override?.accent,
      themeBgStyle: override?.bgStyle,
      stickerSet: release.stickerSet,
      universe: universeRecord
    };
  });
});

const items: Item[] = SEEDED_UNIVERSES.flatMap((universe) =>
  universe.releases.flatMap((release) =>
    release.items.map((itemSeed) => ({
      id: makeId("item", slugify(itemSeed.name)),
      releaseId: makeId("release", release.slug),
      name: itemSeed.name,
      slug: slugify(itemSeed.name),
      rarity: itemSeed.rarity,
      imageUrl: itemSeed.imageUrl,
      tags: [universe.slug, release.slug, itemSeed.rarity.toLowerCase(), ...itemSeed.tags].join(", "),
      createdAt: new Date("2026-03-03T00:00:00.000Z").toISOString()
    }))
  )
);

const pricePoints: PricePoint[] = items.flatMap((item) => {
  const basePrice = seededNumber(item.slug, 28, 180);
  const trendBias = seededNumber(`${item.slug}-trend`, -0.18, 0.26);
  const pointCount = Math.round(seededNumber(`${item.slug}-points`, 34, 88));

  return Array.from({ length: pointCount }).map((_, index) => {
    const daysAgo = pointCount - index;
    const wave = Math.sin(index / 4.3) * basePrice * 0.08;
    const drift = basePrice * trendBias * (index / pointCount);
    const noise = seededNumber(`${item.slug}-${index}`, -6, 6);
    const condition = conditions[index % conditions.length];
    const rawPrice = Math.max(12, basePrice + wave + drift + noise);

    return {
      id: makeId("price", item.slug, `${index}`),
      itemId: item.id,
      source: index % 2 === 0 ? "Mercari" : "eBay",
      price: Number((rawPrice * conditionMultipliers[condition]).toFixed(2)),
      condition,
      timestamp: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString()
    };
  });
});

const listings: Listing[] = items.flatMap((item) => {
  const basePrice = seededNumber(item.slug, 28, 180);
  const listingCount = Math.round(seededNumber(`${item.slug}-listings`, 5, 18));
  return Array.from({ length: listingCount }).map((_, index) => {
    const condition = conditions[(index + 1) % conditions.length];
    const lift = seededNumber(`${item.slug}-listing-${index}`, 0.92, 1.18);
    return {
      id: makeId("listing", item.slug, `${index}`),
      itemId: item.id,
      marketplace: ["Mercari", "eBay", "Whatnot", "CollectorSwap"][index % 4],
      price: Number((basePrice * lift * conditionMultipliers[condition]).toFixed(2)),
      condition,
      url: "#",
      timestamp: new Date(Date.now() - index * 6 * 60 * 60 * 1000).toISOString()
    };
  });
});

export const STATIC_DB = {
  universes,
  releases,
  items,
  pricePoints,
  listings,
  drops: UPCOMING_DROPS
};
