"use client";

import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { useDeferredValue, useEffect, useMemo, useState } from "react";
import type { DashboardItem } from "@/lib/types";
import { Input } from "@/components/ui/input";

export function SearchBox({ items }: { items: DashboardItem[] }) {
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query);
  const [open, setOpen] = useState(false);

  const suggestions = useMemo(
    () =>
      deferred
        ? items.filter((item) => item.name.toLowerCase().includes(deferred.toLowerCase())).slice(0, 6)
        : [],
    [deferred, items]
  );

  useEffect(() => {
    setOpen(Boolean(deferred));
  }, [deferred]);

  return (
    <div className="relative w-full max-w-xl">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        aria-label="Search collectibles"
        placeholder="Search a figure, set, or vibe"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className="h-12 rounded-full border-white/60 bg-white/80 pl-11"
      />
      {open && suggestions.length ? (
        <div className="absolute top-[calc(100%+0.5rem)] z-40 w-full rounded-[28px] border border-white/60 bg-card/95 p-2 shadow-vault backdrop-blur-xl">
          {suggestions.map((item) => (
            <Link
              key={item.id}
              href={`/item/${item.slug}`}
              className="flex items-center gap-3 rounded-[18px] px-3 py-2 hover:bg-muted"
              onClick={() => setQuery("")}
            >
              <div className="relative h-12 w-12 overflow-hidden rounded-[16px] bg-white/75">
                <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
              </div>
              <div className="min-w-0">
                <p className="truncate font-semibold">{item.name}</p>
                <p className="truncate text-xs text-muted-foreground">{item.release.name}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
