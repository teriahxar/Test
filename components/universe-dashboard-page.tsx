import { notFound } from "next/navigation";
import { Suspense } from "react";
import { SiteShell } from "@/components/site-shell";
import { DashboardClient } from "@/components/dashboard-client";
import { RecentlyViewed } from "@/components/recently-viewed";
import { ThemeSetter } from "@/components/theme-setter";
import { getUniverseDashboard } from "@/lib/queries";

export async function UniverseDashboardPage({ universeSlug }: { universeSlug: string }) {
  const data = await getUniverseDashboard(universeSlug);

  if (!data) {
    notFound();
  }

  return (
    <SiteShell className="space-y-10 page-enter">
      <ThemeSetter universe={data.universe.slug} />
      <Suspense fallback={<div className="sticker-card rounded-[30px] p-8 text-sm text-muted-foreground">Loading dashboard...</div>}>
        <DashboardClient data={data} />
      </Suspense>
      <RecentlyViewed items={data.items} />
    </SiteShell>
  );
}
