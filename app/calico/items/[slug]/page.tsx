import { ItemDetailPage, getItemStaticParams } from "@/components/item-detail-page";

export default async function CalicoItemPage({ params }: { params: { slug: string } }) {
  return <ItemDetailPage slug={params.slug} universeSlug="calico-critters" />;
}

export function generateStaticParams() {
  return getItemStaticParams("calico-critters");
}
