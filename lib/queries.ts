import { STATIC_DB } from "@/lib/static-data";
import { calculateItemMetrics, calculateTrendingScore, type ItemWithMarketData } from "@/lib/valuation";
import { normalizeUniverseSlug } from "@/lib/routing";

function attachRelations(item: (typeof STATIC_DB.items)[number]): ItemWithMarketData {
  const release = STATIC_DB.releases.find((entry) => entry.id === item.releaseId)!;
  return {
    ...item,
    release,
    pricePoints: STATIC_DB.pricePoints.filter((point) => point.itemId === item.id).sort((a, b) => a.timestamp.localeCompare(b.timestamp)),
    listings: STATIC_DB.listings.filter((listing) => listing.itemId === item.id).sort((a, b) => b.timestamp.localeCompare(a.timestamp))
  };
}

function attachMetrics(item: ItemWithMarketData) {
  const metrics = calculateItemMetrics(item);
  return {
    ...item,
    imageUrl: item.imageLocalPath,
    rawItem: item,
    metrics
  };
}

export async function getUniverses() {
  return STATIC_DB.universes.map((universe) => ({
    ...universe,
    releases: STATIC_DB.releases.filter((release) => release.universeId === universe.id).sort((a, b) => b.releaseDate.localeCompare(a.releaseDate))
  }));
}

export async function getUniverseDashboard(slug: string, releaseSlug?: string) {
  const normalizedSlug = normalizeUniverseSlug(slug);
  const universe = STATIC_DB.universes.find((entry) => entry.slug === normalizedSlug);
  if (!universe) {
    return null;
  }

  const releases = STATIC_DB.releases.filter((release) => release.universeId === universe.id).sort((a, b) => b.releaseDate.localeCompare(a.releaseDate));
  const items = STATIC_DB.items
    .map(attachRelations)
    .filter((item) => item.release.universe.slug === normalizedSlug && (!releaseSlug || item.release.slug === releaseSlug))
    .map(attachMetrics);

  return {
    universe: {
      ...universe,
      releases
    },
    items
  };
}

export async function getItemBySlug(slug: string) {
  const item = STATIC_DB.items.find((entry) => entry.slug === slug);
  if (!item) {
    return null;
  }

  const itemWithRelations = attachRelations(item);
  const similar = STATIC_DB.items
    .filter((entry) => entry.releaseId === item.releaseId && entry.slug !== slug)
    .map(attachRelations)
    .map(attachMetrics)
    .slice(0, 8);

  return {
    item: attachMetrics(itemWithRelations),
    similar
  };
}

export async function getItems(params: {
  release?: string;
  universe?: string;
  query?: string;
  rarity?: string;
  year?: string;
  condition?: string;
  tag?: string;
  minPrice?: number;
  maxPrice?: number;
  slugs?: string[];
}) {
  const normalizedUniverse = normalizeUniverseSlug(params.universe);

  return STATIC_DB.items
    .map(attachRelations)
    .filter((item) => {
      const releaseYear = `${new Date(item.releaseDate).getFullYear()}`;
      const tags = item.tags.split(",").map((tag) => tag.trim().toLowerCase());
      const listingConditions = item.listings.map((listing) => listing.condition.toLowerCase());
      const metrics = calculateItemMetrics(item);
      return (
        (!params.query || item.name.toLowerCase().includes(params.query.toLowerCase())) &&
        (!params.rarity || item.rarity === params.rarity) &&
        (!params.release || item.release.slug === params.release) &&
        (!normalizedUniverse || item.release.universe.slug === normalizedUniverse) &&
        (!params.slugs?.length || params.slugs.includes(item.slug)) &&
        (!params.year || releaseYear === params.year) &&
        (!params.tag || tags.includes(params.tag.toLowerCase())) &&
        (!params.condition || listingConditions.includes(params.condition.toLowerCase())) &&
        (!params.minPrice || metrics.estimatedValue >= params.minPrice) &&
        (!params.maxPrice || metrics.estimatedValue <= params.maxPrice)
      );
    })
    .map(attachMetrics)
    .slice(0, 60);
}

export async function getReleases(universeSlug?: string) {
  const normalizedUniverse = normalizeUniverseSlug(universeSlug);
  return STATIC_DB.releases
    .filter((release) => !normalizedUniverse || release.universe.slug === normalizedUniverse)
    .sort((a, b) => b.releaseDate.localeCompare(a.releaseDate));
}

export async function getTrending(universeSlug?: string) {
  const normalizedUniverse = normalizeUniverseSlug(universeSlug);
  return STATIC_DB.items
    .map(attachRelations)
    .filter((item) => !normalizedUniverse || item.release.universe.slug === normalizedUniverse)
    .map(attachMetrics)
    .sort((a, b) => calculateTrendingScore(b.rawItem) - calculateTrendingScore(a.rawItem))
    .slice(0, 12);
}

export async function getMovers(universeSlug?: string) {
  const normalizedUniverse = normalizeUniverseSlug(universeSlug);
  return STATIC_DB.items
    .map(attachRelations)
    .filter((item) => !normalizedUniverse || item.release.universe.slug === normalizedUniverse)
    .map(attachMetrics)
    .sort((a, b) => Math.abs(b.metrics.sevenDayChange) - Math.abs(a.metrics.sevenDayChange))
    .slice(0, 12);
}

export async function getDrops(universeSlug?: string) {
  const normalizedUniverse = normalizeUniverseSlug(universeSlug);
  return STATIC_DB.drops.filter((drop) => !normalizedUniverse || drop.universeSlug === normalizedUniverse);
}
