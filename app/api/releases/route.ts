import { NextRequest, NextResponse } from "next/server";
import { getReleases } from "@/lib/queries";

export async function GET(request: NextRequest) {
  const universe = request.nextUrl.searchParams.get("universe") ?? undefined;
  const releases = await getReleases(universe);
  return NextResponse.json(releases);
}
