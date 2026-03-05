import Link from "next/link";

export function AttributionFooterLink() {
  return (
    <Link
      href="/attribution"
      className="rounded-full border border-border bg-card/70 px-4 py-2 text-foreground transition-colors hover:bg-card"
    >
      Full attribution
    </Link>
  );
}
