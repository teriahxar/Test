import Image from "next/image";
import { asset } from "@/lib/utils";

export function LandingHero() {
  return (
    <section className="relative mx-auto flex w-full max-w-5xl flex-col items-center text-center">
      <div className="relative h-20 w-[220px] sm:h-24 sm:w-[280px]">
        <Image src={asset("/assets/logos/trinket-logo.png")} alt="TRinket logo" fill className="object-contain drop-shadow-[0_10px_16px_rgba(29,78,49,0.2)]" priority />
      </div>
      <h1 className="bubble-heading mt-3 font-display text-[52px] font-bold leading-[0.95] sm:text-[72px] lg:text-[102px] xl:text-[116px]">
        TRinket
      </h1>
      <p className="mt-5 text-[15px] font-semibold uppercase tracking-[0.24em] text-[#3f6a50] sm:text-lg">Collector Guide</p>
      <p className="mt-4 max-w-xl text-sm text-[#44664d] sm:text-base">Choose your collectible world.</p>
    </section>
  );
}
