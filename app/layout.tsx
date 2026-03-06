import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Baloo_2, Quicksand } from "next/font/google";
import "@/app/globals.css";
import { Providers } from "@/components/providers";

const baloo = Baloo_2({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"]
});

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "TRinket",
  description: "Your cozy collectible market index. Whimsical value tracking for Pop Mart and Calico Critters."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${baloo.variable} ${quicksand.variable}`}>
      <body className="font-body">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
