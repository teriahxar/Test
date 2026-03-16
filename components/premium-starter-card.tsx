import { Button } from "@/components/ui/button";

export function PremiumStarterCard() {
  return (
    <section className="surface-card rounded-[34px] p-6">
      <p className="section-label">TRinket Club</p>
      <h2 className="mt-4 text-3xl font-semibold text-[#2F3A45]">Premium features, introduced quietly</h2>
      <p className="mt-2 text-sm text-muted-foreground">A tasteful membership layer for deeper alerts, analytics, and collection value tracking.</p>
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
    <div className="rounded-[20px] border border-border/70 bg-white/86 px-4 py-3 text-sm font-semibold">
      {label}
    </div>
  );
}
