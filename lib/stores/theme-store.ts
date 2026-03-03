"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { buildThemeVariables, getThemePack } from "@/lib/themes";

type ThemeState = {
  selectedUniverse: string;
  selectedRelease?: string;
  pinnedUniverse?: string;
  pinnedRelease?: string;
  reducedMotion: boolean;
  previewUniverse?: string;
  previewRelease?: string;
  setUniverse: (universe: string, release?: string) => void;
  previewTheme: (universe?: string, release?: string) => void;
  pinTheme: (universe?: string, release?: string) => void;
  clearPin: () => void;
  setReducedMotion: (enabled: boolean) => void;
  resolveTheme: () => {
    universe: string;
    release?: string;
    vars: Record<string, string>;
    themeId: string;
    cardClass: string;
    buttonStyle: string;
  };
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      selectedUniverse: "other",
      selectedRelease: undefined,
      pinnedUniverse: undefined,
      pinnedRelease: undefined,
      reducedMotion: false,
      previewUniverse: undefined,
      previewRelease: undefined,
      setUniverse: (selectedUniverse, selectedRelease) =>
        set((state) =>
          state.selectedUniverse === selectedUniverse &&
          state.selectedRelease === selectedRelease &&
          state.previewUniverse === undefined &&
          state.previewRelease === undefined
            ? state
            : { ...state, selectedUniverse, selectedRelease, previewUniverse: undefined, previewRelease: undefined }
        ),
      previewTheme: (previewUniverse, previewRelease) =>
        set((state) =>
          state.previewUniverse === previewUniverse && state.previewRelease === previewRelease
            ? state
            : { ...state, previewUniverse, previewRelease }
        ),
      pinTheme: (pinnedUniverse, pinnedRelease) =>
        set((state) =>
          state.pinnedUniverse === pinnedUniverse && state.pinnedRelease === pinnedRelease
            ? state
            : { ...state, pinnedUniverse, pinnedRelease }
        ),
      clearPin: () =>
        set((state) =>
          state.pinnedUniverse === undefined && state.pinnedRelease === undefined
            ? state
            : { ...state, pinnedUniverse: undefined, pinnedRelease: undefined }
        ),
      setReducedMotion: (reducedMotion) =>
        set((state) => (state.reducedMotion === reducedMotion ? state : { ...state, reducedMotion })),
      resolveTheme: () => {
        const state = get();
        const universe = state.previewUniverse ?? state.pinnedUniverse ?? state.selectedUniverse;
        const release = state.previewUniverse
          ? state.previewRelease
          : (state.pinnedUniverse ? state.pinnedRelease : state.selectedRelease);
        const pack = getThemePack(universe);

        return {
          universe,
          release,
          vars: buildThemeVariables(universe, release),
          themeId: pack.id,
          cardClass: pack.cardClass,
          buttonStyle: pack.buttonStyle
        };
      }
    }),
    {
      name: "vaultview-theme"
    }
  )
);
