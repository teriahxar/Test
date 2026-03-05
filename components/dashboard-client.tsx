"use client";

import { Bell, Heart, LayoutGrid, Rows3, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { DashboardData } from "@/lib/types";
import { formatPercent, hashString } from "@/lib/utils";
import { FilterDrawer, type DashboardFilters } from "@/components/filter-drawer";
import { ItemCard } from "@/components/item-card";
import { PersonalizedFeed } from "@/components/personalized-feed";
import { ReleaseSwitcher } from "@/components/release-switcher";
import { SearchBox } from "@/components/search-box";
import { SparkleButton } from "@/components/sparkle-button";
import { StickerPack } from "@/components/sticker-pack";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useWatchlistStore } from "@/lib/stores/watchlist-store";

export function DashboardClient({
  data
}: {
  data: DashboardData;
}) {
  const searchParams = useSearchParams();
  const currentRelease = searchParams.get("release") ?? undefined;
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [filters, setFilters] = useState<DashboardFilters>({});
  const watchlistCount = useWatchlistStore((state) => state.items.length);
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
        .slice(0, 6),
    [dailySeed, filteredItems]
  );
  const movers = useMemo(
    () => [...filteredItems].sort((a, b) => Math.abs(b.metrics.sevenDayChange) - Math.abs(a.metrics.sevenDayChange)).slice(0, 6),
    [filteredItems]
  );
  const newDrops = useMemo(
    () =>
      [...filteredItems]
        .sort((a, b) => new Date(b.release.releaseDate).getTime() - new Date(a.release.releaseDate).getTime())
        .slice(0, 6),
    [filteredItems]
  );
  const tags = useMemo(
    () => [...new Set(data.items.flatMap((item) => item.tags.split(",").map((tag) => tag.trim())).filter(Boolean))],
    [data.items]
  );

  return (
    <div className="space-y-8">
      <section className="sticker-card sticky top-[88px] z-30 overflow-hidden rounded-[34px] p-5 md:p-6">
        <StickerPack names={["sparkle", "heart", "star", "cloud"]} className="opacity-70" />
        <div className="relative space-y-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-muted-foreground">
                <Sparkles className="h-4 w-4 text-primary" />
                TRinket universe dashboard
              </div>
              <h1 className="mt-4 font-display text-4xl font-semibold md:text-5xl">{data.universe.name}</h1>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{data.universe.description}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <ReleaseSwitcher universeSlug={data.universe.slug} releases={data.universe.releases} currentRelease={currentRelease} />
              <SearchBox items={data.items} />
            </div>
          </div>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              <FilterDrawer
                filters={filters}
                setFilters={setFilters}
                tags={tags}
                releases={data.universe.releases.map((release) => release.name)}
              />
              <div className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/75 px-4 py-2 text-sm font-semibold">
                <Heart className="h-4 w-4 text-primary" />
                {watchlistCount} watching
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/75 px-4 py-2 text-sm font-semibold">
                <Bell className="h-4 w-4 text-accent" />
                local alerts
              </div>
            </div>
            <div className="inline-flex rounded-full border border-white/60 bg-white/75 p-1 shadow-sm">
              <button
                type="button"
                aria-label="Grid view"
                className={`rounded-full p-2 ${layout === "grid" ? "bg-primary text-primary-foreground" : ""}`}
                onClick={() => setLayout("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="List view"
                className={`rounded-full p-2 ${layout === "list" ? "bg-primary text-primary-foreground" : ""}`}
                onClick={() => setLayout("list")}
              >
                <Rows3 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <PersonalizedFeed items={data.items} />

      <Tabs defaultValue="trending" className="space-y-6">
        <TabsList className="bg-white/70">
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="movers">Biggest Movers</TabsTrigger>
          <TabsTrigger value="new">New Drops</TabsTrigger>
          <TabsTrigger value="all">All Items</TabsTrigger>
        </TabsList>
        <TabsContent value="trending">
          <CategoryHeader
            title="Trending now"
            subtitle="Daily rotation keeps the home shelf feeling alive."
          />
          <MarketGrid items={trending} layout={layout} />
        </TabsContent>
        <TabsContent value="movers">
          <CategoryHeader
            title="Biggest movers"
            subtitle="Seven-day swings that make the browse loop addictive."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {movers.map((item) => (
              <div key={item.id} className="sticker-card rounded-[28px] p-5">
                <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">7d move</p>
                <p className="mt-2 font-display text-2xl font-semibold">{item.name}</p>
                <p className="mt-3 inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                  {formatPercent(item.metrics.sevenDayChange)}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{item.release.name}</p>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="new">
          <CategoryHeader title="New drops" subtitle="Fresher release windows and recent additions." />
          <MarketGrid items={newDrops} layout={layout} />
        </TabsContent>
        <TabsContent value="all">
          <div className="flex items-center justify-between gap-3">
            <CategoryHeader title="All items" subtitle="Swipe through everything in this collectible universe." />
            <SparkleButton variant="secondary">{filteredItems.length} results</SparkleButton>
          </div>
          {filteredItems.length ? (
            <MarketGrid items={filteredItems} layout={layout} />
          ) : (
            <div className="sticker-card rounded-[30px] p-10 text-center">
              <p className="font-display text-2xl font-semibold">No matches in this dreamy little corner.</p>
              <p className="mt-2 text-muted-foreground">Try clearing one filter and the shelf will refill instantly.</p>
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
    <div className={layout === "grid" ? "grid gap-5 md:grid-cols-2 xl:grid-cols-3" : "grid gap-4"}>
      {items.map((item) => (
        <ItemCard key={item.id} item={item} compact={layout === "list"} />
      ))}
    </div>
  );
}
