import Link from "next/link";
import { notFound } from "next/navigation";
import { Sparkles } from "lucide-react";
import { AlertForm } from "@/components/alert-form";
import { AttributionModal } from "@/components/attribution-modal";
import { CollectionStatusPicker } from "@/components/collection-status-picker";
import { ConfidenceMeter } from "@/components/confidence-meter";
import { ItemImageFallback } from "@/components/item-image";
import { ItemCard } from "@/components/item-card";
import { ListingsTable } from "@/components/listings-table";
import { MarketHeatBadge } from "@/components/market-heat-badge";
import { PriceChart } from "@/components/price-chart";
import { RarityBadge } from "@/components/rarity-badge";
import { SiteShell } from "@/components/site-shell";
import { ThemeSetter } from "@/components/theme-setter";
import { ValuePill } from "@/components/value-pill";
import { AUTHENTICITY_TIPS } from "@/lib/catalog";
import { getItemBySlug } from "@/lib/queries";
import { normalizeUniverseSlug } from "@/lib/routing";
import { STATIC_DB } from "@/lib/static-data";
import { ITEM_BACKGROUND_STYLES } from "@/lib/themes";
import { formatCurrency, formatPercent } from "@/lib/utils";

export async function ItemDetailPage({
  slug,
  universeSlug,
  themeUniverseSlug
}: {
  slug: string;
  universeSlug?: string;
  themeUniverseSlug?: string;
}) {
  const data = await getItemBySlug(slug);
  if (!data) {
    notFound();
  }

  if (universeSlug && normalizeUniverseSlug(data.item.release.universe.slug) !== normalizeUniverseSlug(universeSlug)) {
    notFound();
  }

  const activeThemeUniverse = themeUniverseSlug ?? universeSlug ?? data.item.release.universe.slug;
  const chartData = data.item.pricePoints.slice(-24).map((point) => ({
    timestamp: new Date(point.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    value: Number(point.price.toFixed(2))
  }));
  const tips = AUTHENTICITY_TIPS[data.item.release.slug] ?? [];
  const buyLinks = [
    { label: "Buy on eBay", url: "#", note: "Affiliate-ready marketplace link slot", affiliate: true },
    { label: "Buy on Mercari", url: "#", note: "Affiliate-ready marketplace link slot", affiliate: true },
    { label: "Buy on StockX", url: "#", note: "Affiliate-ready marketplace link slot", affiliate: true },
    { label: "Official product page", url: data.item.officialProductPageUrl, note: "Direct brand reference link", affiliate: false }
  ] as const;

  return (
    <SiteShell className="space-y-10 page-enter">
      <ThemeSetter
        universe={activeThemeUniverse}
        release={data.item.release.slug}
        itemSlug={data.item.slug}
        itemTheme={{
          slug: data.item.slug,
          accent: data.item.itemAccentColor,
          bgStyle: ITEM_BACKGROUND_STYLES[data.item.itemBgStyle] ?? ITEM_BACKGROUND_STYLES.sparkleGradient
        }}
      />

      <section className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <div className="panel-card overflow-hidden rounded-[20px] p-4">
          <div className="panel-frame relative h-[440px] overflow-hidden">
            <ItemImageFallback src={data.item.imageUrl} alt={data.item.name} fill className="h-full w-full object-cover" />
          </div>
          <div className="panel-frame mt-4 p-4 text-sm text-[#5d554d]">
            <p>
              Image credit: <span className="font-semibold text-[#2e2a26]">{data.item.imageCreditText}</span>
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <Link href={data.item.officialProductPageUrl} target="_blank" className="font-semibold text-[#7b4a35] underline-offset-4 hover:underline">
                Official product page
              </Link>
              <AttributionModal />
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="panel-card rounded-[20px] p-6">
            <div className="flex flex-wrap items-center gap-3">
              <RarityBadge rarity={data.item.rarity} />
              <MarketHeatBadge heat={data.item.metrics.marketHeat} />
              <p className="section-label">{data.item.release.name}</p>
            </div>
            <h1 className="mt-4 font-display text-4xl font-semibold text-[#2e2a26] md:text-5xl">{data.item.name}</h1>
            <p className="mt-3 text-sm leading-6 text-[#5d554d]">
              Released {new Date(data.item.releaseDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <ValuePill value={data.item.metrics.estimatedValue} confidence={data.item.metrics.confidence} />
              <span className="rounded-full border border-[#E8E0D4] bg-[#FFFCF8] px-4 py-2 text-sm font-semibold text-[#5d554d]">
                {formatPercent(data.item.metrics.sevenDayChange)} this week
              </span>
              <span className="rounded-full border border-[#E8E0D4] bg-[#FFFCF8] px-4 py-2 text-xs font-semibold text-[#8f7661]">
                updated {new Date(data.item.metrics.lastUpdated).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}
              </span>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <Metric label="Low" value={formatCurrency(data.item.metrics.low)} />
              <Metric label="Average" value={formatCurrency(data.item.metrics.average)} />
              <Metric label="High" value={formatCurrency(data.item.metrics.high)} />
            </div>
            <div className="mt-5">
              <ConfidenceMeter confidence={data.item.metrics.confidence} score={data.item.metrics.confidenceScore} />
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-[#8f7661]">
              <span className="rounded-full border border-[#E8E0D4] bg-[#FFFCF8] px-3 py-1">source: {data.item.metrics.sourceLabels.join(" + ")}</span>
              <span className="rounded-full border border-[#E8E0D4] bg-[#FFFCF8] px-3 py-1">sample points: {data.item.metrics.samplePoints}</span>
            </div>
            <div className="mt-5">
              <CollectionStatusPicker item={data.item} />
            </div>
          </div>
          <AlertForm />
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="panel-card rounded-[20px] p-6">
          <p className="section-label sparkle-accent">Price history</p>
          <h2 className="mt-4 font-display text-3xl font-semibold text-[#2e2a26]">Market movement over time</h2>
          <PriceChart data={chartData} />
        </div>
        <div className="space-y-6">
          <div className="panel-card rounded-[20px] p-6">
            <p className="section-label">Quick read</p>
            <div className="mt-5 grid gap-3">
              <SummaryRow label="Sample points" value={`${data.item.metrics.samplePoints}`} />
              <SummaryRow label="Volatility" value={`${Math.round(data.item.metrics.volatility * 100)}%`} />
              <SummaryRow label="Confidence score" value={`${Math.round(data.item.metrics.confidenceScore * 100)}%`} />
              <SummaryRow label="Active listings" value={`${data.item.listings.length}`} />
            </div>
          </div>

          <div className="panel-card rounded-[20px] p-6">
            <p className="section-label sparkle-accent">Where to buy</p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-[#2e2a26]">Collector checkout paths</h2>
            <div className="mt-4 space-y-3">
              {buyLinks.map((link) => (
                <div key={link.label} className="panel-frame px-4 py-3">
                  {link.url === "#" ? (
                    <span className="font-semibold text-[#2e2a26]">{link.label}</span>
                  ) : (
                    <Link href={link.url} target="_blank" className="font-semibold text-[#7b4a35] underline-offset-4 hover:underline">
                      {link.label}
                    </Link>
                  )}
                  <p className="mt-1 text-xs text-[#5d554d]">{link.affiliate ? "Affiliate-ready slot" : link.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="panel-card rounded-[20px] p-6">
            <p className="section-label sparkle-accent">TRinket Club</p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-[#2e2a26]">Premium collector tools</h2>
            <div className="mt-4 grid gap-3">
              {["Advanced alerts", "Collection value tracking", "Portfolio analytics", "Expanded save features"].map((feature) => (
                <div key={feature} className="panel-frame flex items-center gap-3 px-4 py-3">
                  <Sparkles className="h-4 w-4 text-[#d4854a]" />
                  <span className="text-sm font-medium text-[#2e2a26]">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {tips.length ? (
            <div className="panel-card rounded-[20px] p-6">
              <p className="section-label">Authenticity tips</p>
              <h2 className="mt-4 font-display text-3xl font-semibold text-[#2e2a26]">Quick legit check</h2>
              <ul className="mt-4 space-y-3 text-sm text-[#5d554d]">
                {tips.map((tip) => (
                  <li key={tip} className="panel-frame px-4 py-3">
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>

      <section>
        <p className="section-label">Active listings</p>
        <h2 className="mt-4 font-display text-3xl font-semibold text-[#2e2a26]">Current asking prices</h2>
        <div className="mt-4">
          <ListingsTable listings={data.item.listings.slice(0, 12)} />
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <p className="section-label">Similar items</p>
          <h2 className="mt-4 font-display text-3xl font-semibold text-[#2e2a26]">Same shelf, different mood</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {data.similar.map((item) => (
            <ItemCard key={item.id} item={item} compact />
          ))}
        </div>
      </section>
    </SiteShell>
  );
}

export function getItemStaticParams(universeSlug?: string) {
  return STATIC_DB.items
    .filter((item) => {
      if (!universeSlug) {
        return true;
      }
      const release = STATIC_DB.releases.find((entry) => entry.id === item.releaseId);
      return release?.universe.slug === universeSlug;
    })
    .map((item) => ({
      slug: item.slug
    }));
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="panel-frame p-4">
      <p className="text-sm text-[#8f7661]">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-[#2e2a26]">{value}</p>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="panel-frame flex items-center justify-between px-4 py-3">
      <span className="text-sm text-[#5d554d]">{label}</span>
      <span className="font-semibold text-[#2e2a26]">{value}</span>
    </div>
  );
}
