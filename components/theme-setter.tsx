"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/lib/stores/theme-store";
import { useWatchlistStore } from "@/lib/stores/watchlist-store";

export function ThemeSetter({
  universe,
  release,
  itemSlug
}: {
  universe: string;
  release?: string;
  itemSlug?: string;
}) {
  const setUniverse = useThemeStore((state) => state.setUniverse);
  const markViewed = useWatchlistStore((state) => state.markViewed);

  useEffect(() => {
    setUniverse(universe, release);
    if (itemSlug) {
      markViewed(itemSlug);
    }
  }, [itemSlug, markViewed, release, setUniverse, universe]);

  return null;
}
