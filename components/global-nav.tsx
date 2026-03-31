import Link from "next/link";
import { Heart, Layers3, UserRound } from "lucide-react";
import { LogoMark } from "@/components/logo-mark";
import { NavSearch } from "@/components/nav-search";

const NAV_ITEMS = [
  { href: "/watchlist", label: "Watchlist", icon: Heart },
  { href: "/collection", label: "My Shelf", icon: Layers3 },
  { href: "/settings", label: "Sign In", icon: UserRound }
] as const;

export function GlobalNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#E8E0D4] bg-[#FAF8F4]">
      <div className="container grid gap-4 py-4 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center">
        <Link href="/" className="inline-flex items-center justify-self-start">
          <LogoMark compact />
        </Link>
        <NavSearch className="w-full" inputClassName="h-14 rounded-full border-[#E8E0D4] bg-[#FFFCF8]" />
        <nav className="flex flex-wrap items-center justify-start gap-2 lg:justify-end">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="inline-flex items-center gap-2 rounded-full border border-[#E8E0D4] bg-[#FFFCF8] px-4 py-2.5 text-sm font-medium text-[#5D554D] transition hover:bg-[#F5EDE0]"
            >
              <Icon className="h-4 w-4 text-[#8B6F47]" />
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
