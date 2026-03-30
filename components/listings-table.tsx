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
    <div className="overflow-hidden rounded-[30px] border border-[#d6c9b5] bg-[#fffdf9] shadow-[var(--shadow-card)]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-[#faf7f2] text-[#8f7661]">
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
              <tr key={listing.id} className="border-t border-[#e6dccd]">
                <td className="px-4 py-3 font-semibold text-[#2e2a26]">{listing.marketplace}</td>
                <td className="px-4 py-3 text-[#2e2a26]">{formatCurrency(listing.price)}</td>
                <td className="px-4 py-3 text-[#5d554d]">{readableCondition[listing.condition]}</td>
                <td className="px-4 py-3 text-[#5d554d]">
                  {new Date(listing.timestamp).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit"
                  })}
                </td>
                <td className="px-4 py-3">
                  <a href={listing.url} className="font-semibold text-[#7b4a35] underline-offset-4 hover:underline">
                    Open
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
