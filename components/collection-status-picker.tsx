"use client";

import { BookmarkCheck, ShoppingBag, Star, Tag } from "lucide-react";
import type { DashboardItem } from "@/lib/types";
import { useCollectionStore, type CollectionStatus } from "@/lib/stores/collection-store";
import { useToastStore } from "@/lib/stores/toast-store";

const statusMeta: Record<CollectionStatus, { label: string; icon: typeof BookmarkCheck }> = {
  owned: { label: "Owned", icon: BookmarkCheck },
  wanted: { label: "Wanted", icon: ShoppingBag },
  sold: { label: "Sold", icon: Tag },
  dream: { label: "Dream", icon: Star }
};

export function CollectionStatusPicker({ item }: { item: DashboardItem }) {
  const entries = useCollectionStore((state) => state.entries);
  const setStatus = useCollectionStore((state) => state.setStatus);
  const removeStatus = useCollectionStore((state) => state.removeStatus);
  const push = useToastStore((state) => state.push);
  const current = entries.find((entry) => entry.slug === item.slug)?.status;

  return (
    <div className="flex flex-wrap gap-2">
      {(Object.keys(statusMeta) as CollectionStatus[]).map((status) => {
        const Icon = statusMeta[status].icon;
        const active = current === status;
        return (
          <button
            key={status}
            type="button"
            onClick={() => {
              if (active) {
                removeStatus(item.slug);
                push({ title: "Collection updated", description: `${item.name} cleared from your shelf` });
                return;
              }

              setStatus({
                slug: item.slug,
                name: item.name,
                imageUrl: item.imageUrl,
                estimatedValue: item.metrics.estimatedValue,
                change7d: item.metrics.sevenDayChange,
                heat: item.metrics.marketHeat,
                status
              });
              push({ title: "Collection updated", description: `${item.name} marked ${statusMeta[status].label.toLowerCase()} ✦` });
            }}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
              active ? "border-[#e8c4ba] bg-[#f3ddd5] text-[#7b4a35]" : "border-[#d6c9b5] bg-[#fffdf9] text-[#5d554d] hover:bg-[#fffaf4]"
            }`}
          >
            <Icon className="h-4 w-4" />
            {statusMeta[status].label}
          </button>
        );
      })}
    </div>
  );
}
