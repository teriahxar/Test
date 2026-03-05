import { NextResponse } from "next/server";
import { getUniverses } from "@/lib/queries";

export async function GET() {
  const universes = await getUniverses();
  return NextResponse.json(universes);
}
