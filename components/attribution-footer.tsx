import Link from "next/link";
import { IMAGE_ATTRIBUTION } from "@/lib/catalog";
import { AttributionFooterLink } from "@/components/attribution-footer-link";

export function AttributionFooter() {
  return (
    <footer className="mt-14 border-t border-[#d6c9b5]/80 bg-[#faf7f2]/80 py-8">
      <div className="container flex flex-col gap-5 text-sm text-[#5d554d] md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-lg font-semibold text-[#2e2a26]">TRinket</p>
          <p className="max-w-2xl">A warm collectible guide for browsing, saving, and checking what belongs on your shelf next.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {IMAGE_ATTRIBUTION.map((source) => (
            <Link
              key={source.url}
              href={source.url}
              target="_blank"
              className="rounded-full border border-[#d6c9b5] bg-[#fffdf9] px-4 py-2 text-[#5d554d] transition hover:bg-[#fffaf4]"
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
