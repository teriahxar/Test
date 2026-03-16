import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { Providers } from "@/components/providers";

const interDisplay = Inter({
  subsets: ["latin"],
  variable: "--font-display-inter",
  display: "swap"
});

const interBody = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap"
});

export const metadata: Metadata = {
  title: "TRinket",
  description: "A polished collector guide for PopMart, Calico Critters, and POP! worlds."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${interDisplay.variable} ${interBody.variable}`}>
      <body className="font-body">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
