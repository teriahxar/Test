"use client";

import { useState } from "react";
import type { DashboardItem } from "@/lib/types";
import { useWatchlistStore } from "@/lib/stores/watchlist-store";
import { useToastStore } from "@/lib/stores/toast-store";
import { Input } from "@/components/ui/input";
import { SparkleButton } from "@/components/sparkle-button";

export function AlertForm({ item }: { item: DashboardItem }) {
  const watchlist = useWatchlistStore((state) => state.items);
  const toggleItem = useWatchlistStore((state) => state.toggleItem);
  const updateAlert = useWatchlistStore((state) => state.updateAlert);
  const push = useToastStore((state) => state.push);

  const existing = watchlist.find((entry) => entry.slug === item.slug);
  const [below, setBelow] = useState(existing?.alert.below?.toString() ?? "");
  const [above, setAbove] = useState(existing?.alert.above?.toString() ?? "");

  return (
    <div className="sticker-card rounded-[30px] p-5">
      <p className="font-display text-2xl font-semibold">Watchlist + alerts</p>
      <p className="mt-2 text-sm text-muted-foreground">Save local reminders for when this collectible gets extra tempting.</p>
      <div className="mt-5 grid gap-3">
        <Input placeholder="Alert me below..." value={below} onChange={(event) => setBelow(event.target.value)} className="h-12 bg-white/80" />
        <Input placeholder="Alert me above..." value={above} onChange={(event) => setAbove(event.target.value)} className="h-12 bg-white/80" />
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        <SparkleButton
          onClick={() => {
            const nextAlert = {
              below: below ? Number(below) : undefined,
              above: above ? Number(above) : undefined
            };

            if (!existing) {
              toggleItem({
                slug: item.slug,
                name: item.name,
                imageUrl: item.imageUrl,
                universeSlug: item.release.universe.slug,
                releaseSlug: item.release.slug,
                estimatedValue: item.metrics.estimatedValue,
                heat: item.metrics.marketHeat,
                sparkline: item.metrics.sparkline,
                alert: nextAlert
              });
            } else {
              updateAlert(item.slug, nextAlert);
            }

            push({ title: "Saved! We’ll keep an eye out ✨", description: item.name });
          }}
        >
          Save alert
        </SparkleButton>
        <SparkleButton
          variant="secondary"
          onClick={() =>
            toggleItem({
              slug: item.slug,
              name: item.name,
              imageUrl: item.imageUrl,
              universeSlug: item.release.universe.slug,
              releaseSlug: item.release.slug,
              estimatedValue: item.metrics.estimatedValue,
              heat: item.metrics.marketHeat,
              sparkline: item.metrics.sparkline,
              alert: existing?.alert ?? {}
            })
          }
        >
          {existing ? "Remove watch" : "Add to watchlist"}
        </SparkleButton>
      </div>
    </div>
  );
}
