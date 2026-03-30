import Image from "next/image";
import { asset } from "@/lib/utils";

const WORLD_LOGO_MAP: Record<string, string> = {
  "pop-mart": asset("/assets/logos/popmart-logo.png"),
  "calico-critters": asset("/assets/logos/calico-critters-logo.png"),
  pop: asset("/assets/logos/funko-pop-logo.png")
};

const WORLD_THEME_MAP: Record<string, string> = {
  "pop-mart": "bg-[linear-gradient(180deg,rgba(196,206,190,0.72),rgba(250,247,242,0.94))]",
  "calico-critters": "bg-[linear-gradient(180deg,rgba(214,201,181,0.6),rgba(250,247,242,0.95))]",
  pop: "bg-[linear-gradient(180deg,rgba(232,196,186,0.72),rgba(250,247,242,0.94))]"
};

export function WorldHero({ worldSlug, title, description }: { worldSlug: string; title: string; description: string }) {
  return (
    <section className={`relative overflow-hidden rounded-[34px] border border-[#d6c9b5] p-6 md:p-8 ${WORLD_THEME_MAP[worldSlug] ?? WORLD_THEME_MAP["calico-critters"]}`}>
      <div className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.52),transparent_72%)]" aria-hidden />
      <div className="relative">
        <div className="inline-flex h-24 w-60 items-center justify-center rounded-[24px] border border-[#d6c9b5] bg-[#fffaf4]/88 px-4">
          <div className="relative h-16 w-48">
            <Image src={WORLD_LOGO_MAP[worldSlug] ?? asset("/assets/logos/trinket-logo.png")} alt={`${title} logo`} fill className="object-contain" />
          </div>
        </div>
        <p className="section-label mt-5">Collector world</p>
        <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-[#2e2a26] md:text-5xl">{title}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-[#5d554d] md:text-base">{description}</p>
      </div>
    </section>
  );
}
