"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useDeferredValue, useEffect, useMemo, useState } from "react";
import type { DashboardItem } from "@/lib/types";
import { searchCatalog } from "@/lib/search";
import { universeItemHref } from "@/lib/routing";
import { Input } from "@/components/ui/input";
import { ItemImageFallback } from "@/components/item-image";

export function SearchBox({ items }: { items: DashboardItem[] }) {
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query);
  const [open, setOpen] = useState(false);

  const itemSlugs = useMemo(() => new Set(items.map((item) => item.slug)), [items]);
  const suggestions = useMemo(() => searchCatalog(deferred, 6).filter((item) => itemSlugs.has(item.slug)), [deferred, itemSlugs]);

  useEffect(() => {
    setOpen(Boolean(deferred));
  }, [deferred]);

  return (
    <div className="relative w-full max-w-xl">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8B6F47]" />
      <Input
        aria-label="Search collectibles"
        placeholder="Search characters, series, brands, or lines..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className="h-12 rounded-full border-[#E8E0D4] bg-[#FFFCF8] pl-11 placeholder:text-[#5D554D]"
      />
      {open && suggestions.length ? (
        <div className="absolute top-[calc(100%+0.5rem)] z-40 w-full rounded-[16px] border border-[#E8E0D4] bg-[#FFFCF8] p-2">
          {suggestions.map((item) => (
            <Link
              key={item.id}
              href={universeItemHref(item.universeSlug, item.slug)}
              className="flex items-center gap-3 rounded-[12px] px-3 py-2 transition hover:bg-[#F5EDE0]"
              onClick={() => setQuery("")}
            >
              <div className="relative h-12 w-12 overflow-hidden rounded-[12px] border border-[#E8E0D4] bg-[#FAF7F2]">
                <ItemImageFallback src={item.imageLocalPath} alt={item.name} fill className="object-cover" />
              </div>
              <div className="min-w-0">
                <p className="truncate font-semibold text-[#2C2418]">{item.name}</p>
                <p className="truncate text-xs text-[#5D554D]">
                  {item.releaseName} · {item.brandName}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
