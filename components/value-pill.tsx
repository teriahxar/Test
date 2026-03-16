import { ValueCounter } from "@/components/value-counter";

export function ValuePill({
  value,
  confidence
}: {
  value: number;
  confidence: "low" | "medium" | "high";
}) {
  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-border/70 bg-white/72 px-4 py-2 shadow-[var(--shadow-soft)] backdrop-blur-xl">
      <span className="font-display text-lg font-semibold">
        <ValueCounter value={value} />
      </span>
      <span className="rounded-full bg-[#eaf6ff] px-3 py-1 text-xs font-semibold capitalize text-[#4f7eaa]">
        {confidence}
      </span>
    </div>
  );
}
