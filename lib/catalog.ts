import { withBasePath } from "@/lib/utils";

export const IMAGE_ATTRIBUTION = [
  {
    label: "Pop Mart Official",
    url: "https://www.popmart.com/us"
  },
  {
    label: "Calico Critters Official",
    url: "https://calicocritters.com/en-us/"
  }
];

export const AUTHENTICITY_TIPS: Record<string, string[]> = {
  "labubu-forest-party": [
    "Confirm print registration is clean on the box front logo.",
    "Check face paint edges for crisp transitions, not bleeding.",
    "Official blind-box foil should reflect evenly, never patchy."
  ],
  "hirono-garden-daydream": [
    "Texture on matte vinyl should feel smooth and even.",
    "Accessory alignment should match the insert artwork.",
    "Base mold marks should be shallow and consistent."
  ],
  "mokoko-sweet-bloom": [
    "Pastel paint gradients should blend without striping.",
    "Small charms should have clean edges and no burrs.",
    "Card insert colors should not look gray or washed."
  ],
  "baby-treat-cart": [
    "Fabric and flocking should feel soft, not sparse.",
    "Printed graphics should keep linework sharp at edges.",
    "Plastic joints should fit snugly without wobble."
  ],
  "flora-rabbit-bakery-set": [
    "Tiny pastry prints should be centered and legible.",
    "Basket textures should look crisp under direct light.",
    "Official packaging tabs should lock tightly."
  ],
  "maple-cat-forest-swing": [
    "Paint on wood-like parts should avoid glossy sheen.",
    "Hanging parts should connect without loose hooks.",
    "Clothing seams should stay tidy and symmetrical."
  ]
};

export const STICKER_SETS: Record<string, string[]> = {
  candywood: ["star", "sparkle", "heart", "leaf"],
  moonpetal: ["moon", "sparkle", "bow", "leaf"],
  meadowmilk: ["flower", "bow", "leaf", "cloud"],
  woodland: ["leaf", "berry", "flower", "sparkle"]
};

type SeedItem = {
  name: string;
  rarity: string;
  releaseDate: string;
  imageLocalPath: string;
  officialProductPageUrl: string;
  imageCreditText: string;
  brandName: "Pop Mart" | "Calico Critters";
  itemAccentColor: string;
  itemBgStyle: "sparkleGradient" | "skyCandy" | "meadowGingham" | "forestPaper";
  tags: string[];
};

export const SEEDED_UNIVERSES: Array<{
  name: string;
  slug: string;
  description: string;
  themeKey: "popmart" | "calico";
  portalCopy: string;
  releases: Array<{
    name: string;
    slug: string;
    releaseDate: string;
    stickerSet: string;
    items: SeedItem[];
  }>;
}> = [
  {
    name: "Pop Mart",
    slug: "pop-mart",
    description: "Candy-gloss blind boxes, character drops, and playful resale swings.",
    themeKey: "popmart",
    portalCopy: "Sparkly shelves, chase pulls, dreamy pastel hype.",
    releases: [
      {
        name: "Labubu Forest Party",
        slug: "labubu-forest-party",
        releaseDate: "2025-06-20",
        stickerSet: "candywood",
        items: [
          {
            name: "Labubu Moss Glow",
            rarity: "Rare",
            releaseDate: "2025-06-20",
            imageLocalPath: withBasePath("/assets/items/skullpanda-moon.svg"),
            officialProductPageUrl: "https://www.popmart.com/us",
            imageCreditText: "Pop Mart official product catalog (reference)",
            brandName: "Pop Mart",
            itemAccentColor: "326 88% 62%",
            itemBgStyle: "sparkleGradient",
            tags: ["labubu", "forest", "pastel", "blind-box"]
          },
          {
            name: "Labubu Berry Lantern",
            rarity: "Common",
            releaseDate: "2025-06-20",
            imageLocalPath: withBasePath("/assets/items/skullpanda-velvet.svg"),
            officialProductPageUrl: "https://www.popmart.com/us",
            imageCreditText: "Pop Mart official product catalog (reference)",
            brandName: "Pop Mart",
            itemAccentColor: "26 87% 64%",
            itemBgStyle: "skyCandy",
            tags: ["labubu", "berry", "cozy"]
          },
          {
            name: "Labubu Clover Note",
            rarity: "Limited",
            releaseDate: "2025-06-20",
            imageLocalPath: withBasePath("/assets/items/skullpanda-circus.svg"),
            officialProductPageUrl: "https://www.popmart.com/us",
            imageCreditText: "Pop Mart official product catalog (reference)",
            brandName: "Pop Mart",
            itemAccentColor: "146 45% 46%",
            itemBgStyle: "forestPaper",
            tags: ["labubu", "clover", "limited"]
          },
          {
            name: "Labubu Moon Picnic",
            rarity: "Secret",
            releaseDate: "2025-06-20",
            imageLocalPath: withBasePath("/assets/items/dimoo-nightglow.svg"),
            officialProductPageUrl: "https://www.popmart.com/us",
            imageCreditText: "Pop Mart official product catalog (reference)",
            brandName: "Pop Mart",
            itemAccentColor: "265 74% 66%",
            itemBgStyle: "sparkleGradient",
            tags: ["labubu", "secret", "moon"]
          }
        ]
      },
      {
        name: "Hirono Garden Daydream",
        slug: "hirono-garden-daydream",
        releaseDate: "2025-09-05",
        stickerSet: "moonpetal",
        items: [
          {
            name: "Hirono Tea Rain",
            rarity: "Common",
            releaseDate: "2025-09-05",
            imageLocalPath: withBasePath("/assets/items/dimoo-bubble.svg"),
            officialProductPageUrl: "https://www.popmart.com/us",
            imageCreditText: "Pop Mart official product catalog (reference)",
            brandName: "Pop Mart",
            itemAccentColor: "201 86% 58%",
            itemBgStyle: "skyCandy",
            tags: ["hirono", "tea", "soft-blue"]
          },
          {
            name: "Hirono Rose Sketch",
            rarity: "Rare",
            releaseDate: "2025-09-05",
            imageLocalPath: withBasePath("/assets/items/dimoo-cloud.svg"),
            officialProductPageUrl: "https://www.popmart.com/us",
            imageCreditText: "Pop Mart official product catalog (reference)",
            brandName: "Pop Mart",
            itemAccentColor: "342 78% 72%",
            itemBgStyle: "sparkleGradient",
            tags: ["hirono", "rose", "dreamy"]
          },
          {
            name: "Hirono Forest Letter",
            rarity: "Limited",
            releaseDate: "2025-09-05",
            imageLocalPath: withBasePath("/assets/items/skullpanda-moon.svg"),
            officialProductPageUrl: "https://www.popmart.com/us",
            imageCreditText: "Pop Mart official product catalog (reference)",
            brandName: "Pop Mart",
            itemAccentColor: "132 42% 45%",
            itemBgStyle: "forestPaper",
            tags: ["hirono", "forest", "letter"]
          },
          {
            name: "Hirono Dusk Lantern",
            rarity: "Chase",
            releaseDate: "2025-09-05",
            imageLocalPath: withBasePath("/assets/items/skullpanda-circus.svg"),
            officialProductPageUrl: "https://www.popmart.com/us",
            imageCreditText: "Pop Mart official product catalog (reference)",
            brandName: "Pop Mart",
            itemAccentColor: "282 72% 67%",
            itemBgStyle: "sparkleGradient",
            tags: ["hirono", "chase", "lantern"]
          }
        ]
      },
      {
        name: "Mokoko Sweet Bloom",
        slug: "mokoko-sweet-bloom",
        releaseDate: "2025-11-08",
        stickerSet: "candywood",
        items: [
          {
            name: "Mokoko Honey Bow",
            rarity: "Common",
            releaseDate: "2025-11-08",
            imageLocalPath: withBasePath("/assets/items/dimoo-bubble.svg"),
            officialProductPageUrl: "https://www.popmart.com/us",
            imageCreditText: "Pop Mart official product catalog (reference)",
            brandName: "Pop Mart",
            itemAccentColor: "35 90% 66%",
            itemBgStyle: "skyCandy",
            tags: ["mokoko", "honey", "bow"]
          },
          {
            name: "Mokoko Blush Basket",
            rarity: "Rare",
            releaseDate: "2025-11-08",
            imageLocalPath: withBasePath("/assets/items/skullpanda-velvet.svg"),
            officialProductPageUrl: "https://www.popmart.com/us",
            imageCreditText: "Pop Mart official product catalog (reference)",
            brandName: "Pop Mart",
            itemAccentColor: "330 80% 66%",
            itemBgStyle: "sparkleGradient",
            tags: ["mokoko", "blush", "basket"]
          },
          {
            name: "Mokoko Meadow Jam",
            rarity: "Limited",
            releaseDate: "2025-11-08",
            imageLocalPath: withBasePath("/assets/items/dimoo-nightglow.svg"),
            officialProductPageUrl: "https://www.popmart.com/us",
            imageCreditText: "Pop Mart official product catalog (reference)",
            brandName: "Pop Mart",
            itemAccentColor: "157 40% 44%",
            itemBgStyle: "forestPaper",
            tags: ["mokoko", "meadow", "jam"]
          },
          {
            name: "Mokoko Twilight Cocoa",
            rarity: "Secret",
            releaseDate: "2025-11-08",
            imageLocalPath: withBasePath("/assets/items/skullpanda-moon.svg"),
            officialProductPageUrl: "https://www.popmart.com/us",
            imageCreditText: "Pop Mart official product catalog (reference)",
            brandName: "Pop Mart",
            itemAccentColor: "255 72% 66%",
            itemBgStyle: "sparkleGradient",
            tags: ["mokoko", "secret", "twilight"]
          }
        ]
      }
    ]
  },
  {
    name: "Calico Critters",
    slug: "calico-critters",
    description: "Warm meadows, tiny cozy sets, and collectible cottagecore comfort.",
    themeKey: "calico",
    portalCopy: "Paper textures, soft gingham, and woodland tiny joys.",
    releases: [
      {
        name: "Baby Treat Cart",
        slug: "baby-treat-cart",
        releaseDate: "2025-05-12",
        stickerSet: "meadowmilk",
        items: [
          {
            name: "Baby Sundae Cart",
            rarity: "Common",
            releaseDate: "2025-05-12",
            imageLocalPath: withBasePath("/assets/items/baby-carousel.svg"),
            officialProductPageUrl: "https://calicocritters.com/en-us/",
            imageCreditText: "Calico Critters official product listings (reference)",
            brandName: "Calico Critters",
            itemAccentColor: "347 70% 74%",
            itemBgStyle: "meadowGingham",
            tags: ["baby", "cart", "dessert"]
          },
          {
            name: "Baby Honey Waffles",
            rarity: "Rare",
            releaseDate: "2025-05-12",
            imageLocalPath: withBasePath("/assets/items/baby-garden.svg"),
            officialProductPageUrl: "https://calicocritters.com/en-us/",
            imageCreditText: "Calico Critters official product listings (reference)",
            brandName: "Calico Critters",
            itemAccentColor: "29 63% 63%",
            itemBgStyle: "meadowGingham",
            tags: ["baby", "honey", "waffles"]
          },
          {
            name: "Baby Berry Float",
            rarity: "Limited",
            releaseDate: "2025-05-12",
            imageLocalPath: withBasePath("/assets/items/baby-picnic.svg"),
            officialProductPageUrl: "https://calicocritters.com/en-us/",
            imageCreditText: "Calico Critters official product listings (reference)",
            brandName: "Calico Critters",
            itemAccentColor: "321 62% 71%",
            itemBgStyle: "skyCandy",
            tags: ["baby", "berry", "float"]
          },
          {
            name: "Baby Pudding Parade",
            rarity: "Chase",
            releaseDate: "2025-05-12",
            imageLocalPath: withBasePath("/assets/items/garden-teacart.svg"),
            officialProductPageUrl: "https://calicocritters.com/en-us/",
            imageCreditText: "Calico Critters official product listings (reference)",
            brandName: "Calico Critters",
            itemAccentColor: "52 66% 62%",
            itemBgStyle: "meadowGingham",
            tags: ["baby", "pudding", "parade"]
          }
        ]
      },
      {
        name: "Flora Rabbit Bakery Set",
        slug: "flora-rabbit-bakery-set",
        releaseDate: "2025-08-22",
        stickerSet: "woodland",
        items: [
          {
            name: "Flora Bunny Brioche",
            rarity: "Common",
            releaseDate: "2025-08-22",
            imageLocalPath: withBasePath("/assets/items/garden-hedge.svg"),
            officialProductPageUrl: "https://calicocritters.com/en-us/",
            imageCreditText: "Calico Critters official product listings (reference)",
            brandName: "Calico Critters",
            itemAccentColor: "38 58% 55%",
            itemBgStyle: "forestPaper",
            tags: ["flora", "bakery", "brioche"]
          },
          {
            name: "Flora Bunny Daisy Tart",
            rarity: "Rare",
            releaseDate: "2025-08-22",
            imageLocalPath: withBasePath("/assets/items/garden-lantern.svg"),
            officialProductPageUrl: "https://calicocritters.com/en-us/",
            imageCreditText: "Calico Critters official product listings (reference)",
            brandName: "Calico Critters",
            itemAccentColor: "340 68% 74%",
            itemBgStyle: "meadowGingham",
            tags: ["flora", "daisy", "tart"]
          },
          {
            name: "Flora Bunny Oven Nook",
            rarity: "Limited",
            releaseDate: "2025-08-22",
            imageLocalPath: withBasePath("/assets/items/baby-carousel.svg"),
            officialProductPageUrl: "https://calicocritters.com/en-us/",
            imageCreditText: "Calico Critters official product listings (reference)",
            brandName: "Calico Critters",
            itemAccentColor: "145 30% 48%",
            itemBgStyle: "forestPaper",
            tags: ["flora", "oven", "nook"]
          },
          {
            name: "Flora Bunny Moon Cake",
            rarity: "Secret",
            releaseDate: "2025-08-22",
            imageLocalPath: withBasePath("/assets/items/baby-garden.svg"),
            officialProductPageUrl: "https://calicocritters.com/en-us/",
            imageCreditText: "Calico Critters official product listings (reference)",
            brandName: "Calico Critters",
            itemAccentColor: "258 50% 65%",
            itemBgStyle: "skyCandy",
            tags: ["flora", "moon", "cake"]
          }
        ]
      },
      {
        name: "Maple Cat Forest Swing",
        slug: "maple-cat-forest-swing",
        releaseDate: "2025-10-16",
        stickerSet: "woodland",
        items: [
          {
            name: "Maple Cat Moss Swing",
            rarity: "Common",
            releaseDate: "2025-10-16",
            imageLocalPath: withBasePath("/assets/items/garden-teacart.svg"),
            officialProductPageUrl: "https://calicocritters.com/en-us/",
            imageCreditText: "Calico Critters official product listings (reference)",
            brandName: "Calico Critters",
            itemAccentColor: "126 28% 46%",
            itemBgStyle: "forestPaper",
            tags: ["maple-cat", "swing", "moss"]
          },
          {
            name: "Maple Cat Acorn Bench",
            rarity: "Rare",
            releaseDate: "2025-10-16",
            imageLocalPath: withBasePath("/assets/items/garden-hedge.svg"),
            officialProductPageUrl: "https://calicocritters.com/en-us/",
            imageCreditText: "Calico Critters official product listings (reference)",
            brandName: "Calico Critters",
            itemAccentColor: "28 52% 56%",
            itemBgStyle: "meadowGingham",
            tags: ["maple-cat", "acorn", "bench"]
          },
          {
            name: "Maple Cat Glow Path",
            rarity: "Limited",
            releaseDate: "2025-10-16",
            imageLocalPath: withBasePath("/assets/items/garden-lantern.svg"),
            officialProductPageUrl: "https://calicocritters.com/en-us/",
            imageCreditText: "Calico Critters official product listings (reference)",
            brandName: "Calico Critters",
            itemAccentColor: "199 58% 60%",
            itemBgStyle: "skyCandy",
            tags: ["maple-cat", "glow", "path"]
          },
          {
            name: "Maple Cat Twilight Meadow",
            rarity: "Chase",
            releaseDate: "2025-10-16",
            imageLocalPath: withBasePath("/assets/items/baby-picnic.svg"),
            officialProductPageUrl: "https://calicocritters.com/en-us/",
            imageCreditText: "Calico Critters official product listings (reference)",
            brandName: "Calico Critters",
            itemAccentColor: "274 48% 64%",
            itemBgStyle: "forestPaper",
            tags: ["maple-cat", "twilight", "chase"]
          }
        ]
      }
    ]
  }
];
