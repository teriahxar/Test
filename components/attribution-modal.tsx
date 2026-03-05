"use client";

import Link from "next/link";
import { CircleHelp } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export function AttributionModal() {
  return (
    <Dialog>
      <DialogTrigger className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground underline-offset-4 hover:underline">
        <CircleHelp className="h-3.5 w-3.5" />
        image usage note
      </DialogTrigger>
      <DialogContent>
        <h3 className="font-display text-2xl font-semibold">Image policy</h3>
        <p className="mt-3 text-sm text-muted-foreground">
          TRinket uses local placeholder item visuals in the MVP for quick identification. Attribution fields and official product links are shown so you can verify details directly with brand pages.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          Do not reuse brand imagery without permission. Replace local assets only with approved or licensed files and keep source credits in sync.
        </p>
        <Link href="/attribution" className="mt-4 inline-block text-sm font-semibold text-primary underline-offset-4 hover:underline">
          Open full attribution policy
        </Link>
      </DialogContent>
    </Dialog>
  );
}
