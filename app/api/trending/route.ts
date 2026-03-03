import { NextRequest, NextResponse } from "next/server";
import { getTrending } from "@/lib/queries";

export async function GET(request: NextRequest) {
  const release = request.nextUrl.searchParams.get("release") ?? undefined;
  const items = await getTrending(release);
  return NextResponse.json(items);
}
