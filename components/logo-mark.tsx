import Image from "next/image";
import { asset } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function LogoMark({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <div className={cn("inline-flex items-center", className)} aria-label="TRinket logo">
      <Image
        src={asset("/assets/logos/trinket-logo.png")}
        alt="TRinket logo"
        width={compact ? 128 : 248}
        height={compact ? 46 : 90}
        className={cn(compact ? "h-[46px] w-auto" : "h-[90px] w-auto")}
        priority
      />
    </div>
  );
}
