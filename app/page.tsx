import { ArrowRight, Sparkles, Star } from "lucide-react";
import { LandingHero } from "@/components/landing-hero";
import { LandingIntroGate } from "@/components/landing-intro-gate";
import { LogoMark } from "@/components/logo-mark";
import { PortalWorldCard } from "@/components/portal-world-card";
import { ThemeSetter } from "@/components/theme-setter";
import { Button } from "@/components/ui/button";
import { WorldLink } from "@/components/world-link";
import { getTrending } from "@/lib/queries";
import { universeItemHref } from "@/lib/routing";
import { asset } from "@/lib/utils";

const WORLDS = [
  {
    href: "/popmart",
    logoSrc: asset("/assets/logos/popmart-logo.png"),
    title: "PopMart World",
    description: "Blind boxes, fan-favorite releases, and the figures collectors check most often.",
    cardClass: "bg-[linear-gradient(180deg,rgba(255,248,247,0.92)_0%,rgba(255,255,255,0.92)_100%)]"
  },
  {
    href: "/calico",
    logoSrc: asset("/assets/logos/calico-critters-logo.png"),
    title: "Calico Critters Meadow",
    description: "Warm miniature sets, soft cottage shelves, and calm price reference browsing.",
    cardClass: "bg-[linear-gradient(180deg,rgba(250,246,239,0.94)_0%,rgba(255,255,255,0.92)_100%)]"
  },
  {
    href: "/pop",
    logoSrc: asset("/assets/logos/funko-pop-logo.png"),
    title: "POP! World",
    description: "Iconic POP! releases, familiar franchises, and fast shelf tracking for collectors.",
    cardClass: "bg-[linear-gradient(180deg,rgba(245,249,253,0.94)_0%,rgba(255,255,255,0.92)_100%)]"
  }
] as const;

export default async function HomePage() {
  const trending = await getTrending();

  return (
    <main className="page-shell relative min-h-screen overflow-hidden px-4 py-6 md:px-8 md:py-8">
      <ThemeSetter universe="neutral" />
      <LandingIntroGate />
      <div className="page-content relative mx-auto flex min-h-screen w-full max-w-6xl flex-col">
        <header className="flex items-start justify-start pt-2">
          <WorldLink href="/" className="inline-flex">
            <LogoMark compact className="drop-shadow-[0_14px_24px_rgba(83,71,56,0.08)]" />
          </WorldLink>
        </header>

        <div className="flex-1">
          <section className="surface-card relative mt-6 overflow-hidden rounded-[40px] px-6 py-10 sm:px-10 sm:py-14">
            <div className="absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_top,rgba(251,209,160,0.16),transparent_42%)]" aria-hidden />
            <LandingHero />
            <div className="mt-10 flex justify-center">
              <Button asChild size="lg">
                <WorldLink href="/popmart">
                  Explore collectibles
                  <ArrowRight className="h-4 w-4" />
                </WorldLink>
              </Button>
            </div>
          </section>

          <section className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="surface-card rounded-[32px] p-6 sm:p-8">
              <p className="section-label">
                <Sparkles className="h-3.5 w-3.5" />
                Brand statement
              </p>
              <h2 className="mt-5 font-display text-3xl font-bold text-foreground sm:text-4xl">
                The clear collector reference for the pieces you actually track.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
                TRinket brings pricing, release context, save tools, and profile tracking into one calm place so browsing feels easy on every screen.
              </p>
            </div>
            <div className="surface-subtle rounded-[32px] p-6 sm:p-8">
              <p className="section-label">
                <Star className="h-3.5 w-3.5" />
                Why people use TRinket
              </p>
              <div className="mt-5 grid gap-3 text-sm text-muted-foreground">
                <div className="rounded-[22px] bg-white/72 px-4 py-4">Check values without digging through noisy marketplaces.</div>
                <div className="rounded-[22px] bg-white/72 px-4 py-4">Save owned, wanted, sold, and dream items in one shelf.</div>
                <div className="rounded-[22px] bg-white/72 px-4 py-4">Return for watchlists, alerts, and future TRinket Club insights.</div>
              </div>
            </div>
          </section>

          <section className="mx-auto mt-8 w-full max-w-6xl">
            <div className="mb-5">
              <p className="section-label">World selection</p>
              <h2 className="mt-4 font-display text-3xl font-bold text-foreground">Choose your collectible world</h2>
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

          <section className="surface-card mx-auto mt-8 w-full max-w-6xl rounded-[32px] p-6 sm:p-8">
            <p className="section-label">
              <Sparkles className="h-3.5 w-3.5" />
              Trending picks
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {trending.slice(0, 3).map((item) => (
                <WorldLink
                  key={item.slug}
                  href={universeItemHref(item.release.universe.slug, item.slug)}
                  className="rounded-[24px] border border-border bg-white/92 px-5 py-5 text-left transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]"
                >
                  <p className="font-display text-xl font-bold text-foreground">{item.name}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{item.release.name}</p>
                </WorldLink>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
