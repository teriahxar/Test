"use client";

import { Sparkles, Star } from "lucide-react";
import { CollectorRankCard } from "@/components/collector-rank-card";
import { MyShelfSummary } from "@/components/my-shelf-summary";
import { PremiumStarterCard } from "@/components/premium-starter-card";
import { Button } from "@/components/ui/button";
import { useCollectorProfileStore } from "@/lib/stores/collector-profile-store";

export function CommunityStarterUi() {
  const profile = useCollectorProfileStore((state) => state.profile);
  const earnXp = useCollectorProfileStore((state) => state.earnXp);

  return (
    <div className="space-y-6">
      <section className="sticker-card rounded-[34px] p-6">
        <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Collector Circle</p>
        <h2 className="mt-2 font-display text-3xl font-semibold">Profile + Charms</h2>
        <p className="mt-2 text-sm text-muted-foreground">Starter account architecture for identity, cosmetics, badges, and community presence.</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-[24px] border border-white/65 bg-white/75 p-4">
            <p className="font-semibold">@{profile.username}</p>
            <p className="mt-1 font-display text-2xl">{profile.displayName}</p>
            <p className="mt-2 text-sm text-muted-foreground">{profile.bio}</p>
            <p className="mt-3 text-xs text-muted-foreground">Frame: {profile.profileFrame} · Shelf: {profile.shelfBackground}</p>
          </div>
          <div className="rounded-[24px] border border-white/65 bg-white/75 p-4">
            <p className="text-sm text-muted-foreground">Charms</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {profile.charms.map((charm) => (
                <span key={charm} className="rounded-full bg-white px-3 py-1 text-xs font-semibold">
                  {charm}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted-foreground">Badges</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {profile.badges.map((badge) => (
                <span key={badge} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <MyShelfSummary />
        <div className="space-y-6">
          <CollectorRankCard />
          <section className="sticker-card rounded-[30px] p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">XP Actions</p>
            <div className="mt-4 grid gap-2">
              <Button variant="secondary" onClick={() => earnXp(15)}>
                <Sparkles className="h-4 w-4" />
                Daily visit +15 XP
              </Button>
              <Button variant="secondary" onClick={() => earnXp(30)}>
                <Star className="h-4 w-4" />
                Save collectible +30 XP
              </Button>
            </div>
          </section>
        </div>
      </div>

      <PremiumStarterCard />
    </div>
  );
}
