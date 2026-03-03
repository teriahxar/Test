import { NextResponse } from "next/server";
import { getItemBySlug } from "@/lib/queries";

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const item = await getItemBySlug(params.slug);
  return NextResponse.json(item, { status: item ? 200 : 404 });
}
