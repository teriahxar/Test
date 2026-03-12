import { ValueCounter } from "@/components/value-counter";

export function ValuePill({
  value,
  confidence
}: {
  value: number;
  confidence: "low" | "medium" | "high";
}) {
  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-border/70 bg-white/90 px-4 py-2 shadow-[var(--shadow-soft)]">
      <span className="font-display text-lg font-semibold">
        <ValueCounter value={value} />
      </span>
      <span className="rounded-full bg-[#fff1e3] px-3 py-1 text-xs font-semibold capitalize text-[#8a5d32]">
        {confidence}
      </span>
    </div>
  );
}
