import { SiteShell } from "@/components/site-shell";

export default function MethodologyPage() {
  return (
    <SiteShell className="space-y-8 page-enter">
      <section>
        <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Methodology</p>
        <h1 className="mt-2 font-display text-4xl font-semibold">How TRinket estimates value</h1>
      </section>

      <section className="sticker-card rounded-[32px] p-6 text-sm leading-7 text-muted-foreground">
        <p>
          TRinket MVP uses mocked marketplace datasets that imitate real resale behavior. We calculate estimated value from weighted recent price points, then normalize by condition factors:
          Mint 1.08x, Excellent 1.0x, Good 0.92x, Fair 0.81x.
        </p>
        <p className="mt-4">
          Confidence score combines sample density and volatility. More recent, consistent transactions produce higher confidence. Every value module surfaces last-updated time and source labels.
        </p>
        <p className="mt-4">
          TRinket is not financial advice and does not claim real-time pricing in MVP mode. API and schema are structured for later integrations (e.g., marketplace sold comps and listings ingestion).
        </p>
      </section>
    </SiteShell>
  );
}
