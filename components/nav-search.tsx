"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useDeferredValue, useMemo, useState } from "react";
import { STATIC_DB } from "@/lib/static-data";

export function NavSearch() {
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query);
  const results = useMemo(() => {
    if (!deferred) {
      return [];
    }
    return STATIC_DB.items.filter((item) => item.name.toLowerCase().includes(deferred.toLowerCase())).slice(0, 5);
  }, [deferred]);

  return (
    <div className="relative w-full md:w-[260px]">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        aria-label="Search collectibles"
        placeholder="Search collectibles"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className="h-10 w-full rounded-full border border-white/60 bg-white/80 pl-10 pr-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
      {results.length ? (
        <div className="absolute top-[calc(100%+0.4rem)] z-50 w-full rounded-[20px] border border-white/60 bg-card/95 p-2 shadow-vault">
          {results.map((item) => (
            <Link
              key={item.slug}
              href={`/item/${item.slug}`}
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
