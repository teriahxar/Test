import { ItemDetailPage, getItemStaticParams } from "@/components/item-detail-page";

export default async function PopMartItemPage({ params }: { params: { slug: string } }) {
  return <ItemDetailPage slug={params.slug} universeSlug="pop-mart" />;
}

export function generateStaticParams() {
  return getItemStaticParams("pop-mart");
}
