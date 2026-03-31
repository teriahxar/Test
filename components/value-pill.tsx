import { ValueCounter } from "@/components/value-counter";

export function ValuePill({
  value,
  confidence
}: {
  value: number;
  confidence: "low" | "medium" | "high";
}) {
  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-[#E8E0D4] bg-[#FFFCF8] px-4 py-2">
      <span className="font-display text-lg font-semibold">
        <ValueCounter value={value} />
      </span>
      <span className="rounded-full bg-[#F5EDE0] px-3 py-1 text-xs font-medium capitalize text-[#8B6F47]">
        {confidence}
      </span>
    </div>
  );
}
