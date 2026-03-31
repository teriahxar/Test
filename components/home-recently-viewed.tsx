"use client";

import Link from "next/link";
import { STATIC_DB } from "@/lib/static-data";
import { universeItemHref } from "@/lib/routing";
import { useWatchlistStore } from "@/lib/stores/watchlist-store";
import { ItemImageFallback } from "@/components/item-image";

export function HomeRecentlyViewed() {
  const slugs = useWatchlistStore((state) => state.recentlyViewed);
  const items = slugs
    .map((slug) => {
      const item = STATIC_DB.items.find((entry) => entry.slug === slug);
      if (!item) return null;
      const release = STATIC_DB.releases.find((entry) => entry.id === item.releaseId);
      return release ? { item, release } : null;
    })
    .filter(Boolean)
    .slice(0, 3) as Array<{ item: (typeof STATIC_DB.items)[number]; release: (typeof STATIC_DB.releases)[number] }>;

  if (!items.length) {
    return null;
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="section-label sparkle-accent">Recently checked</div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {items.map(({ item, release }) => (
          <Link
            key={item.slug}
            href={universeItemHref(release.universe.slug, item.slug)}
            className="panel-card rounded-[20px] p-4 transition hover:-translate-y-0.5"
          >
            <div className="panel-frame relative h-40 overflow-hidden">
              <ItemImageFallback src={item.imageLocalPath} alt={item.name} fill className="h-full w-full object-cover" />
            </div>
            <p className="mt-4 font-display text-xl font-semibold text-[#2e2a26]">{item.name}</p>
            <p className="mt-1 text-sm text-[#5d554d]">{release.name}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
