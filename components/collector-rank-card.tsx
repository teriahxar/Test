"use client";

import Image from "next/image";
import { getCollectorRank, getNextCollectorRank } from "@/lib/collector-ranks";
import { useCollectorProfileStore } from "@/lib/stores/collector-profile-store";
import { withBasePath } from "@/lib/utils";

export function CollectorRankCard() {
  const profile = useCollectorProfileStore((state) => state.profile);
  const rank = getCollectorRank(profile.xp);
  const nextRank = getNextCollectorRank(profile.xp);
  const progress = nextRank ? Math.min(100, ((profile.xp - rank.minXp) / (nextRank.minXp - rank.minXp)) * 100) : 100;

  return (
    <section className="surface-card rounded-[30px] p-5">
      <p className="section-label">Collector rank</p>
      <div className="mt-3 flex items-center gap-4">
        <div className="relative h-16 w-16 overflow-hidden rounded-full border border-border bg-[#fff8f0]">
          <Image src={withBasePath(profile.avatarPath)} alt={`${profile.displayName} avatar`} fill className="object-contain p-2" />
        </div>
        <div>
          <p className="font-display text-2xl font-semibold">{rank.name}</p>
          <p className="text-sm text-muted-foreground">{profile.xp} XP</p>
        </div>
      </div>
      <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-[#f4ede4]">
        <div
          className="h-full rounded-full bg-[linear-gradient(90deg,#fbd1a0_0%,#f2c4b3_48%,#d3e0ef_100%)] transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-muted-foreground">{nextRank ? `${nextRank.minXp - profile.xp} XP to ${nextRank.name}` : "Max rank reached"}</p>
    </section>
  );
}
