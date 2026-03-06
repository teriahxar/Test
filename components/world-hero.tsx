import Image from "next/image";
import { asset } from "@/lib/utils";

const WORLD_LOGO_MAP: Record<string, string> = {
  "pop-mart": asset("/assets/logos/popmart-logo.png"),
  "calico-critters": asset("/assets/logos/calico-critters-logo.png"),
  pop: asset("/assets/logos/pop-logo.png")
};

export function WorldHero({ worldSlug, title, description }: { worldSlug: string; title: string; description: string }) {
  return (
    <section className="sticker-card rounded-[36px] p-6 md:p-8">
      <div className="relative">
        <div className="inline-flex h-16 w-44 items-center justify-center rounded-[18px] bg-white/70">
          <div className="relative h-10 w-36">
            <Image src={WORLD_LOGO_MAP[worldSlug] ?? asset("/assets/logos/trinket-logo.png")} alt={`${title} logo`} fill className="object-contain" />
          </div>
        </div>
        <h1 className="mt-5 font-display text-4xl font-semibold leading-tight md:text-5xl">{title}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground md:text-base">{description}</p>
      </div>
    </section>
  );
}
