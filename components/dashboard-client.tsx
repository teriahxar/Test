"use client";

import Link from "next/link";
import { LayoutGrid, Rows3 } from "lucide-react";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { DashboardData } from "@/lib/types";
import { formatPercent, hashString } from "@/lib/utils";
import { CollectorRankCard } from "@/components/collector-rank-card";
import { FilterDrawer, type DashboardFilters } from "@/components/filter-drawer";
import { ItemCard } from "@/components/item-card";
import { ReleaseSwitcher } from "@/components/release-switcher";
import { SearchBox } from "@/components/search-box";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WorldHero } from "@/components/world-hero";

export function DashboardClient({ data }: { data: DashboardData }) {
  const searchParams = useSearchParams();
  const currentRelease = searchParams.get("release") ?? undefined;
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [filters, setFilters] = useState<DashboardFilters>({});
  const dailySeed = new Date().toISOString().slice(0, 10);

  const filteredItems = useMemo(() => {
    return data.items.filter((item) => {
      const tags = item.tags.split(",").map((tag) => tag.trim().toLowerCase());
      const years = `${new Date(item.release.releaseDate).getFullYear()}`;
      const listingConditions = item.listings.map((listing) => listing.condition.toLowerCase());

      return (
        (!filters.release || item.release.name === filters.release) &&
        (!currentRelease || item.release.slug === currentRelease) &&
        (!filters.rarity || item.rarity === filters.rarity) &&
        (!filters.year || years === filters.year) &&
        (!filters.tag || tags.includes(filters.tag.toLowerCase())) &&
        (!filters.condition || listingConditions.includes(filters.condition.toLowerCase())) &&
        (!filters.minPrice || item.metrics.estimatedValue >= filters.minPrice) &&
        (!filters.maxPrice || item.metrics.estimatedValue <= filters.maxPrice)
      );
    });
  }, [currentRelease, data.items, filters]);

  const trending = useMemo(
    () =>
      [...filteredItems]
        .sort((a, b) => {
          const scoreA = a.metrics.sevenDayChange * 1.3 + Math.abs(hashString(`${a.slug}-${dailySeed}`) % 20);
          const scoreB = b.metrics.sevenDayChange * 1.3 + Math.abs(hashString(`${b.slug}-${dailySeed}`) % 20);
          return scoreB - scoreA;
        })
        .slice(0, 8),
    [dailySeed, filteredItems]
  );

  const movers = useMemo(
    () => [...filteredItems].sort((a, b) => Math.abs(b.metrics.sevenDayChange) - Math.abs(a.metrics.sevenDayChange)).slice(0, 8),
    [filteredItems]
  );

  const newDrops = useMemo(
    () =>
      [...filteredItems]
        .sort((a, b) => new Date(b.release.releaseDate).getTime() - new Date(a.release.releaseDate).getTime())
        .slice(0, 8),
    [filteredItems]
  );

  const tags = useMemo(
    () => [...new Set(data.items.flatMap((item) => item.tags.split(",").map((tag) => tag.trim())).filter(Boolean))],
    [data.items]
  );

  return (
    <div className="space-y-8">
      <WorldHero worldSlug={data.universe.slug} title={data.universe.name} description={data.universe.description} />

      <section className="surface-card rounded-[32px] p-4 md:p-5">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <ReleaseSwitcher universeSlug={data.universe.slug} releases={data.universe.releases} currentRelease={currentRelease} />
            <FilterDrawer filters={filters} setFilters={setFilters} tags={tags} releases={data.universe.releases.map((release) => release.name)} />
            <Link href="/collection" className="vault-button-secondary inline-flex h-11 items-center rounded-full px-4 text-sm font-semibold">
              My Shelf
            </Link>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <SearchBox items={data.items} />
            <div className="inline-flex rounded-full border border-border bg-white/90 p-1 shadow-[var(--shadow-soft)]">
              <button
                type="button"
                aria-label="Grid view"
                className={`rounded-full p-2 ${layout === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
                onClick={() => setLayout("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="List view"
                className={`rounded-full p-2 ${layout === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
                onClick={() => setLayout("list")}
              >
                <Rows3 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <CollectorRankCard />

      <Tabs defaultValue="trending" className="space-y-5">
        <TabsList className="bg-white/90">
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="movers">Movers</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>
        <TabsContent value="trending">
          <CategoryHeader title="Trending picks" subtitle="Favorites people are saving most this week." />
          <MarketGrid items={trending} layout={layout} />
        </TabsContent>
        <TabsContent value="movers">
          <CategoryHeader title="Biggest movers" subtitle="Seven-day price shifts worth watching." />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {movers.map((item) => (
              <div key={item.id} className="surface-card rounded-[24px] p-4">
                <p className="font-display text-xl font-bold">{item.name}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">{item.release.name}</p>
                <p className="mt-3 inline-flex rounded-full bg-[#fff0e0] px-3 py-1 text-sm font-semibold text-[#9c6b37]">
                  {formatPercent(item.metrics.sevenDayChange)}
                </p>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="new">
          <CategoryHeader title="New drops" subtitle="Fresh additions and recent release windows." />
          <MarketGrid items={newDrops} layout={layout} />
        </TabsContent>
        <TabsContent value="all">
          <CategoryHeader title="All collectibles" subtitle={`${filteredItems.length} items in this world`} />
          {filteredItems.length ? (
            <MarketGrid items={filteredItems} layout={layout} />
          ) : (
            <div className="surface-card rounded-[26px] p-8 text-center">
              <p className="font-display text-2xl font-semibold">No matches in this shelf right now.</p>
              <p className="mt-2 text-muted-foreground">Adjust one filter and try again.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function CategoryHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-4">
      <h2 className="font-display text-2xl font-semibold">{title}</h2>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
    </div>
  );
}

function MarketGrid({ items, layout }: { items: DashboardData["items"]; layout: "grid" | "list" }) {
  return (
    <div className={layout === "grid" ? "grid gap-5 md:grid-cols-2 xl:grid-cols-4" : "grid gap-4"}>
      {items.map((item) => (
        <ItemCard key={item.id} item={item} compact={layout === "list"} />
      ))}
    </div>
  );
}
