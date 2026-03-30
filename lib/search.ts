import { STATIC_DB } from "@/lib/static-data";

function normalize(value: string) {
  return value.toLowerCase().trim();
}

export function searchCatalog(query: string, limit = 6) {
  const normalizedQuery = normalize(query);

  if (!normalizedQuery) {
    return [];
  }

  return STATIC_DB.items
    .map((item) => {
      const release = STATIC_DB.releases.find((entry) => entry.id === item.releaseId);
      const universeSlug = release?.universe.slug ?? "pop-mart";
      const haystack = [
        item.name,
        item.brandName,
        release?.name ?? "",
        release?.universe.name ?? "",
        item.tags
      ]
        .join(" ")
        .toLowerCase();

      return { item, release, universeSlug, haystack };
    })
    .filter((entry) => entry.haystack.includes(normalizedQuery))
    .slice(0, limit)
    .map(({ item, release, universeSlug }) => ({
      ...item,
      universeSlug,
      releaseName: release?.name ?? "",
      universeName: release?.universe.name ?? ""
    }));
}
