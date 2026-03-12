import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Nunito, Quicksand } from "next/font/google";
import "@/app/globals.css";
import { Providers } from "@/components/providers";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"]
});

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "TRinket",
  description: "A polished collector guide for PopMart, Calico Critters, and POP! worlds."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${nunito.variable} ${quicksand.variable}`}>
      <body className="font-body">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
