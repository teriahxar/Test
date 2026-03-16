"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { asset, withBasePath } from "@/lib/utils";

const fallbackItemImage = asset("/assets/logos/trinket-logo.png");

type ItemImageProps = {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  showComingSoon?: boolean;
};

export function ItemImageFallback({
  src,
  alt,
  className,
  fill = false,
  width,
  height,
  sizes,
  priority = false,
  showComingSoon = true
}: ItemImageProps) {
  const normalizedSrc = useMemo(() => {
    if (!src) {
      return fallbackItemImage;
    }
    const normalized = withBasePath(src);
    if (normalized.toLowerCase().endsWith(".svg")) {
      return fallbackItemImage;
    }
    return normalized;
  }, [src]);
  const [currentSrc, setCurrentSrc] = useState(normalizedSrc);
  const isFallback = currentSrc === fallbackItemImage;

  return (
    <>
      <Image
        src={currentSrc}
        alt={alt}
        fill={fill}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        sizes={sizes}
        priority={priority}
        className={`${className ?? ""} ${isFallback ? "object-contain rounded-[24px] bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_100%)] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_14px_28px_rgba(31,41,51,0.06)]" : ""}`.trim()}
        onError={() => setCurrentSrc(fallbackItemImage)}
      />
      {isFallback && showComingSoon ? (
        <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-border/70 bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground shadow-[var(--shadow-soft)]">
          TRinket placeholder
        </span>
      ) : null}
    </>
  );
}
