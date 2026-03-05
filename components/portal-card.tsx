"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Wand2 } from "lucide-react";
import { StickerPack } from "@/components/sticker-pack";
import { useThemeStore } from "@/lib/stores/theme-store";
import { cn } from "@/lib/utils";

export function PortalCard({
  slug,
  title,
  subtitle,
  thumbnails,
  stickerNames
}: {
  slug: string;
  title: string;
  subtitle: string;
  thumbnails: string[];
  stickerNames: string[];
}) {
  const setUniverse = useThemeStore((state) => state.setUniverse);
  const previewTheme = useThemeStore((state) => state.previewTheme);

  return (
    <article
      className={cn(
        "sticker-card group relative overflow-hidden rounded-[36px] p-6 transition-all duration-500 hover:-translate-y-2 hover:rotate-[0.6deg]",
        slug === "pop-mart" && "bg-[linear-gradient(160deg,rgba(255,255,255,0.8),rgba(243,233,255,0.9))]",
        slug === "calico-critters" && "bg-[linear-gradient(160deg,rgba(255,252,247,0.9),rgba(244,238,227,0.94))]"
      )}
      onMouseEnter={() => previewTheme(slug)}
      onMouseLeave={() => previewTheme(undefined)}
    >
      <StickerPack names={stickerNames} tone="accent" className="opacity-80" />
      <div className="relative flex h-full flex-col justify-between gap-6">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            <Wand2 className="h-4 w-4 text-primary" />
            portal
          </div>
          <div>
            <h2 className="font-display text-4xl font-semibold">{title}</h2>
            <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">{subtitle}</p>
          </div>
          <div className="flex -space-x-4">
            {thumbnails.map((thumbnail, index) => (
              <div
                key={`${thumbnail}-${index}`}
                className="relative h-20 w-20 overflow-hidden rounded-[22px] border-4 border-white/80 shadow-sm transition-transform duration-300 group-hover:-translate-y-1"
                style={{ transform: `rotate(${index % 2 === 0 ? -4 : 4}deg)` }}
              >
                <Image src={thumbnail} alt="" fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
        <Link
          href={`/${slug}`}
          onClick={() => setUniverse(slug)}
          className="vault-button-primary inline-flex w-fit items-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5"
        >
          Enter portal
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
