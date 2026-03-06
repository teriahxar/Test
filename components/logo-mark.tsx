import Image from "next/image";
import { cn } from "@/lib/utils";

export function LogoMark({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <div className={cn("inline-flex items-center", className)} aria-label="TRinket logo">
      <Image
        src="/assets/logos/trinket-logo.svg"
        alt="TRinket logo"
        width={compact ? 156 : 280}
        height={compact ? 58 : 104}
        className={cn(compact ? "h-[58px] w-auto" : "h-[104px] w-auto")}
        priority
      />
    </div>
  );
}
