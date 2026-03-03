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
        <AreaChart data={data}>
          <defs>
            <linearGradient id="vault-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.35} />
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(120,120,120,0.12)" vertical={false} />
          <XAxis dataKey="timestamp" tickLine={false} axisLine={false} minTickGap={32} />
          <YAxis tickFormatter={(value) => `$${value}`} tickLine={false} axisLine={false} width={48} />
          <Tooltip
            contentStyle={{
              background: "rgba(255,255,255,0.96)",
              borderRadius: 18,
              border: "1px solid rgba(0,0,0,0.08)"
            }}
            formatter={(value: number) => formatCurrency(value)}
          />
          <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" fill="url(#vault-gradient)" strokeWidth={3} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
