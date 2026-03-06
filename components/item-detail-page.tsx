import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertForm } from "@/components/alert-form";
import { AttributionModal } from "@/components/attribution-modal";
import { CollectionStatusPicker } from "@/components/collection-status-picker";
import { ConfidenceMeter } from "@/components/confidence-meter";
import { ItemCard } from "@/components/item-card";
import { ListingsTable } from "@/components/listings-table";
import { MarketHeatBadge } from "@/components/market-heat-badge";
import { PriceChart } from "@/components/price-chart";
import { RarityBadge } from "@/components/rarity-badge";
import { ShareableItemCard } from "@/components/shareable-item-card";
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
        <div className="sticker-card overflow-hidden rounded-[36px] p-4">
          <div className="relative h-[440px] overflow-hidden rounded-[28px] bg-white/70">
            <Image src={data.item.imageUrl} alt={data.item.name} fill className="object-cover" />
          </div>
          <div className="mt-4 rounded-[22px] bg-white/70 p-4 text-sm text-muted-foreground">
            <p>
              Image credit: <span className="font-semibold text-foreground">{data.item.imageCreditText}</span>
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <Link href={data.item.officialProductPageUrl} target="_blank" className="font-semibold text-primary underline-offset-4 hover:underline">
                Official product page
              </Link>
              <AttributionModal />
            </div>
          </div>
        </div>
        <div className="space-y-5">
          <div className="sticker-card rounded-[36px] p-6">
            <div className="flex flex-wrap items-center gap-3">
              <RarityBadge rarity={data.item.rarity} />
              <MarketHeatBadge heat={data.item.metrics.marketHeat} />
              <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{data.item.release.name}</p>
            </div>
            <h1 className="mt-4 font-display text-4xl font-semibold md:text-5xl">{data.item.name}</h1>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Released {new Date(data.item.releaseDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <ValuePill value={data.item.metrics.estimatedValue} confidence={data.item.metrics.confidence} />
              <span className="rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-muted-foreground">
                {formatPercent(data.item.metrics.sevenDayChange)} this week
              </span>
              <span className="rounded-full bg-white/70 px-4 py-2 text-xs font-semibold text-muted-foreground">
                last updated {new Date(data.item.metrics.lastUpdated).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}
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
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="rounded-full bg-white/70 px-3 py-1">source: {data.item.metrics.sourceLabels.join(" + ")}</span>
              <span className="rounded-full bg-white/70 px-3 py-1">sample points: {data.item.metrics.samplePoints}</span>
            </div>
            <div className="mt-5">
              <CollectionStatusPicker item={data.item} />
            </div>
          </div>
          <AlertForm item={data.item} />
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="sticker-card rounded-[34px] p-6">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Price history</p>
          <h2 className="mt-2 font-display text-2xl font-semibold">Market mood over time</h2>
          <PriceChart data={chartData} />
        </div>
        <div className="space-y-6">
          <div className="sticker-card rounded-[34px] p-6">
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Recent sold summary</p>
            <div className="mt-5 grid gap-3">
              <SummaryRow label="Sample points" value={`${data.item.metrics.samplePoints}`} />
              <SummaryRow label="Volatility" value={`${Math.round(data.item.metrics.volatility * 100)}%`} />
              <SummaryRow label="Confidence score" value={`${Math.round(data.item.metrics.confidenceScore * 100)}%`} />
              <SummaryRow label="Active listings" value={`${data.item.listings.length}`} />
            </div>
          </div>
          <div className="sticker-card rounded-[34px] p-6">
            <details open>
              <summary className="cursor-pointer text-xs uppercase tracking-[0.22em] text-muted-foreground">How we estimate value</summary>
              <p className="mt-3 text-sm text-muted-foreground">
                TRinket uses a weighted average of recent sold price points with condition adjustments (Mint, Excellent, Good, Fair). Confidence increases with more data points and lower volatility.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                This MVP uses mocked marketplace data and should not be treated as real-time market advice.
              </p>
            </details>
          </div>
          {tips.length ? (
            <div className="sticker-card rounded-[34px] p-6">
              <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Authenticity tips</p>
              <h2 className="mt-2 font-display text-2xl font-semibold">Quick legit check</h2>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                {tips.map((tip) => (
                  <li key={tip} className="rounded-[22px] bg-white/70 px-4 py-3">
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Active listings</p>
          <h2 className="mt-2 font-display text-2xl font-semibold">Current asking prices</h2>
          <div className="mt-4">
            <ListingsTable listings={data.item.listings.slice(0, 12)} />
          </div>
        </div>
        <ShareableItemCard item={data.item} />
      </section>

      <section className="space-y-4">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Similar items</p>
          <h2 className="mt-2 font-display text-2xl font-semibold">Same shelf, different vibe</h2>
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
    <div className="rounded-[24px] border border-white/50 bg-white/75 p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-2 font-display text-2xl font-semibold">{value}</p>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-[20px] bg-white/70 px-4 py-3">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
