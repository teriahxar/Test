"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useDeferredValue, useMemo, useState } from "react";
import { STATIC_DB } from "@/lib/static-data";
import { universeItemHref } from "@/lib/routing";

export function NavSearch() {
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query);
  const results = useMemo(() => {
    if (!deferred) {
      return [];
    }
    return STATIC_DB.items
      .filter((item) => item.name.toLowerCase().includes(deferred.toLowerCase()))
      .map((item) => ({
        ...item,
        universeSlug: STATIC_DB.releases.find((release) => release.id === item.releaseId)?.universe.slug ?? "pop-mart"
      }))
      .slice(0, 5);
  }, [deferred]);

  return (
    <div className="relative w-full md:w-[250px]">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        aria-label="Search collectibles"
        placeholder="Search collectibles"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className="h-10 w-full rounded-full border border-[#2d5f41]/20 bg-white pl-10 pr-3 text-sm text-[#234a36] outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
      {results.length ? (
        <div className="absolute top-[calc(100%+0.4rem)] z-50 w-full rounded-[20px] border border-[#2d5f41]/15 bg-card/95 p-2 shadow-vault">
          {results.map((item) => (
            <Link
              key={item.slug}
              href={universeItemHref(item.universeSlug, item.slug)}
              className="block rounded-[14px] px-3 py-2 text-sm hover:bg-muted"
              onClick={() => setQuery("")}
            >
              <p className="font-semibold">{item.name}</p>
              <p className="text-xs text-muted-foreground">{item.brandName}</p>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
