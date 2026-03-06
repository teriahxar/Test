import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value < 100 ? 2 : 0
  }).format(value);
}

export function formatPercent(value: number) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "percent",
    maximumFractionDigits: 1,
    signDisplay: "always"
  });

  return formatter.format(value / 100);
}

export function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function hashString(input: string) {
  return Array.from(input).reduce((acc, char) => (acc << 5) - acc + char.charCodeAt(0), 0);
}

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const asset = (path: string) => {
  if (!path || /^https?:\/\//.test(path) || path.startsWith("data:")) {
    return path;
  }

  if (!path.startsWith("/")) {
    return path;
  }

  if (!basePath || path === basePath || path.startsWith(`${basePath}/`)) {
    return path;
  }

  return `${basePath}${path}`;
};

export function withBasePath(path: string) {
  return asset(path);
}
