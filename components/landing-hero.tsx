import Image from "next/image";
import { asset } from "@/lib/utils";

export function LandingHero() {
  return (
    <section className="relative mx-auto flex w-full max-w-4xl flex-col items-center text-center">
      <div className="absolute left-1/2 top-8 h-44 w-44 -translate-x-1/2 rounded-full bg-[#fbd1a0]/25 blur-3xl" aria-hidden />
      <div className="absolute right-[16%] top-4 h-24 w-24 rounded-full bg-[#e9e0fb]/35 blur-3xl" aria-hidden />
      <div className="relative h-20 w-[220px] sm:h-24 sm:w-[280px]">
        <Image src={asset("/assets/logos/trinket-logo.png")} alt="TRinket logo" fill className="object-contain drop-shadow-[0_20px_34px_rgba(83,71,56,0.1)]" priority />
      </div>
      <h1 className="mt-6 font-display text-[52px] font-extrabold leading-[0.94] text-foreground sm:text-[72px] lg:text-[96px]">
        TRinket
      </h1>
      <p className="mt-4 text-sm font-semibold uppercase tracking-[0.28em] text-muted-foreground sm:text-base">Collector Guide</p>
      <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">Choose your collectible world.</p>
    </section>
  );
}
