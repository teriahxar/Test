import { Flame, Snowflake, SunMedium } from "lucide-react";
import { cn } from "@/lib/utils";

const heatStyles = {
  Hot: "bg-[#e8f8ff] text-[#2f6f9b] border-[#cfe9fb]",
  Warm: "bg-[#eefcf5] text-[#4f8a74] border-[#d8f3e5]",
  Cooling: "bg-[#f3f6fb] text-[#66758a] border-[#dde5ef]"
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
