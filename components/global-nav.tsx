import Link from "next/link";
import { Heart, Layers, UserRound } from "lucide-react";
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
    <header className="sticky top-0 z-40 border-b border-border/70 bg-[rgba(255,251,246,0.84)] backdrop-blur-2xl">
      <div className="container flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
        <Link href="/" className="inline-flex items-center">
          <LogoMark compact />
        </Link>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-4">
          <NavSearch />
          <nav className="flex flex-wrap items-center gap-2">
            <div className="inline-flex rounded-full border border-border bg-white/92 p-1 shadow-[var(--shadow-soft)]">
              {worldItems.map((item) => (
                <WorldLink
                  key={item.href}
                  href={item.href}
                  className={cn("inline-flex items-center rounded-full px-3 py-2 text-xs font-semibold text-foreground transition hover:bg-secondary")}
                >
                  {item.label}
                </WorldLink>
              ))}
            </div>
            <Link
              href="/watchlist"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-2 text-sm font-semibold text-foreground shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5"
            >
              <Heart className="h-4 w-4 text-[#c77d7d]" />
              Watchlist
            </Link>
            <Link
              href="/collection"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-2 text-sm font-semibold text-foreground shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5"
            >
              <Layers className="h-4 w-4 text-[#88a78f]" />
              My Shelf
            </Link>
            <Link
              href="/settings"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-2 text-sm font-semibold text-foreground shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5"
            >
              <UserRound className="h-4 w-4 text-[#8a869d]" />
              Profile
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
