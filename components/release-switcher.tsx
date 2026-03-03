"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import type { Release } from "@prisma/client";
import { ChevronDown } from "lucide-react";
import { useThemeStore } from "@/lib/stores/theme-store";

export function ReleaseSwitcher({
  universeSlug,
  releases,
  currentRelease
}: {
  universeSlug: string;
  releases: Release[];
  currentRelease?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();
  const setUniverse = useThemeStore((state) => state.setUniverse);

  return (
    <div className={`relative ${pending ? "opacity-70" : ""}`}>
      <select
        aria-label="Select release"
        className="h-12 appearance-none rounded-full border border-white/60 bg-white/80 px-4 pr-10 text-sm font-semibold shadow-sm outline-none ring-0"
        value={currentRelease ?? "all"}
        onChange={(event) => {
          const value = event.target.value;
          setUniverse(universeSlug, value === "all" ? undefined : value);
          startTransition(() => {
            const next = new URLSearchParams(searchParams.toString());
            if (value === "all") {
              next.delete("release");
            } else {
              next.set("release", value);
            }
            router.push(`/${universeSlug}${next.toString() ? `?${next.toString()}` : ""}`);
          });
        }}
      >
        <option value="all">All releases</option>
        {releases.map((release) => (
          <option key={release.id} value={release.slug}>
            {release.name}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
    </div>
  );
}
