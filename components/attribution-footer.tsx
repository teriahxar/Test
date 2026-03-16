import Link from "next/link";
import { IMAGE_ATTRIBUTION } from "@/lib/catalog";
import { AttributionFooterLink } from "@/components/attribution-footer-link";

export function AttributionFooter() {
  return (
    <footer className="mt-10 border-t border-border/70 bg-white/50 py-6 backdrop-blur-xl">
      <div className="container flex flex-col gap-4 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold text-foreground">TRinket</p>
          <p className="max-w-2xl text-sm">Price tracking, saved shelves, and source references in one clean collectible space.</p>
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
          <AttributionFooterLink />
        </div>
      </div>
    </footer>
  );
}
