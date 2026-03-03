import { SettingsClient } from "@/components/settings-client";
import { SiteShell } from "@/components/site-shell";

export default function SettingsPage() {
  return (
    <SiteShell className="space-y-8 page-enter">
      <section>
        <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Settings</p>
        <h1 className="mt-2 font-display text-4xl font-semibold">Theme previews, motion controls, and sound toggle</h1>
      </section>
      <SettingsClient />
    </SiteShell>
  );
}
