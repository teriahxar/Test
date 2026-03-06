import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { IMAGE_ATTRIBUTION } from "@/lib/catalog";
import { STATIC_DB } from "@/lib/static-data";

export default function AttributionPage() {
  return (
    <SiteShell className="space-y-8 page-enter">
      <section>
        <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Attribution</p>
        <h1 className="mt-2 font-display text-4xl font-semibold">Image credits and source policy</h1>
      </section>

      <section className="sticker-card rounded-[32px] p-6 text-sm text-muted-foreground">
        <p>
          TRinket uses local assets from this repository, with official product links and attribution metadata for
          transparency. Replace assets only with licensed/approved files and keep attribution fields updated.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          {IMAGE_ATTRIBUTION.map((source) => (
            <Link key={source.url} href={source.url} target="_blank" className="rounded-full border border-border bg-card/70 px-4 py-2 text-foreground transition-colors hover:bg-card">
              {source.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-2xl font-semibold">Per-item credit list</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {STATIC_DB.items.map((item) => (
            <div key={item.slug} className="rounded-[22px] border border-white/60 bg-white/70 p-4">
              <p className="font-semibold">{item.name}</p>
              <p className="text-xs text-muted-foreground">{item.imageCreditText}</p>
              <Link href={item.officialProductPageUrl} target="_blank" className="mt-1 inline-block text-xs font-semibold text-primary underline-offset-4 hover:underline">
                Official product page
              </Link>
            </div>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
