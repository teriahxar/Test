"use client";

import { Copy, Share2 } from "lucide-react";
import { useToastStore } from "@/lib/stores/toast-store";
import { formatCurrency } from "@/lib/utils";
import type { DashboardItem } from "@/lib/types";
import { MarketHeatBadge } from "@/components/market-heat-badge";
import { SparkleButton } from "@/components/sparkle-button";

export function ShareableItemCard({ item }: { item: DashboardItem }) {
  const push = useToastStore((state) => state.push);

  return (
    <div className="sticker-card relative overflow-hidden rounded-[32px] p-5">
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-r from-primary/20 via-accent/10 to-secondary/20" />
      <div className="relative space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Shareable card</p>
            <h3 className="mt-2 font-display text-2xl font-semibold">{item.name}</h3>
            <p className="text-sm text-muted-foreground">{item.release.name}</p>
          </div>
          <Share2 className="h-5 w-5 text-primary" />
        </div>
        <div className="rounded-[24px] bg-white/75 p-4">
          <div className="flex items-center justify-between gap-4">
            <span className="font-display text-3xl font-semibold">{formatCurrency(item.metrics.estimatedValue)}</span>
            <MarketHeatBadge heat={item.metrics.marketHeat} />
          </div>
          <p className="mt-2 text-sm text-muted-foreground">Cute social-ready snapshot for collections, stories, or group chats.</p>
        </div>
        <SparkleButton
          variant="secondary"
          onClick={async () => {
            await navigator.clipboard.writeText(`${window.location.origin}/item/${item.slug}`);
            push({ title: "Link copied", description: "Shareable item card URL copied ✨" });
          }}
        >
          <Copy className="h-4 w-4" />
          Copy share link
        </SparkleButton>
      </div>
    </div>
  );
}
