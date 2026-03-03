import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/db";
import { UPCOMING_DROPS } from "@/lib/mock-drops";
import { calculateItemMetrics, calculateTrendingScore, type ItemWithMarketData } from "@/lib/valuation";

const itemInclude = {
  release: {
    include: {
      universe: true
    }
  },
  pricePoints: {
    orderBy: {
      timestamp: "asc"
    }
  },
  listings: {
    orderBy: {
      timestamp: "desc"
    }
  }
} as const;

export const getUniverses = unstable_cache(
  () =>
    prisma.universe.findMany({
      include: {
        releases: {
          orderBy: {
            releaseDate: "desc"
          }
        }
      },
      orderBy: {
        name: "asc"
      }
    }),
  ["universes"],
  { revalidate: 3600 }
);

export const getUniverseDashboard = unstable_cache(
  async (slug: string, releaseSlug?: string) => {
    const universe = await prisma.universe.findUnique({
      where: { slug },
      include: {
        releases: {
          orderBy: {
            releaseDate: "desc"
          }
        }
      }
    });

    if (!universe) {
      return null;
    }

    const items = await prisma.item.findMany({
      where: {
        release: {
          universe: {
            slug
          },
          ...(releaseSlug ? { slug: releaseSlug } : {})
        }
      },
      include: itemInclude,
      orderBy: {
        createdAt: "desc"
      }
    });

    return {
      universe,
      items: items.map(attachMetrics)
    };
  },
  ["universe-dashboard"],
  { revalidate: 3600 }
);

export async function getItemBySlug(slug: string) {
  const item = await prisma.item.findUnique({
    where: { slug },
    include: itemInclude
  });

  if (!item) {
    return null;
  }

  const similar = await prisma.item.findMany({
    where: {
      releaseId: item.releaseId,
      NOT: { slug }
    },
    include: itemInclude,
    take: 6
  });

  return {
    item: attachMetrics(item),
    similar: similar.map(attachMetrics)
  };
}

export async function getItems(params: {
  release?: string;
  universe?: string;
  query?: string;
  rarity?: string;
}) {
  const releaseWhere = {
    ...(params.release ? { slug: params.release } : {}),
    ...(params.universe ? { universe: { slug: params.universe } } : {})
  };

  const items = await prisma.item.findMany({
    where: {
      ...(params.query ? { name: { contains: params.query } } : {}),
      ...(params.rarity ? { rarity: params.rarity } : {}),
      ...(params.release || params.universe ? { release: releaseWhere } : {})
    },
    include: itemInclude,
    take: 60
  });

  return items.map(attachMetrics);
}

export async function getReleases(universeSlug?: string) {
  return prisma.release.findMany({
    where: universeSlug ? { universe: { slug: universeSlug } } : undefined,
    include: {
      universe: true
    },
    orderBy: {
      releaseDate: "desc"
    }
  });
}

export async function getTrending(releaseSlug?: string) {
  const items = await prisma.item.findMany({
    where: releaseSlug ? { release: { slug: releaseSlug } } : undefined,
    include: itemInclude
  });

  return items
    .map(attachMetrics)
    .sort((a, b) => calculateTrendingScore(b.rawItem) - calculateTrendingScore(a.rawItem))
    .slice(0, 8);
}

export async function getDrops(universeSlug?: string) {
  return UPCOMING_DROPS.filter((drop) => !universeSlug || drop.universeSlug === universeSlug);
}

function attachMetrics(item: ItemWithMarketData) {
  return {
    ...item,
    rawItem: item,
    metrics: calculateItemMetrics(item)
  };
}
