"use client";

import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SparkleButton({ className, children, ...props }: ButtonProps) {
  return (
    <Button
      className={cn("group relative overflow-hidden rounded-full px-5 py-2.5 text-sm font-bold", className)}
      {...props}
    >
      <span className="absolute -left-10 top-0 h-full w-8 rotate-12 bg-white/35 blur-md transition-transform duration-500 group-hover:translate-x-[220px]" />
      <span className="relative z-10">{children}</span>
    </Button>
  );
}
