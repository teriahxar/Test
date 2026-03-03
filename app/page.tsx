import { ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { UniverseCard } from "@/components/universe-card";
import { getUniverses } from "@/lib/queries";

export const revalidate = 3600;

const universeEyebrows: Record<string, string> = {
  "pop-mart": "Glossy momentum",
  "calico-critters": "Cottage demand",
  other: "Cross-category radar"
};

export default async function HomePage() {
  const universes = await getUniverses();

  return (
    <SiteShell className="space-y-10 page-enter">
      <section className="grid gap-6 rounded-[36px] border border-white/30 bg-white/20 p-6 backdrop-blur-xl lg:grid-cols-[1.3fr_0.7fr] lg:p-8">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/55 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-foreground/80">
            <Sparkles className="h-4 w-4" />
            Choose your collectible universe
          </div>
          <div className="space-y-4">
            <h1 className="max-w-3xl font-display text-5xl font-semibold tracking-tight md:text-6xl">
              Current value, trend shifts, watchlists, and drop timing for the pieces collectors actually revisit.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground">
              VaultView adapts its full visual system to the line you browse, so Pop Mart feels playful, Calico feels
              cozy, and every release can carry its own atmosphere.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              Daily trending rotation
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2">
              <ArrowRight className="h-4 w-4 text-primary" />
              Sticky watchlist + alerts
            </span>
          </div>
        </div>
        <div className="grid gap-4 rounded-[30px] border border-white/40 bg-card/70 p-5 shadow-vault">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">What’s seeded</p>
            <h2 className="mt-2 font-display text-2xl font-semibold">Mocked collector market engine</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <Stat value={`${universes.length}`} label="Universes" />
            <Stat value={`${universes.reduce((sum, universe) => sum + universe.releases.length, 0)}`} label="Releases" />
            <Stat value="18+" label="Tracked items" />
          </div>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-3">
        {universes.map((universe, index) => (
          <UniverseCard
            key={universe.id}
            slug={universe.slug}
            name={universe.name}
            description={universe.description}
            eyebrow={universeEyebrows[universe.slug] ?? `Market watch ${index + 1}`}
          />
        ))}
      </section>
    </SiteShell>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-[24px] bg-muted/60 p-4">
      <p className="font-display text-3xl font-semibold">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
