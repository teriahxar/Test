import { NextRequest, NextResponse } from "next/server";
import { getDrops } from "@/lib/queries";

export async function GET(request: NextRequest) {
  const universe = request.nextUrl.searchParams.get("universe") ?? undefined;
  const drops = await getDrops(universe);
  return NextResponse.json(drops);
}
