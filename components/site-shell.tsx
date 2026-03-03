import type { ReactNode } from "react";
import Link from "next/link";
import type { Route } from "next";
import { BellRing, CalendarRange, Gem, Settings2 } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Universes", icon: Gem },
  { href: "/watchlist", label: "Watchlist", icon: BellRing },
  { href: "/drops", label: "Drop Calendar", icon: CalendarRange },
  { href: "/settings", label: "Settings", icon: Settings2 }
] satisfies Array<{ href: Route; label: string; icon: typeof Gem }>;

export function SiteShell({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="min-h-screen bg-background bg-theme-wash text-foreground transition-colors duration-500">
      <header className="border-b border-white/10 bg-white/20 backdrop-blur-xl">
        <div className="container flex flex-col gap-5 py-5 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-glow">
              <Gem className="h-5 w-5" />
            </div>
            <div>
              <p className="font-display text-lg font-semibold leading-none">VaultView</p>
              <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Collector value radar</p>
            </div>
          </Link>
          <nav className="flex flex-wrap items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2 text-sm font-medium text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-card"
                  )}
                >
                  <Icon className="h-4 w-4 text-primary" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      <main className={cn("container py-8 md:py-10", className)}>{children}</main>
    </div>
  );
}
