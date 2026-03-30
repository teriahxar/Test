"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatCurrency } from "@/lib/utils";

type Point = {
  timestamp: string;
  value: number;
};

export function PriceChart({ data }: { data: Point[] }) {
  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ left: 4, right: 8, top: 20, bottom: 0 }}>
          <defs>
            <linearGradient id="vault-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--chart-stroke)" stopOpacity={0.38} />
              <stop offset="95%" stopColor="var(--chart-stroke)" stopOpacity={0.04} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="var(--chart-grid)" vertical={false} />
          <XAxis dataKey="timestamp" tickLine={false} axisLine={false} minTickGap={30} fontSize={12} />
          <YAxis tickFormatter={(value) => `$${value}`} tickLine={false} axisLine={false} width={48} fontSize={12} />
          <Tooltip
            contentStyle={{
              background: "rgba(255,253,249,0.98)",
              borderRadius: 20,
              border: "1px solid rgba(214,201,181,0.9)",
              boxShadow: "0 12px 24px rgba(132,108,84,0.12)"
            }}
            formatter={(value: number) => formatCurrency(value)}
          />
          <Area type="monotone" dataKey="value" stroke="var(--chart-stroke)" fill="url(#vault-gradient)" strokeWidth={3} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
