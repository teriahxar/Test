import { NextRequest, NextResponse } from "next/server";
import { getItems } from "@/lib/queries";

export async function GET(request: NextRequest) {
  const release = request.nextUrl.searchParams.get("release") ?? undefined;
  const universe = request.nextUrl.searchParams.get("universe") ?? undefined;
  const query = request.nextUrl.searchParams.get("query") ?? undefined;
  const filters = request.nextUrl.searchParams.get("filters");
  const parsed = filters ? JSON.parse(filters) as { rarity?: string; year?: string; condition?: string; tag?: string } : {};
  const slugs = request.nextUrl.searchParams.get("slugs")?.split(",").filter(Boolean);

  const items = await getItems({ release, universe, query, rarity: parsed.rarity, year: parsed.year, condition: parsed.condition, tag: parsed.tag, slugs });
  return NextResponse.json(items);
}
