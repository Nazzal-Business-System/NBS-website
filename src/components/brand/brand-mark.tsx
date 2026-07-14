import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { brandAssets } from "@/config/brand-assets";
import { cn } from "@/lib/cn";

type BrandMarkProps = {
  className?: string;
  priority?: boolean;
  ariaLabel?: string;
};

export function BrandMark({ className, priority, ariaLabel = "Nazzal Business Systems" }: BrandMarkProps) {
  return (
    <Link href="/" className={cn("inline-flex shrink-0", className)} aria-label={ariaLabel}>
      <Image
        src={brandAssets.mark}
        alt=""
        width={120}
        height={48}
        className="h-8 w-auto sm:h-9"
        priority={priority}
      />
    </Link>
  );
}
