import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <SiteShell className="flex min-h-[70vh] items-center justify-center">
      <div className="max-w-lg rounded-[30px] border border-border bg-card/80 p-8 text-center shadow-vault">
        <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Lost item</p>
        <h1 className="mt-2 font-display text-4xl font-semibold">That collectible is off the shelf.</h1>
        <p className="mt-3 text-muted-foreground">Return to the universe selector and jump back into the market view.</p>
        <Button asChild className="mt-6">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </SiteShell>
  );
}
