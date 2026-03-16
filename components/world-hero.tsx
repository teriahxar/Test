import Image from "next/image";
import { asset } from "@/lib/utils";

const WORLD_LOGO_MAP: Record<string, string> = {
  "pop-mart": asset("/assets/logos/popmart-logo.png"),
  "calico-critters": asset("/assets/logos/calico-critters-logo.png"),
  pop: asset("/assets/logos/funko-pop-logo.png")
};

export function WorldHero({ worldSlug, title, description }: { worldSlug: string; title: string; description: string }) {
  const accent =
    worldSlug === "pop-mart"
      ? "from-[#eaf6ff] via-white to-[#f7fbff]"
      : worldSlug === "calico-critters"
        ? "from-[#e8fff6] via-white to-[#f7fbff]"
        : "from-[#eee9ff] via-white to-[#f7fbff]";

  return (
    <section className={`surface-card rounded-[36px] bg-gradient-to-br ${accent} p-6 md:p-8`}>
      <div className="relative">
        <div className="inline-flex h-20 w-52 items-center justify-center rounded-[24px] border border-white/70 bg-white/76 px-4">
          <div className="relative h-14 w-44">
            <Image src={WORLD_LOGO_MAP[worldSlug] ?? asset("/assets/logos/trinket-logo.png")} alt={`${title} logo`} fill className="object-contain drop-shadow-[0_14px_26px_rgba(126,201,255,0.14)]" />
          </div>
        </div>
        <p className="section-label sparkle-accent mt-5">Collector category</p>
        <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-foreground md:text-5xl">{title}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground md:text-base">{description}</p>
      </div>
    </section>
  );
}
