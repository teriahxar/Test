import { Badge } from "@/components/ui/badge";

export function RarityBadge({ rarity }: { rarity: string }) {
  const variant = /secret|chase/i.test(rarity) ? "accent" : /rare|limited/i.test(rarity) ? "default" : "outline";
  return <Badge variant={variant}>{rarity}</Badge>;
}
