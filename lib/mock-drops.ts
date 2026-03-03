export type UpcomingDrop = {
  id: string;
  universeSlug: string;
  releaseName: string;
  itemName: string;
  date: string;
  note: string;
};

export const UPCOMING_DROPS: UpcomingDrop[] = [
  { id: "drop-1", universeSlug: "pop-mart", releaseName: "Skullpanda", itemName: "Skullpanda Moonlit Encore", date: "2026-03-15", note: "Online restock window" },
  { id: "drop-2", universeSlug: "pop-mart", releaseName: "Dimoo", itemName: "Dimoo Cloud Sprint", date: "2026-03-19", note: "Retail exclusive colorway" },
  { id: "drop-3", universeSlug: "pop-mart", releaseName: "Hacipupu", itemName: "Hacipupu Arcade Edition", date: "2026-04-02", note: "Limited blind box launch" },
  { id: "drop-4", universeSlug: "pop-mart", releaseName: "Sweet Bean", itemName: "Sweet Bean Picnic Pair", date: "2026-04-19", note: "Bundle drop" },
  { id: "drop-5", universeSlug: "calico-critters", releaseName: "Baby Series", itemName: "Marshmallow Nursery Parade", date: "2026-03-12", note: "Collector club pre-order" },
  { id: "drop-6", universeSlug: "calico-critters", releaseName: "Village Garden", itemName: "Floral Tea Cart Set", date: "2026-03-27", note: "Spring seasonal release" },
  { id: "drop-7", universeSlug: "calico-critters", releaseName: "Town Fashions", itemName: "Clover Boutique Twins", date: "2026-04-08", note: "Mini accessory pack" },
  { id: "drop-8", universeSlug: "calico-critters", releaseName: "Forest Bakery", itemName: "Forest Bakery Oven Deluxe", date: "2026-04-22", note: "Flagship storefront set" },
  { id: "drop-9", universeSlug: "other", releaseName: "Retro Handhelds", itemName: "Pixel Pocket Smoke", date: "2026-03-10", note: "Charity raffle release" },
  { id: "drop-10", universeSlug: "other", releaseName: "Mini Bricks", itemName: "Skyline Capsule Tower", date: "2026-03-30", note: "Convention weekend exclusive" },
  { id: "drop-11", universeSlug: "other", releaseName: "Designer Vinyl", itemName: "Mono Ghost Variant", date: "2026-04-12", note: "Signed edition" },
  { id: "drop-12", universeSlug: "other", releaseName: "Trading Pins", itemName: "Neon Arcade Pin Set", date: "2026-04-25", note: "Serial-numbered release" }
];
