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

const WORLDS = [
  {
    href: "/popmart",
    logoSrc: "/assets/logos/popmart-world.svg",
    title: "PopMart World",
    description: "Candy-colored figures, blind boxes, and trending collectibles.",
    cardClass:
      "bg-[linear-gradient(168deg,rgba(255,241,248,0.98)_0%,rgba(245,236,255,0.98)_55%,rgba(232,252,242,0.98)_100%)]"
  },
  {
    href: "/calico",
    logoSrc: "/assets/logos/calico-world.svg",
    title: "Calico Critters Meadow",
    description: "Tiny cozy worlds, soft cottagecore sets, and collectible comfort.",
    cardClass:
      "bg-[linear-gradient(168deg,rgba(246,251,234,0.98)_0%,rgba(254,244,224,0.98)_54%,rgba(255,236,225,0.98)_100%)]"
  },
  {
    href: "/pop",
    logoSrc: "/assets/logos/pop-world.svg",
    title: "POP World",
    description: "Playful finds, bright icons, and another dreamy collectible space.",
    cardClass:
      "bg-[linear-gradient(168deg,rgba(236,246,255,0.98)_0%,rgba(255,248,210,0.98)_54%,rgba(229,251,238,0.98)_100%)]"
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
        <header className="flex items-start justify-start">
          <WorldLink href="/" className="inline-flex">
            <LogoMark compact className="rounded-full bg-white/48 p-1.5" />
          </WorldLink>
        </header>

        <div className="flex-1">
          <div className="flex min-h-[32vh] items-end justify-center pt-4 sm:min-h-[36vh]">
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

          <section className="mx-auto mt-7 w-full max-w-4xl rounded-[24px] border border-[#2b5f41]/10 bg-white/70 p-4 backdrop-blur">
            <p className="inline-flex items-center gap-2 rounded-full bg-[#edf8e6] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#29543c]">
              <Sparkles className="h-3.5 w-3.5" />
              Trending picks
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {trending.slice(0, 3).map((item) => (
                <WorldLink
                  key={item.slug}
                  href={universeItemHref(item.release.universe.slug, item.slug)}
                  className="rounded-2xl border border-[#2b5f41]/12 bg-white/85 px-4 py-3 text-left transition hover:-translate-y-0.5 hover:shadow-sm"
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
