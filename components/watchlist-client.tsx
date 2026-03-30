"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useWatchlistStore } from "@/lib/stores/watchlist-store";
import { universeItemHref } from "@/lib/routing";
import { formatCurrency } from "@/lib/utils";
import { ItemImageFallback } from "@/components/item-image";
import { Input } from "@/components/ui/input";
import { MarketHeatBadge } from "@/components/market-heat-badge";
import { SparklineMini } from "@/components/sparkline-mini";
import { SparkleButton } from "@/components/sparkle-button";

export function WatchlistClient() {
  const items = useWatchlistStore((state) => state.items);
  const removeItem = useWatchlistStore((state) => state.removeItem);
  const updateAlert = useWatchlistStore((state) => state.updateAlert);

  if (!items.length) {
    return (
      <div className="surface-card rounded-[30px] p-10 text-center">
        <p className="font-display text-3xl font-semibold text-[#2e2a26]">Your watchlist is still waiting for its first piece.</p>
        <p className="mt-2 text-[#5d554d]">Save any collectible to keep value notes and alert ranges close by.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.slug} className="surface-card grid gap-4 rounded-[28px] p-5 lg:grid-cols-[1.5fr_0.8fr_1fr_auto]">
          <Link href={universeItemHref(item.universeSlug, item.slug)} className="flex items-center gap-4">
            <div className="relative h-24 w-24 overflow-hidden rounded-[18px] border border-[#d6c9b5] bg-[#fffdf9]">
              <ItemImageFallback src={item.imageUrl} alt={item.name} fill className="object-cover" />
            </div>
            <div>
              <p className="font-display text-2xl font-semibold text-[#2e2a26]">{item.name}</p>
              <p className="mt-1 text-sm text-[#5d554d]">
                {item.universeSlug} · {item.releaseSlug}
              </p>
              <div className="mt-2">
                <MarketHeatBadge heat={item.heat} />
              </div>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <SparklineMini data={item.sparkline} />
            <div>
              <p className="text-sm text-[#8f7661]">Current estimate</p>
              <p className="text-2xl font-semibold text-[#2e2a26]">{formatCurrency(item.estimatedValue)}</p>
            </div>
          </div>
          <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-1">
            <Input
              aria-label={`Alert below value for ${item.name}`}
              placeholder="Alert below"
              defaultValue={item.alert.below?.toString() ?? ""}
              className="h-11 bg-[#fffdf9]"
              onBlur={(event) =>
                updateAlert(item.slug, {
                  ...item.alert,
                  below: event.target.value ? Number(event.target.value) : undefined
                })
              }
            />
            <Input
              aria-label={`Alert above value for ${item.name}`}
              placeholder="Alert above"
              defaultValue={item.alert.above?.toString() ?? ""}
              className="h-11 bg-[#fffdf9]"
              onBlur={(event) =>
                updateAlert(item.slug, {
                  ...item.alert,
                  above: event.target.value ? Number(event.target.value) : undefined
                })
              }
            />
          </div>
          <SparkleButton variant="ghost" size="icon" onClick={() => removeItem(item.slug)} aria-label={`Remove ${item.name}`}>
            <Trash2 className="h-4 w-4" />
          </SparkleButton>
        </div>
      ))}
    </div>
  );
}
