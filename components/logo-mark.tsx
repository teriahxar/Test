import { cn } from "@/lib/utils";

export function LogoMark({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <svg viewBox="0 0 120 48" className={cn("text-primary", compact ? "h-8 w-[88px]" : "h-10 w-[110px]")} aria-label="TRinket logo">
        <path d="M11 9c4 0 7 2 7 6v22h-5V18h-7v-4h7v-5Z" fill="currentColor" />
        <path d="M16 7c2-4 8-6 12-4-3 2-5 5-6 9-2-1-4-2-6-5Z" fill="hsl(var(--accent))" />
        <circle cx="30" cy="10" r="2.5" fill="hsl(var(--accent))" />
        <text x="28" y="34" fill="hsl(var(--foreground))" fontFamily="var(--font-display)" fontSize="28" fontWeight="600">
          Rinket
        </text>
        <path d="M92 11c5 2 8 5 10 9" stroke="hsl(var(--accent))" strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  );
}
