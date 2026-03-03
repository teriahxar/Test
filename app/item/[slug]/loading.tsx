import { SiteShell } from "@/components/site-shell";
import { Skeleton } from "@/components/ui/skeleton";

export default function ItemLoading() {
  return (
    <SiteShell className="space-y-6">
      <Skeleton className="h-[440px] rounded-[36px]" />
      <div className="grid gap-6 xl:grid-cols-2">
        <Skeleton className="h-[360px] rounded-[30px]" />
        <Skeleton className="h-[360px] rounded-[30px]" />
      </div>
    </SiteShell>
  );
}
