"use client";

import Link from "next/link";
import { useMemo } from "react";
import type { DashboardItem } from "@/lib/types";
import { useWatchlistStore } from "@/lib/stores/watchlist-store";

export function PersonalizedFeed({ items }: { items: DashboardItem[] }) {
  const watchlist = useWatchlistStore((state) => state.items);
  const recent = useWatchlistStore((state) => state.recentlyViewed);

  const feedItems = useMemo(() => {
    const slugs = [...watchlist.map((entry) => entry.slug), ...recent];
    return [...new Set(slugs)]
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
        <h2 className="mt-2 font-display text-2xl font-semibold">Saved and recently viewed in this universe</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {feedItems.map((item) => (
          <Link
            key={item.id}
            href={`/item/${item.slug}`}
            className="rounded-[26px] border border-border bg-card/80 p-4 shadow-vault transition-transform hover:-translate-y-1"
          >
            <img src={item.imageUrl} alt={item.name} className="h-40 w-full rounded-[20px] object-cover" />
            <p className="mt-3 font-display text-lg font-semibold">{item.name}</p>
            <p className="text-sm text-muted-foreground">{item.release.name}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
