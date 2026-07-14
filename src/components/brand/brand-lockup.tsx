import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { brandAssets } from "@/config/brand-assets";
import { cn } from "@/lib/cn";

type BrandLockupProps = {
  compact?: boolean;
  className?: string;
  priority?: boolean;
  ariaLabel?: string;
};

export function BrandLockup({
  compact = false,
  className,
  priority,
  ariaLabel = "Nazzal Business Systems",
}: BrandLockupProps) {
  const src = compact ? brandAssets.lockupCompact : brandAssets.lockup;

  return (
    <Link href="/" className={cn("inline-flex shrink-0", className)} aria-label={ariaLabel} prefetch>
      <Image
        src={src}
        alt=""
        width={compact ? 180 : 220}
        height={compact ? 48 : 64}
        className={cn("w-auto", compact ? "h-8" : "h-10")}
        priority={priority}
      />
    </Link>
  );
}
