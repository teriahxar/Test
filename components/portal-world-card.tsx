import Image from "next/image";
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
    <article className={cn("panel-card rounded-[20px] border-[#8B6F47] p-6", className)}>
      <div className="panel-frame flex h-28 items-center justify-center border-[#8B6F47]/20 px-4">
        <div className="relative h-14 w-[220px]">
          <Image src={withBasePath(logoSrc)} alt={`${title} logo`} fill className="object-contain" />
        </div>
      </div>
      <h3 className="mt-5 font-display text-3xl font-semibold text-[#2C2418]">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[#5D554D]">{description}</p>
      <WorldLink href={href} className="panel-button mt-5 inline-flex items-center px-4 py-2 text-sm font-medium">
        Enter World →
      </WorldLink>
    </article>
  );
}
