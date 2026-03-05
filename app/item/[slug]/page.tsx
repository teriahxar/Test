import { redirect } from "next/navigation";
import { getItemBySlug } from "@/lib/queries";
import { getItemStaticParams } from "@/components/item-detail-page";
import { universeItemHref } from "@/lib/routing";

export default async function ItemPage({ params }: { params: { slug: string } }) {
  const data = await getItemBySlug(params.slug);
  if (!data) {
    redirect("/");
  }

  redirect(universeItemHref(data.item.release.universe.slug, data.item.slug));
}

export function generateStaticParams() {
  return getItemStaticParams();
}
