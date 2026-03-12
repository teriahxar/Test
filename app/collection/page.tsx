import { CollectionClient } from "@/components/collection-client";
import { CommunityStarterUi } from "@/components/community-starter-ui";
import { SiteShell } from "@/components/site-shell";

export default function CollectionPage() {
  return (
    <SiteShell className="space-y-8 page-enter">
      <section className="surface-card rounded-[32px] p-6 sm:p-8">
        <p className="section-label">My Shelf</p>
        <h1 className="mt-4 font-display text-4xl font-bold">Collector profile and collection</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Track owned, wanted, sold, and dream collectibles in one polished place built for repeat visits.
        </p>
      </section>
      <CommunityStarterUi />
      <CollectionClient />
    </SiteShell>
  );
}
