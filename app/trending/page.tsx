import { ItemCard } from "@/components/item-card";
import { SiteShell } from "@/components/site-shell";
import { getMovers, getTrending } from "@/lib/queries";

export default async function TrendingPage() {
  const trending = await getTrending();
  const movers = await getMovers();

  return (
    <SiteShell className="space-y-8 page-enter">
      <section>
        <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Trending</p>
        <h1 className="mt-2 font-display text-4xl font-semibold">What collectors are watching today</h1>
        <p className="mt-3 max-w-3xl text-muted-foreground">
          Rotates daily with mocked market signals. Values include confidence labels, source cues, and last-updated timestamps.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold">Trending now</h2>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {trending.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold">Biggest movers (7d)</h2>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {movers.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
