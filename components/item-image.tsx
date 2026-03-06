"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { asset, withBasePath } from "@/lib/utils";

const fallbackItemImage = asset("/assets/logos/trinket-mark.png");

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

export function ItemImageWithFallback({ src, alt, className, fill = false, width, height, sizes, priority = false, showComingSoon = false }: ItemImageProps) {
  const normalizedSrc = useMemo(() => (src ? withBasePath(src) : fallbackItemImage), [src]);
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
        className={`${className ?? ""} ${isFallback ? "object-contain bg-[linear-gradient(180deg,#f0f7e8_0%,#e8f3df_100%)] p-5" : ""}`.trim()}
        onError={() => setCurrentSrc(fallbackItemImage)}
      />
      {isFallback && showComingSoon ? (
        <span className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-white/75 px-2 py-1 text-[10px] font-semibold text-[#3a6045]">
          Image coming soon
        </span>
      ) : null}
    </>
  );
}

export function ItemImage(props: ItemImageProps) {
  return <ItemImageWithFallback {...props} />;
}
