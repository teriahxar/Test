"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { ToastViewport } from "@/components/toast-system";
import { WorldTransitionOverlay } from "@/components/world-transition-overlay";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      {children}
      <WorldTransitionOverlay />
      <ToastViewport />
    </ThemeProvider>
  );
}
