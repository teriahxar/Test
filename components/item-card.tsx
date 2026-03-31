"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import type { DashboardItem } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { useToastStore } from "@/lib/stores/toast-store";
import { useWatchlistStore } from "@/lib/stores/watchlist-store";
import { universeItemHref } from "@/lib/routing";
import { ItemImageFallback } from "@/components/item-image";

export function ItemCard({ item, compact = false }: { item: DashboardItem; compact?: boolean }) {
  const toggleItem = useWatchlistStore((state) => state.toggleItem);
  const watchlist = useWatchlistStore((state) => state.items);
  const push = useToastStore((state) => state.push);
  const isSaved = watchlist.some((entry) => entry.slug === item.slug);
  const ebayHref = `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(item.name)}`;

  return (
    <article className="group rounded-[16px] border border-[#E8E0D4] bg-[#FFFCF8] p-3 transition hover:border-[#8B6F47]">
      <div className="relative">
        <Link href={universeItemHref(item.release.universe.slug, item.slug)} className="block">
          <div className={`relative overflow-hidden rounded-[12px] border border-[#E8E0D4] bg-[#FAF7F2] ${compact ? "h-44" : "h-56"}`}>
            <ItemImageFallback src={item.imageUrl} alt={item.name} fill className="object-cover" />
          </div>
        </Link>
        <button
          type="button"
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
          aria-label={isSaved ? "Remove from watchlist" : "Save to watchlist"}
          className={`absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#E8E0D4] bg-[#FFFCF8] text-[#8B6F47] transition ${
            isSaved ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        >
          <Heart className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
        </button>
      </div>

      <div className="space-y-3 px-1 pb-1 pt-4">
        <Link href={universeItemHref(item.release.universe.slug, item.slug)} className="block">
          <h3 className="font-display text-xl font-semibold leading-tight text-[#2C2418]">{item.name}</h3>
        </Link>
        <p className="text-base font-medium text-[#5D554D]">{formatCurrency(item.metrics.estimatedValue)}</p>
        <Link
          href={ebayHref}
          target="_blank"
          className="inline-flex items-center rounded-full border border-[#C4A882] px-3 py-1.5 text-[12px] font-medium text-[#8B6F47] transition hover:bg-[#F5EDE0]"
        >
          Find it →
        </Link>
      </div>
    </article>
  );
}
