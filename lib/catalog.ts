export const IMAGE_ATTRIBUTION = [
  {
    label: "Pop Mart official site",
    url: "https://www.popmart.com/us"
  },
  {
    label: "Calico Critters official site",
    url: "https://calicocritters.com/en-us/"
  }
];

export const AUTHENTICITY_TIPS: Record<string, string[]> = {
  skullpanda: [
    "Check that the paint around the eyes stays crisp and symmetrical.",
    "Official boxes use dense matte stock with clean foil details, not fuzzy print.",
    "Base stamps should feel intentional, not soft or shallow."
  ],
  dimoo: [
    "Look for smooth gradient paint on the cheeks and hair swirls.",
    "Packaging windows should sit flush without cloudy glue marks.",
    "Tiny accessory charms should match the release color story exactly."
  ],
  "baby-series": [
    "Fabric bows and tiny outfit details should be neatly stitched.",
    "Official flocking feels soft and even, not patchy.",
    "Printed insert art should have warm tones, not washed-out beige."
  ],
  "village-garden": [
    "Florals and lattice details should be sharply molded.",
    "Wood-tone parts should not feel overly glossy.",
    "Paper accessories should align cleanly without crooked folds."
  ],
  "retro-handhelds": [
    "Button legends should be centered and consistent in size.",
    "Transparent shells should stay clear with no smoky fogging.",
    "Back labels should use crisp micro text instead of blurred gray blocks."
  ],
  "designer-vinyl": [
    "The vinyl finish should be smooth with no gritty overspray.",
    "Signature or stamp placement should match the official release notes.",
    "Edges around horns and ears should remain defined, not melted."
  ]
};

export const STICKER_SETS: Record<string, string[]> = {
  sparklepop: ["heart", "star", "sparkle", "cloud"],
  moonparade: ["moon", "sparkle", "cross", "heart"],
  ginghamgarden: ["bow", "flower", "berry", "leaf"],
  pastelplayroom: ["cloud", "heart", "bow", "flower"],
  pixelparty: ["pixel", "spark", "star", "bolt"],
  glossghost: ["drop", "sparkle", "star", "swirl"]
};

export const SEEDED_UNIVERSES = [
  {
    name: "Pop Mart",
    slug: "pop-mart",
    description: "Glossy blind-box energy, fast-moving resale swings, and bold character-driven drops.",
    portalCopy: "Candy-gloss figures, chase pulls, and sparkly resale drama.",
    releases: [
      {
        name: "Skullpanda",
        slug: "skullpanda",
        releaseDate: "2025-07-18",
        stickerSet: "moonparade",
        items: [
          { name: "Skullpanda Moonlit Waltz", rarity: "Ultra Rare", imageUrl: "/assets/items/skullpanda-moon.svg", tags: ["moon", "goth-cute", "mask"] },
          { name: "Skullpanda Velvet Voltage", rarity: "Rare", imageUrl: "/assets/items/skullpanda-velvet.svg", tags: ["pink", "fashion", "neon"] },
          { name: "Skullpanda Mirror Circus", rarity: "Secret", imageUrl: "/assets/items/skullpanda-circus.svg", tags: ["secret", "circus", "chrome"] }
        ]
      },
      {
        name: "Dimoo",
        slug: "dimoo",
        releaseDate: "2025-10-04",
        stickerSet: "sparklepop",
        items: [
          { name: "Dimoo Bubble Transit", rarity: "Rare", imageUrl: "/assets/items/dimoo-bubble.svg", tags: ["bubble", "dreamy", "blue"] },
          { name: "Dimoo Cloud Postcard", rarity: "Common", imageUrl: "/assets/items/dimoo-cloud.svg", tags: ["cloud", "postcard", "soft"] },
          { name: "Dimoo Nightglow Parade", rarity: "Chase", imageUrl: "/assets/items/dimoo-nightglow.svg", tags: ["glow", "parade", "chase"] }
        ]
      }
    ]
  },
  {
    name: "Calico Critters",
    slug: "calico-critters",
    description: "Cozy sets, soft textures, cottagecore charm, and unexpectedly competitive collector demand.",
    portalCopy: "Pastel playrooms, gingham details, and tiny furniture fever.",
    releases: [
      {
        name: "Baby Series",
        slug: "baby-series",
        releaseDate: "2025-05-10",
        stickerSet: "pastelplayroom",
        items: [
          { name: "Baby Star Carousel", rarity: "Common", imageUrl: "/assets/items/baby-carousel.svg", tags: ["carousel", "baby", "nursery"] },
          { name: "Baby Garden Parade", rarity: "Rare", imageUrl: "/assets/items/baby-garden.svg", tags: ["garden", "spring", "wagon"] },
          { name: "Baby Picnic Twins", rarity: "Limited", imageUrl: "/assets/items/baby-picnic.svg", tags: ["picnic", "twins", "limited"] }
        ]
      },
      {
        name: "Village Garden",
        slug: "village-garden",
        releaseDate: "2025-09-21",
        stickerSet: "ginghamgarden",
        items: [
          { name: "Village Garden Tea Cart", rarity: "Rare", imageUrl: "/assets/items/garden-teacart.svg", tags: ["tea", "cart", "floral"] },
          { name: "Village Garden Hedge Set", rarity: "Common", imageUrl: "/assets/items/garden-hedge.svg", tags: ["hedge", "patio", "green"] },
          { name: "Village Garden Lantern Arch", rarity: "Limited", imageUrl: "/assets/items/garden-lantern.svg", tags: ["lantern", "arch", "evening"] }
        ]
      }
    ]
  },
  {
    name: "Other",
    slug: "other",
    description: "A rotating mix of pastel-tech collectibles, designer vinyl, and niche modern display pieces.",
    portalCopy: "Indie shelf candy, glossy vinyl, and tiny status flexes.",
    releases: [
      {
        name: "Retro Handhelds",
        slug: "retro-handhelds",
        releaseDate: "2025-08-14",
        stickerSet: "pixelparty",
        items: [
          { name: "Pixel Pocket Smoke", rarity: "Rare", imageUrl: "/assets/items/pixel-smoke.svg", tags: ["pixel", "smoke", "handheld"] },
          { name: "Pixel Pocket Lime", rarity: "Common", imageUrl: "/assets/items/pixel-lime.svg", tags: ["lime", "transparent", "retro"] },
          { name: "Pixel Pocket Aurora", rarity: "Limited", imageUrl: "/assets/items/pixel-aurora.svg", tags: ["aurora", "iridescent", "drop"] }
        ]
      },
      {
        name: "Designer Vinyl",
        slug: "designer-vinyl",
        releaseDate: "2025-11-29",
        stickerSet: "glossghost",
        items: [
          { name: "Mono Ghost Variant", rarity: "Chase", imageUrl: "/assets/items/ghost-variant.svg", tags: ["ghost", "chase", "gloss"] },
          { name: "Mono Ghost Ivory", rarity: "Common", imageUrl: "/assets/items/ghost-ivory.svg", tags: ["ivory", "soft", "vinyl"] },
          { name: "Mono Ghost Chroma", rarity: "Rare", imageUrl: "/assets/items/ghost-chroma.svg", tags: ["chroma", "gradient", "display"] }
        ]
      }
    ]
  }
] as const;
