"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export function ProAlertModal({ className }: { className?: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className={`inline-flex items-center rounded-full border border-[#C4A882] px-3 py-1.5 text-[12px] font-medium text-[#8B6F47] transition hover:bg-[#F5EDE0] ${className ?? ""}`}
        >
          Price alerts — Pro 🔒
        </button>
      </DialogTrigger>
      <DialogContent className="h-auto max-w-sm rounded-[16px] border-[#8B6F47] bg-[#FFFCF8] p-6">
        <div className="space-y-3">
          <h2 className="font-display text-2xl font-semibold text-[#2C2418]">Price alerts — Pro 🔒</h2>
          <p className="text-sm leading-6 text-[#5D554D]">Get notified when this drops or spikes. Upgrade to TRinket Pro — $5/mo.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
