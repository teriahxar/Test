"use client";

import Link from "next/link";
import { Sparkles, TrendingDown, TrendingUp } from "lucide-react";
import type { DashboardItem } from "@/lib/types";
import { formatPercent } from "@/lib/utils";
import { useToastStore } from "@/lib/stores/toast-store";
import { useWatchlistStore } from "@/lib/stores/watchlist-store";
import { universeItemHref } from "@/lib/routing";
import { ItemImageFallback } from "@/components/item-image";
import { RarityBadge } from "@/components/rarity-badge";
import { ValuePill } from "@/components/value-pill";
import { WatchlistButton } from "@/components/watchlist-button";

export function ItemCard({ item, compact = false }: { item: DashboardItem; compact?: boolean }) {
  const toggleItem = useWatchlistStore((state) => state.toggleItem);
  const watchlist = useWatchlistStore((state) => state.items);
  const push = useToastStore((state) => state.push);
  const isSaved = watchlist.some((entry) => entry.slug === item.slug);
  const TrendIcon = item.metrics.sevenDayChange >= 0 ? TrendingUp : TrendingDown;
  const isRare = item.rarity === "rare" || item.rarity === "ultra rare";
  return (
    <article className="surface-card group relative overflow-hidden rounded-[30px] p-5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_26px_56px_rgba(31,41,51,0.1)]">
      <div className="pointer-events-none absolute right-4 top-4 opacity-0 transition duration-300 group-hover:opacity-100">
        <Sparkles className="h-4 w-4 text-[#9ebbe3]" />
      </div>
      <Link href={universeItemHref(item.release.universe.slug, item.slug)} className="block overflow-hidden rounded-[24px] border border-border/70 bg-[#f7fbff]">
        <div className={`relative w-full ${compact ? "h-40" : "h-56"}`}>
          <ItemImageFallback src={item.imageUrl} alt={item.name} fill showComingSoon className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
        </div>
      </Link>
      <div className="mt-4 space-y-3.5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <p className="font-display text-xl font-bold leading-tight">{item.name}</p>
              {isRare ? <Sparkles className="h-3.5 w-3.5 text-[#b6a7ef]" /> : null}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{item.release.name}</p>
          </div>
          <RarityBadge rarity={item.rarity} />
        </div>

        <div className="flex items-center justify-between gap-3">
          <ValuePill value={item.metrics.estimatedValue} confidence={item.metrics.confidence} />
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
              item.metrics.sevenDayChange >= 0 ? "bg-[#eaf6ff] text-[#4f7eaa]" : "bg-[#f2f4f7] text-[#65758a]"
            }`}
          >
            <TrendIcon className="h-3.5 w-3.5" />
            {formatPercent(item.metrics.sevenDayChange)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Estimated value</p>
          <WatchlistButton
            saved={isSaved}
            onClick={() => {
              toggleItem({
                slug: item.slug,
                name: item.name,
                imageUrl: item.imageUrl,
                universeSlug: item.release.universe.slug,
                releaseSlug: item.release.slug,
                estimatedValue: item.metrics.estimatedValue,
                heat: item.metrics.marketHeat,
                sparkline: item.metrics.sparkline,
                alert: {}
              });
              push({
                title: isSaved ? "Removed from watchlist" : "Saved to watchlist",
                description: item.name
              });
            }}
          />
        </div>
      </div>
    </article>
  );
}
