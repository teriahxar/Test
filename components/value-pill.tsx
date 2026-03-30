import { ValueCounter } from "@/components/value-counter";

export function ValuePill({
  value,
  confidence
}: {
  value: number;
  confidence: "low" | "medium" | "high";
}) {
  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-[#d6c9b5] bg-[#fffdf9]/90 px-4 py-2 shadow-[var(--shadow-soft)]">
      <span className="font-display text-lg font-semibold">
        <ValueCounter value={value} />
      </span>
      <span className="rounded-full bg-[#f3ddd5] px-3 py-1 text-xs font-semibold capitalize text-[#7b4a35]">
        {confidence}
      </span>
    </div>
  );
}
