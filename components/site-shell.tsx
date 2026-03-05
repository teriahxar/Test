import type { ReactNode } from "react";
import Link from "next/link";
import { BellRing, Heart, Sparkles } from "lucide-react";
import { AttributionFooter } from "@/components/attribution-footer";
import { LogoMark } from "@/components/logo-mark";
import { NavSearch } from "@/components/nav-search";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/pop-mart", label: "Pop Mart" },
  { href: "/calico-critters", label: "Calico Critters" },
  { href: "/trending", label: "Trending" },
  { href: "/watchlist", label: "Watchlist", icon: Heart },
  { href: "/collection", label: "Collection" }
] satisfies Array<{ href: string; label: string; icon?: typeof Heart }>;

export function SiteShell({
  children,
  className,
  hideHeader = false
}: {
  children: ReactNode;
  className?: string;
  hideHeader?: boolean;
}) {
  return (
    <div className="min-h-screen text-foreground transition-colors duration-500">
      {!hideHeader ? (
        <header className="sticky top-0 z-40 border-b border-white/30 bg-white/35 backdrop-blur-2xl">
          <div className="container flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
            <Link href="/" className="inline-flex items-center gap-3">
              <div>
                <LogoMark compact />
                <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">your cozy collectible market index</p>
              </div>
            </Link>
            <nav className="flex flex-wrap items-center gap-2">
              <NavSearch />
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border border-white/50 bg-card/80 px-4 py-2 text-sm font-semibold text-foreground shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/90"
                    )}
                  >
                    {Icon ? <Icon className="h-4 w-4 text-primary" /> : <Sparkles className="h-4 w-4 text-primary" />}
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-2 text-xs font-semibold text-muted-foreground">
                <BellRing className="h-4 w-4 text-accent" />
                alerts saved locally
              </span>
            </nav>
          </div>
        </header>
      ) : null}
      <main className={cn(hideHeader ? "" : "container py-8 md:py-10", className)}>{children}</main>
      <AttributionFooter />
    </div>
  );
}
