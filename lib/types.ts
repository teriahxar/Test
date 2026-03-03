import type { getItemBySlug, getUniverseDashboard } from "@/lib/queries";

export type DashboardData = NonNullable<Awaited<ReturnType<typeof getUniverseDashboard>>>;
export type DashboardItem = DashboardData["items"][number];
export type ItemDetailData = NonNullable<Awaited<ReturnType<typeof getItemBySlug>>>;
