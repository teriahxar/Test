import Image from "next/image";
import { asset } from "@/lib/utils";

export function LandingHero() {
  return (
    <section className="relative mx-auto flex w-full max-w-5xl flex-col items-center text-center">
      <div className="relative h-24 w-24 overflow-hidden rounded-full border border-white/80 bg-white/80 shadow-[0_14px_22px_rgba(49,92,64,0.24)] sm:h-28 sm:w-28">
        <Image src={asset("/assets/logos/trinket-mark.png")} alt="TRinket mark" fill className="object-cover" priority />
      </div>
      <div className="relative mt-4 h-20 w-[220px] sm:h-24 sm:w-[280px]">
        <Image src={asset("/assets/logos/trinket-logo.png")} alt="TRinket logo" fill className="object-contain drop-shadow-[0_10px_16px_rgba(29,78,49,0.2)]" priority />
      </div>
      <h1 className="bubble-heading mt-2 font-display text-[52px] font-bold leading-[0.95] sm:text-[72px] lg:text-[102px] xl:text-[116px]">
        TRinket
      </h1>
      <p className="mt-5 text-[15px] font-semibold uppercase tracking-[0.24em] text-[#3f6a50] sm:text-lg">Collector Guide</p>
      <p className="mt-4 max-w-xl text-sm text-[#44664d] sm:text-base">Choose your collectible world.</p>
    </section>
  );
}
