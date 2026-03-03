"use client";

import Link from "next/link";
import { useMemo } from "react";
import type { DashboardItem } from "@/lib/types";
import { useWatchlistStore } from "@/lib/stores/watchlist-store";

export function RecentlyViewed({ items }: { items: DashboardItem[] }) {
  const slugs = useWatchlistStore((state) => state.recentlyViewed);
  const recentItems = useMemo(
    () => slugs.map((slug) => items.find((item) => item.slug === slug)).filter(Boolean) as DashboardItem[],
    [items, slugs]
  );

  if (!recentItems.length) {
    return null;
  }

  return (
    <section className="space-y-4">
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Recently viewed</p>
        <h2 className="mt-2 font-display text-2xl font-semibold">Pick up where you left off</h2>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {recentItems.map((item) => (
          <Link
            key={item.id}
            href={`/item/${item.slug}`}
            className="min-w-[220px] rounded-[24px] border border-border bg-card/80 p-3 shadow-vault"
          >
            <img src={item.imageUrl} alt={item.name} className="h-36 w-full rounded-[18px] object-cover" />
            <p className="mt-3 font-medium">{item.name}</p>
            <p className="text-sm text-muted-foreground">{item.release.name}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
