import { cn } from "@/lib/utils";

const stickers: Record<string, string> = {
  heart: "M19.5 34.5C6.5 24.5 2 18 2 10.8 2 5.9 5.9 2 10.8 2c2.9 0 5.6 1.4 7.2 3.7C19.6 3.4 22.3 2 25.2 2 30.1 2 34 5.9 34 10.8 34 18 29.5 24.5 16.5 34.5Z",
  star: "M18 2l4.1 8.5L31 11.8l-6.5 6.3 1.5 8.9L18 22.5 10 27l1.5-8.9L5 11.8l8.9-1.3Z",
  sparkle: "M18 1l2.9 8.1L29 12l-8.1 2.9L18 23l-2.9-8.1L7 12l8.1-2.9Z",
  cloud: "M13.3 29C6.5 29 1 23.8 1 17.4 1 11.2 6.1 6 12.5 6c1.2 0 2.3.2 3.4.5C18.5 3.1 22.3 1 26.5 1 33.9 1 40 6.8 40 14c0 .5 0 1-.1 1.5C43.5 16.7 46 20 46 23.8 46 28.3 42.2 32 37.5 32H13.3Z",
  bow: "M18 20c-3.5-5-10-9.3-14-6.1C.7 16.7 2 24.3 7.7 27c3.6 1.7 7.3.2 10.3-2.5C21 27.2 24.7 28.7 28.3 27c5.7-2.7 7-10.3 3.7-13.1-4-3.2-10.5 1.1-14 6.1ZM17 18h2v16h-2z",
  flower: "M18 13c2.5-5 8.8-7.3 12-3.5 2.3 2.7 1.8 7.3-2.8 10 4.5 2.6 5.1 7.3 2.8 10-3.2 3.8-9.5 1.5-12-3.5-2.5 5-8.8 7.3-12 3.5-2.3-2.7-1.8-7.4 2.8-10-4.5-2.7-5.1-7.3-2.8-10 3.2-3.8 9.5-1.5 12 3.5Zm0 3.8a4.2 4.2 0 1 0 0 8.4 4.2 4.2 0 0 0 0-8.4Z",
  leaf: "M3 24C3 9.5 13 2 31 2c0 18-7.5 28-22 28-3.2 0-6-.9-8.6-2.7 7.8-1.7 13.7-5.6 17.8-11.7C13 19.4 7.9 22.2 3 24Z",
  moon: "M27 5c-8.8 1.8-15.4 9.5-15.4 18.9 0 4.6 1.6 8.8 4.2 12.1C8.1 33.7 2 26.5 2 17.9 2 7.6 10.3-1 20.6-1c2.3 0 4.5.4 6.4 1.2Z",
  cross: "M15 2h6v11h11v6H21v11h-6V19H4v-6h11Z",
  berry: "M18 33c-6.8 0-12-4.4-12-10.5 0-5.4 4.4-9.4 9.6-9.4 4.9 0 8.8 3 10 7.5 1.4-.5 2.9-.8 4.4-.8 5.4 0 9.7 3.7 9.7 8.8C39.7 31.3 29.6 33 18 33Z",
  pixel: "M4 4h8v8H4V4Zm10 0h8v8h-8V4Zm10 0h8v8h-8V4ZM4 14h8v8H4v-8Zm20 0h8v8h-8v-8ZM14 24h8v8h-8v-8Z",
  spark: "M17 2l2 7 7 2-7 2-2 7-2-7-7-2 7-2 2-7Z",
  bolt: "M20 2 7 19h8l-3 13 13-17h-8l3-13Z",
  drop: "M18 2c5.5 8 11 12.6 11 18.5C29 27.3 24.1 32 18 32S7 27.3 7 20.5C7 14.6 12.5 10 18 2Z",
  swirl: "M8 25c0-6 5.1-9.9 10.6-9.9 3.6 0 6.4 1.4 8.5 3.9-1.4-6-6.5-10.2-12.8-10.2C6.9 8.8 1 14.8 1 22.2 1 29.6 6.8 35 14.2 35c6 0 11.1-3.3 13.3-8.6-2.2 2.1-4.8 3.2-7.9 3.2-5.7 0-11.6-3.2-11.6-4.6Z"
};

export function StickerPack({
  names,
  className,
  tone = "primary"
}: {
  names: string[];
  className?: string;
  tone?: "primary" | "accent" | "white";
}) {
  const fill =
    tone === "accent"
      ? "fill-[hsl(var(--accent))]"
      : tone === "white"
        ? "fill-white/80"
        : "fill-[hsl(var(--primary))]";

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {names.slice(0, 4).map((name, index) => (
        <svg
          key={`${name}-${index}`}
          viewBox="0 0 48 48"
          className={cn("absolute h-8 w-8 opacity-80 drop-shadow-sm", fill, index === 0 && "left-5 top-5", index === 1 && "right-8 top-10 h-10 w-10 rotate-12", index === 2 && "bottom-9 left-8 h-9 w-9 -rotate-12", index === 3 && "bottom-8 right-6 h-8 w-8")}
        >
          <path d={stickers[name] ?? stickers.sparkle} />
        </svg>
      ))}
    </div>
  );
}
