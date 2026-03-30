"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WatchlistButton({
  saved,
  onClick
}: {
  saved: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      variant={saved ? "secondary" : "tertiary"}
      size="sm"
      className="h-9 px-3 text-xs font-semibold"
      onClick={onClick}
      aria-label={saved ? "Remove from watchlist" : "Save to watchlist"}
    >
      <Heart className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
      {saved ? "Saved" : "Save"}
    </Button>
  );
}
