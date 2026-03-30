"use client";

import { useThemeStore } from "@/lib/stores/theme-store";
import { SparkleButton } from "@/components/sparkle-button";

export function SettingsClient() {
  const reducedMotion = useThemeStore((state) => state.reducedMotion);
  const setReducedMotion = useThemeStore((state) => state.setReducedMotion);
  const soundEnabled = useThemeStore((state) => state.soundEnabled);
  const setSoundEnabled = useThemeStore((state) => state.setSoundEnabled);

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
      <section className="surface-card rounded-[32px] p-6">
        <p className="section-label">Profile</p>
        <p className="mt-4 font-display text-3xl font-semibold text-[#2e2a26]">Collector return reasons</p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <InfoTile title="Watchlist" description="Keep the pieces you want to revisit close and tidy." />
          <InfoTile title="My Shelf" description="Track owned, wanted, sold, and dream status in one place." />
          <InfoTile title="TRinket Club" description="Premium alerts, portfolio value tracking, and deeper analytics." />
          <InfoTile title="Affiliate links" description="Quick exits to eBay, Mercari, StockX, and official product pages." />
        </div>
      </section>
      <section className="surface-card rounded-[32px] p-6">
        <p className="section-label">Preferences</p>
        <p className="mt-4 font-display text-3xl font-semibold text-[#2e2a26]">Calm browsing controls</p>
        <div className="mt-6 space-y-4">
          <ToggleRow
            label="Reduced motion"
            description="Cuts extra movement for a softer browsing rhythm."
            active={reducedMotion}
            onToggle={() => setReducedMotion(!reducedMotion)}
          />
          <ToggleRow
            label="Sound feedback"
            description="Keeps optional micro-feedback ready for future profile features."
            active={soundEnabled}
            onToggle={() => setSoundEnabled(!soundEnabled)}
          />
        </div>
        <div className="mt-6">
          <SparkleButton variant="secondary">Join TRinket Club</SparkleButton>
        </div>
      </section>
    </div>
  );
}

function ToggleRow({
  label,
  description,
  active,
  onToggle
}: {
  label: string;
  description: string;
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-[24px] border border-[#d6c9b5] bg-[#fffdf9] px-4 py-4">
      <div>
        <p className="font-semibold text-[#2e2a26]">{label}</p>
        <p className="text-sm text-[#5d554d]">{description}</p>
      </div>
      <button
        type="button"
        aria-pressed={active}
        onClick={onToggle}
        className={`relative h-8 w-14 rounded-full transition-colors ${active ? "bg-[#d4854a]" : "bg-[#d6c9b5]"}`}
      >
        <span className={`absolute top-1 h-6 w-6 rounded-full bg-white transition-transform ${active ? "translate-x-7" : "translate-x-1"}`} />
      </button>
    </div>
  );
}

function InfoTile({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-[24px] border border-[#d6c9b5] bg-[#fffdf9] p-4">
      <p className="font-display text-xl font-semibold text-[#2e2a26]">{title}</p>
      <p className="mt-2 text-sm text-[#5d554d]">{description}</p>
    </div>
  );
}
