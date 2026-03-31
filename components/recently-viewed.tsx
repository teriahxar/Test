"use client";

import Link from "next/link";
import { useMemo } from "react";
import type { DashboardItem } from "@/lib/types";
import { universeItemHref } from "@/lib/routing";
import { useWatchlistStore } from "@/lib/stores/watchlist-store";
import { ItemImageFallback } from "@/components/item-image";
import { MarketHeatBadge } from "@/components/market-heat-badge";

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
        <p className="section-label">Recently viewed</p>
        <h2 className="mt-4 font-display text-3xl font-semibold text-[#2e2a26]">Pieces worth another look</h2>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {recentItems.map((item) => (
          <Link
            key={item.id}
            href={universeItemHref(item.release.universe.slug, item.slug)}
            className="panel-card min-w-[240px] rounded-[20px] p-3"
          >
            <div className="panel-frame relative h-40 w-full overflow-hidden">
              <ItemImageFallback src={item.imageUrl} alt={item.name} fill className="h-full w-full object-cover" />
            </div>
            <div className="mt-3 flex items-start justify-between gap-2">
              <div>
                <p className="font-display text-lg font-semibold text-[#2e2a26]">{item.name}</p>
                <p className="text-sm text-[#5d554d]">{item.release.name}</p>
              </div>
              <MarketHeatBadge heat={item.metrics.marketHeat} />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
