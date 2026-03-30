import { Badge } from "@/components/ui/badge";

export function RarityBadge({ rarity }: { rarity: string }) {
  const variant = /secret|chase/i.test(rarity) ? "accent" : /rare|limited|ultra/i.test(rarity) ? "default" : "outline";
  return (
    <Badge variant={variant} className="rounded-[999px] px-3 py-1 text-[10px] tracking-[0.16em]">
      {rarity}
    </Badge>
  );
}
