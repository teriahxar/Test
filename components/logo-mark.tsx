import { cn } from "@/lib/utils";

export function LogoMark({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <div className={cn("inline-flex items-center", className)}>
      <div
        className={cn(
          "inline-flex items-center gap-2 rounded-full border border-emerald-900/20 bg-emerald-700 px-4 py-1.5 text-emerald-50 shadow-[0_10px_24px_rgba(18,78,56,0.28)]",
          compact ? "text-base" : "text-2xl"
        )}
        aria-label="TRinket logo"
      >
        <span className={cn("font-display font-semibold tracking-wide", compact ? "text-lg leading-none" : "text-3xl leading-none")}>TRinket</span>
        <span className={cn("inline-block rounded-full bg-emerald-100/30", compact ? "h-2.5 w-2.5" : "h-3 w-3")} aria-hidden />
      </div>
    </div>
  );
}
