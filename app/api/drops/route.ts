import { NextResponse } from "next/server";
import { getDrops } from "@/lib/queries";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const universe = searchParams.get("universe") ?? undefined;
  const drops = await getDrops(universe);
  return NextResponse.json(drops);
}
