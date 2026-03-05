import { NextResponse } from "next/server";
import { getReleases } from "@/lib/queries";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const universe = searchParams.get("universe") ?? undefined;
  const releases = await getReleases(universe);
  return NextResponse.json(releases);
}
