import { notFound } from "next/navigation";
import { Suspense } from "react";
import { SiteShell } from "@/components/site-shell";
import { DashboardClient } from "@/components/dashboard-client";
import { RecentlyViewed } from "@/components/recently-viewed";
import { ThemeSetter } from "@/components/theme-setter";
import { getUniverseDashboard } from "@/lib/queries";

export async function UniverseDashboardPage({
  universeSlug,
  routeUniverseSlug,
  themeUniverseSlug,
  titleOverride,
  descriptionOverride
}: {
  universeSlug: string;
  routeUniverseSlug?: string;
  themeUniverseSlug?: string;
  titleOverride?: string;
  descriptionOverride?: string;
}) {
  const data = await getUniverseDashboard(universeSlug);

  if (!data) {
    notFound();
  }

  const adjustedData =
    routeUniverseSlug && routeUniverseSlug !== data.universe.slug
      ? {
          ...data,
          universe: {
            ...data.universe,
            slug: routeUniverseSlug,
            name: titleOverride ?? data.universe.name,
            description: descriptionOverride ?? data.universe.description,
            releases: data.universe.releases.map((release) => ({
              ...release,
              universe: {
                ...release.universe,
                slug: routeUniverseSlug
              }
            }))
          },
          items: data.items.map((item) => ({
            ...item,
            release: {
              ...item.release,
              universe: {
                ...item.release.universe,
                slug: routeUniverseSlug
              }
            }
          }))
        }
      : {
          ...data,
          universe: {
            ...data.universe,
            name: titleOverride ?? data.universe.name,
            description: descriptionOverride ?? data.universe.description
          }
        };

  return (
    <SiteShell className="space-y-10 page-enter">
      <ThemeSetter universe={themeUniverseSlug ?? adjustedData.universe.slug} />
      <Suspense fallback={<div className="sticker-card rounded-[30px] p-8 text-sm text-muted-foreground">Loading collectible world...</div>}>
        <DashboardClient data={adjustedData} />
      </Suspense>
      <RecentlyViewed items={adjustedData.items} />
    </SiteShell>
  );
}
