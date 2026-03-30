"use client";

import Link from "next/link";
import { BookmarkPlus, TrendingDown, TrendingUp } from "lucide-react";
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

  return (
    <article className="group relative overflow-hidden rounded-[18px] border border-[#d6c9b5] bg-[#faf7f2] p-4 shadow-[0_2px_8px_rgba(180,150,120,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_28px_rgba(132,108,84,0.12)]">
      <div className="absolute inset-x-0 top-0 h-20 bg-[radial-gradient(circle_at_top,rgba(232,196,186,0.18),transparent_65%)] opacity-80" aria-hidden />
      <Link href={universeItemHref(item.release.universe.slug, item.slug)} className="block">
        <div className={`relative overflow-hidden rounded-[16px] border border-[#d6c9b5] bg-[#fffdf9] ${compact ? "h-40" : "h-56"}`}>
          <ItemImageFallback
            src={item.imageUrl}
            alt={item.name}
            fill
            showComingSoon
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      </Link>

      <div className="mt-4 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-display text-[1.35rem] font-semibold leading-tight text-[#2e2a26]">{item.name}</p>
            <p className="mt-1 text-sm text-[#5d554d]">{item.release.name}</p>
          </div>
          <RarityBadge rarity={item.rarity} />
        </div>

        <div className="flex items-center justify-between gap-3">
          <ValuePill value={item.metrics.estimatedValue} confidence={item.metrics.confidence} />
          <span
            className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold shadow-[var(--shadow-soft)] ${
              item.metrics.sevenDayChange >= 0
                ? "border-[#c4cebe] bg-[#eef2e9] text-[#566452]"
                : "border-[#e8c4ba] bg-[#f5dfd5] text-[#8a5239]"
            }`}
          >
            <TrendIcon className="h-3.5 w-3.5" />
            {formatPercent(item.metrics.sevenDayChange)}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-[#e6dccd] pt-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8f7661]">Current value</p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-[#5d554d]">
              <BookmarkPlus className="h-3.5 w-3.5 text-[#d4854a]" />
              Save for alerts
            </p>
          </div>
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
