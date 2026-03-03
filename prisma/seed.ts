import { Condition, PrismaClient } from "@prisma/client";
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

const universes = [
  {
    name: "Pop Mart",
    slug: "pop-mart",
    description: "Designer blind box figures with fast-moving secondary market swings.",
    releases: [
      {
        name: "Skullpanda",
        slug: "skullpanda",
        releaseDate: "2025-07-18",
        items: [
          ["Skullpanda Moonlit Waltz", "Ultra Rare"],
          ["Skullpanda Velvet Voltage", "Rare"],
          ["Skullpanda Mirror Circus", "Secret"]
        ]
      },
      {
        name: "Dimoo",
        slug: "dimoo",
        releaseDate: "2025-10-04",
        items: [
          ["Dimoo Bubble Transit", "Rare"],
          ["Dimoo Cloud Postcard", "Common"],
          ["Dimoo Nightglow Parade", "Chase"]
        ]
      }
    ]
  },
  {
    name: "Calico Critters",
    slug: "calico-critters",
    description: "Cozy miniature sets with surprising collector demand and nostalgic scarcity.",
    releases: [
      {
        name: "Baby Series",
        slug: "baby-series",
        releaseDate: "2025-05-10",
        items: [
          ["Baby Star Carousel", "Common"],
          ["Baby Garden Parade", "Rare"],
          ["Baby Picnic Twins", "Limited"]
        ]
      },
      {
        name: "Village Garden",
        slug: "village-garden",
        releaseDate: "2025-09-21",
        items: [
          ["Village Garden Tea Cart", "Rare"],
          ["Village Garden Hedge Set", "Common"],
          ["Village Garden Lantern Arch", "Limited"]
        ]
      }
    ]
  },
  {
    name: "Other",
    slug: "other",
    description: "A rotating index of modern collectibles spanning vinyl, pins, and mini brick sets.",
    releases: [
      {
        name: "Retro Handhelds",
        slug: "retro-handhelds",
        releaseDate: "2025-08-14",
        items: [
          ["Pixel Pocket Smoke", "Rare"],
          ["Pixel Pocket Lime", "Common"],
          ["Pixel Pocket Aurora", "Limited"]
        ]
      },
      {
        name: "Designer Vinyl",
        slug: "designer-vinyl",
        releaseDate: "2025-11-29",
        items: [
          ["Mono Ghost Variant", "Chase"],
          ["Mono Ghost Ivory", "Common"],
          ["Mono Ghost Chroma", "Rare"]
        ]
      }
    ]
  }
];

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

  for (const universe of universes) {
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
          themeBgStyle: override?.bgStyle
        }
      });

      for (const [itemName, rarity] of release.items) {
        const slug = slugify(itemName);
        const basePrice = seededNumber(slug, 28, 180);
        const trendBias = seededNumber(`${slug}-trend`, -0.18, 0.26);
        const pointCount = Math.round(seededNumber(`${slug}-points`, 34, 88));
        const listingCount = Math.round(seededNumber(`${slug}-listings`, 5, 18));

        const item = await prisma.item.create({
          data: {
            releaseId: createdRelease.id,
            name: itemName,
            slug,
            rarity,
            imageUrl: `https://placehold.co/600x600/F3F4F6/111827?text=${encodeURIComponent(itemName)}`,
            tags: [universe.slug, release.slug, rarity.toLowerCase()].join(", ")
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
