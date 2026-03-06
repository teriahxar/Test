import { Sparkles } from "lucide-react";
import { BackgroundScene } from "@/components/background-scene";
import { LandingHero } from "@/components/landing-hero";
import { LandingIntroGate } from "@/components/landing-intro-gate";
import { LogoMark } from "@/components/logo-mark";
import { PortalWorldCard } from "@/components/portal-world-card";
import { ThemeSetter } from "@/components/theme-setter";
import { WorldLink } from "@/components/world-link";
import { getTrending } from "@/lib/queries";
import { universeItemHref } from "@/lib/routing";
import { asset } from "@/lib/utils";

const WORLDS = [
  {
    href: "/popmart",
    logoSrc: asset("/assets/logos/popmart-logo.png"),
    title: "PopMart World",
    description: "Cute pulls, blind boxes, and collectibles people really want.",
    cardClass:
      "bg-[linear-gradient(165deg,rgba(250,255,245,0.98)_0%,rgba(244,252,236,0.98)_58%,rgba(255,248,238,0.98)_100%)]"
  },
  {
    href: "/calico",
    logoSrc: asset("/assets/logos/calico-critters-logo.png"),
    title: "Calico Critters Meadow",
    description: "Tiny cozy worlds, soft cottagecore sets, and collectible comfort.",
    cardClass:
      "bg-[linear-gradient(165deg,rgba(247,253,238,0.98)_0%,rgba(255,248,238,0.98)_60%,rgba(241,249,232,0.98)_100%)]"
  },
  {
    href: "/pop",
    logoSrc: asset("/assets/logos/funko-pop-logo.png"),
    title: "POP! World",
    description: "Iconic pops, fun finds, and collectibles worth keeping tabs on.",
    cardClass:
      "bg-[linear-gradient(165deg,rgba(246,253,242,0.98)_0%,rgba(255,248,236,0.98)_58%,rgba(239,248,232,0.98)_100%)]"
  }
] as const;

export default async function HomePage() {
  const trending = await getTrending();

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-6 md:px-8 md:py-8">
      <ThemeSetter universe="neutral" />
      <LandingIntroGate />
      <BackgroundScene />
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col">
        <header className="flex items-start justify-start pt-2">
          <WorldLink href="/" className="inline-flex">
            <LogoMark compact className="drop-shadow-[0_8px_16px_rgba(31,78,51,0.16)]" />
          </WorldLink>
        </header>

        <div className="flex-1">
          <div className="flex min-h-[38vh] items-end justify-center pt-6 sm:min-h-[40vh]">
            <LandingHero />
          </div>

          <section className="mx-auto mt-8 w-full max-w-6xl">
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

          <section className="mx-auto mt-7 w-full max-w-4xl rounded-[24px] border border-[#2b5f41]/10 bg-white/76 p-4 backdrop-blur">
            <p className="inline-flex items-center gap-2 rounded-full bg-[#edf8e6] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#29543c]">
              <Sparkles className="h-3.5 w-3.5" />
              Trending picks
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {trending.slice(0, 3).map((item) => (
                <WorldLink
                  key={item.slug}
                  href={universeItemHref(item.release.universe.slug, item.slug)}
                  className="rounded-2xl border border-[#2b5f41]/12 bg-white/90 px-4 py-3 text-left transition hover:-translate-y-0.5 hover:shadow-sm"
                >
                  <p className="font-display text-xl font-semibold text-[#234f36]">{item.name}</p>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#4a7157]">{item.release.name}</p>
                </WorldLink>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
