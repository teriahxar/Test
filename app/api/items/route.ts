import { NextRequest, NextResponse } from "next/server";
import { getItems } from "@/lib/queries";

export async function GET(request: NextRequest) {
  const release = request.nextUrl.searchParams.get("release") ?? undefined;
  const universe = request.nextUrl.searchParams.get("universe") ?? undefined;
  const query = request.nextUrl.searchParams.get("query") ?? undefined;
  const rarity = request.nextUrl.searchParams.get("filters") ?? undefined;

  const items = await getItems({ release, universe, query, rarity });
  return NextResponse.json(items);
}
