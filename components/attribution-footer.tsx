import Link from "next/link";
import { IMAGE_ATTRIBUTION } from "@/lib/catalog";

export function AttributionFooter() {
  return (
    <footer className="mt-10 border-t border-white/30 bg-white/20 py-6 backdrop-blur-xl">
      <div className="container flex flex-col gap-4 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold text-foreground">Image Attribution / Sources</p>
          <p className="max-w-2xl text-sm">
            Demo item art in VaultView uses original SVG illustrations created for this MVP. Official Pop Mart and
            Calico Critters pages were used only as legal visual references for styling and naming context.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {IMAGE_ATTRIBUTION.map((source) => (
            <Link
              key={source.url}
              href={source.url}
              target="_blank"
              className="rounded-full border border-border bg-card/70 px-4 py-2 text-foreground transition-colors hover:bg-card"
            >
              {source.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
