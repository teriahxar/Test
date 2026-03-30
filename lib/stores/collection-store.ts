"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { withBasePath } from "@/lib/utils";

export type CollectionStatus = "owned" | "wanted" | "sold" | "dream";

export type CollectionEntry = {
  slug: string;
  name: string;
  imageUrl: string;
  estimatedValue: number;
  change7d: number;
  heat: "Hot" | "Warm" | "Cooling";
  status: CollectionStatus;
  updatedAt: string;
};

type CollectionState = {
  entries: CollectionEntry[];
  setStatus: (entry: Omit<CollectionEntry, "updatedAt">) => void;
  removeStatus: (slug: string) => void;
};

export const useCollectionStore = create<CollectionState>()(
  persist(
    (set) => ({
      entries: [],
      setStatus: (entry) =>
        set((state) => {
          const next = state.entries.filter((item) => item.slug !== entry.slug);
          return {
            entries: [{ ...entry, imageUrl: withBasePath(entry.imageUrl), updatedAt: new Date().toISOString() }, ...next]
          };
        }),
      removeStatus: (slug) =>
        set((state) => ({
          entries: state.entries.filter((item) => item.slug !== slug)
        }))
    }),
    {
      name: "trinket-collection",
      migrate: (persistedState) => {
        if (!persistedState || typeof persistedState !== "object") {
          return persistedState as CollectionState;
        }

        const state = persistedState as CollectionState;
        return {
          ...state,
          entries: (state.entries ?? []).map((entry) => {
            const legacyStatus = String((entry as { status?: unknown }).status ?? "owned");
            return {
              ...entry,
              status: legacyStatus === "want" ? "wanted" : (legacyStatus as CollectionStatus),
              imageUrl: withBasePath(entry.imageUrl)
            };
          })
        };
      }
    }
  )
);
