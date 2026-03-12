"use client";

import Image from "next/image";
import { useThemeStore } from "@/lib/stores/theme-store";
import { asset, cn } from "@/lib/utils";

export function LoadingScreen({ className }: { className?: string }) {
  const reducedMotion = useThemeStore((state) => state.reducedMotion);

  return (
    <div
      className={cn("relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white px-6 text-center", className)}
      role="status"
      aria-live="polite"
      aria-label="Loading collectibles"
    >
      <div className={cn("relative h-24 w-64", reducedMotion ? "" : "loading-pulse")}>
        <Image src={asset("/assets/logos/trinket-logo.png")} alt="TRinket logo" fill className="object-contain" priority />
      </div>
      <p className="mt-6 text-sm font-medium tracking-[0.16em] text-[#374151]">Loading collectibles...</p>
    </div>
  );
}
