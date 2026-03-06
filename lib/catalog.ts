import { asset } from "@/lib/utils";

export const IMAGE_ATTRIBUTION = [
  {
    label: "Pop Mart Official",
    url: "https://www.popmart.com/us"
  },
  {
    label: "Calico Critters Official",
    url: "https://calicocritters.com/en-us/"
  },
  {
    label: "Funko Official",
    url: "https://funko.com/"
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
  brandName: "Pop Mart" | "Calico Critters" | "Funko Pop";
  itemAccentColor: string;
  itemBgStyle: "sparkleGradient" | "skyCandy" | "meadowGingham" | "forestPaper";
  tags: string[];
};

export const SEEDED_UNIVERSES: Array<{
  name: string;
  slug: string;
  description: string;
  themeKey: "popmart" | "calico" | "pop";
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
            imageLocalPath: asset("/assets/items/skullpanda-moon.svg"),
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
            imageLocalPath: asset("/assets/items/skullpanda-velvet.svg"),
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
            imageLocalPath: asset("/assets/items/skullpanda-circus.svg"),
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
            imageLocalPath: asset("/assets/items/dimoo-nightglow.svg"),
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
            imageLocalPath: asset("/assets/items/dimoo-bubble.svg"),
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
            imageLocalPath: asset("/assets/items/dimoo-cloud.svg"),
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
            imageLocalPath: asset("/assets/items/skullpanda-moon.svg"),
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
            imageLocalPath: asset("/assets/items/skullpanda-circus.svg"),
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
            imageLocalPath: asset("/assets/items/dimoo-bubble.svg"),
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
            imageLocalPath: asset("/assets/items/skullpanda-velvet.svg"),
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
            imageLocalPath: asset("/assets/items/dimoo-nightglow.svg"),
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
            imageLocalPath: asset("/assets/items/skullpanda-moon.svg"),
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
            imageLocalPath: asset("/assets/items/baby-carousel.svg"),
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
            imageLocalPath: asset("/assets/items/baby-garden.svg"),
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
            imageLocalPath: asset("/assets/items/baby-picnic.svg"),
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
            imageLocalPath: asset("/assets/items/garden-teacart.svg"),
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
            imageLocalPath: asset("/assets/items/garden-hedge.svg"),
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
            imageLocalPath: asset("/assets/items/garden-lantern.svg"),
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
            imageLocalPath: asset("/assets/items/baby-carousel.svg"),
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
            imageLocalPath: asset("/assets/items/baby-garden.svg"),
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
            imageLocalPath: asset("/assets/items/garden-teacart.svg"),
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
            imageLocalPath: asset("/assets/items/garden-hedge.svg"),
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
            imageLocalPath: asset("/assets/items/garden-lantern.svg"),
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
            imageLocalPath: asset("/assets/items/baby-picnic.svg"),
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
  },
  {
    name: "POP! World",
    slug: "pop",
    description: "Fun finds, iconic pops, and collectibles worth keeping an eye on.",
    themeKey: "pop",
    portalCopy: "Collectors' shelves, fandom favorites, and box-window grails.",
    releases: [
      {
        name: "Marvel Spotlight Pops",
        slug: "marvel-spotlight-pops",
        releaseDate: "2025-07-11",
        stickerSet: "moonpetal",
        items: [
          {
            name: "Spider-Man POP! #1152",
            rarity: "Common",
            releaseDate: "2025-07-11",
            imageLocalPath: asset("/assets/items/funko-spider-man-1152.png"),
            officialProductPageUrl: "https://funko.com/",
            imageCreditText: "Funko official product catalog (reference)",
            brandName: "Funko Pop",
            itemAccentColor: "207 76% 57%",
            itemBgStyle: "skyCandy",
            tags: ["funko-pop", "marvel", "spider-man"]
          },
          {
            name: "Iron Man POP! #1494",
            rarity: "Exclusive",
            releaseDate: "2025-07-11",
            imageLocalPath: asset("/assets/items/funko-iron-man-1494.png"),
            officialProductPageUrl: "https://funko.com/",
            imageCreditText: "Funko official product catalog (reference)",
            brandName: "Funko Pop",
            itemAccentColor: "11 83% 61%",
            itemBgStyle: "sparkleGradient",
            tags: ["funko-pop", "marvel", "iron-man", "exclusive"]
          },
          {
            name: "Captain America POP! #1382",
            rarity: "Rare",
            releaseDate: "2025-07-11",
            imageLocalPath: asset("/assets/items/funko-captain-america-1382.png"),
            officialProductPageUrl: "https://funko.com/",
            imageCreditText: "Funko official product catalog (reference)",
            brandName: "Funko Pop",
            itemAccentColor: "219 62% 54%",
            itemBgStyle: "skyCandy",
            tags: ["funko-pop", "marvel", "captain-america"]
          },
          {
            name: "Black Panther POP! #1369",
            rarity: "Chase",
            releaseDate: "2025-07-11",
            imageLocalPath: asset("/assets/items/funko-black-panther-1369.png"),
            officialProductPageUrl: "https://funko.com/",
            imageCreditText: "Funko official product catalog (reference)",
            brandName: "Funko Pop",
            itemAccentColor: "273 52% 57%",
            itemBgStyle: "sparkleGradient",
            tags: ["funko-pop", "marvel", "chase"]
          }
        ]
      },
      {
        name: "Anime Favorites POP!",
        slug: "anime-favorites-pop",
        releaseDate: "2025-10-02",
        stickerSet: "moonpetal",
        items: [
          {
            name: "Goku POP! #1404",
            rarity: "Common",
            releaseDate: "2025-10-02",
            imageLocalPath: asset("/assets/items/funko-goku-1404.png"),
            officialProductPageUrl: "https://funko.com/",
            imageCreditText: "Funko official product catalog (reference)",
            brandName: "Funko Pop",
            itemAccentColor: "46 90% 63%",
            itemBgStyle: "skyCandy",
            tags: ["funko-pop", "anime", "dragon-ball"]
          },
          {
            name: "Naruto POP! #1650",
            rarity: "Rare",
            releaseDate: "2025-10-02",
            imageLocalPath: asset("/assets/items/funko-naruto-1650.png"),
            officialProductPageUrl: "https://funko.com/",
            imageCreditText: "Funko official product catalog (reference)",
            brandName: "Funko Pop",
            itemAccentColor: "31 82% 60%",
            itemBgStyle: "sparkleGradient",
            tags: ["funko-pop", "anime", "naruto"]
          },
          {
            name: "Luffy POP! #1776",
            rarity: "Exclusive",
            releaseDate: "2025-10-02",
            imageLocalPath: asset("/assets/items/funko-luffy-1776.png"),
            officialProductPageUrl: "https://funko.com/",
            imageCreditText: "Funko official product catalog (reference)",
            brandName: "Funko Pop",
            itemAccentColor: "355 73% 63%",
            itemBgStyle: "sparkleGradient",
            tags: ["funko-pop", "anime", "one-piece", "exclusive"]
          },
          {
            name: "Tanjiro POP! #1821",
            rarity: "Limited",
            releaseDate: "2025-10-02",
            imageLocalPath: asset("/assets/items/funko-tanjiro-1821.png"),
            officialProductPageUrl: "https://funko.com/",
            imageCreditText: "Funko official product catalog (reference)",
            brandName: "Funko Pop",
            itemAccentColor: "157 44% 48%",
            itemBgStyle: "forestPaper",
            tags: ["funko-pop", "anime", "demon-slayer"]
          }
        ]
      }
    ]
  }
];


