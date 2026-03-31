"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { withBasePath } from "@/lib/utils";

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

export function ItemImageFallback({ src, alt, className, fill = false, width, height, sizes, priority = false }: ItemImageProps) {
  const normalizedSrc = useMemo(() => (src ? withBasePath(src) : ""), [src]);
  const [imageFailed, setImageFailed] = useState(!normalizedSrc);

  if (imageFailed) {
    return (
      <div
        aria-label={alt}
        className={`${className ?? ""} flex items-center justify-center rounded-[12px] border-2 border-[#8B6F47] bg-[#FAF7F2]`.trim()}
      >
        <span className="h-6 w-6 rounded-full bg-[#C4A882]" aria-hidden />
      </div>
    );
  }

  return (
    <Image
      src={normalizedSrc}
      alt={alt}
      fill={fill}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      sizes={sizes}
      priority={priority}
      className={className}
      onError={() => setImageFailed(true)}
    />
  );
}
