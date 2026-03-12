"use client";

import { THEME_PACKS } from "@/lib/themes";
import { useThemeStore } from "@/lib/stores/theme-store";
import { SparkleButton } from "@/components/sparkle-button";

export function SettingsClient() {
  const reducedMotion = useThemeStore((state) => state.reducedMotion);
  const setReducedMotion = useThemeStore((state) => state.setReducedMotion);
  const soundEnabled = useThemeStore((state) => state.soundEnabled);
  const setSoundEnabled = useThemeStore((state) => state.setSoundEnabled);
  const previewTheme = useThemeStore((state) => state.previewTheme);
  const pinTheme = useThemeStore((state) => state.pinTheme);
  const clearPin = useThemeStore((state) => state.clearPin);
  const pinnedUniverse = useThemeStore((state) => state.pinnedUniverse);

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
      <section className="surface-card rounded-[32px] p-6">
        <p className="section-label">Theme previews</p>
        <p className="mt-4 font-display text-2xl font-semibold">Preview world accents</p>
        <p className="mt-2 text-sm text-muted-foreground">Preview a universe pack on hover, then pin it if you want a preferred look during future visits.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {Object.values(THEME_PACKS).map((theme) => (
            <button
              key={theme.id}
              type="button"
              onMouseEnter={() => previewTheme(theme.universeSlug)}
              onMouseLeave={() => previewTheme(undefined)}
              onFocus={() => previewTheme(theme.universeSlug)}
              onBlur={() => previewTheme(undefined)}
              onClick={() => pinTheme(theme.universeSlug)}
              className={`rounded-[26px] border p-4 text-left transition-all ${
                pinnedUniverse === theme.universeSlug ? "border-primary bg-primary/10" : "border-border bg-white/90"
              }`}
            >
              <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{theme.id}</p>
              <p className="mt-2 font-display text-xl font-semibold">{theme.label}</p>
            </button>
          ))}
        </div>
        <div className="mt-5">
          <SparkleButton variant="secondary" onClick={() => clearPin()}>
            Use auto theme
          </SparkleButton>
        </div>
      </section>
      <section className="surface-card rounded-[32px] p-6">
        <p className="section-label">Accessibility</p>
        <p className="mt-4 font-display text-2xl font-semibold">Calm browsing controls</p>
        <div className="mt-6 space-y-4">
          <ToggleRow
            label="Reduced motion"
            description="Cuts the bounce and shimmer for calmer browsing."
            active={reducedMotion}
            onToggle={() => setReducedMotion(!reducedMotion)}
          />
          <ToggleRow
            label="Pop sounds"
            description="Optional landing micro-feedback toggle."
            active={soundEnabled}
            onToggle={() => setSoundEnabled(!soundEnabled)}
          />
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
    <div className="flex items-center justify-between rounded-[24px] border border-border/70 bg-white/90 px-4 py-4">
      <div>
        <p className="font-semibold">{label}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <button
        type="button"
        aria-pressed={active}
        onClick={onToggle}
        className={`relative h-8 w-14 rounded-full transition-colors ${active ? "bg-primary" : "bg-border"}`}
      >
        <span className={`absolute top-1 h-6 w-6 rounded-full bg-white transition-transform ${active ? "translate-x-7" : "translate-x-1"}`} />
      </button>
    </div>
  );
}
