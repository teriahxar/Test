import { ItemDetailPage, getItemStaticParams } from "@/components/item-detail-page";

export default async function PopItemPage({ params }: { params: { slug: string } }) {
  return <ItemDetailPage slug={params.slug} universeSlug="pop" themeUniverseSlug="pop" />;
}

export function generateStaticParams() {
  return getItemStaticParams("pop-mart");
}
