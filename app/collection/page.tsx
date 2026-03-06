import { CollectionClient } from "@/components/collection-client";
import { CommunityStarterUi } from "@/components/community-starter-ui";
import { SiteShell } from "@/components/site-shell";

export default function CollectionPage() {
  return (
    <SiteShell className="space-y-8 page-enter">
      <section>
        <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">My Shelf</p>
        <h1 className="mt-2 font-display text-4xl font-semibold">Collector Circle</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Track owned, wanted, sold, and dream collectibles in one calm, cozy view.
        </p>
      </section>
      <CommunityStarterUi />
      <CollectionClient />
    </SiteShell>
  );
}
