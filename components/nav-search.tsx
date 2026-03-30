"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useDeferredValue, useMemo, useState } from "react";
import { searchCatalog } from "@/lib/search";
import { universeItemHref } from "@/lib/routing";
import { cn } from "@/lib/utils";

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
  const results = useMemo(() => searchCatalog(deferred, 6), [deferred]);

  return (
    <div className={cn("relative w-full", className)}>
      <Search className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8f7661]" />
      <input
        aria-label="Search collectibles"
        placeholder={placeholder}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className={cn(
          "warm-focus h-12 w-full rounded-full border border-[#d6c9b5] bg-[#fffdf9]/92 pl-12 pr-5 text-sm text-[#2e2a26] outline-none shadow-[var(--shadow-soft)] placeholder:text-[#8f7661]",
          inputClassName
        )}
      />
      {results.length ? (
        <div className="absolute top-[calc(100%+0.55rem)] z-50 w-full rounded-[26px] border border-[#d6c9b5] bg-[#fffdf9]/97 p-2 shadow-[var(--shadow-card)]">
          {results.map((item) => (
            <Link
              key={item.slug}
              href={universeItemHref(item.universeSlug, item.slug)}
              className="block rounded-[18px] px-4 py-3 transition hover:bg-[#faf7f2]"
              onClick={() => setQuery("")}
            >
              <p className="font-semibold text-[#2e2a26]">{item.name}</p>
              <p className="mt-1 text-xs text-[#8f7661]">
                {item.releaseName} · {item.universeName}
              </p>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
