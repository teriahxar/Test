"use client";

import Link from "next/link";
import { LayoutGrid, Rows3 } from "lucide-react";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { DashboardData } from "@/lib/types";
import { formatPercent, hashString } from "@/lib/utils";
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

      <section className="panel-card rounded-[20px] p-4 md:p-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <ReleaseSwitcher universeSlug={data.universe.slug} releases={data.universe.releases} currentRelease={currentRelease} />
            <FilterDrawer filters={filters} setFilters={setFilters} tags={tags} releases={data.universe.releases.map((release) => release.name)} />
            <Link href="/collection" className="ribbon-chip inline-flex h-11 items-center px-4 text-sm font-semibold">
              My Shelf
            </Link>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <SearchBox items={data.items} />
            <div className="inline-flex rounded-full border border-[#E8E0D4] bg-[#FFFCF8] p-1 shadow-[var(--shadow-soft)]">
              <button
                type="button"
                aria-label="Grid view"
                className={`rounded-full p-2 ${layout === "grid" ? "bg-[#F5EDE0] text-[#8B6F47]" : "text-[#8f7661]"}`}
                onClick={() => setLayout("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="List view"
                className={`rounded-full p-2 ${layout === "list" ? "bg-[#F5EDE0] text-[#8B6F47]" : "text-[#8f7661]"}`}
                onClick={() => setLayout("list")}
              >
                <Rows3 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <InfoPanel title="Collector mood" value={data.universe.name} detail="A calm guide for checking values, saving favorites, and exploring releases." />
        <InfoPanel title="Tracked pieces" value={`${data.items.length}`} detail="A tidy grid of items with search, filtering, and save states built in." />
        <InfoPanel title="Weekly pulse" value={formatPercent(trending[0]?.metrics.sevenDayChange ?? 0)} detail="A quick read on what collectors are revisiting most right now." />
      </section>

      <Tabs defaultValue="trending" className="space-y-5">
        <TabsList className="bg-[#fffdf9]">
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="movers">Movers</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>
        <TabsContent value="trending">
          <CategoryHeader title="Trending now" subtitle="A strong starting shelf for this world right now." />
          <MarketGrid items={trending} layout={layout} />
        </TabsContent>
        <TabsContent value="movers">
          <CategoryHeader title="Biggest movers" subtitle="Pieces seeing the sharpest seven-day shifts." />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {movers.map((item) => (
              <div key={item.id} className="panel-card rounded-[20px] p-4">
                <p className="font-display text-xl font-semibold text-[#2e2a26]">{item.name}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[#8f7661]">{item.release.name}</p>
                <p className="mt-3 inline-flex rounded-full border border-[#e8c4ba] bg-[#f5dfd5] px-3 py-1 text-sm font-semibold text-[#8a5239]">
                  {formatPercent(item.metrics.sevenDayChange)}
                </p>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="new">
          <CategoryHeader title="Fresh arrivals" subtitle="Recent releases and newer additions to browse first." />
          <MarketGrid items={newDrops} layout={layout} />
        </TabsContent>
        <TabsContent value="all">
          <CategoryHeader title="All collectibles" subtitle={`${filteredItems.length} items in this world`} />
          {filteredItems.length ? (
            <MarketGrid items={filteredItems} layout={layout} />
          ) : (
            <div className="panel-card rounded-[20px] p-8 text-center">
              <p className="font-display text-2xl font-semibold text-[#2e2a26]">Nothing matches this shelf yet.</p>
              <p className="mt-2 text-[#5d554d]">Try easing one filter or searching a different line.</p>
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
      <p className="section-label">Curated shelf</p>
      <h2 className="mt-4 font-display text-3xl font-semibold text-[#2e2a26]">{title}</h2>
      <p className="text-sm text-[#5d554d]">{subtitle}</p>
    </div>
  );
}

function MarketGrid({ items, layout }: { items: DashboardData["items"]; layout: "grid" | "list" }) {
  return <div className={layout === "grid" ? "grid gap-5 md:grid-cols-2 xl:grid-cols-4" : "grid gap-4"}>{items.map((item) => <ItemCard key={item.id} item={item} compact={layout === "list"} />)}</div>;
}

function InfoPanel({ title, value, detail }: { title: string; value: string; detail: string }) {
  return (
    <div className="panel-card rounded-[20px] p-5">
      <p className="text-xs uppercase tracking-[0.16em] text-[#8f7661]">{title}</p>
      <p className="mt-3 font-display text-2xl font-semibold text-[#2e2a26]">{value}</p>
      <p className="mt-2 text-sm text-[#5d554d]">{detail}</p>
    </div>
  );
}
