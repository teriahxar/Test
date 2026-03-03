import { SiteShell } from "@/components/site-shell";
import { Skeleton } from "@/components/ui/skeleton";

export default function UniverseLoading() {
  return (
    <SiteShell className="space-y-6">
      <Skeleton className="h-56 rounded-[32px]" />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-[420px] rounded-[28px]" />
        ))}
      </div>
    </SiteShell>
  );
}
