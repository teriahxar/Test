"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useWatchlistStore } from "@/lib/stores/watchlist-store";
import { universeItemHref } from "@/lib/routing";
import { formatCurrency } from "@/lib/utils";
import { ItemImageFallback } from "@/components/item-image";
import { ProAlertModal } from "@/components/pro-alert-modal";
import { SparkleButton } from "@/components/sparkle-button";

export function WatchlistClient() {
  const items = useWatchlistStore((state) => state.items);
  const removeItem = useWatchlistStore((state) => state.removeItem);

  if (!items.length) {
    return (
      <div className="panel-card rounded-[20px] p-10 text-center">
        <p className="font-display text-3xl font-semibold text-[#2C2418]">Your watchlist is still empty.</p>
        <p className="mt-2 text-[#5D554D]">Save any collectible to keep it close.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.slug} className="panel-card grid gap-4 rounded-[20px] p-4 lg:grid-cols-[1.4fr_0.8fr_auto_auto] lg:items-center">
          <Link href={universeItemHref(item.universeSlug, item.slug)} className="flex items-center gap-4">
            <div className="panel-frame relative h-24 w-24 overflow-hidden">
              <ItemImageFallback src={item.imageUrl} alt={item.name} fill className="h-full w-full object-cover" />
            </div>
            <div>
              <p className="font-display text-2xl font-semibold text-[#2C2418]">{item.name}</p>
              <p className="mt-1 text-sm text-[#5D554D]">{formatCurrency(item.estimatedValue)}</p>
            </div>
          </Link>
          <ProAlertModal />
          <Link href={`https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(item.name)}`} target="_blank" className="panel-button inline-flex items-center px-3 py-1.5 text-[12px] font-medium">
            Find it →
          </Link>
          <SparkleButton variant="ghost" size="icon" onClick={() => removeItem(item.slug)} aria-label={`Remove ${item.name}`}>
            <Trash2 className="h-4 w-4" />
          </SparkleButton>
        </div>
      ))}
    </div>
  );
}
