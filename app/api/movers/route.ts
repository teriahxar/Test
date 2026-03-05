import { NextResponse } from "next/server";
import { getMovers } from "@/lib/queries";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const universe = searchParams.get("universe") ?? undefined;
  const items = await getMovers(universe);
  return NextResponse.json(items);
}
