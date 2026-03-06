import Image from "next/image";
import { asset } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function LogoMark({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <div className={cn("inline-flex items-center", className)} aria-label="TRinket logo">
      <Image
        src={asset("/assets/logos/trinket-logo.png")}
        alt="TRinket logo"
        width={compact ? 170 : 320}
        height={compact ? 62 : 120}
        className={cn(compact ? "h-[62px] w-auto" : "h-[120px] w-auto")}
        priority
      />
    </div>
  );
}
