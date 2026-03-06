"use client";

import Link from "next/link";
import { useMemo } from "react";
import { STATIC_DB } from "@/lib/static-data";
import { universeItemHref } from "@/lib/routing";
import { useCollectionStore } from "@/lib/stores/collection-store";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { ItemImage } from "@/components/item-image";
import { MarketHeatBadge } from "@/components/market-heat-badge";

export function CollectionClient() {
  const entries = useCollectionStore((state) => state.entries);

  const summary = useMemo(() => {
    const ownedValue = entries.filter((entry) => entry.status === "owned").reduce((sum, entry) => sum + entry.estimatedValue, 0);
    const weeklyChange = entries.length ? entries.reduce((sum, entry) => sum + entry.change7d, 0) / entries.length : 0;
    const topMovers = [...entries].sort((a, b) => Math.abs(b.change7d) - Math.abs(a.change7d)).slice(0, 3);
    return { ownedValue, weeklyChange, topMovers };
  }, [entries]);

  const entryUniverseMap = useMemo(() => {
    return new Map(
      STATIC_DB.items.map((item) => {
        const release = STATIC_DB.releases.find((entry) => entry.id === item.releaseId);
        return [item.slug, release?.universe.slug ?? ""];
      })
    );
  }, []);

  if (!entries.length) {
    return (
      <div className="sticker-card rounded-[30px] p-10 text-center">
        <p className="font-display text-2xl font-semibold">Collection mode is waiting for its first main character.</p>
        <p className="mt-2 text-muted-foreground">Mark items as Owned, Want, or Sold from any item page.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-3">
        <SummaryCard label="Portfolio estimate" value={formatCurrency(summary.ownedValue)} />
        <SummaryCard label="Weekly change" value={formatPercent(summary.weeklyChange)} />
        <SummaryCard label="Tracked items" value={`${entries.length}`} />
      </section>

      <section className="space-y-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Top movers</p>
          <h2 className="mt-2 font-display text-2xl font-semibold">Most dramatic shifts in your collection</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {summary.topMovers.map((entry) => (
            <div key={entry.slug} className="sticker-card rounded-[28px] p-5">
              <p className="font-display text-xl font-semibold">{entry.name}</p>
              <p className="mt-2 text-sm text-muted-foreground">{entry.status}</p>
              <p className="mt-4 text-2xl font-semibold text-primary">{formatPercent(entry.change7d)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">All statuses</p>
          <h2 className="mt-2 font-display text-2xl font-semibold">Owned, wanted, and sold pieces</h2>
        </div>
        <div className="space-y-4">
          {entries.map((entry) => (
            <Link
              key={entry.slug}
              href={entryUniverseMap.get(entry.slug) ? universeItemHref(entryUniverseMap.get(entry.slug)!, entry.slug) : "/"}
              className="sticker-card grid gap-4 rounded-[30px] p-5 md:grid-cols-[auto_1fr_auto_auto] md:items-center"
            >
              <div className="relative h-20 w-20 overflow-hidden rounded-[20px] bg-white/70">
                <ItemImage src={entry.imageUrl} alt={entry.name} fill className="object-cover" />
              </div>
              <div>
                <p className="font-display text-xl font-semibold">{entry.name}</p>
                <p className="text-sm capitalize text-muted-foreground">{entry.status}</p>
              </div>
              <MarketHeatBadge heat={entry.heat} />
              <div className="text-right">
                <p className="font-display text-xl font-semibold">{formatCurrency(entry.estimatedValue)}</p>
                <p className="text-sm text-muted-foreground">{formatPercent(entry.change7d)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="sticker-card rounded-[28px] p-5">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-2 font-display text-3xl font-semibold">{value}</p>
    </div>
  );
}
