import { Condition, PrismaClient } from "@prisma/client";
import { SEEDED_UNIVERSES } from "../lib/catalog";
import { slugify } from "../lib/utils";
import { RELEASE_THEME_OVERRIDES } from "../lib/themes";

const prisma = new PrismaClient();

const conditions = [Condition.MINT, Condition.EXCELLENT, Condition.GOOD, Condition.FAIR] as const;
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

async function main() {
  await prisma.listing.deleteMany();
  await prisma.pricePoint.deleteMany();
  await prisma.item.deleteMany();
  await prisma.release.deleteMany();
  await prisma.universe.deleteMany();
  await prisma.userPref.deleteMany();

  for (const universe of SEEDED_UNIVERSES) {
    const createdUniverse = await prisma.universe.create({
      data: {
        name: universe.name,
        slug: universe.slug,
        description: universe.description
      }
    });

    for (const release of universe.releases) {
      const override = RELEASE_THEME_OVERRIDES[release.slug];
      const createdRelease = await prisma.release.create({
        data: {
          universeId: createdUniverse.id,
          name: release.name,
          slug: release.slug,
          releaseDate: new Date(release.releaseDate),
          themeAccent: override?.accent,
          themeBgStyle: override?.bgStyle,
          stickerSet: release.stickerSet
        }
      });

      for (const itemSeed of release.items) {
        const slug = slugify(itemSeed.name);
        const basePrice = seededNumber(slug, 28, 180);
        const trendBias = seededNumber(`${slug}-trend`, -0.18, 0.26);
        const pointCount = Math.round(seededNumber(`${slug}-points`, 34, 88));
        const listingCount = Math.round(seededNumber(`${slug}-listings`, 5, 18));

        const item = await prisma.item.create({
          data: {
            releaseId: createdRelease.id,
            name: itemSeed.name,
            slug,
            rarity: itemSeed.rarity,
            imageUrl: itemSeed.imageUrl,
            tags: [universe.slug, release.slug, itemSeed.rarity.toLowerCase(), ...itemSeed.tags].join(", ")
          }
        });

        const priceData = Array.from({ length: pointCount }).map((_, index) => {
          const daysAgo = pointCount - index;
          const wave = Math.sin(index / 4.3) * basePrice * 0.08;
          const drift = basePrice * trendBias * (index / pointCount);
          const noise = seededNumber(`${slug}-${index}`, -6, 6);
          const condition = conditions[index % conditions.length];
          const rawPrice = Math.max(12, basePrice + wave + drift + noise);

          return {
            itemId: item.id,
            source: index % 2 === 0 ? "Mercari" : "eBay",
            price: Number((rawPrice * conditionMultipliers[condition]).toFixed(2)),
            condition,
            timestamp: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000)
          };
        });

        const listingData = Array.from({ length: listingCount }).map((_, index) => {
          const condition = conditions[(index + 1) % conditions.length];
          const lift = seededNumber(`${slug}-listing-${index}`, 0.92, 1.18);
          return {
            itemId: item.id,
            marketplace: ["Mercari", "eBay", "Whatnot", "CollectorSwap"][index % 4],
            price: Number((basePrice * lift * conditionMultipliers[condition]).toFixed(2)),
            condition,
            url: "#",
            timestamp: new Date(Date.now() - index * 6 * 60 * 60 * 1000)
          };
        });

        await prisma.pricePoint.createMany({ data: priceData });
        await prisma.listing.createMany({ data: listingData });
      }
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
