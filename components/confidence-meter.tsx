import { cn } from "@/lib/utils";

export function ConfidenceMeter({
  confidence,
  score
}: {
  confidence: "low" | "medium" | "high";
  score: number;
}) {
  const tone =
    confidence === "high" ? "bg-emerald-400" : confidence === "medium" ? "bg-amber-300" : "bg-rose-300";

  return (
    <div className="rounded-[24px] border border-border bg-white/70 p-4">
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold capitalize text-foreground">{confidence} confidence</span>
        <span className="text-muted-foreground">{Math.round(score * 100)}%</span>
      </div>
      <div className="mt-3 h-3 rounded-full bg-muted">
        <div
          className={cn("h-3 rounded-full transition-all duration-500", tone)}
          style={{ width: `${Math.round(score * 100)}%` }}
        />
      </div>
    </div>
  );
}
