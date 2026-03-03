"use client";

import { useEffect, useRef, useState } from "react";
import { formatCurrency } from "@/lib/utils";

export function ValueCounter({ value }: { value: number }) {
  const [display, setDisplay] = useState(value);
  const lastValue = useRef(value);

  useEffect(() => {
    const start = lastValue.current;
    const diff = value - start;
    const duration = 420;
    const startTime = performance.now();
    let frame = 0;

    const step = (time: number) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(start + diff * eased);
      if (progress < 1) {
        frame = requestAnimationFrame(step);
      }
    };

    frame = requestAnimationFrame(step);
    lastValue.current = value;
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return <span className="number-pop">{formatCurrency(display)}</span>;
}
