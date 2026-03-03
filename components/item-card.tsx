"use client";

import Link from "next/link";
import { Heart, TrendingDown, TrendingUp } from "lucide-react";
import type { DashboardItem } from "@/lib/types";
import { formatPercent } from "@/lib/utils";
import { useWatchlistStore } from "@/lib/stores/watchlist-store";
import { useToastStore } from "@/lib/stores/toast-store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RarityBadge } from "@/components/rarity-badge";
import { SparklineMini } from "@/components/sparkline-mini";
import { ValuePill } from "@/components/value-pill";

export function ItemCard({ item, compact = false }: { item: DashboardItem; compact?: boolean }) {
  const toggleItem = useWatchlistStore((state) => state.toggleItem);
  const watchlist = useWatchlistStore((state) => state.items);
  const push = useToastStore((state) => state.push);
  const isSaved = watchlist.some((entry) => entry.slug === item.slug);
  const TrendIcon = item.metrics.sevenDayChange >= 0 ? TrendingUp : TrendingDown;

  return (
    <Card className="group overflow-hidden border-white/60 bg-card/80 p-4 transition-all duration-300 ease-vault hover:-translate-y-1">
      <div className="space-y-4">
        <Link href={`/item/${item.slug}`} className="block overflow-hidden rounded-[22px] bg-muted">
          <img
            src={item.imageUrl}
            alt={item.name}
            className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
              compact ? "h-36" : "h-52"
            }`}
          />
        </Link>
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-display text-lg font-semibold leading-tight">{item.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {item.release.name} · {new Date(item.release.releaseDate).getFullYear()}
              </p>
            </div>
            <RarityBadge rarity={item.rarity} />
          </div>
          <div className="flex items-center justify-between gap-3">
            <ValuePill value={item.metrics.estimatedValue} confidence={item.metrics.confidence} />
            <div className="text-right">
              <div
                className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
                  item.metrics.sevenDayChange >= 0
                    ? "bg-emerald-500/10 text-emerald-700"
                    : "bg-rose-500/10 text-rose-700"
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
          <Button
            variant={isSaved ? "secondary" : "outline"}
            className="w-full"
            onClick={() => {
              toggleItem({
                slug: item.slug,
                name: item.name,
                imageUrl: item.imageUrl,
                universeSlug: item.release.universe.slug,
                releaseSlug: item.release.slug,
                estimatedValue: item.metrics.estimatedValue,
                sparkline: item.metrics.sparkline,
                alert: {}
              });
              push({
                title: isSaved ? "Removed from watchlist" : "Added to watchlist",
                description: item.name
              });
            }}
          >
            <Heart className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
            {isSaved ? "Watching" : "Add to Watchlist"}
          </Button>
        </div>
      </div>
    </Card>
  );
}
