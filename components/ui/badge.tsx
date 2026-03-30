import type * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-[999px] border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] shadow-[var(--shadow-soft)]",
  {
    variants: {
      variant: {
        default: "border-[#d9b8a8] bg-[#f3ddd5] text-[#7b4a35]",
        outline: "border-border bg-card/90 text-[#5d554d]",
        accent: "border-[#d6c9b5] bg-[#ebe7de] text-[#6e6156]"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
