export const COLLECTOR_RANKS = [
  { name: "Sprout Collector", minXp: 0 },
  { name: "Charm Scout", minXp: 120 },
  { name: "Treasure Keeper", minXp: 320 },
  { name: "Lucky Finder", minXp: 620 },
  { name: "Starlit Curator", minXp: 980 },
  { name: "Mythic Collector", minXp: 1500 }
] as const;

export function getCollectorRank(xp: number) {
  return [...COLLECTOR_RANKS].reverse().find((rank) => xp >= rank.minXp) ?? COLLECTOR_RANKS[0];
}

export function getNextCollectorRank(xp: number) {
  return COLLECTOR_RANKS.find((rank) => xp < rank.minXp);
}
