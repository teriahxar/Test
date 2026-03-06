import Image from "next/image";
import { asset } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function LogoMark({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <div className={cn("inline-flex items-center gap-3", className)} aria-label="TRinket logo">
      <span
        className={cn(
          "relative inline-flex shrink-0 overflow-hidden rounded-full border border-white/75 bg-white/75 shadow-[0_10px_20px_rgba(49,92,64,0.2)]",
          compact ? "h-11 w-11" : "h-16 w-16"
        )}
        aria-hidden
      >
        <Image src={asset("/assets/logos/trinket-mark.png")} alt="" fill className="object-cover" />
      </span>
      <Image
        src={asset("/assets/logos/trinket-logo.png")}
        alt="TRinket logo"
        width={compact ? 156 : 300}
        height={compact ? 56 : 108}
        className={cn(
          compact ? "h-[56px] w-auto drop-shadow-[0_8px_16px_rgba(49,92,64,0.2)]" : "h-[108px] w-auto drop-shadow-[0_10px_18px_rgba(49,92,64,0.2)]"
        )}
        priority
      />
    </div>
  );
}
