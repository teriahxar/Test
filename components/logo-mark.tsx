import Image from "next/image";
import { asset } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function LogoMark({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <div className={cn("inline-flex items-center", className)} aria-label="TRinket mark">
      <span
        className={cn(
          "relative inline-flex shrink-0 overflow-hidden rounded-full border border-white/80 bg-white/80 shadow-[0_10px_20px_rgba(49,92,64,0.2)]",
          compact ? "h-12 w-12" : "h-16 w-16"
        )}
        aria-hidden="true"
      >
        <Image src={asset("/assets/logos/trinket-mark.png")} alt="" fill className="object-cover" />
      </span>
    </div>
  );
}
