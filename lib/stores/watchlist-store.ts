"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { withBasePath } from "@/lib/utils";

export type AlertRule = {
  below?: number;
  above?: number;
};

export type WatchlistEntry = {
  slug: string;
  name: string;
  imageUrl: string;
  universeSlug: string;
  releaseSlug: string;
  estimatedValue: number;
  heat: "Hot" | "Warm" | "Cooling";
  sparkline: number[];
  alert: AlertRule;
  addedAt: string;
};

type WatchlistState = {
  items: WatchlistEntry[];
  recentlyViewed: string[];
  toggleItem: (item: Omit<WatchlistEntry, "addedAt">) => void;
  updateAlert: (slug: string, alert: AlertRule) => void;
  removeItem: (slug: string) => void;
  markViewed: (slug: string) => void;
};

export const useWatchlistStore = create<WatchlistState>()(
  persist(
    (set) => ({
      items: [],
      recentlyViewed: [],
      toggleItem: (item) =>
        set((state) => {
          const exists = state.items.some((entry) => entry.slug === item.slug);

          if (exists) {
            return { items: state.items.filter((entry) => entry.slug !== item.slug) };
          }

          return {
            items: [{ ...item, imageUrl: withBasePath(item.imageUrl), addedAt: new Date().toISOString() }, ...state.items]
          };
        }),
      updateAlert: (slug, alert) =>
        set((state) => ({
          items: state.items.map((item) => (item.slug === slug ? { ...item, alert } : item))
        })),
      removeItem: (slug) =>
        set((state) => ({
          items: state.items.filter((item) => item.slug !== slug)
        })),
      markViewed: (slug) =>
        set((state) => ({
          recentlyViewed: [slug, ...state.recentlyViewed.filter((entry) => entry !== slug)].slice(0, 8)
        }))
    }),
    {
      name: "trinket-watchlist",
      migrate: (persistedState) => {
        if (!persistedState || typeof persistedState !== "object") {
          return persistedState as WatchlistState;
        }

        const state = persistedState as WatchlistState;
        return {
          ...state,
          items: (state.items ?? []).map((item) => ({
            ...item,
            imageUrl: withBasePath(item.imageUrl)
          }))
        };
      }
    }
  )
);
