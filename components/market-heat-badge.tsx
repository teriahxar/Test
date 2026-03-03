import { Flame, Snowflake, SunMedium } from "lucide-react";
import { cn } from "@/lib/utils";

const heatStyles = {
  Hot: "bg-rose-500/15 text-rose-700 border-rose-200",
  Warm: "bg-amber-500/15 text-amber-700 border-amber-200",
  Cooling: "bg-sky-500/15 text-sky-700 border-sky-200"
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
