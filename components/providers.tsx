"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { ToastViewport } from "@/components/toast-system";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      {children}
      <ToastViewport />
    </ThemeProvider>
  );
}
