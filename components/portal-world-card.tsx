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
        "group surface-card rounded-[32px] p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_44px_rgba(220,232,244,0.9)]",
        className
      )}
    >
      <div className="mx-auto flex h-32 w-full items-center justify-center rounded-[26px] border border-white/70 bg-white/72">
        <div className="relative h-24 w-[240px]">
          <Image src={withBasePath(logoSrc)} alt={`${title} logo`} fill className="object-contain drop-shadow-[0_14px_24px_rgba(126,201,255,0.12)]" />
        </div>
      </div>
      <h3 className="mt-5 text-2xl font-semibold text-[#2F3A45]">{title}</h3>
      <p className="mt-3 min-h-14 text-sm leading-6 text-muted-foreground">{description}</p>
      <Button asChild variant="primary" size="lg" className="mt-5 w-full">
        <WorldLink href={href}>
          Enter World
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </WorldLink>
      </Button>
    </article>
  );
}
