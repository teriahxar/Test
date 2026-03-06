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
        "group rounded-[28px] border border-[#2b5f41]/10 p-6 shadow-[0_16px_30px_rgba(45,90,60,0.15)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_36px_rgba(39,88,57,0.24)] hover:ring-2 hover:ring-[#d9efce]",
        className
      )}
    >
      <div className="mx-auto flex h-28 w-full items-center justify-center">
        <div className="relative h-20 w-[230px]">
          <Image src={withBasePath(logoSrc)} alt={`${title} logo`} fill className="object-contain drop-shadow-[0_8px_14px_rgba(36,81,55,0.18)]" />
        </div>
      </div>
      <h3 className="mt-5 font-display text-3xl font-semibold text-[#224a34]">{title}</h3>
      <p className="mt-2 min-h-14 text-sm leading-6 text-[#3f5f48]">{description}</p>
      <Button asChild variant="primary" size="lg" className="mt-5 w-full">
        <WorldLink href={href}>
          Enter World
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </WorldLink>
      </Button>
    </article>
  );
}
