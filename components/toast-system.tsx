"use client";

import { useEffect } from "react";
import { useToastStore } from "@/lib/stores/toast-store";

export function ToastViewport() {
  const toasts = useToastStore((state) => state.toasts);
  const dismiss = useToastStore((state) => state.dismiss);

  useEffect(() => {
    const timers = toasts.map((toast) => setTimeout(() => dismiss(toast.id), 2600));
    return () => timers.forEach(clearTimeout);
  }, [dismiss, toasts]);

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[70] flex w-full max-w-sm flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto animate-[toast-in_220ms_cubic-bezier(0.22,1,0.36,1)] rounded-[24px] border border-border bg-card/95 p-4 shadow-vault backdrop-blur-xl"
        >
          <p className="font-display text-sm font-semibold">{toast.title}</p>
          {toast.description ? <p className="mt-1 text-sm text-muted-foreground">{toast.description}</p> : null}
        </div>
      ))}
    </div>
  );
}
