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
        className={`${className ?? ""} ${isFallback ? "object-contain rounded-[20px] bg-[linear-gradient(180deg,#fef8ee_0%,#eaf4e3_100%)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_8px_18px_rgba(53,95,68,0.12)]" : ""}`.trim()}
        onError={() => setCurrentSrc(fallbackItemImage)}
      />
      {isFallback && showComingSoon ? (
        <span className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-white/80 px-2 py-1 text-[10px] font-semibold text-[#3a6045] shadow-sm">
          Image coming soon
        </span>
      ) : null}
    </>
  );
}
