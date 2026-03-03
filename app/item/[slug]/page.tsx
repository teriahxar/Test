import { notFound } from "next/navigation";
import { ThemeSetter } from "@/components/theme-setter";
import { AlertForm } from "@/components/alert-form";
import { ItemCard } from "@/components/item-card";
import { ListingsTable } from "@/components/listings-table";
import { PriceChart } from "@/components/price-chart";
import { RarityBadge } from "@/components/rarity-badge";
import { SiteShell } from "@/components/site-shell";
import { ValuePill } from "@/components/value-pill";
import { getItemBySlug } from "@/lib/queries";
import { formatCurrency, formatPercent } from "@/lib/utils";

export const revalidate = 3600;

export default async function ItemPage({ params }: { params: { slug: string } }) {
  const data = await getItemBySlug(params.slug);

  if (!data) {
    notFound();
  }

  const chartData = data.item.pricePoints.slice(-24).map((point) => ({
    timestamp: new Date(point.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    value: Number(point.price.toFixed(2))
  }));

  return (
    <SiteShell className="space-y-10 page-enter">
      <ThemeSetter universe={data.item.release.universe.slug} release={data.item.release.slug} itemSlug={data.item.slug} />
      <section className="grid gap-6 rounded-[36px] border border-white/30 bg-white/20 p-6 backdrop-blur-xl lg:grid-cols-[0.92fr_1.08fr]">
        <div className="overflow-hidden rounded-[30px] border border-border bg-card/80 p-4">
          <img src={data.item.imageUrl} alt={data.item.name} className="h-full min-h-[380px] w-full rounded-[24px] object-cover" />
        </div>
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <RarityBadge rarity={data.item.rarity} />
              <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{data.item.release.name}</p>
            </div>
            <h1 className="font-display text-4xl font-semibold md:text-5xl">{data.item.name}</h1>
            <p className="text-sm leading-6 text-muted-foreground">
              Released {new Date(data.item.release.releaseDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}.
            </p>
          </div>
          <ValuePill value={data.item.metrics.estimatedValue} confidence={data.item.metrics.confidence} />
          <div className="grid gap-4 sm:grid-cols-3">
            <Metric label="Recent low" value={formatCurrency(data.item.metrics.low)} />
            <Metric label="Average sold" value={formatCurrency(data.item.metrics.average)} />
            <Metric label="Recent high" value={formatCurrency(data.item.metrics.high)} />
          </div>
          <AlertForm item={data.item} />
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[30px] border border-border bg-card/80 p-6 shadow-vault">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Price history</p>
          <h2 className="mt-2 font-display text-2xl font-semibold">Estimated market trajectory</h2>
          <PriceChart data={chartData} />
        </div>
        <div className="rounded-[30px] border border-border bg-card/80 p-6 shadow-vault">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Recent sold summary</p>
          <div className="mt-5 grid gap-4">
            <SummaryRow label="Confidence score" value={`${Math.round(data.item.metrics.confidenceScore * 100)}%`} />
            <SummaryRow label="7d movement" value={formatPercent(data.item.metrics.sevenDayChange)} />
            <SummaryRow label="Volatility" value={`${Math.round(data.item.metrics.volatility * 100)}%`} />
            <SummaryRow label="Active listings" value={`${data.item.listings.length}`} />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Active listings</p>
          <h2 className="mt-2 font-display text-2xl font-semibold">Current asking prices</h2>
        </div>
        <ListingsTable listings={data.item.listings.slice(0, 12)} />
      </section>

      <section className="space-y-4">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Similar items</p>
          <h2 className="mt-2 font-display text-2xl font-semibold">Same release, different chase profile</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {data.similar.map((item) => (
            <ItemCard key={item.id} item={item} compact />
          ))}
        </div>
      </section>
    </SiteShell>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[24px] border border-border bg-white/55 p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-2 font-display text-2xl font-semibold">{value}</p>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-[20px] bg-muted/70 px-4 py-3">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
