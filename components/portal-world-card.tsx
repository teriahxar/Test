import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WorldLink } from "@/components/world-link";
import { cn, withBasePath } from "@/lib/utils";

export function PortalWorldCard({
  href,
  logoSrc,
  title,
  description,
  className
}: {
  href: string;
  logoSrc: string;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-[28px] border border-[#d6c9b5] p-6 shadow-[0_8px_22px_rgba(132,108,84,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_32px_rgba(132,108,84,0.12)]",
        className
      )}
    >
      <div className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.55),transparent_70%)]" aria-hidden />
      <div className="relative flex h-36 items-center justify-center rounded-[22px] border border-[#d6c9b5]/80 bg-[#fffaf4]/82 px-4">
        <div className="relative h-20 w-[240px]">
          <Image src={withBasePath(logoSrc)} alt={`${title} logo`} fill className="object-contain" />
        </div>
      </div>
      <div className="relative mt-5">
        <p className="section-label">World guide</p>
        <h3 className="mt-4 font-display text-[2rem] font-semibold text-[#2e2a26]">{title}</h3>
        <p className="mt-3 min-h-14 text-sm leading-6 text-[#5d554d]">{description}</p>
        <Button asChild variant="secondary" size="lg" className="mt-6">
          <WorldLink href={href}>
            Enter World
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </WorldLink>
        </Button>
      </div>
    </article>
  );
}
