"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, TrendingDown, TrendingUp } from "lucide-react";
import type { DashboardItem } from "@/lib/types";
import { formatPercent } from "@/lib/utils";
import { useWatchlistStore } from "@/lib/stores/watchlist-store";
import { useToastStore } from "@/lib/stores/toast-store";
import { MarketHeatBadge } from "@/components/market-heat-badge";
import { RarityBadge } from "@/components/rarity-badge";
import { SparkleButton } from "@/components/sparkle-button";
import { SparklineMini } from "@/components/sparkline-mini";
import { StickerPack } from "@/components/sticker-pack";
import { ValuePill } from "@/components/value-pill";

export function ItemCard({ item, compact = false }: { item: DashboardItem; compact?: boolean }) {
  const toggleItem = useWatchlistStore((state) => state.toggleItem);
  const watchlist = useWatchlistStore((state) => state.items);
  const push = useToastStore((state) => state.push);
  const isSaved = watchlist.some((entry) => entry.slug === item.slug);
  const TrendIcon = item.metrics.sevenDayChange >= 0 ? TrendingUp : TrendingDown;
  const tagList = item.tags.split(",").slice(0, 2);

  return (
    <article className="sticker-card group relative overflow-hidden rounded-[30px] p-4 transition-all duration-300 hover:-translate-y-1">
      <StickerPack names={["heart", "sparkle", "star", "cloud"]} tone="white" className="opacity-55" />
      <div className="relative space-y-4">
        <Link href={`/item/${item.slug}`} className="block overflow-hidden rounded-[24px] bg-white/70">
          <div className={`relative w-full ${compact ? "h-44" : "h-56"}`}>
            <Image src={item.imageUrl} alt={item.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>
        </Link>
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-display text-xl font-semibold leading-tight">{item.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">{item.release.name}</p>
            </div>
            <RarityBadge rarity={item.rarity} />
          </div>
          <div className="flex flex-wrap gap-2">
            {tagList.map((tag) => (
              <span key={tag} className="rounded-full bg-secondary/70 px-3 py-1 text-xs font-semibold text-secondary-foreground">
                {tag.trim()}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between gap-3">
            <ValuePill value={item.metrics.estimatedValue} confidence={item.metrics.confidence} />
            <div className="text-right">
              <div
                className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
                  item.metrics.sevenDayChange >= 0 ? "bg-emerald-500/12 text-emerald-700" : "bg-rose-500/12 text-rose-700"
                }`}
              >
                <TrendIcon className="h-3.5 w-3.5" />
                {formatPercent(item.metrics.sevenDayChange)}
              </div>
              <div className="mt-2 flex justify-end">
                <SparklineMini data={item.metrics.sparkline} />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between gap-3">
            <MarketHeatBadge heat={item.metrics.marketHeat} />
            <SparkleButton
              variant={isSaved ? "secondary" : "outline"}
              className="h-10 px-4"
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
                  title: isSaved ? "Removed from watchlist" : "Saved! We’ll keep an eye out ✨",
                  description: item.name
                });
              }}
            >
              <Heart className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
              {isSaved ? "Watching" : "Watch"}
            </SparkleButton>
          </div>
        </div>
      </div>
    </article>
  );
}
