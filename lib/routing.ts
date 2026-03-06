export const UNIVERSE_ROUTE_MAP = {
  "pop-mart": "popmart",
  "calico-critters": "calico",
  pop: "pop"
} as const;

export const ROUTE_UNIVERSE_MAP = {
  popmart: "pop-mart",
  calico: "calico-critters",
  pop: "pop-mart"
} as const;

export function normalizeUniverseSlug(value?: string) {
  if (!value) {
    return value;
  }

  return ROUTE_UNIVERSE_MAP[value as keyof typeof ROUTE_UNIVERSE_MAP] ?? value;
}

export function universeHref(universeSlug: string) {
  const route = UNIVERSE_ROUTE_MAP[universeSlug as keyof typeof UNIVERSE_ROUTE_MAP];
  return route ? `/${route}` : `/${universeSlug}`;
}

export function universeItemHref(universeSlug: string, itemSlug: string) {
  return `${universeHref(universeSlug)}/items/${itemSlug}`;
}
