import { NextResponse } from "next/server";
import { getItemBySlug } from "@/lib/queries";

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const item = await getItemBySlug(params.slug);
  if (!item) {
    return NextResponse.json({ message: "Item not found" }, { status: 404 });
  }
  return NextResponse.json(item);
}
