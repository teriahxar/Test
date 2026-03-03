import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/app/globals.css";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "VaultView",
  description: "Browse collectible market value, trends, watchlists, and upcoming drops."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
