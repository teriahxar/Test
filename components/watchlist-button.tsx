"use client";

import { Heart } from "lucide-react";
import { SparkleButton } from "@/components/sparkle-button";

export function WatchlistButton({
  saved,
  onClick
}: {
  saved: boolean;
  onClick: () => void;
}) {
  return (
    <SparkleButton variant={saved ? "secondary" : "outline"} className="h-10 px-4" onClick={onClick} aria-label={saved ? "Remove from watchlist" : "Save to watchlist"}>
      <Heart className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
      {saved ? "Saved" : "Save"}
    </SparkleButton>
  );
}
