import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site-shell";
import { DashboardClient } from "@/components/dashboard-client";
import { RecentlyViewed } from "@/components/recently-viewed";
import { ThemeSetter } from "@/components/theme-setter";
import { getUniverseDashboard } from "@/lib/queries";

export const revalidate = 3600;

export default async function UniversePage({
  params,
  searchParams
}: {
  params: { universe: string };
  searchParams: { release?: string };
}) {
  const data = await getUniverseDashboard(params.universe, searchParams.release);

  if (!data) {
    notFound();
  }

  return (
    <SiteShell className="space-y-10 page-enter">
      <ThemeSetter universe={data.universe.slug} release={searchParams.release} />
      <DashboardClient data={data} currentRelease={searchParams.release} />
      <RecentlyViewed items={data.items} />
    </SiteShell>
  );
}
