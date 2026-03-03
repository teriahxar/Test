import Link from "next/link";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { SparkleButton } from "@/components/sparkle-button";
import { StickerPack } from "@/components/sticker-pack";
import { UniversePortalCard } from "@/components/universe-portal-card";
import { SEEDED_UNIVERSES } from "@/lib/catalog";

export default function HomePage() {
  return (
    <SiteShell hideHeader className="page-enter">
      <div className="relative min-h-screen overflow-hidden px-4 py-6 md:px-8">
        {Array.from({ length: 14 }).map((_, index) => (
          <span
            key={index}
            className="sparkle-dot"
            style={{
              left: `${8 + (index * 7) % 82}%`,
              top: `${10 + (index * 13) % 72}%`,
              width: `${4 + (index % 3) * 3}px`,
              height: `${4 + (index % 3) * 3}px`,
              animationDelay: `${index * 0.35}s`
            }}
          />
        ))}
        <section className="mx-auto flex min-h-[40vh] max-w-6xl flex-col items-center justify-center text-center">
          <div className="relative">
            <StickerPack names={["sparkle", "heart", "star", "cloud"]} className="-inset-16 opacity-80" />
            <div className="relative inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground shadow-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              Choose your collectible universe
            </div>
          </div>
          <h1 className="mt-8 max-w-5xl font-display text-5xl font-semibold leading-[0.95] md:text-7xl">
            VaultView makes collectible value tracking feel like opening a dreamy little app intro.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground md:text-lg">
            Pick a universe, watch the whole visual world transform, and fall straight into trending figures, cozy sets,
            watchlists, alerts, drops, and your own cute portfolio mode.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="#portals"
              className="vault-button-primary inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5"
            >
              Start Exploring
              <ArrowRight className="h-4 w-4" />
            </Link>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/75 px-4 py-2 text-sm font-semibold text-foreground">
              <Star className="h-4 w-4 text-accent" />
              daily trend rotation + local alerts
            </span>
          </div>
        </section>

        <section id="portals" className="mx-auto mt-8 max-w-6xl pb-10">
          <div className="grid gap-5 xl:grid-cols-3">
            {SEEDED_UNIVERSES.map((universe) => (
              <UniversePortalCard
                key={universe.slug}
                slug={universe.slug}
                title={universe.name.toUpperCase()}
                description={universe.description}
                portalCopy={universe.portalCopy}
                thumbnails={universe.releases.flatMap((release) => release.items.map((item) => item.imageUrl)).slice(0, 3)}
                stickerNames={universe.slug === "pop-mart" ? ["heart", "sparkle", "star", "moon"] : universe.slug === "calico-critters" ? ["bow", "flower", "berry", "leaf"] : ["pixel", "spark", "bolt", "swirl"]}
              />
            ))}
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
