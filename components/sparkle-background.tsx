"use client";

import { useMemo } from "react";

export function SparkleBackground({ count = 18 }: { count?: number }) {
  const dots = useMemo(
    () =>
      Array.from({ length: count }).map((_, index) => ({
        id: `${index}`,
        left: `${6 + (index * 11) % 90}%`,
        top: `${6 + (index * 13) % 88}%`,
        size: `${4 + (index % 4) * 2}px`,
        delay: `${index * 0.28}s`
      })),
    [count]
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((dot) => (
        <span
          key={dot.id}
          className="sparkle-dot"
          style={{ left: dot.left, top: dot.top, width: dot.size, height: dot.size, animationDelay: dot.delay }}
        />
      ))}
      <div className="leaf-float left-[6%] top-[14%] rotate-[-8deg]" />
      <div className="leaf-float left-[84%] top-[20%] rotate-[10deg]" />
      <div className="leaf-float left-[12%] top-[78%] rotate-[16deg]" />
      <div className="leaf-float left-[75%] top-[76%] rotate-[-10deg]" />
    </div>
  );
}
