import { cn } from "@/lib/utils";

export function ConfidenceMeter({
  confidence,
  score
}: {
  confidence: "low" | "medium" | "high";
  score: number;
}) {
  const tone =
    confidence === "high" ? "bg-[#c4cebe]" : confidence === "medium" ? "bg-[#d4854a]" : "bg-[#e8c4ba]";

  return (
    <div className="rounded-[24px] border border-[#d6c9b5] bg-[#fffdf9] p-4">
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold capitalize text-[#2e2a26]">{confidence} confidence</span>
        <span className="text-[#5d554d]">{Math.round(score * 100)}%</span>
      </div>
      <div className="mt-3 h-3 rounded-full bg-[#efe8de]">
        <div
          className={cn("h-3 rounded-full transition-all duration-500", tone)}
          style={{ width: `${Math.round(score * 100)}%` }}
        />
      </div>
    </div>
  );
}
