import { DropCalendarClient } from "@/components/drop-calendar-client";
import { SiteShell } from "@/components/site-shell";
import { getDrops } from "@/lib/queries";

export const revalidate = 3600;

export default async function DropsPage() {
  const drops = await getDrops();

  return (
    <SiteShell className="space-y-8 page-enter">
      <section>
        <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Drop calendar</p>
        <h1 className="mt-2 font-display text-4xl font-semibold">Upcoming releases, reminder toggles, and hype scores</h1>
      </section>
      <DropCalendarClient drops={drops} />
    </SiteShell>
  );
}
