"use client";

import { useMemo } from "react";
import { STATIC_DB } from "@/lib/static-data";
import { useCollectionStore } from "@/lib/stores/collection-store";
import { useWatchlistStore } from "@/lib/stores/watchlist-store";
import { useCollectorProfileStore } from "@/lib/stores/collector-profile-store";
import { formatCurrency } from "@/lib/utils";

export function MyShelfOverview() {
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

    const recentActivity = [
      `${owned.length} owned figures curated`,
      `${watchlist.length} items in watchlist`,
      `${profile.dreamItems.length} dream items tracked`
    ];

    return {
      owned: owned.length,
      wanted: wanted.length,
      sold: sold.length,
      dream: profile.dreamItems.length,
      estimatedValue,
      favoriteUniverse,
      recentActivity
    };
  }, [entries, profile.dreamItems.length, watchlist.length]);

  return (
    <section className="sticker-card rounded-[34px] p-6">
      <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">My Shelf</p>
      <h2 className="mt-2 font-display text-3xl font-semibold">Collection Snapshot</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatChip label="Owned" value={`${summary.owned}`} />
        <StatChip label="Wanted" value={`${summary.wanted}`} />
        <StatChip label="Sold" value={`${summary.sold}`} />
        <StatChip label="Dream Items" value={`${summary.dream}`} />
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-[24px] border border-white/65 bg-white/75 p-4">
          <p className="text-sm text-muted-foreground">Estimated collection value</p>
          <p className="mt-2 font-display text-3xl font-semibold">{formatCurrency(summary.estimatedValue)}</p>
          <p className="mt-2 text-sm text-muted-foreground">Favorite universe: {summary.favoriteUniverse}</p>
        </div>
        <div className="rounded-[24px] border border-white/65 bg-white/75 p-4">
          <p className="text-sm text-muted-foreground">Recent activity</p>
          <ul className="mt-3 space-y-2 text-sm">
            {summary.recentActivity.map((line) => (
              <li key={line} className="rounded-full bg-white/70 px-3 py-1.5">
                {line}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function StatChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[20px] border border-white/65 bg-white/75 px-4 py-3">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-2xl font-semibold">{value}</p>
    </div>
  );
}
