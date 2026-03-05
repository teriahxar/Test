"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/lib/stores/theme-store";
import { useWatchlistStore } from "@/lib/stores/watchlist-store";

export function ThemeSetter({
  universe,
  release,
  itemSlug,
  itemTheme
}: {
  universe: string;
  release?: string;
  itemSlug?: string;
  itemTheme?: { slug: string; accent: string; bgStyle: string };
}) {
  const setUniverse = useThemeStore((state) => state.setUniverse);
  const setItemTheme = useThemeStore((state) => state.setItemTheme);
  const markViewed = useWatchlistStore((state) => state.markViewed);

  useEffect(() => {
    setUniverse(universe, release);
    setItemTheme(itemTheme);
    if (itemSlug) {
      markViewed(itemSlug);
    }
    return () => setItemTheme(undefined);
  }, [itemSlug, itemTheme, markViewed, release, setItemTheme, setUniverse, universe]);

  return null;
}
