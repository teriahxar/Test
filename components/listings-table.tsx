import { Condition } from "@prisma/client";
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
    <div className="overflow-hidden rounded-[26px] border border-border bg-card/80">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead className="bg-muted/80 text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Marketplace</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Condition</th>
              <th className="px-4 py-3 font-medium">Timestamp</th>
              <th className="px-4 py-3 font-medium">Link</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((listing) => (
              <tr key={listing.id} className="border-t border-border">
                <td className="px-4 py-3">{listing.marketplace}</td>
                <td className="px-4 py-3 font-semibold">{formatCurrency(listing.price)}</td>
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
                  <a href={listing.url} className="text-primary underline-offset-4 hover:underline">
                    View
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
