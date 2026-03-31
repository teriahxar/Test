import { ItemCard } from "@/components/item-card";
import { NavSearch } from "@/components/nav-search";
import { PortalWorldCard } from "@/components/portal-world-card";
import { SiteShell } from "@/components/site-shell";
import { ThemeSetter } from "@/components/theme-setter";
import { WorldLink } from "@/components/world-link";
import { getTrending } from "@/lib/queries";
import { asset } from "@/lib/utils";

const WORLDS = [
  {
    href: "/popmart",
    logoSrc: asset("/assets/logos/popmart-logo.png"),
    title: "PopMart",
    description: "Blind boxes and character lines.",
    cardClass: "bg-[#C4CEBE]"
  },
  {
    href: "/pop",
    logoSrc: asset("/assets/logos/funko-pop-logo.png"),
    title: "Funko Pop",
    description: "Fandom shelves and box-window favorites.",
    cardClass: "bg-[#E8C4BA]"
  },
  {
    href: "/calico",
    logoSrc: asset("/assets/logos/calico-critters-logo.png"),
    title: "Calico Critters",
    description: "Soft miniature sets and cozy finds.",
    cardClass: "bg-[#F5EDE0]"
  }
] as const;

const QUICK_LINKS = [
  { href: "/popmart", label: "PopMart" },
  { href: "/pop", label: "Funko Pop" },
  { href: "/calico", label: "Calico Critters" }
] as const;

export default async function HomePage() {
  const trending = await getTrending();

  return (
    <SiteShell className="space-y-10 pb-12 page-enter">
      <ThemeSetter universe="neutral" />

      <section className="surface-card rounded-[24px] px-6 py-12 text-center sm:px-10">
        <div className="mx-auto max-w-4xl">
          <p className="font-display text-6xl font-semibold tracking-[0.02em] text-[#2C2418] sm:text-7xl">TRinket</p>
          <p className="mt-3 text-lg text-[#5D554D]">Track collectible values</p>
          <div className="mx-auto mt-8 max-w-3xl">
            <NavSearch className="w-full" inputClassName="h-16 rounded-full border-[#E8E0D4] bg-[#FFFCF8] px-6 pl-14 text-base" />
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            {QUICK_LINKS.map((item) => (
              <WorldLink
                key={item.href}
                href={item.href}
                className="inline-flex items-center rounded-full border border-[#E8E0D4] bg-[#FFFCF8] px-4 py-2 text-sm font-medium text-[#5D554D] transition hover:bg-[#F5EDE0]"
              >
                {item.label}
              </WorldLink>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="section-label">Trending Now</div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {trending.slice(0, 4).map((item) => (
            <ItemCard key={item.id} item={item} compact />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="section-label">Browse Worlds</div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {WORLDS.map((world) => (
            <PortalWorldCard
              key={world.href}
              href={world.href}
              logoSrc={world.logoSrc}
              title={world.title}
              description={world.description}
              className={world.cardClass}
            />
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
