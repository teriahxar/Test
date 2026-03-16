import { Search, Sparkles } from "lucide-react";
import { ItemCard } from "@/components/item-card";
import { LandingIntroGate } from "@/components/landing-intro-gate";
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
    description: "Blind boxes, fast-moving grails, and polished price checks.",
    cardClass: "bg-[radial-gradient(circle_at_top,rgba(126,201,255,0.14),transparent_44%),rgba(255,255,255,0.74)]"
  },
  {
    href: "/pop",
    logoSrc: asset("/assets/logos/funko-pop-logo.png"),
    title: "Funko Pop",
    description: "Shelf staples, franchise favorites, and easy market discovery.",
    cardClass: "bg-[radial-gradient(circle_at_top,rgba(217,198,255,0.16),transparent_44%),rgba(255,255,255,0.74)]"
  },
  {
    href: "/calico",
    logoSrc: asset("/assets/logos/calico-critters-logo.png"),
    title: "Calico Critters",
    description: "Soft miniature worlds with calm, collectible tracking.",
    cardClass: "bg-[radial-gradient(circle_at_top,rgba(168,230,207,0.18),transparent_44%),rgba(255,255,255,0.74)]"
  }
] as const;

const QUICK_LINKS = [
  { href: "/popmart", label: "PopMart" },
  { href: "/pop", label: "Funko Pop" },
  { href: "/calico", label: "Calico Critters" }
] as const;

export default async function HomePage() {
  const trending = await getTrending();

  return (
    <SiteShell className="space-y-8 pb-12 page-enter">
      <ThemeSetter universe="neutral" />
      <LandingIntroGate />

      <section className="surface-card relative overflow-hidden rounded-[40px] px-6 py-10 sm:px-10 sm:py-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(234,246,255,0.96),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(232,255,246,0.72),transparent_24%),radial-gradient(circle_at_85%_12%,rgba(238,233,255,0.56),transparent_22%)]" aria-hidden />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="font-display text-5xl font-semibold tracking-[-0.04em] text-[#1F2933] sm:text-6xl">TRinket</p>
          <p className="mt-3 text-lg text-[#374151]">Track collectible values</p>

          <div className="mx-auto mt-8 max-w-3xl">
            <NavSearch
              className="w-full"
              inputClassName="h-16 rounded-[999px] bg-white/86 px-6 pl-14 text-base shadow-[0_24px_60px_rgba(220,232,244,0.95)]"
            />
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            {QUICK_LINKS.map((item) => (
              <WorldLink
                key={item.href}
                href={item.href}
                className="inline-flex items-center rounded-full border border-border bg-white/52 px-4 py-2 text-sm font-semibold text-[#1F2933] backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/78"
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
            Trending Now
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
            <Search className="h-3.5 w-3.5" />
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
    </SiteShell>
  );
}
