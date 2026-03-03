import { STATIC_DB } from "@/lib/static-data";
import { calculateItemMetrics, calculateTrendingScore, type ItemWithMarketData } from "@/lib/valuation";

function attachRelations(item: typeof STATIC_DB.items[number]): ItemWithMarketData {
  const release = STATIC_DB.releases.find((entry) => entry.id === item.releaseId)!;
  return {
    ...item,
    release,
    pricePoints: STATIC_DB.pricePoints.filter((point) => point.itemId === item.id).sort((a, b) => a.timestamp.localeCompare(b.timestamp)),
    listings: STATIC_DB.listings.filter((listing) => listing.itemId === item.id).sort((a, b) => b.timestamp.localeCompare(a.timestamp))
  };
}

function attachMetrics(item: ItemWithMarketData) {
  return {
    ...item,
    rawItem: item,
    metrics: calculateItemMetrics(item)
  };
}

export async function getUniverses() {
  return STATIC_DB.universes.map((universe) => ({
    ...universe,
    releases: STATIC_DB.releases.filter((release) => release.universeId === universe.id).sort((a, b) => b.releaseDate.localeCompare(a.releaseDate))
  }));
}

export async function getUniverseDashboard(slug: string, releaseSlug?: string) {
  const universe = STATIC_DB.universes.find((entry) => entry.slug === slug);
  if (!universe) {
    return null;
  }

  const releases = STATIC_DB.releases.filter((release) => release.universeId === universe.id).sort((a, b) => b.releaseDate.localeCompare(a.releaseDate));
  const items = STATIC_DB.items
    .map(attachRelations)
    .filter((item) => item.release.universe.slug === slug && (!releaseSlug || item.release.slug === releaseSlug))
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
    .slice(0, 6);

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
  slugs?: string[];
}) {
  return STATIC_DB.items
    .map(attachRelations)
    .filter((item) => {
      const releaseYear = `${new Date(item.release.releaseDate).getFullYear()}`;
      const tags = item.tags.split(",").map((tag) => tag.trim().toLowerCase());
      const conditions = item.listings.map((listing) => listing.condition.toLowerCase());
      return (
        (!params.query || item.name.toLowerCase().includes(params.query.toLowerCase())) &&
        (!params.rarity || item.rarity === params.rarity) &&
        (!params.release || item.release.slug === params.release) &&
        (!params.universe || item.release.universe.slug === params.universe) &&
        (!params.slugs?.length || params.slugs.includes(item.slug)) &&
        (!params.year || releaseYear === params.year) &&
        (!params.tag || tags.includes(params.tag.toLowerCase())) &&
        (!params.condition || conditions.includes(params.condition.toLowerCase()))
      );
    })
    .map(attachMetrics)
    .slice(0, 60);
}

export async function getReleases(universeSlug?: string) {
  return STATIC_DB.releases
    .filter((release) => !universeSlug || release.universe.slug === universeSlug)
    .sort((a, b) => b.releaseDate.localeCompare(a.releaseDate));
}

export async function getTrending(releaseSlug?: string) {
  return STATIC_DB.items
    .map(attachRelations)
    .filter((item) => !releaseSlug || item.release.slug === releaseSlug)
    .map(attachMetrics)
    .sort((a, b) => calculateTrendingScore(b.rawItem) - calculateTrendingScore(a.rawItem))
    .slice(0, 8);
}

export async function getDrops(universeSlug?: string) {
  return STATIC_DB.drops.filter((drop) => !universeSlug || drop.universeSlug === universeSlug);
}
