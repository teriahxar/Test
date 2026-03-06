"use client";

import { useEffect, useState } from "react";
import { LoadingScreen } from "@/components/loading-screen";
import { useThemeStore } from "@/lib/stores/theme-store";

const SESSION_KEY = "trinket-intro-seen";

export function LandingIntroGate() {
  const [showIntro, setShowIntro] = useState(true);
  const reducedMotion = useThemeStore((state) => state.reducedMotion);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const alreadySeen = window.sessionStorage.getItem(SESSION_KEY) === "true";
    if (alreadySeen) {
      setShowIntro(false);
      return;
    }

    window.sessionStorage.setItem(SESSION_KEY, "true");
    const timeout = window.setTimeout(() => setShowIntro(false), reducedMotion ? 220 : 1400);
    return () => window.clearTimeout(timeout);
  }, [reducedMotion]);

  if (!showIntro) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[110] animate-in fade-in duration-500">
      <LoadingScreen />
    </div>
  );
}
