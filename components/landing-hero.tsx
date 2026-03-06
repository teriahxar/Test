import Image from "next/image";
import { asset } from "@/lib/utils";

export function LandingHero() {
  return (
    <section className="relative mx-auto flex w-full max-w-5xl flex-col items-center text-center">
      <div className="relative h-[92px] w-[92px] rounded-full bg-white/72 p-2 shadow-[0_12px_24px_rgba(36,85,57,0.2)] sm:h-[110px] sm:w-[110px]">
        <Image src={asset("/assets/logos/trinket-mark.png")} alt="TRinket mark" fill className="rounded-full object-cover" priority />
      </div>
      <h1 className="font-display text-[48px] font-bold leading-[0.95] text-[#1f5d3d] drop-shadow-[0_6px_18px_rgba(27,76,49,0.18)] sm:text-[72px] lg:text-[102px] xl:text-[116px]">
        TRinket
      </h1>
      <p className="mt-5 text-[15px] font-semibold uppercase tracking-[0.24em] text-[#426f55] sm:text-lg">Collector Guide</p>
      <p className="mt-4 max-w-xl text-sm text-[#44664d] sm:text-base">Choose your collectible world.</p>
    </section>
  );
}
