"use client";

import type { MouseEvent, ReactNode } from "react";
import Link, { type LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useThemeStore } from "@/lib/stores/theme-store";
import { useUiStore } from "@/lib/stores/ui-store";

const WORLD_PATHS = new Set(["/", "/popmart", "/calico", "/pop"]);
const WORLD_THEME_BY_PATH: Record<string, string> = {
  "/popmart": "pop-mart",
  "/calico": "calico-critters",
  "/pop": "pop"
};

export function WorldLink({
  href,
  className,
  children,
  onClick
}: LinkProps & { className?: string; children: ReactNode; onClick?: (event: MouseEvent<HTMLAnchorElement>) => void }) {
  const router = useRouter();
  const pathname = usePathname();
  const setUniverse = useThemeStore((state) => state.setUniverse);
  const beginWorldTransition = useUiStore((state) => state.beginWorldTransition);
  const hrefString = typeof href === "string" ? href : href.pathname ?? "";

  return (
    <Link
      href={href}
      className={className}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
          return;
        }

        if (!WORLD_PATHS.has(pathname) || !WORLD_PATHS.has(hrefString) || pathname === hrefString) {
          return;
        }

        event.preventDefault();
        const targetUniverse = WORLD_THEME_BY_PATH[hrefString];
        if (targetUniverse) {
          setUniverse(targetUniverse);
        }
        beginWorldTransition(hrefString);
        window.setTimeout(() => router.push(hrefString), 900);
      }}
    >
      {children}
    </Link>
  );
}
