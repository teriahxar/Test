"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeState = {
  selectedUniverse: string;
  selectedRelease?: string;
  pinnedUniverse?: string;
  pinnedRelease?: string;
  reducedMotion: boolean;
  soundEnabled: boolean;
  previewUniverse?: string;
  previewRelease?: string;
  setUniverse: (universe: string, release?: string) => void;
  previewTheme: (universe?: string, release?: string) => void;
  pinTheme: (universe?: string, release?: string) => void;
  clearPin: () => void;
  setReducedMotion: (enabled: boolean) => void;
  setSoundEnabled: (enabled: boolean) => void;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      selectedUniverse: "other",
      selectedRelease: undefined,
      pinnedUniverse: undefined,
      pinnedRelease: undefined,
      reducedMotion: false,
      soundEnabled: false,
      previewUniverse: undefined,
      previewRelease: undefined,
      setUniverse: (selectedUniverse, selectedRelease) =>
        set((state) =>
          state.selectedUniverse === selectedUniverse &&
          state.selectedRelease === selectedRelease &&
          !state.previewUniverse &&
          !state.previewRelease
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
          !state.pinnedUniverse && !state.pinnedRelease
            ? state
            : { ...state, pinnedUniverse: undefined, pinnedRelease: undefined }
        ),
      setReducedMotion: (reducedMotion) =>
        set((state) => (state.reducedMotion === reducedMotion ? state : { ...state, reducedMotion })),
      setSoundEnabled: (soundEnabled) =>
        set((state) => (state.soundEnabled === soundEnabled ? state : { ...state, soundEnabled }))
    }),
    {
      name: "vaultview-theme"
    }
  )
);
