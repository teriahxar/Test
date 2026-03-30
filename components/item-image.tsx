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
    return withBasePath(src);
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
        className={`${className ?? ""} ${isFallback ? "object-contain rounded-[24px] border border-[#d6c9b5] bg-[linear-gradient(180deg,#fffdf9_0%,#faf7f2_100%)] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_10px_24px_rgba(132,108,84,0.08)]" : ""}`.trim()}
        onError={() => setCurrentSrc(fallbackItemImage)}
      />
      {isFallback && showComingSoon ? (
        <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-[#d6c9b5] bg-[#fffdf9]/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8f7661] shadow-[var(--shadow-soft)]">
          Image coming soon
        </span>
      ) : null}
    </>
  );
}
