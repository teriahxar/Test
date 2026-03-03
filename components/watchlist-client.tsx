"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useWatchlistStore } from "@/lib/stores/watchlist-store";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SparklineMini } from "@/components/sparkline-mini";

export function WatchlistClient() {
  const items = useWatchlistStore((state) => state.items);
  const removeItem = useWatchlistStore((state) => state.removeItem);
  const updateAlert = useWatchlistStore((state) => state.updateAlert);

  if (!items.length) {
    return (
      <div className="rounded-[30px] border border-dashed border-border bg-card/70 p-10 text-center text-muted-foreground">
        Your watchlist is empty. Add items from any dashboard or detail page.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item.slug}
          className="grid gap-4 rounded-[28px] border border-border bg-card/80 p-5 shadow-vault lg:grid-cols-[1.5fr_0.8fr_0.9fr_auto]"
        >
          <Link href={`/item/${item.slug}`} className="flex items-center gap-4">
            <img src={item.imageUrl} alt={item.name} className="h-24 w-24 rounded-[18px] object-cover" />
            <div>
              <p className="font-display text-xl font-semibold">{item.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {item.universeSlug} · {item.releaseSlug}
              </p>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <SparklineMini data={item.sparkline} />
            <div>
              <p className="text-sm text-muted-foreground">Current value</p>
              <p className="font-display text-2xl font-semibold">{formatCurrency(item.estimatedValue)}</p>
            </div>
          </div>
          <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-1">
            <Input
              aria-label={`Alert below value for ${item.name}`}
              placeholder="Below"
              defaultValue={item.alert.below?.toString() ?? ""}
              onBlur={(event) =>
                updateAlert(item.slug, {
                  ...item.alert,
                  below: event.target.value ? Number(event.target.value) : undefined
                })
              }
            />
            <Input
              aria-label={`Alert above value for ${item.name}`}
              placeholder="Above"
              defaultValue={item.alert.above?.toString() ?? ""}
              onBlur={(event) =>
                updateAlert(item.slug, {
                  ...item.alert,
                  above: event.target.value ? Number(event.target.value) : undefined
                })
              }
            />
          </div>
          <Button variant="ghost" size="icon" onClick={() => removeItem(item.slug)} aria-label={`Remove ${item.name}`}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}
