import { Flame, Snowflake, SunMedium } from "lucide-react";
import { cn } from "@/lib/utils";

const heatStyles = {
  Hot: "bg-[#f5dfd5] text-[#8a5239] border-[#e8c4ba]",
  Warm: "bg-[#eef2e9] text-[#566452] border-[#c4cebe]",
  Cooling: "bg-[#f1ebe4] text-[#73675c] border-[#d6c9b5]"
} as const;

const heatIcons = {
  Hot: Flame,
  Warm: SunMedium,
  Cooling: Snowflake
} as const;

export function MarketHeatBadge({ heat, className }: { heat: "Hot" | "Warm" | "Cooling"; className?: string }) {
  const Icon = heatIcons[heat];

  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold shadow-[var(--shadow-soft)]", heatStyles[heat], className)}>
      <Icon className="h-3.5 w-3.5" />
      {heat}
    </span>
  );
}
