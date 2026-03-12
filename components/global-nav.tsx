import Link from "next/link";
import { Heart, Layers, UserRound } from "lucide-react";
import { LogoMark } from "@/components/logo-mark";
import { NavSearch } from "@/components/nav-search";

export function GlobalNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-[rgba(255,255,255,0.72)] backdrop-blur-2xl">
      <div className="container grid gap-4 py-4 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center">
        <Link href="/" className="inline-flex items-center justify-self-start">
          <LogoMark compact />
        </Link>
        <NavSearch
          className="w-full"
          inputClassName="h-12 bg-[rgba(255,255,255,0.54)] text-base"
        />
        <nav className="flex flex-wrap items-center justify-start gap-2 lg:justify-end">
            <Link
              href="/watchlist"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white/42 px-3 py-2 text-sm font-semibold text-foreground shadow-[var(--shadow-soft)] backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:bg-white/70"
            >
              <Heart className="h-4 w-4 text-[#7ec9ff]" />
              Watchlist
            </Link>
            <Link
              href="/collection"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white/42 px-3 py-2 text-sm font-semibold text-foreground shadow-[var(--shadow-soft)] backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:bg-white/70"
            >
              <Layers className="h-4 w-4 text-[#a8e6cf]" />
              My Shelf
            </Link>
            <Link
              href="/settings"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white/42 px-3 py-2 text-sm font-semibold text-foreground shadow-[var(--shadow-soft)] backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:bg-white/70"
            >
              <UserRound className="h-4 w-4 text-[#d9c6ff]" />
              Sign In
            </Link>
        </nav>
      </div>
    </header>
  );
}
