import { Flame, Snowflake, SunMedium } from "lucide-react";
import { cn } from "@/lib/utils";

const heatStyles = {
  Hot: "bg-[#f7e1df] text-[#a06060] border-[#edd0ce]",
  Warm: "bg-[#fff0e0] text-[#9c6b37] border-[#f1dcc5]",
  Cooling: "bg-[#e8f0f7] text-[#617e98] border-[#d6e4f1]"
} as const;

const heatIcons = {
  Hot: Flame,
  Warm: SunMedium,
  Cooling: Snowflake
} as const;

export function MarketHeatBadge({ heat, className }: { heat: "Hot" | "Warm" | "Cooling"; className?: string }) {
  const Icon = heatIcons[heat];

  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold", heatStyles[heat], className)}>
      <Icon className="h-3.5 w-3.5" />
      {heat}
    </span>
  );
}
