import type { ReactNode } from "react";
import Link from "next/link";
import { BellRing, Heart, Sparkles } from "lucide-react";
import { AttributionFooter } from "@/components/attribution-footer";
import { LogoMark } from "@/components/logo-mark";
import { NavSearch } from "@/components/nav-search";
import { WorldLink } from "@/components/world-link";
import { cn } from "@/lib/utils";
import { universeHref } from "@/lib/routing";

const navItems = [
  { href: universeHref("pop-mart"), label: "Pop Mart" },
  { href: universeHref("calico-critters"), label: "Calico Critters" },
  { href: universeHref("pop"), label: "POP" },
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
        <header className="sticky top-0 z-40 border-b border-emerald-900/10 bg-[#f7fff4]/92 backdrop-blur-2xl">
          <div className="container flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
            <Link href="/" className="inline-flex items-center gap-3">
              <div>
                <LogoMark compact />
                <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-emerald-900/60">your cozy collectible market index</p>
              </div>
            </Link>
            <nav className="flex flex-wrap items-center gap-2">
              <NavSearch />
              {navItems.map((item) => {
                const Icon = item.icon;
                const classNames = cn(
                  "inline-flex items-center gap-2 rounded-full border border-emerald-900/15 bg-white px-4 py-2 text-sm font-semibold text-emerald-950 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                );
                const content = (
                  <>
                    {Icon ? <Icon className="h-4 w-4 text-primary" /> : <Sparkles className="h-4 w-4 text-primary" />}
                    <span>{item.label}</span>
                  </>
                );
                if (item.href === "/popmart" || item.href === "/calico" || item.href === "/pop" || item.href === "/") {
                  return (
                    <WorldLink key={item.href} href={item.href} className={classNames}>
                      {content}
                    </WorldLink>
                  );
                }

                return (
                  <Link key={item.href} href={item.href} className={classNames}>
                    {content}
                  </Link>
                );
              })}
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-900/15 bg-white px-3 py-2 text-xs font-semibold text-emerald-900/70">
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
