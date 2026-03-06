"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { asset, withBasePath } from "@/lib/utils";

const fallbackItemImage = asset("/img/branding/logo-circle.png");

export function ItemImage({
  src,
  alt,
  className,
  fill = false,
  width,
  height,
  sizes,
  priority = false
}: {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
}) {
  const normalizedSrc = useMemo(() => withBasePath(src), [src]);
  const [currentSrc, setCurrentSrc] = useState(normalizedSrc);

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
