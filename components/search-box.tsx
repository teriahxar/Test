"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useDeferredValue, useEffect, useState } from "react";
import type { DashboardItem } from "@/lib/types";
import { Input } from "@/components/ui/input";

export function SearchBox({
  items,
  universeSlug
}: {
  items: DashboardItem[];
  universeSlug: string;
}) {
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query);
  const [open, setOpen] = useState(false);

  const suggestions = deferred
    ? items.filter((item) => item.name.toLowerCase().includes(deferred.toLowerCase())).slice(0, 6)
    : [];

  useEffect(() => {
    setOpen(Boolean(deferred));
  }, [deferred]);

  return (
    <div className="relative w-full max-w-xl">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        aria-label="Search collectibles"
        placeholder="Search items, series, or tags"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className="pl-11"
      />
      {open && suggestions.length > 0 ? (
        <div className="absolute top-[calc(100%+0.5rem)] z-40 w-full rounded-[26px] border border-border bg-card/95 p-2 shadow-vault backdrop-blur-xl">
          {suggestions.map((item) => (
            <Link
              key={item.id}
              href={`/item/${item.slug}`}
              className="flex items-center justify-between rounded-[18px] px-3 py-2 text-sm hover:bg-muted"
              onClick={() => setQuery("")}
            >
              <span>{item.name}</span>
              <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{universeSlug}</span>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
