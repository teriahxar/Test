"use client";

import { create } from "zustand";

type UiState = {
  isWorldTransitioning: boolean;
  transitionTarget?: string;
  beginWorldTransition: (target?: string) => void;
  endWorldTransition: () => void;
};

export const useUiStore = create<UiState>((set) => ({
  isWorldTransitioning: false,
  transitionTarget: undefined,
  beginWorldTransition: (transitionTarget) => set({ isWorldTransitioning: true, transitionTarget }),
  endWorldTransition: () => set({ isWorldTransitioning: false, transitionTarget: undefined })
}));
