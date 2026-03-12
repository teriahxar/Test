import { SettingsClient } from "@/components/settings-client";
import { SiteShell } from "@/components/site-shell";

export default function SettingsPage() {
  return (
    <SiteShell className="space-y-8 page-enter">
      <section className="surface-card rounded-[32px] p-6 sm:p-8">
        <p className="section-label">Settings</p>
        <h1 className="mt-4 font-display text-4xl font-semibold">Profile preferences, motion controls, and theme previews</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Keep the experience polished to your taste while leaving the core product clean and easy to browse.
        </p>
      </section>
      <SettingsClient />
    </SiteShell>
  );
}
