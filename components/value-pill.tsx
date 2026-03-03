import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function ValuePill({
  value,
  confidence
}: {
  value: number;
  confidence: "low" | "medium" | "high";
}) {
  const tone = confidence === "high" ? "default" : confidence === "medium" ? "outline" : "accent";

  return (
    <div className="inline-flex items-center gap-3 rounded-full bg-white/65 px-3 py-2 shadow-sm">
      <span className="font-display text-lg font-semibold">{formatCurrency(value)}</span>
      <Badge variant={tone}>Confidence {confidence}</Badge>
    </div>
  );
}
