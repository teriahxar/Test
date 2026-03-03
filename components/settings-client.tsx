"use client";

import { THEME_PACKS } from "@/lib/themes";
import { useThemeStore } from "@/lib/stores/theme-store";
import { Button } from "@/components/ui/button";

export function SettingsClient() {
  const reducedMotion = useThemeStore((state) => state.reducedMotion);
  const setReducedMotion = useThemeStore((state) => state.setReducedMotion);
  const previewTheme = useThemeStore((state) => state.previewTheme);
  const pinTheme = useThemeStore((state) => state.pinTheme);
  const clearPin = useThemeStore((state) => state.clearPin);
  const selectedUniverse = useThemeStore((state) => state.selectedUniverse);
  const pinnedUniverse = useThemeStore((state) => state.pinnedUniverse);

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
      <section className="rounded-[30px] border border-border bg-card/80 p-6 shadow-vault">
        <p className="font-display text-2xl font-semibold">Theme preview switcher</p>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          Preview a universe pack, then pin it if you want to keep that look across pages instead of auto-following the current selection.
        </p>
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
              className={`rounded-[24px] border p-4 text-left transition-all ${
                pinnedUniverse === theme.universeSlug || (!pinnedUniverse && selectedUniverse === theme.universeSlug)
                  ? "border-primary bg-primary/8"
                  : "border-border bg-muted/50"
              }`}
            >
              <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{theme.id}</p>
              <p className="mt-2 font-display text-xl font-semibold">{theme.label}</p>
              <p className="mt-2 text-sm text-muted-foreground">{theme.universeSlug}</p>
            </button>
          ))}
        </div>
        <div className="mt-5 flex gap-3">
          <Button variant="outline" onClick={() => clearPin()}>
            Return to auto theme
          </Button>
        </div>
      </section>
      <section className="rounded-[30px] border border-border bg-card/80 p-6 shadow-vault">
        <p className="font-display text-2xl font-semibold">Accessibility</p>
        <div className="mt-6 flex items-center justify-between rounded-[22px] bg-muted/70 px-4 py-4">
          <div>
            <p className="font-medium">Reduced motion</p>
            <p className="text-sm text-muted-foreground">Limit theme transitions and animated UI movement.</p>
          </div>
          <button
            type="button"
            aria-pressed={reducedMotion}
            onClick={() => setReducedMotion(!reducedMotion)}
            className={`relative h-8 w-14 rounded-full transition-colors ${reducedMotion ? "bg-primary" : "bg-border"}`}
          >
            <span
              className={`absolute top-1 h-6 w-6 rounded-full bg-white transition-transform ${
                reducedMotion ? "translate-x-7" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </section>
    </div>
  );
}
