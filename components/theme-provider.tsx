"use client";

import { useEffect, useMemo } from "react";
import type { ReactNode } from "react";
import { buildThemeVariables, getThemePack } from "@/lib/themes";
import { useThemeStore } from "@/lib/stores/theme-store";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const selectedUniverse = useThemeStore((state) => state.selectedUniverse);
  const selectedRelease = useThemeStore((state) => state.selectedRelease);
  const pinnedUniverse = useThemeStore((state) => state.pinnedUniverse);
  const pinnedRelease = useThemeStore((state) => state.pinnedRelease);
  const previewUniverse = useThemeStore((state) => state.previewUniverse);
  const previewRelease = useThemeStore((state) => state.previewRelease);
  const reducedMotion = useThemeStore((state) => state.reducedMotion);
  const resolvedTheme = useMemo(() => {
    const universe = previewUniverse ?? pinnedUniverse ?? selectedUniverse;
    const release = previewUniverse ? previewRelease : (pinnedUniverse ? pinnedRelease : selectedRelease);
    const pack = getThemePack(universe);

    return {
      vars: buildThemeVariables(universe, release),
      themeId: pack.id,
      buttonStyle: pack.buttonStyle
    };
  }, [
    pinnedRelease,
    pinnedUniverse,
    previewRelease,
    previewUniverse,
    selectedRelease,
    selectedUniverse
  ]);

  useEffect(() => {
    const root = document.documentElement;
    Object.entries(resolvedTheme.vars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
    root.dataset.theme = resolvedTheme.themeId;
    root.dataset.motion = reducedMotion ? "reduced" : "full";
    root.dataset.button = resolvedTheme.buttonStyle;
    root.classList.toggle("reduced-motion", reducedMotion);
  }, [resolvedTheme, reducedMotion]);

  return <>{children}</>;
}
