"use client";

import Image from "next/image";
import { useMemo } from "react";
import { useThemeStore } from "@/lib/stores/theme-store";
import { asset, cn } from "@/lib/utils";

export function LoadingScreen({ className }: { className?: string }) {
  const reducedMotion = useThemeStore((state) => state.reducedMotion);
  const sparkleNodes = useMemo(
    () =>
      Array.from({ length: 7 }).map((_, index) => ({
        id: `sparkle-${index}`,
        left: `${12 + index * 12}%`,
        top: `${14 + ((index * 17) % 48)}%`,
        delay: `${index * 0.17}s`
      })),
    []
  );

  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[linear-gradient(180deg,#fffdf8_0%,#fbf5ed_100%)] px-6 text-center",
        className
      )}
      role="status"
      aria-live="polite"
      aria-label="Loading TRinkets"
    >
      {sparkleNodes.map((sparkle) => (
        <span
          key={sparkle.id}
          className={cn(
            "absolute h-2 w-2 rounded-full bg-[#fbd1a0]/70 shadow-[0_0_14px_rgba(251,209,160,0.55)]",
            reducedMotion ? "" : "loading-sparkle"
          )}
          style={{
            left: sparkle.left,
            top: sparkle.top,
            animationDelay: sparkle.delay
          }}
          aria-hidden
        />
      ))}
      <div className="relative h-24 w-64">
        <Image src={asset("/assets/logos/trinket-logo.png")} alt="TRinket logo" fill className="object-contain drop-shadow-[0_18px_30px_rgba(83,71,56,0.08)]" priority />
      </div>
      <p className="mt-6 font-display text-3xl font-semibold text-foreground sm:text-4xl">Loading TRinkets...</p>
      <div className="relative mt-8 h-3 w-[min(420px,82vw)] overflow-hidden rounded-full border border-border/80 bg-white/90 p-[2px] shadow-[var(--shadow-soft)]">
        <div className={cn("h-full rounded-full bg-[linear-gradient(90deg,#fbd1a0_0%,#f5d8d6_52%,#dce9f3_100%)]", reducedMotion ? "w-[78%]" : "loading-bar")} />
      </div>
      <p className="mt-4 text-sm font-medium tracking-wide text-muted-foreground">Preparing your collector guide</p>
    </div>
  );
}
