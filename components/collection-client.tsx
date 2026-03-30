"use client";

import Link from "next/link";
import { useMemo } from "react";
import { STATIC_DB } from "@/lib/static-data";
import { universeItemHref } from "@/lib/routing";
import { useCollectionStore } from "@/lib/stores/collection-store";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { ItemImageFallback } from "@/components/item-image";
import { MarketHeatBadge } from "@/components/market-heat-badge";

export function CollectionClient() {
  const entries = useCollectionStore((state) => state.entries);

  const summary = useMemo(() => {
    const ownedValue = entries.filter((entry) => entry.status === "owned").reduce((sum, entry) => sum + entry.estimatedValue, 0);
    const weeklyChange = entries.length ? entries.reduce((sum, entry) => sum + entry.change7d, 0) / entries.length : 0;
    const counts = {
      owned: entries.filter((entry) => entry.status === "owned").length,
      wanted: entries.filter((entry) => entry.status === "wanted").length,
      sold: entries.filter((entry) => entry.status === "sold").length,
      dream: entries.filter((entry) => entry.status === "dream").length
    };

    return { ownedValue, weeklyChange, counts };
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
      <div className="surface-card rounded-[30px] p-10 text-center">
        <p className="font-display text-3xl font-semibold text-[#2e2a26]">Your shelf is ready for its first collectible.</p>
        <p className="mt-2 text-[#5d554d]">Mark any item as owned, wanted, sold, or dream to build your collection story here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-4">
        <SummaryCard label="Portfolio estimate" value={formatCurrency(summary.ownedValue)} />
        <SummaryCard label="Weekly change" value={formatPercent(summary.weeklyChange)} />
        <SummaryCard label="Owned" value={`${summary.counts.owned}`} />
        <SummaryCard label="Wanted + Dream" value={`${summary.counts.wanted + summary.counts.dream}`} />
      </section>

      <section className="surface-card rounded-[28px] p-6">
        <p className="section-label">Shelf status</p>
        <h2 className="mt-4 font-display text-3xl font-semibold text-[#2e2a26]">Owned, wanted, sold, and dream pieces</h2>
        <div className="mt-5 grid gap-4">
          {entries.map((entry) => (
            <Link
              key={entry.slug}
              href={entryUniverseMap.get(entry.slug) ? universeItemHref(entryUniverseMap.get(entry.slug)!, entry.slug) : "/"}
              className="grid gap-4 rounded-[24px] border border-[#d6c9b5] bg-[#fffdf9] p-4 transition hover:-translate-y-0.5 md:grid-cols-[auto_1fr_auto_auto] md:items-center"
            >
              <div className="relative h-20 w-20 overflow-hidden rounded-[18px] border border-[#d6c9b5] bg-[#fffdf9]">
                <ItemImageFallback src={entry.imageUrl} alt={entry.name} fill className="object-cover" />
              </div>
              <div>
                <p className="font-display text-2xl font-semibold text-[#2e2a26]">{entry.name}</p>
                <p className="text-sm capitalize text-[#5d554d]">{entry.status}</p>
              </div>
              <MarketHeatBadge heat={entry.heat} />
              <div className="text-right">
                <p className="text-xl font-semibold text-[#2e2a26]">{formatCurrency(entry.estimatedValue)}</p>
                <p className="text-sm text-[#5d554d]">{formatPercent(entry.change7d)}</p>
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
    <div className="surface-card rounded-[24px] p-5">
      <p className="text-sm text-[#8f7661]">{label}</p>
      <p className="mt-3 font-display text-3xl font-semibold text-[#2e2a26]">{value}</p>
    </div>
  );
}
