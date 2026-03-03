"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import type { Release } from "@prisma/client";
import { useThemeStore } from "@/lib/stores/theme-store";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  const [isPending, startTransition] = useTransition();
  const setUniverse = useThemeStore((state) => state.setUniverse);

  return (
    <div className="w-full max-w-xs">
      <Select
        value={currentRelease ?? "all"}
        onValueChange={(value) => {
          setUniverse(universeSlug, value === "all" ? undefined : value);
          startTransition(() => {
            const next = new URLSearchParams(searchParams.toString());
            if (value === "all") {
              next.delete("release");
            } else {
              next.set("release", value);
            }
            router.push(`/${universeSlug}?${next.toString()}`);
          });
        }}
      >
        <SelectTrigger aria-label="Select release" className={isPending ? "opacity-75" : ""}>
          <SelectValue placeholder="All releases" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All releases</SelectItem>
          {releases.map((release) => (
            <SelectItem key={release.id} value={release.slug}>
              {release.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
