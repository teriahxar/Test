import { CollectionClient } from "@/components/collection-client";
import { SiteShell } from "@/components/site-shell";

export default function CollectionPage() {
  return (
    <SiteShell className="space-y-8 page-enter">
      <section>
        <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Collection mode</p>
        <h1 className="mt-2 font-display text-4xl font-semibold">Your pastel portfolio</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          No login, no friction. Mark pieces as Owned, Want, or Sold and let TRinket estimate your shelf value.
        </p>
      </section>
      <CollectionClient />
    </SiteShell>
  );
}
