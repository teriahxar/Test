"use client";

import { useMemo } from "react";
import { STATIC_DB } from "@/lib/static-data";
import { useCollectionStore } from "@/lib/stores/collection-store";
import { useWatchlistStore } from "@/lib/stores/watchlist-store";
import { useCollectorProfileStore } from "@/lib/stores/collector-profile-store";
import { formatCurrency } from "@/lib/utils";

export function MyShelfSummary() {
  const entries = useCollectionStore((state) => state.entries);
  const watchlist = useWatchlistStore((state) => state.items);
  const profile = useCollectorProfileStore((state) => state.profile);

  const summary = useMemo(() => {
    const owned = entries.filter((entry) => entry.status === "owned");
    const wanted = entries.filter((entry) => entry.status === "want");
    const sold = entries.filter((entry) => entry.status === "sold");
    const estimatedValue = owned.reduce((sum, entry) => sum + entry.estimatedValue, 0);

    const universeCounter = new Map<string, number>();
    entries.forEach((entry) => {
      const item = STATIC_DB.items.find((row) => row.slug === entry.slug);
      const release = item ? STATIC_DB.releases.find((row) => row.id === item.releaseId) : undefined;
      const key = release?.universe.name ?? "Unsorted";
      universeCounter.set(key, (universeCounter.get(key) ?? 0) + 1);
    });
    const favoriteUniverse = [...universeCounter.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "Pop Mart";

    return {
      owned: owned.length,
      wanted: wanted.length,
      sold: sold.length,
      dream: profile.dreamItems.length,
      estimatedValue,
      favoriteUniverse,
      watchlist: watchlist.length
    };
  }, [entries, profile.dreamItems.length, watchlist.length]);

  return (
    <section className="surface-card rounded-[34px] p-6">
      <p className="section-label">My Shelf</p>
      <h2 className="mt-4 text-3xl font-semibold text-[#2F3A45]">Collection snapshot</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatChip label="Owned" value={`${summary.owned}`} />
        <StatChip label="Wanted" value={`${summary.wanted}`} />
        <StatChip label="Sold" value={`${summary.sold}`} />
        <StatChip label="Dream" value={`${summary.dream}`} />
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-[24px] border border-border/70 bg-white/86 p-4">
          <p className="text-sm text-muted-foreground">Estimated collection value</p>
          <p className="mt-2 text-3xl font-semibold text-[#2F3A45]">{formatCurrency(summary.estimatedValue)}</p>
          <p className="mt-2 text-sm text-muted-foreground">Favorite universe: {summary.favoriteUniverse}</p>
        </div>
        <div className="rounded-[24px] border border-border/70 bg-white/86 p-4">
          <p className="text-sm text-muted-foreground">Collector activity</p>
          <div className="mt-3 space-y-2 text-sm">
            <p className="rounded-full bg-[#eaf6ff] px-3 py-1.5">{summary.watchlist} items in watchlist</p>
            <p className="rounded-full bg-[#eafbf3] px-3 py-1.5">{summary.owned + summary.wanted} shelf updates this season</p>
            <p className="rounded-full bg-[#f2eeff] px-3 py-1.5">{summary.dream} dream targets active</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[20px] border border-border/70 bg-white/86 px-4 py-3">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-[#2F3A45]">{value}</p>
    </div>
  );
}
