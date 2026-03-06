import Link from "next/link";
import { Heart, Layers, Sparkles } from "lucide-react";
import { LogoMark } from "@/components/logo-mark";
import { NavSearch } from "@/components/nav-search";
import { WorldLink } from "@/components/world-link";
import { cn } from "@/lib/utils";
import { universeHref } from "@/lib/routing";

const worldItems = [
  { href: universeHref("pop-mart"), label: "PopMart" },
  { href: universeHref("calico-critters"), label: "Calico" },
  { href: universeHref("pop"), label: "POP!" }
] as const;

export function GlobalNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-emerald-900/10 bg-[#f7fff4]/90 backdrop-blur-2xl">
      <div className="container flex flex-col gap-3 py-4 lg:flex-row lg:items-center lg:justify-between">
        <Link href="/" className="inline-flex items-center">
          <LogoMark compact />
        </Link>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <NavSearch />
          <nav className="flex flex-wrap items-center gap-2">
            <div className="inline-flex rounded-full border border-emerald-900/15 bg-white/85 p-1 shadow-sm">
              {worldItems.map((item) => (
                <WorldLink
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold text-emerald-900 transition hover:bg-emerald-50"
                  )}
                >
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  {item.label}
                </WorldLink>
              ))}
            </div>
            <Link
              href="/watchlist"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-900/15 bg-white px-3 py-2 text-sm font-semibold text-emerald-950 shadow-sm transition-all hover:-translate-y-0.5"
            >
              <Heart className="h-4 w-4 text-primary" />
              Watchlist
            </Link>
            <Link
              href="/collection"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-900/15 bg-white px-3 py-2 text-sm font-semibold text-emerald-950 shadow-sm transition-all hover:-translate-y-0.5"
            >
              <Layers className="h-4 w-4 text-accent" />
              My Shelf
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
