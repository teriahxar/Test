import type { ReactNode } from "react";
import { AttributionFooter } from "@/components/attribution-footer";
import { GlobalNav } from "@/components/global-nav";
import { cn } from "@/lib/utils";

export function SiteShell({
  children,
  className,
  hideHeader = false
}: {
  children: ReactNode;
  className?: string;
  hideHeader?: boolean;
}) {
  return (
    <div className="min-h-screen text-foreground transition-colors duration-500">
      {!hideHeader ? <GlobalNav /> : null}
      <main className={cn(hideHeader ? "" : "container py-8 md:py-10", className)}>{children}</main>
      <AttributionFooter />
    </div>
  );
}
