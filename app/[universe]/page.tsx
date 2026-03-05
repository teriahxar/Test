import { notFound, redirect } from "next/navigation";

export default async function UniversePage({
  params
}: {
  params: { universe: string };
}) {
  if (params.universe === "pop-mart" || params.universe === "popmart") {
    redirect("/popmart");
  }

  if (params.universe === "calico-critters" || params.universe === "calico") {
    redirect("/calico");
  }

  notFound();
}

export function generateStaticParams() {
  return [{ universe: "pop-mart" }, { universe: "calico-critters" }];
}
