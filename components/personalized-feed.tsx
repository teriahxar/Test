"use client";

import Link from "next/link";
import { useMemo } from "react";
import type { DashboardItem } from "@/lib/types";
import { universeItemHref } from "@/lib/routing";
import { useWatchlistStore } from "@/lib/stores/watchlist-store";
import { ItemImageFallback } from "@/components/item-image";

export function PersonalizedFeed({ items }: { items: DashboardItem[] }) {
  const watchlist = useWatchlistStore((state) => state.items);
  const recent = useWatchlistStore((state) => state.recentlyViewed);

  const feedItems = useMemo(() => {
    const slugs = [...new Set([...watchlist.map((entry) => entry.slug), ...recent])];
    return slugs
      .map((slug) => items.find((item) => item.slug === slug))
      .filter(Boolean)
      .slice(0, 4) as DashboardItem[];
  }, [items, recent, watchlist]);

  if (!feedItems.length) {
    return null;
  }

  return (
    <section className="space-y-4">
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Your feed</p>
        <h2 className="mt-2 font-display text-2xl font-semibold">Saved and revisited picks</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {feedItems.map((item) => (
          <Link key={item.id} href={universeItemHref(item.release.universe.slug, item.slug)} className="sticker-card rounded-[28px] p-4 transition-transform hover:-translate-y-1">
            <div className="relative h-44 w-full overflow-hidden rounded-[22px] bg-white/70">
              <ItemImageFallback src={item.imageUrl} alt={item.name} fill className="object-cover" />
            </div>
            <p className="mt-3 font-display text-lg font-semibold">{item.name}</p>
            <p className="text-sm text-muted-foreground">{item.release.name}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
