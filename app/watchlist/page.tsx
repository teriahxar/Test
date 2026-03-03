import { WatchlistClient } from "@/components/watchlist-client";
import { SiteShell } from "@/components/site-shell";

export default function WatchlistPage() {
  return (
    <SiteShell className="space-y-8 page-enter">
      <section>
        <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Watchlist</p>
        <h1 className="mt-2 font-display text-4xl font-semibold">Saved items and alert rules</h1>
      </section>
      <WatchlistClient />
    </SiteShell>
  );
}
