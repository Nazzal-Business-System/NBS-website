import { Check } from "lucide-react";
import { cn } from "@/lib/cn";
import { Typography } from "@/components/ui/typography";
import { ButtonLink } from "@/components/ui/button-link";
import {
  homepageAnchors,
  homepageHref,
  paths,
} from "@/config/navigation";
import type { PricingAccent } from "@/config/pricing";

type PricingPreviewCardProps = {
  accent: PricingAccent;
  name: string;
  idealFor: string;
  priceSecondary?: string;
  pricePrimary: string;
  features: readonly string[];
  detailsLabel: string;
  discussLabel: string;
  showDiscuss: boolean;
  className?: string;
};

const accentBorder: Record<PricingAccent, string> = {
  cobalt: "nbs-pricing-card--cobalt",
  violet: "nbs-pricing-card--violet",
  cyan: "nbs-pricing-card--cyan",
  emerald: "nbs-pricing-card--emerald",
};

export function PricingPreviewCard({
  accent,
  name,
  idealFor,
  priceSecondary,
  pricePrimary,
  features,
  detailsLabel,
  discussLabel,
  showDiscuss,
  className,
}: PricingPreviewCardProps) {
  return (
    <article className={cn("nbs-pricing-card", accentBorder[accent], className)}>
      <div className="nbs-pricing-card-body">
        <div className="nbs-pricing-card-top">
          <Typography
            variant="h3"
            as="h3"
            className="text-lg leading-snug sm:text-xl"
          >
            {name}
          </Typography>
          <div className="nbs-pricing-card-price">
            {priceSecondary ? (
              <span className="nbs-pricing-card-price-label">{priceSecondary}</span>
            ) : null}
            <span className="nbs-pricing-card-price-value" dir="ltr">
              {pricePrimary}
            </span>
          </div>
        </div>

        <Typography variant="small" className="mt-3 leading-relaxed">
          {idealFor}
        </Typography>

        <ul className="nbs-pricing-card-features mt-5 list-none">
          {features.map((feature) => (
            <li key={feature} className="nbs-pricing-card-feature">
              <Check
                className="nbs-pricing-card-check size-3.5 shrink-0"
                strokeWidth={2.5}
                aria-hidden
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="nbs-pricing-card-actions">
        <ButtonLink
          href={paths.pricing}
          variant="secondary"
          shape="pill"
          className="w-full px-5 py-2.5 sm:w-auto"
        >
          {detailsLabel}
        </ButtonLink>
        {showDiscuss ? (
          <ButtonLink
            href={homepageHref(homepageAnchors.contact)}
            variant="ghost"
            shape="pill"
            className="w-full px-5 py-2.5 sm:w-auto"
          >
            {discussLabel}
          </ButtonLink>
        ) : null}
      </div>
    </article>
  );
}
