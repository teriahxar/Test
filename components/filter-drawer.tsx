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
          Filters
        </SparkleButton>
      </DialogTrigger>
      <DialogContent className="rounded-[34px]">
        <div className="space-y-6">
          <div>
            <p className="section-label">Filters</p>
            <h2 className="mt-4 font-display text-2xl font-semibold text-[#2e2a26]">Refine this world</h2>
          </div>
          <FilterSection
            label="Series"
            options={releases}
            active={filters.release}
            onChange={(value) => setFilters({ ...filters, release: filters.release === value ? undefined : value })}
          />
          <FilterSection
            label="Rarity"
            options={["Common", "Rare", "Ultra Rare", "Chase", "Secret", "Limited", "Exclusive"]}
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
            <p className="text-sm font-semibold text-[#2e2a26]">Price range</p>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                min={0}
                placeholder="Min"
                value={filters.minPrice ?? ""}
                onChange={(event) => setFilters({ ...filters, minPrice: event.target.value ? Number(event.target.value) : undefined })}
                className="warm-focus h-11 rounded-full border border-[#E8E0D4] bg-[#FFFCF8] px-4 text-sm outline-none"
              />
              <input
                type="number"
                min={0}
                placeholder="Max"
                value={filters.maxPrice ?? ""}
                onChange={(event) => setFilters({ ...filters, maxPrice: event.target.value ? Number(event.target.value) : undefined })}
                className="warm-focus h-11 rounded-full border border-[#E8E0D4] bg-[#FFFCF8] px-4 text-sm outline-none"
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
      <p className="text-sm font-semibold text-[#2e2a26]">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
              active === option ? "border-[#C4A882] bg-[#F5EDE0] text-[#8B6F47]" : "border-[#E8E0D4] bg-[#FFFCF8] text-[#5D554D]"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
