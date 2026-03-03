import { ValueCounter } from "@/components/value-counter";

export function ValuePill({
  value,
  confidence
}: {
  value: number;
  confidence: "low" | "medium" | "high";
}) {
  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-white/60 bg-white/80 px-4 py-2 shadow-sm">
      <span className="font-display text-lg font-semibold">
        <ValueCounter value={value} />
      </span>
      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold capitalize text-primary">
        {confidence}
      </span>
    </div>
  );
}
