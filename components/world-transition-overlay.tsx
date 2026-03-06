"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { LoadingScreen } from "@/components/loading-screen";
import { useUiStore } from "@/lib/stores/ui-store";

const WORLD_ROUTES = new Set(["/", "/popmart", "/calico", "/pop"]);

export function WorldTransitionOverlay() {
  const pathname = usePathname();
  const isWorldTransitioning = useUiStore((state) => state.isWorldTransitioning);
  const transitionTarget = useUiStore((state) => state.transitionTarget);
  const endWorldTransition = useUiStore((state) => state.endWorldTransition);

  useEffect(() => {
    if (!isWorldTransitioning) {
      return;
    }

    if (!transitionTarget || pathname === transitionTarget || WORLD_ROUTES.has(pathname)) {
      const timer = window.setTimeout(() => endWorldTransition(), 420);
      return () => window.clearTimeout(timer);
    }
  }, [endWorldTransition, isWorldTransitioning, pathname, transitionTarget]);

  if (!isWorldTransitioning) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[120] animate-in fade-in duration-300">
      <LoadingScreen className="min-h-screen" />
    </div>
  );
}
