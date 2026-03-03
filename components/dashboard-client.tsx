"use client";

import { Grid2X2, LayoutList } from "lucide-react";
import { useMemo, useState } from "react";
import type { DashboardData } from "@/lib/types";
import { formatPercent, hashString } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchBox } from "@/components/search-box";
import { FilterDrawer } from "@/components/filter-drawer";
import { ReleaseSwitcher } from "@/components/release-switcher";
import { ItemCard } from "@/components/item-card";
import { PersonalizedFeed } from "@/components/personalized-feed";

export function DashboardClient({
  data,
  currentRelease
}: {
  data: DashboardData;
  currentRelease?: string;
}) {
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [rarity, setRarity] = useState<string | undefined>();

  const dailySeed = new Date().toISOString().slice(0, 10);
  const trending = useMemo(
    () =>
      [...data.items]
        .sort((a, b) => {
          const scoreA = a.metrics.sevenDayChange * 1.35 + Math.abs(hashString(`${a.slug}-${dailySeed}`) % 18);
          const scoreB = b.metrics.sevenDayChange * 1.35 + Math.abs(hashString(`${b.slug}-${dailySeed}`) % 18);
          return scoreB - scoreA;
        })
        .slice(0, 6),
    [dailySeed, data.items]
  );
  const movers = useMemo(
    () => [...data.items].sort((a, b) => Math.abs(b.metrics.sevenDayChange) - Math.abs(a.metrics.sevenDayChange)).slice(0, 6),
    [data.items]
  );
  const newDrops = useMemo(
    () =>
      [...data.items]
        .sort((a, b) => new Date(b.release.releaseDate).getTime() - new Date(a.release.releaseDate).getTime())
        .slice(0, 6),
    [data.items]
  );
  const filteredAll = useMemo(
    () => data.items.filter((item) => !rarity || item.rarity === rarity),
    [data.items, rarity]
  );

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-5 rounded-[32px] border border-white/35 bg-white/20 p-5 backdrop-blur-xl md:p-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">Universe dashboard</p>
            <h1 className="mt-2 font-display text-4xl font-semibold">{data.universe.name}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">{data.universe.description}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ReleaseSwitcher universeSlug={data.universe.slug} releases={data.universe.releases} currentRelease={currentRelease} />
            <div className="flex gap-2">
              <FilterDrawer rarity={rarity} setRarity={setRarity} />
              <div className="inline-flex rounded-full border border-border bg-card/70 p-1">
                <button
                  type="button"
                  aria-label="Grid view"
                  className={`rounded-full p-2 ${layout === "grid" ? "bg-primary text-primary-foreground" : ""}`}
                  onClick={() => setLayout("grid")}
                >
                  <Grid2X2 className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="List view"
                  className={`rounded-full p-2 ${layout === "list" ? "bg-primary text-primary-foreground" : ""}`}
                  onClick={() => setLayout("list")}
                >
                  <LayoutList className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <SearchBox items={data.items} universeSlug={data.universe.slug} />
      </section>

      <PersonalizedFeed items={data.items} />

      <Tabs defaultValue="trending" className="space-y-6">
        <TabsList>
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="movers">Biggest Movers</TabsTrigger>
          <TabsTrigger value="new">New Drops</TabsTrigger>
          <TabsTrigger value="all">All Items</TabsTrigger>
        </TabsList>
        <TabsContent value="trending">
          <MarketGrid items={trending} layout={layout} />
        </TabsContent>
        <TabsContent value="movers">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {movers.map((item) => (
              <div key={item.id} className="rounded-[26px] border border-border bg-card/80 p-5 shadow-vault">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">7d move</p>
                <p className="mt-2 font-display text-2xl font-semibold">{item.name}</p>
                <p className="mt-3 inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                  {formatPercent(item.metrics.sevenDayChange)}
                </p>
                <p className="mt-3 text-sm text-muted-foreground">{item.release.name}</p>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="new">
          <MarketGrid items={newDrops} layout={layout} />
        </TabsContent>
        <TabsContent value="all">
          {filteredAll.length ? (
            <MarketGrid items={filteredAll} layout={layout} />
          ) : (
            <div className="rounded-[30px] border border-dashed border-border bg-card/70 p-10 text-center text-muted-foreground">
              No items match the current filter.
            </div>
          )}
        </TabsContent>
      </Tabs>
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
