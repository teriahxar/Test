"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { SparkleButton } from "@/components/sparkle-button";

export type DashboardFilters = {
  release?: string;
  rarity?: string;
  year?: string;
  condition?: string;
  tag?: string;
  minPrice?: number;
  maxPrice?: number;
};

export function FilterDrawer({
  filters = {},
  setFilters,
  tags,
  releases
}: {
  filters: DashboardFilters;
  setFilters: (filters: DashboardFilters) => void;
  tags: string[];
  releases: string[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <SparkleButton variant="outline">
          <SlidersHorizontal className="h-4 w-4" />
          Filter
        </SparkleButton>
      </DialogTrigger>
      <DialogContent className="rounded-[34px]">
        <div className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Filter drawer</p>
            <h2 className="mt-2 font-display text-2xl font-semibold">Make the feed extra specific</h2>
          </div>
          <FilterSection
            label="Release / series"
            options={releases}
            active={filters.release}
            onChange={(value) => setFilters({ ...filters, release: filters.release === value ? undefined : value })}
          />
          <FilterSection
            label="Rarity"
            options={["Common", "Rare", "Ultra Rare", "Chase", "Secret", "Limited"]}
            active={filters.rarity}
            onChange={(value) => setFilters({ ...filters, rarity: filters.rarity === value ? undefined : value })}
          />
          <FilterSection
            label="Release year"
            options={["2025"]}
            active={filters.year}
            onChange={(value) => setFilters({ ...filters, year: filters.year === value ? undefined : value })}
          />
          <FilterSection
            label="Condition"
            options={["Mint", "Excellent", "Good", "Fair"]}
            active={filters.condition}
            onChange={(value) => setFilters({ ...filters, condition: filters.condition === value ? undefined : value })}
          />
          <FilterSection
            label="Tags"
            options={tags.slice(0, 8)}
            active={filters.tag}
            onChange={(value) => setFilters({ ...filters, tag: filters.tag === value ? undefined : value })}
          />
          <div className="space-y-3">
            <p className="text-sm font-semibold">Price range</p>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                min={0}
                placeholder="Min"
                value={filters.minPrice ?? ""}
                onChange={(event) =>
                  setFilters({ ...filters, minPrice: event.target.value ? Number(event.target.value) : undefined })
                }
                className="h-10 rounded-full border border-border bg-white/75 px-4 text-sm"
              />
              <input
                type="number"
                min={0}
                placeholder="Max"
                value={filters.maxPrice ?? ""}
                onChange={(event) =>
                  setFilters({ ...filters, maxPrice: event.target.value ? Number(event.target.value) : undefined })
                }
                className="h-10 rounded-full border border-border bg-white/75 px-4 text-sm"
              />
            </div>
          </div>
          <SparkleButton variant="secondary" onClick={() => setFilters({})}>
            Clear filters
          </SparkleButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function FilterSection({
  label,
  options,
  active,
  onChange
}: {
  label: string;
  options: string[];
  active?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
              active === option ? "border-primary bg-primary text-primary-foreground" : "border-border bg-white/75"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
