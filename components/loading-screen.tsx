"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { useThemeStore } from "@/lib/stores/theme-store";

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
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[linear-gradient(180deg,#fff9eb_0%,#f7efd8_52%,#f5e9d2_100%)] px-6 text-center",
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
            "absolute h-2.5 w-2.5 rounded-full bg-white/80 shadow-[0_0_14px_rgba(255,255,255,0.9)]",
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
      <p className="font-display text-4xl font-bold text-[#4f5b42] sm:text-5xl">Loading TRinkets...</p>
      <div className="relative mt-10 h-6 w-[min(520px,86vw)] rounded-full border border-[#c4b591] bg-white/75 p-1 shadow-[0_10px_28px_rgba(91,76,53,0.18)]">
        <div className={cn("h-full rounded-full bg-[linear-gradient(90deg,#b8dfa5_0%,#96c784_45%,#81b572_100%)]", reducedMotion ? "" : "loading-bar")} />
        <span className={cn("absolute bottom-1.5 left-0 text-3xl", reducedMotion ? "left-[78%]" : "loading-bunny")} aria-hidden>
          🐇
        </span>
      </div>
      <p className="mt-5 text-sm font-semibold tracking-wide text-[#5f674f]">Preparing your cozy collectible world</p>
    </div>
  );
}
