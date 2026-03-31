import Image from "next/image";
import { asset } from "@/lib/utils";

const WORLD_LOGO_MAP: Record<string, string> = {
  "pop-mart": asset("/assets/logos/popmart-logo.png"),
  "calico-critters": asset("/assets/logos/calico-critters-logo.png"),
  pop: asset("/assets/logos/funko-pop-logo.png")
};

const WORLD_THEME_MAP: Record<string, string> = {
  "pop-mart": "bg-[#C4CEBE]",
  "calico-critters": "bg-[#F5EDE0]",
  pop: "bg-[#E8C4BA]"
};

export function WorldHero({ worldSlug, title, description }: { worldSlug: string; title: string; description: string }) {
  return (
    <section className={`panel-card rounded-[20px] border-[#8B6F47] p-6 ${WORLD_THEME_MAP[worldSlug] ?? WORLD_THEME_MAP["calico-critters"]}`}>
      <div className="panel-frame flex h-24 w-60 items-center justify-center border-[#8B6F47]/20 px-4">
        <div className="relative h-14 w-48">
          <Image src={WORLD_LOGO_MAP[worldSlug] ?? asset("/assets/logos/trinket-logo.png")} alt={`${title} logo`} fill className="object-contain" />
        </div>
      </div>
      <h1 className="mt-5 font-display text-4xl font-semibold text-[#2C2418] md:text-5xl">{title}</h1>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-[#5D554D] md:text-base">{description}</p>
    </section>
  );
}
