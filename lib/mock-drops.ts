export type UpcomingDrop = {
  id: string;
  universeSlug: string;
  releaseName: string;
  itemName: string;
  date: string;
  note: string;
};

export const UPCOMING_DROPS: UpcomingDrop[] = [
  { id: "drop-1", universeSlug: "pop-mart", releaseName: "Labubu Forest Party", itemName: "Labubu Morning Dew", date: "2026-03-16", note: "Online restock window" },
  { id: "drop-2", universeSlug: "pop-mart", releaseName: "Labubu Forest Party", itemName: "Labubu Clover Parade", date: "2026-03-29", note: "Regional surprise drop" },
  { id: "drop-3", universeSlug: "pop-mart", releaseName: "Hirono Garden Daydream", itemName: "Hirono Rain Letter", date: "2026-04-06", note: "Limited color variant" },
  { id: "drop-4", universeSlug: "pop-mart", releaseName: "Hirono Garden Daydream", itemName: "Hirono Twilight Seed", date: "2026-04-21", note: "Collector week launch" },
  { id: "drop-5", universeSlug: "pop-mart", releaseName: "Mokoko Sweet Bloom", itemName: "Mokoko Milk Tea Date", date: "2026-05-03", note: "Bundle release" },
  { id: "drop-6", universeSlug: "pop-mart", releaseName: "Mokoko Sweet Bloom", itemName: "Mokoko Honey Jam", date: "2026-05-18", note: "Premium box restock" },
  { id: "drop-7", universeSlug: "calico-critters", releaseName: "Baby Treat Cart", itemName: "Baby Strawberry Sundae Set", date: "2026-03-12", note: "Collector club pre-order" },
  { id: "drop-8", universeSlug: "calico-critters", releaseName: "Baby Treat Cart", itemName: "Baby Vanilla Picnic Cup", date: "2026-03-26", note: "Seasonal mini set" },
  { id: "drop-9", universeSlug: "calico-critters", releaseName: "Flora Rabbit Bakery Set", itemName: "Flora Rabbit Cherry Tart", date: "2026-04-10", note: "Spring bakery edition" },
  { id: "drop-10", universeSlug: "calico-critters", releaseName: "Flora Rabbit Bakery Set", itemName: "Flora Rabbit Butter Loaf", date: "2026-04-24", note: "Storefront restock" },
  { id: "drop-11", universeSlug: "calico-critters", releaseName: "Maple Cat Forest Swing", itemName: "Maple Cat Lantern Path", date: "2026-05-08", note: "Forest evening variant" },
  { id: "drop-12", universeSlug: "calico-critters", releaseName: "Maple Cat Forest Swing", itemName: "Maple Cat Sunbeam Bridge", date: "2026-05-25", note: "Club-exclusive launch" }
];
