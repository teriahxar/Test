"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Filters = {
  rarity?: string;
};

export function FilterDrawer({
  rarity,
  setRarity
}: {
  rarity?: string;
  setRarity: (value?: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>
      </DialogTrigger>
      <DialogContent aria-label="Filter collectibles">
        <div className="space-y-6">
          <div>
            <p className="font-display text-xl font-semibold">Filters</p>
            <p className="mt-1 text-sm text-muted-foreground">Narrow by rarity across the current release scope.</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {["Common", "Rare", "Ultra Rare", "Chase", "Secret", "Limited"].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => {
                  setRarity(rarity === value ? undefined : value);
                  setOpen(false);
                }}
                className={`rounded-[18px] border px-4 py-3 text-left text-sm transition-colors ${
                  rarity === value
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card/70 hover:bg-muted"
                }`}
              >
                {value}
              </button>
            ))}
          </div>
          <Button variant="ghost" onClick={() => setRarity(undefined)}>
            Clear filters
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
