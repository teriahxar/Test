export type Condition = "MINT" | "EXCELLENT" | "GOOD" | "FAIR";

export type Universe = {
  id: string;
  name: string;
  slug: string;
  description: string;
};

export type Release = {
  id: string;
  universeId: string;
  name: string;
  slug: string;
  releaseDate: string;
  themeAccent?: string;
  themeBgStyle?: string;
  stickerSet?: string;
  universe: Universe;
};

export type Item = {
  id: string;
  releaseId: string;
  name: string;
  slug: string;
  rarity: string;
  imageUrl: string;
  tags: string;
  createdAt: string;
};

export type PricePoint = {
  id: string;
  itemId: string;
  source: string;
  price: number;
  condition: Condition;
  timestamp: string;
};

export type Listing = {
  id: string;
  itemId: string;
  marketplace: string;
  price: number;
  condition: Condition;
  url: string;
  timestamp: string;
};
