"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { ChevronDown } from "lucide-react";
import type { Release } from "@/lib/data-model";
import { universeHref } from "@/lib/routing";
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
        className="warm-focus h-12 appearance-none rounded-full border border-[#E8E0D4] bg-[#FFFCF8] px-4 pr-10 text-sm font-semibold text-[#2e2a26] shadow-[var(--shadow-soft)] outline-none ring-0"
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
            router.push(`${universeHref(universeSlug)}${next.toString() ? `?${next.toString()}` : ""}`);
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
      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8f7661]" />
    </div>
  );
}
