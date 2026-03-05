import { NextResponse } from "next/server";
import { getTrending } from "@/lib/queries";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const universe = searchParams.get("universe") ?? undefined;
  const items = await getTrending(universe);
  return NextResponse.json(items);
}
