"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useWatchlistStore } from "@/lib/stores/watchlist-store";
import { formatCurrency } from "@/lib/utils";
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
      <div className="sticker-card rounded-[30px] p-10 text-center">
        <p className="font-display text-2xl font-semibold">Your watchlist is empty, which feels suspiciously calm.</p>
        <p className="mt-2 text-muted-foreground">Tap the heart on any collectible card and the dopamine loop starts immediately.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.slug} className="sticker-card grid gap-4 rounded-[30px] p-5 lg:grid-cols-[1.5fr_0.7fr_1fr_auto]">
          <Link href={`/item/${item.slug}`} className="flex items-center gap-4">
            <div className="relative h-24 w-24 overflow-hidden rounded-[20px] bg-white/70">
              <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
            </div>
            <div>
              <p className="font-display text-xl font-semibold">{item.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">
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
              <p className="text-sm text-muted-foreground">Current estimate</p>
              <p className="font-display text-2xl font-semibold">{formatCurrency(item.estimatedValue)}</p>
            </div>
          </div>
          <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-1">
            <Input
              aria-label={`Alert below value for ${item.name}`}
              placeholder="Alert below"
              defaultValue={item.alert.below?.toString() ?? ""}
              className="h-11 bg-white/80"
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
              className="h-11 bg-white/80"
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
