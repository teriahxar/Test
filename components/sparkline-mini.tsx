"use client";

import { Line, LineChart, ResponsiveContainer } from "recharts";

export function SparklineMini({ data }: { data: number[] }) {
  return (
    <div className="h-12 w-24">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data.map((value, index) => ({ index, value }))}>
          <Line
            type="monotone"
            dataKey="value"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
