"use client";

import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { useThemeStore } from "@/lib/stores/theme-store";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function UniverseCard({
  slug,
  name,
  description,
  eyebrow,
  className
}: {
  slug: string;
  name: string;
  description: string;
  eyebrow: string;
  className?: string;
}) {
  const setUniverse = useThemeStore((state) => state.setUniverse);

  return (
    <Card
      className={cn(
        "group relative overflow-hidden border-white/40 p-6 transition-all duration-500 ease-vault hover:-translate-y-1 hover:shadow-glow",
        slug === "pop-mart" &&
          "bg-[radial-gradient(circle_at_top_left,rgba(255,90,168,0.28),transparent_30%),linear-gradient(145deg,rgba(255,255,255,0.9),rgba(235,245,255,0.92))]",
        slug === "calico-critters" &&
          "bg-[radial-gradient(circle_at_top_left,rgba(233,205,178,0.34),transparent_32%),linear-gradient(155deg,rgba(255,250,243,0.96),rgba(245,237,225,0.94))]",
        slug === "other" &&
          "bg-[radial-gradient(circle_at_top_left,rgba(112,143,255,0.22),transparent_28%),linear-gradient(145deg,rgba(255,255,255,0.9),rgba(234,240,252,0.94))]",
        className
      )}
    >
      <div className="absolute inset-0 opacity-60 transition-transform duration-500 group-hover:scale-105" />
      <div className="relative flex h-full flex-col justify-between gap-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/55 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-foreground/80">
            <Sparkles className="h-3.5 w-3.5" />
            {eyebrow}
          </div>
          <div>
            <h2 className="font-display text-3xl font-semibold">{name}</h2>
            <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">{description}</p>
          </div>
        </div>
        <Button asChild className="w-fit" onClick={() => setUniverse(slug)}>
          <Link href={`/${slug}`}>
            Enter universe
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </Card>
  );
}
