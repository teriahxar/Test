import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { LogoMark } from "@/components/logo-mark";
import { PortalCard } from "@/components/portal-card";
import { SparkleBackground } from "@/components/sparkle-background";
import { ThemeSetter } from "@/components/theme-setter";
import { getTrending } from "@/lib/queries";
import { SEEDED_UNIVERSES } from "@/lib/catalog";

export default async function HomePage() {
  const trending = await getTrending();

  return (
    <SiteShell hideHeader className="page-enter">
      <div className="relative min-h-screen overflow-hidden px-4 py-6 md:px-8">
        <ThemeSetter universe="neutral" />
        <SparkleBackground />
        <section className="relative mx-auto flex min-h-[44vh] max-w-6xl flex-col items-center justify-center text-center">
          <div className="rounded-full border border-white/60 bg-white/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            enter the safe-space market dimension
          </div>
          <LogoMark className="mt-8" />
          <h1 className="mt-4 max-w-5xl font-display text-5xl font-semibold leading-[0.95] md:text-7xl">TRinket</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">Your cozy collectible market index</p>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground md:text-base">
            Gentle data, magical visuals, and transparent value estimates for Pop Mart and Calico Critters.
          </p>
          <Link
            href="#portals"
            className="vault-button-primary mt-7 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5"
          >
            Start exploring ✨
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>

        <section id="portals" className="relative mx-auto mt-8 max-w-6xl pb-8">
          <div className="grid gap-5 xl:grid-cols-2">
            {SEEDED_UNIVERSES.map((universe) => (
              <PortalCard
                key={universe.slug}
                slug={universe.slug}
                title={universe.slug === "pop-mart" ? "Pop Mart Portal" : "Calico Critters Meadow"}
                subtitle={universe.description}
                thumbnails={universe.releases.flatMap((release) => release.items.map((item) => item.imageLocalPath)).slice(0, 3)}
                stickerNames={universe.slug === "pop-mart" ? ["heart", "sparkle", "star", "moon"] : ["bow", "flower", "berry", "leaf"]}
              />
            ))}
          </div>
        </section>

        <section className="relative mx-auto mb-12 max-w-6xl rounded-[32px] border border-white/60 bg-white/70 p-6 shadow-vault">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-card/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            Trending today
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {trending.slice(0, 3).map((item) => (
              <Link key={item.slug} href={`/item/${item.slug}`} className="rounded-[20px] border border-white/70 bg-card/85 p-4 transition hover:-translate-y-0.5">
                <p className="font-display text-xl font-semibold">{item.name}</p>
                <p className="text-sm text-muted-foreground">{item.release.name}</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  {new Date(item.metrics.lastUpdated).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
