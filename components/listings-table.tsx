import type { Condition } from "@/lib/data-model";
import type { DashboardItem } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

const readableCondition: Record<Condition, string> = {
  MINT: "Mint",
  EXCELLENT: "Excellent",
  GOOD: "Good",
  FAIR: "Fair"
};

export function ListingsTable({ listings }: { listings: DashboardItem["listings"] }) {
  return (
    <div className="overflow-hidden rounded-[30px] border border-border/70 bg-white/90 shadow-[var(--shadow-card)]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-[#f7fbff] text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-semibold">Marketplace</th>
              <th className="px-4 py-3 font-semibold">Price</th>
              <th className="px-4 py-3 font-semibold">Condition</th>
              <th className="px-4 py-3 font-semibold">Timestamp</th>
              <th className="px-4 py-3 font-semibold">Link</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((listing) => (
              <tr key={listing.id} className="border-t border-border/70">
                <td className="px-4 py-3 font-semibold">{listing.marketplace}</td>
                <td className="px-4 py-3">{formatCurrency(listing.price)}</td>
                <td className="px-4 py-3">{readableCondition[listing.condition]}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  {new Date(listing.timestamp).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit"
                  })}
                </td>
                <td className="px-4 py-3">
                  <a href={listing.url} className="font-semibold text-primary underline-offset-4 hover:underline">
                    Placeholder
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
