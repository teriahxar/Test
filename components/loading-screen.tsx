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
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[linear-gradient(180deg,#fff9ef_0%,#f5efdd_52%,#edf4dd_100%)] px-6 text-center",
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
      <p className="font-display text-4xl font-bold text-[#456247] sm:text-5xl">Loading TRinkets...</p>
      <div className="relative mt-10 h-6 w-[min(520px,86vw)] rounded-full border border-[#d5c7a1] bg-white/80 p-1 shadow-[0_10px_28px_rgba(91,76,53,0.14)]">
        <div className={cn("h-full rounded-full bg-[linear-gradient(90deg,#fbd1a0_0%,#dfd89d_45%,#97c489_100%)]", reducedMotion ? "" : "loading-bar")} />
        <div
          className={cn(
            "absolute -top-8 left-0 h-10 w-10 overflow-hidden rounded-full border border-white/80 bg-white/85 shadow-[0_8px_16px_rgba(58,78,52,0.2)]",
            reducedMotion ? "left-[78%]" : "loading-mark"
          )}
          aria-hidden
        >
          <Image src={asset("/assets/logos/trinket-mark.png")} alt="" fill className="object-cover" />
        </div>
      </div>
      <p className="mt-5 text-sm font-semibold tracking-wide text-[#5f674f]">Preparing your cozy collectible world</p>
    </div>
  );
}
