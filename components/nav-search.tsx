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
      <Search className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8B6F47]" />
      <input
        aria-label="Search collectibles"
        placeholder={placeholder}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className={cn(
          "warm-focus h-12 w-full rounded-full border border-[#E8E0D4] bg-[#FFFCF8] pl-12 pr-5 text-sm text-[#2C2418] outline-none placeholder:text-[#5D554D]",
          inputClassName
        )}
      />
      {results.length ? (
        <div className="absolute top-[calc(100%+0.55rem)] z-50 w-full rounded-[16px] border border-[#E8E0D4] bg-[#FFFCF8] p-2">
          {results.map((item) => (
            <Link
              key={item.slug}
              href={universeItemHref(item.universeSlug, item.slug)}
              className="block rounded-[12px] px-4 py-3 transition hover:bg-[#F5EDE0]"
              onClick={() => setQuery("")}
            >
              <p className="font-semibold text-[#2C2418]">{item.name}</p>
              <p className="mt-1 text-xs text-[#5D554D]">{item.releaseName} · {item.universeName}</p>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
