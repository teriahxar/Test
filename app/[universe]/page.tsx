import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site-shell";
import { DashboardClient } from "@/components/dashboard-client";
import { RecentlyViewed } from "@/components/recently-viewed";
import { ThemeSetter } from "@/components/theme-setter";
import { getUniverseDashboard } from "@/lib/queries";
import { STATIC_DB } from "@/lib/static-data";

export default async function UniversePage({
  params
}: {
  params: { universe: string };
}) {
  const data = await getUniverseDashboard(params.universe);

  if (!data) {
    notFound();
  }

  return (
    <SiteShell className="space-y-10 page-enter">
      <ThemeSetter universe={data.universe.slug} />
      <DashboardClient data={data} />
      <RecentlyViewed items={data.items} />
    </SiteShell>
  );
}

export function generateStaticParams() {
  return STATIC_DB.universes.map((universe) => ({
    universe: universe.slug
  }));
}
