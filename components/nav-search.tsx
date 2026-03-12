"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useDeferredValue, useMemo, useState } from "react";
import { STATIC_DB } from "@/lib/static-data";
import { universeItemHref } from "@/lib/routing";

export function NavSearch({
  className,
  inputClassName,
  placeholder = "Search collectibles, series, or brands..."
}: {
  className?: string;
  inputClassName?: string;
  placeholder?: string;
}) {
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
    <div className={`relative w-full ${className ?? "md:w-[440px]"}`}>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        aria-label="Search collectibles"
        placeholder={placeholder}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className={`h-12 w-full rounded-full border border-border bg-white/60 pl-10 pr-4 text-sm text-foreground outline-none shadow-[var(--shadow-soft)] backdrop-blur-xl focus-visible:ring-2 focus-visible:ring-ring ${inputClassName ?? ""}`}
      />
      {results.length ? (
        <div className="absolute top-[calc(100%+0.4rem)] z-50 w-full rounded-[24px] border border-border bg-card/95 p-2 shadow-[var(--shadow-card)]">
          {results.map((item) => (
            <Link
              key={item.slug}
              href={universeItemHref(item.universeSlug, item.slug)}
              className="block rounded-[16px] px-3 py-2 text-sm hover:bg-muted"
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
