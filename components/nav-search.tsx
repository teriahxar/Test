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
      <Search className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        aria-label="Search collectibles"
        placeholder={placeholder}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className={`h-12 w-full rounded-full border border-border bg-white/76 pl-12 pr-5 text-sm text-foreground outline-none shadow-[0_18px_40px_rgba(220,232,244,0.9)] backdrop-blur-xl transition focus-visible:border-white focus-visible:ring-2 focus-visible:ring-[#eaf6ff] focus-visible:shadow-[0_0_0_1px_rgba(234,246,255,0.9),0_18px_48px_rgba(234,246,255,0.95)] ${inputClassName ?? ""}`}
      />
      {results.length ? (
        <div className="absolute top-[calc(100%+0.55rem)] z-50 w-full rounded-[28px] border border-border bg-card/95 p-2 shadow-[var(--shadow-card)] backdrop-blur-2xl">
          {results.map((item) => (
            <Link
              key={item.slug}
              href={universeItemHref(item.universeSlug, item.slug)}
              className="block rounded-[18px] px-4 py-3 text-sm transition hover:bg-[#f7fbff]"
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
