import { WatchlistClient } from "@/components/watchlist-client";
import { SiteShell } from "@/components/site-shell";

export default function WatchlistPage() {
  return (
    <SiteShell className="space-y-8 page-enter">
      <section className="surface-card rounded-[32px] p-6 sm:p-8">
        <p className="section-label">Watchlist</p>
        <h1 className="mt-4 font-display text-4xl font-semibold text-[#2e2a26]">Saved pieces and alert notes</h1>
        <p className="mt-3 max-w-2xl text-[#5d554d]">Keep an eye on the items you want to revisit, compare, or buy later.</p>
      </section>
      <WatchlistClient />
    </SiteShell>
  );
}
