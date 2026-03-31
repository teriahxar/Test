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

function FallbackSlot({ alt, className, showComingSoon = true }: { alt: string; className?: string; showComingSoon?: boolean }) {
  return (
    <div aria-label={alt} className={`${className ?? ""} flex flex-col items-center justify-center gap-3 bg-[#fffaf4] p-6`.trim()}>
      <div className="relative h-14 w-28">
        <Image src={fallbackItemImage} alt="TRinket logo" fill className="object-contain" />
      </div>
      {showComingSoon ? (
        <span className="rounded-full border border-[#E8E0D4] bg-[#FFFCF8] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8B6F47]">
          Image coming soon
        </span>
      ) : null}
    </div>
  );
}

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

    const withPath = withBasePath(src);
    if (withPath.toLowerCase().endsWith(".svg")) {
      return fallbackItemImage;
    }

    return withPath;
  }, [src]);

  const [currentSrc, setCurrentSrc] = useState(normalizedSrc);
  const isFallback = currentSrc === fallbackItemImage;

  if (isFallback) {
    return <FallbackSlot alt={alt} className={className} showComingSoon={showComingSoon} />;
  }

  return (
    <Image
      src={currentSrc}
      alt={alt}
      fill={fill}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      sizes={sizes}
      priority={priority}
      className={className}
      onError={() => setCurrentSrc(fallbackItemImage)}
    />
  );
}
