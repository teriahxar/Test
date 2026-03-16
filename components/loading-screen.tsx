"use client";

import Image from "next/image";
import { Sparkles } from "lucide-react";
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
      <div className="mb-4 flex items-center gap-2 text-[#9ebbe3]">
        <Sparkles className={cn("h-4 w-4", reducedMotion ? "" : "loading-pulse")} />
        <Sparkles className="h-3 w-3 opacity-70" />
      </div>
      <div className={cn("relative h-24 w-64", reducedMotion ? "" : "loading-pulse")}>
        <Image src={asset("/assets/logos/trinket-logo.png")} alt="TRinket logo" fill className="object-contain" priority />
      </div>
      <p className="mt-6 text-sm font-medium tracking-[0.16em] text-[#374151]">Loading collectibles...</p>
    </div>
  );
}
