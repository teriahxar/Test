import Link from "next/link";
import { ArrowRight, Sparkles, Sprout, Stars } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { LogoMark } from "@/components/logo-mark";
import { ThemeSetter } from "@/components/theme-setter";
import { getTrending } from "@/lib/queries";
import { universeHref, universeItemHref } from "@/lib/routing";

const portals = [
  {
    title: "Pop Mart Universe",
    subtitle: "Candy-gloss blind boxes and fast-moving trend swings.",
    universeSlug: "pop-mart",
    icon: Stars
  },
  {
    title: "Calico Critters Universe",
    subtitle: "Cozy meadow sets, warm nostalgia, and cottagecore market vibes.",
    universeSlug: "calico-critters",
    icon: Sprout
  }
] as const;

export default async function HomePage() {
  const trending = await getTrending();

  return (
    <SiteShell hideHeader className="page-enter">
      <ThemeSetter universe="neutral" />
      <div className="landing-portal px-4 py-8 md:px-8 md:py-10">
        <div className="sun-blob top-left" />
        <div className="sun-blob bottom-right" />

        <section className="relative mx-auto flex min-h-[62vh] max-w-5xl flex-col items-center justify-center text-center">
          <p className="rounded-full border border-emerald-900/15 bg-white/78 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-900/70">
            ENTER THE SAFE-SPACE MARKET DIMENSION
          </p>
          <LogoMark className="mt-8" />
          <p className="mt-5 text-lg font-semibold text-emerald-950/90">Your cozy collectible market index</p>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-emerald-900/75 md:text-base">
            Soft visuals, transparent value signals, and adorable collectible discovery without the clutter.
          </p>

          <div className="mt-8 grid w-full max-w-4xl gap-4 md:grid-cols-2">
            {portals.map((portal) => {
              const Icon = portal.icon;
              return (
                <Link
                  key={portal.universeSlug}
                  href={universeHref(portal.universeSlug)}
                  className="group rounded-[30px] border border-emerald-900/18 bg-white px-6 py-6 text-left shadow-[0_14px_30px_rgba(45,95,57,0.2)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(43,96,56,0.26)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="mt-4 font-display text-3xl font-semibold text-emerald-950">{portal.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-emerald-900/75">{portal.subtitle}</p>
                  <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-emerald-50">
                    Enter
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </div>
                </Link>
              );
            })}
          </div>

          <Link href="#how-it-works" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-900 underline-offset-4 hover:underline">
            <Sparkles className="h-4 w-4" />
            How it works
          </Link>
        </section>

        <section className="relative mx-auto mt-4 max-w-5xl rounded-[28px] border border-emerald-900/14 bg-white/88 p-5 shadow-[0_12px_26px_rgba(48,102,62,0.14)]">
          <p className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-900/75">
            <Sparkles className="h-3.5 w-3.5" />
            Trending today
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {trending.slice(0, 3).map((item) => (
              <Link
                key={item.slug}
                href={universeItemHref(item.release.universe.slug, item.slug)}
                className="rounded-[20px] border border-emerald-900/10 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-sm"
              >
                <p className="font-display text-xl font-semibold text-emerald-950">{item.name}</p>
                <p className="text-sm text-emerald-900/75">{item.release.name}</p>
              </Link>
            ))}
          </div>
        </section>

        <section id="how-it-works" className="relative mx-auto mt-6 max-w-5xl rounded-[26px] border border-emerald-900/12 bg-white/80 p-5">
          <h3 className="font-display text-2xl font-semibold text-emerald-950">How it works</h3>
          <p className="mt-2 text-sm leading-6 text-emerald-900/75">
            Pick a universe, browse trends and movers, open any item for detail-level value context, and save watchlist alerts locally.
          </p>
        </section>
      </div>
    </SiteShell>
  );
}
