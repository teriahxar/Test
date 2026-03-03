"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CollectionStatus = "owned" | "want" | "sold";

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
            entries: [{ ...entry, updatedAt: new Date().toISOString() }, ...next]
          };
        }),
      removeStatus: (slug) =>
        set((state) => ({
          entries: state.entries.filter((item) => item.slug !== slug)
        }))
    }),
    {
      name: "vaultview-collection"
    }
  )
);
