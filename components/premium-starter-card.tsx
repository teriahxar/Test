import { Button } from "@/components/ui/button";

export function PremiumStarterCard() {
  return (
    <section className="sticker-card rounded-[34px] p-6">
      <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">TRinket Club</p>
      <h2 className="mt-2 font-display text-3xl font-semibold">Premium Starter</h2>
      <p className="mt-2 text-sm text-muted-foreground">Tasteful, optional upgrades for collectors who want deeper insights and extra shelf customization.</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <FeatureRow label="Advanced alert bundles" />
        <FeatureRow label="Deeper collection analytics" />
        <FeatureRow label="Seasonal profile frames" />
        <FeatureRow label="Larger watchlists + shelves" />
      </div>
      <div className="mt-5">
        <Button variant="primary">Join TRinket Club</Button>
      </div>
    </section>
  );
}

function FeatureRow({ label }: { label: string }) {
  return (
    <div className="rounded-[20px] border border-white/65 bg-white/75 px-4 py-3 text-sm font-semibold">
      {label}
    </div>
  );
}
