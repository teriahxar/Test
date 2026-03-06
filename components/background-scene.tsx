import { cn } from "@/lib/utils";

const MIDGROUND_BLOBS = [
  "left-[8%] top-[20%] h-40 w-40 bg-[#f5fbd2]",
  "right-[10%] top-[16%] h-52 w-52 bg-[#eaf7d6]",
  "left-[20%] bottom-[14%] h-44 w-44 bg-[#dcf2c8]",
  "right-[18%] bottom-[8%] h-36 w-36 bg-[#f8f8dc]"
];

export function BackgroundScene({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(255,246,206,0.56),transparent_36%),radial-gradient(circle_at_85%_14%,rgba(240,255,206,0.48),transparent_32%),linear-gradient(160deg,#d8f0cf_0%,#cce8bf_42%,#d9f1d3_76%,#e9f8e2_100%)]" />
      <div className="absolute -left-20 -top-16 h-80 w-80 rounded-full bg-[#fff5c5]/50 blur-[90px]" />
      <div className="absolute -bottom-24 -right-16 h-[22rem] w-[22rem] rounded-full bg-[#f0ffd6]/55 blur-[95px]" />
      <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(rgba(78,116,71,0.16)_0.9px,transparent_0.9px)] [background-size:5px_5px]" />
      <div className="absolute inset-0 opacity-45">
        {Array.from({ length: 12 }).map((_, index) => (
          <span
            key={`spark-${index}`}
            className="landing-sparkle absolute h-2 w-2 rounded-full bg-white/80"
            style={{
              left: `${4 + index * 8}%`,
              top: `${10 + ((index * 13) % 74)}%`,
              animationDelay: `${index * 0.4}s`
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0">
        {MIDGROUND_BLOBS.map((blobClassName) => (
          <span key={blobClassName} className={cn("absolute rounded-full opacity-45 blur-[30px]", blobClassName)} />
        ))}
      </div>
    </div>
  );
}
