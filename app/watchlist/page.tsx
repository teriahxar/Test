import { WatchlistClient } from "@/components/watchlist-client";
import { SiteShell } from "@/components/site-shell";

export default function WatchlistPage() {
  return (
    <SiteShell className="space-y-8 page-enter">
      <section className="surface-card rounded-[32px] p-6 sm:p-8">
        <p className="section-label">Watchlist</p>
        <h1 className="mt-4 font-display text-4xl font-bold">Saved items and alerts</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Keep the pieces you are monitoring close, add simple value thresholds, and return to one calm place when the market shifts.
        </p>
      </section>
      <WatchlistClient />
    </SiteShell>
  );
}
