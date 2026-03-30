import { Leaf, Sparkles } from "lucide-react";
import { HomeRecentlyViewed } from "@/components/home-recently-viewed";
import { ItemCard } from "@/components/item-card";
import { NavSearch } from "@/components/nav-search";
import { PortalWorldCard } from "@/components/portal-world-card";
import { SiteShell } from "@/components/site-shell";
import { ThemeSetter } from "@/components/theme-setter";
import { WorldLink } from "@/components/world-link";
import { getTrending } from "@/lib/queries";
import { asset } from "@/lib/utils";

const WORLDS = [
  {
    href: "/popmart",
    logoSrc: asset("/assets/logos/popmart-logo.png"),
    title: "PopMart",
    description: "Blind-box favorites, character lines, and fast-moving grails.",
    cardClass: "bg-[linear-gradient(180deg,rgba(196,206,190,0.68),rgba(250,247,242,0.92))]"
  },
  {
    href: "/pop",
    logoSrc: asset("/assets/logos/funko-pop-logo.png"),
    title: "Funko Pop",
    description: "Shelf staples, fandom icons, and easy box-window browsing.",
    cardClass: "bg-[linear-gradient(180deg,rgba(232,196,186,0.72),rgba(250,247,242,0.92))]"
  },
  {
    href: "/calico",
    logoSrc: asset("/assets/logos/calico-critters-logo.png"),
    title: "Calico Critters",
    description: "Cozy meadow sets, tiny details, and cottage-soft collecting.",
    cardClass: "bg-[linear-gradient(180deg,rgba(214,201,181,0.58),rgba(250,247,242,0.95))]"
  }
] as const;

const QUICK_LINKS = [
  { href: "/popmart", label: "PopMart" },
  { href: "/pop", label: "Funko Pop" },
  { href: "/calico", label: "Calico Critters" }
] as const;

const POPULAR_SEARCHES = ["Labubu", "Skullpanda", "Spider-Man Pop", "Sylvanian Families"] as const;

export default async function HomePage() {
  const trending = await getTrending();

  return (
    <SiteShell className="space-y-10 pb-12 page-enter">
      <ThemeSetter universe="neutral" />

      <section className="paper-panel relative overflow-hidden rounded-[36px] px-6 py-10 sm:px-10 sm:py-14">
        <div className="soft-grid absolute inset-0 opacity-25" aria-hidden />
        <div className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top,rgba(232,196,186,0.22),transparent_70%)]" aria-hidden />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="font-display text-5xl font-semibold tracking-[-0.05em] text-[#2e2a26] sm:text-7xl">TRinket</p>
          <p className="mt-4 text-lg text-[#5d554d]">Track collectible values fast.</p>

          <div className="mx-auto mt-8 max-w-3xl">
            <NavSearch className="w-full" inputClassName="h-16 rounded-full border-[#d6c9b5] bg-[#fffdf9]/95 px-6 pl-14 text-base" />
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            {QUICK_LINKS.map((item) => (
              <WorldLink
                key={item.href}
                href={item.href}
                className="ribbon-chip inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 hover:bg-[#fffaf4]"
              >
                {item.label}
              </WorldLink>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="section-label sparkle-accent">
            <Sparkles className="h-3.5 w-3.5" />
            Trending now
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {trending.slice(0, 4).map((item) => (
            <ItemCard key={item.id} item={item} compact />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="section-label">
            <Leaf className="h-3.5 w-3.5" />
            Browse worlds
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {WORLDS.map((world) => (
            <PortalWorldCard
              key={world.href}
              href={world.href}
              logoSrc={world.logoSrc}
              title={world.title}
              description={world.description}
              className={world.cardClass}
            />
          ))}
        </div>
      </section>

      <HomeRecentlyViewed />

      <section className="surface-card rounded-[28px] px-6 py-6 sm:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="section-label sparkle-accent">Popular searches</p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-[#2e2a26]">Begin with a collectible you already love</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {POPULAR_SEARCHES.map((label) => (
              <span key={label} className="ribbon-chip px-4 py-2 text-sm font-medium">
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
