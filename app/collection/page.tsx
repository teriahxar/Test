import { CollectionClient } from "@/components/collection-client";
import { SiteShell } from "@/components/site-shell";

export default function CollectionPage() {
  return (
    <SiteShell className="space-y-8 page-enter">
      <section className="surface-card rounded-[32px] p-6 sm:p-8">
        <p className="section-label">My Shelf</p>
        <h1 className="mt-4 font-display text-4xl font-semibold text-[#2e2a26]">Your collection, neatly kept</h1>
        <p className="mt-3 max-w-2xl text-[#5d554d]">Track owned, wanted, sold, and dream pieces in one warm collector view.</p>
      </section>
      <CollectionClient />
    </SiteShell>
  );
}
