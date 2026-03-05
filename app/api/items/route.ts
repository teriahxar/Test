import { NextResponse } from "next/server";
import { getItems } from "@/lib/queries";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filters = searchParams.get("filters");
  let parsedFilters: Record<string, unknown> = {};
  if (filters) {
    try {
      parsedFilters = JSON.parse(filters);
    } catch {
      parsedFilters = {};
    }
  }

  const items = await getItems({
    release: searchParams.get("release") ?? asString(parsedFilters.release),
    universe: searchParams.get("universe") ?? asString(parsedFilters.universe),
    query: searchParams.get("query") ?? asString(parsedFilters.query),
    rarity: asString(parsedFilters.rarity),
    year: asString(parsedFilters.year),
    condition: asString(parsedFilters.condition),
    tag: asString(parsedFilters.tag),
    minPrice: asNumber(parsedFilters.minPrice),
    maxPrice: asNumber(parsedFilters.maxPrice)
  });

  return NextResponse.json(items);
}

function asString(value: unknown) {
  return typeof value === "string" ? value : undefined;
}

function asNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}
