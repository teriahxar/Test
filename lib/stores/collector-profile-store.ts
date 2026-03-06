"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { asset } from "@/lib/utils";

type CollectorProfile = {
  username: string;
  displayName: string;
  avatarPath: string;
  bio: string;
  xp: number;
  charms: string[];
  badges: string[];
  profileFrame: string;
  shelfBackground: string;
  dreamItems: string[];
};

type CollectorProfileState = {
  profile: CollectorProfile;
  setProfile: (next: Partial<CollectorProfile>) => void;
  addDreamItem: (slug: string) => void;
  removeDreamItem: (slug: string) => void;
  earnXp: (amount: number) => void;
};

const defaultProfile: CollectorProfile = {
  username: "sprout-trinketeer",
  displayName: "Sprout Trin",
  avatarPath: asset("/assets/logos/trinket-mark.png"),
  bio: "Cozy figure hunter. Building my soft little shelf one charm at a time.",
  xp: 180,
  charms: ["Moonleaf Charm", "Pastel Bloom", "Lucky Star Pin"],
  badges: ["Daily Browser", "Watchlist Whisperer"],
  profileFrame: "meadow-glow-frame",
  shelfBackground: "sage-stardust",
  dreamItems: []
};

export const useCollectorProfileStore = create<CollectorProfileState>()(
  persist(
    (set) => ({
      profile: defaultProfile,
      setProfile: (next) =>
        set((state) => ({
          profile: { ...state.profile, ...next }
        })),
      addDreamItem: (slug) =>
        set((state) => ({
          profile: {
            ...state.profile,
            dreamItems: state.profile.dreamItems.includes(slug) ? state.profile.dreamItems : [slug, ...state.profile.dreamItems]
          }
        })),
      removeDreamItem: (slug) =>
        set((state) => ({
          profile: {
            ...state.profile,
            dreamItems: state.profile.dreamItems.filter((item) => item !== slug)
          }
        })),
      earnXp: (amount) =>
        set((state) => ({
          profile: {
            ...state.profile,
            xp: Math.max(0, state.profile.xp + amount)
          }
        }))
    }),
    {
      name: "trinket-collector-profile"
    }
  )
);
