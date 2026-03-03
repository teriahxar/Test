"use client";

import { useEffect, useMemo } from "react";
import type { ReactNode } from "react";
import { buildThemeVariables, getResolvedTheme } from "@/lib/themes";
import { useThemeStore } from "@/lib/stores/theme-store";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const selectedUniverse = useThemeStore((state) => state.selectedUniverse);
  const selectedRelease = useThemeStore((state) => state.selectedRelease);
  const pinnedUniverse = useThemeStore((state) => state.pinnedUniverse);
  const pinnedRelease = useThemeStore((state) => state.pinnedRelease);
  const previewUniverse = useThemeStore((state) => state.previewUniverse);
  const previewRelease = useThemeStore((state) => state.previewRelease);
  const reducedMotion = useThemeStore((state) => state.reducedMotion);
  const setReducedMotion = useThemeStore((state) => state.setReducedMotion);
  const soundEnabled = useThemeStore((state) => state.soundEnabled);

  const theme = useMemo(() => {
    const universe = previewUniverse ?? pinnedUniverse ?? selectedUniverse;
    const release = previewUniverse ? previewRelease : pinnedUniverse ? pinnedRelease : selectedRelease;
    return getResolvedTheme(universe, release);
  }, [pinnedRelease, pinnedUniverse, previewRelease, previewUniverse, selectedRelease, selectedUniverse]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (query.matches) {
      setReducedMotion(true);
    }
  }, [setReducedMotion]);

  useEffect(() => {
    const root = document.documentElement;
    Object.entries(buildThemeVariables(theme.universeSlug, previewUniverse ? previewRelease : (pinnedUniverse ? pinnedRelease : selectedRelease))).forEach(
      ([key, value]) => {
        root.style.setProperty(key, value);
      }
    );
    root.dataset.theme = theme.id;
    root.dataset.motion = reducedMotion ? "reduced" : "full";
    root.dataset.button = theme.buttonStyle;
    root.dataset.pattern = theme.patternClass;
    root.dataset.stickers = theme.stickerSet;
    root.dataset.sound = soundEnabled ? "on" : "off";
    root.classList.toggle("reduced-motion", reducedMotion);
  }, [pinnedRelease, pinnedUniverse, previewRelease, previewUniverse, reducedMotion, selectedRelease, soundEnabled, theme]);

  return <>{children}</>;
}
