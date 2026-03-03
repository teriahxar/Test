import { Condition, type Item, type Listing, type PricePoint, type Release, type Universe } from "@prisma/client";
import { clamp, hashString } from "@/lib/utils";

const conditionWeight: Record<Condition, number> = {
  MINT: 1.08,
  EXCELLENT: 1,
  GOOD: 0.92,
  FAIR: 0.8
};

export type ItemWithMarketData = Item & {
  release: Release & {
    universe: Universe;
  };
  pricePoints: PricePoint[];
  listings: Listing[];
};

export type ItemMetrics = {
  estimatedValue: number;
  confidence: "low" | "medium" | "high";
  confidenceScore: number;
  low: number;
  average: number;
  high: number;
  sevenDayChange: number;
  sparkline: number[];
  volatility: number;
};

export function calculateItemMetrics(item: ItemWithMarketData): ItemMetrics {
  const sorted = [...item.pricePoints].sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  const now = Date.now();
  const weighted = sorted.map((point) => {
    const daysAgo = Math.max(1, (now - point.timestamp.getTime()) / (24 * 60 * 60 * 1000));
    const recencyWeight = 1 / Math.pow(daysAgo, 0.38);
    return {
      adjustedPrice: point.price / conditionWeight[point.condition],
      weight: recencyWeight
    };
  });

  const weightedTotal = weighted.reduce((sum, point) => sum + point.adjustedPrice * point.weight, 0);
  const weightSum = weighted.reduce((sum, point) => sum + point.weight, 0) || 1;
  const estimatedValue = weightedTotal / weightSum;
  const values = weighted.map((point) => point.adjustedPrice);
  const average = values.reduce((sum, value) => sum + value, 0) / (values.length || 1);
  const variance = values.reduce((sum, value) => sum + Math.pow(value - average, 2), 0) / (values.length || 1);
  const volatility = Math.sqrt(variance) / (average || 1);

  const recent = sorted.filter((point) => point.timestamp.getTime() >= now - 7 * 24 * 60 * 60 * 1000);
  const previous = sorted.filter(
    (point) =>
      point.timestamp.getTime() < now - 7 * 24 * 60 * 60 * 1000 &&
      point.timestamp.getTime() >= now - 14 * 24 * 60 * 60 * 1000
  );
  const recentAverage =
    recent.reduce((sum, point) => sum + point.price / conditionWeight[point.condition], 0) / Math.max(recent.length, 1);
  const previousAverage =
    previous.reduce((sum, point) => sum + point.price / conditionWeight[point.condition], 0) / Math.max(previous.length, 1);
  const sevenDayChange = previousAverage ? ((recentAverage - previousAverage) / previousAverage) * 100 : 0;

  const confidenceScore = clamp(sorted.length / 60 + (1 - volatility) * 0.45, 0.18, 0.98);
  const confidence =
    confidenceScore > 0.78 ? "high" : confidenceScore > 0.5 ? "medium" : "low";

  const sparkline = buildSparkline(sorted);

  return {
    estimatedValue: Number(estimatedValue.toFixed(2)),
    confidence,
    confidenceScore: Number(confidenceScore.toFixed(2)),
    low: Number(Math.min(...values).toFixed(2)),
    average: Number(average.toFixed(2)),
    high: Number(Math.max(...values).toFixed(2)),
    sevenDayChange: Number(sevenDayChange.toFixed(2)),
    sparkline,
    volatility: Number(volatility.toFixed(2))
  };
}

function buildSparkline(pricePoints: PricePoint[]) {
  const groups = new Map<string, number[]>();

  pricePoints.forEach((point) => {
    const key = point.timestamp.toISOString().slice(0, 10);
    const value = point.price / conditionWeight[point.condition];
    groups.set(key, [...(groups.get(key) ?? []), value]);
  });

  return [...groups.values()]
    .slice(-12)
    .map((values) => values.reduce((sum, value) => sum + value, 0) / values.length)
    .map((value) => Number(value.toFixed(2)));
}

export function calculateTrendingScore(item: ItemWithMarketData) {
  const metrics = calculateItemMetrics(item);
  const dailyRotation = Math.abs(hashString(`${item.slug}-${new Date().toISOString().slice(0, 10)}`) % 25);
  return metrics.sevenDayChange * 1.4 + metrics.confidenceScore * 10 + dailyRotation;
}
