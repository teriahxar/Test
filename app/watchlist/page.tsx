import { WatchlistClient } from "@/components/watchlist-client";
import { SiteShell } from "@/components/site-shell";

export default function WatchlistPage() {
  return (
    <SiteShell className="space-y-8 page-enter">
      <section className="surface-card rounded-[32px] p-6 sm:p-8">
        <p className="section-label">Watchlist</p>
        <h1 className="mt-4 text-4xl font-semibold text-[#2F3A45]">Saved items and alerts</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">Keep the collectibles you want to revisit in one calm place.</p>
      </section>
      <WatchlistClient />
    </SiteShell>
  );
}
