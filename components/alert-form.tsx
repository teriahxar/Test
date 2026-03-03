"use client";

import { useState } from "react";
import type { DashboardItem } from "@/lib/types";
import { useWatchlistStore } from "@/lib/stores/watchlist-store";
import { useToastStore } from "@/lib/stores/toast-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AlertForm({ item }: { item: DashboardItem }) {
  const watchlist = useWatchlistStore((state) => state.items);
  const toggleItem = useWatchlistStore((state) => state.toggleItem);
  const updateAlert = useWatchlistStore((state) => state.updateAlert);
  const push = useToastStore((state) => state.push);

  const existing = watchlist.find((entry) => entry.slug === item.slug);
  const [below, setBelow] = useState(existing?.alert.below?.toString() ?? "");
  const [above, setAbove] = useState(existing?.alert.above?.toString() ?? "");

  return (
    <div className="rounded-[28px] border border-border bg-card/80 p-5 shadow-vault">
      <p className="font-display text-xl font-semibold">Watchlist + alerts</p>
      <p className="mt-2 text-sm text-muted-foreground">Save threshold reminders locally in your browser.</p>
      <div className="mt-5 grid gap-3">
        <Input placeholder="Notify below USD" value={below} onChange={(event) => setBelow(event.target.value)} />
        <Input placeholder="Notify above USD" value={above} onChange={(event) => setAbove(event.target.value)} />
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        <Button
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
                sparkline: item.metrics.sparkline,
                alert: nextAlert
              });
            } else {
              updateAlert(item.slug, nextAlert);
            }
            push({ title: "Alert saved", description: item.name });
          }}
        >
          Save alert
        </Button>
        <Button variant="outline" onClick={() => toggleItem({
          slug: item.slug,
          name: item.name,
          imageUrl: item.imageUrl,
          universeSlug: item.release.universe.slug,
          releaseSlug: item.release.slug,
          estimatedValue: item.metrics.estimatedValue,
          sparkline: item.metrics.sparkline,
          alert: {}
        })}>
          {existing ? "Remove from watchlist" : "Add to watchlist"}
        </Button>
      </div>
    </div>
  );
}
