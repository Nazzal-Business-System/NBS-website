import type { PricingQuote } from "@/config/pricing";
import { PRICING_CURRENCY } from "@/config/pricing";

/** Format integer JOD amounts with consistent western digits + currency code. */
export function formatJodAmount(amount: number): string {
  return `${amount.toLocaleString("en-US")} ${PRICING_CURRENCY}`;
}

type QuoteLabels = {
  startingFrom: string;
  afterScope: string;
  separately: string;
  /** Suffix after amount for monthly quotes, e.g. `/month` or `/شهرياً`. */
  perMonth: string;
};

/** Human-readable quote label for cards and detail rows. */
export function formatPricingQuote(
  quote: PricingQuote,
  labels: QuoteLabels,
): { primary: string; secondary?: string } {
  switch (quote.type) {
    case "from":
      return {
        primary: formatJodAmount(quote.amount),
        secondary: labels.startingFrom,
      };
    case "from_monthly":
      // e.g. secondary "Starting from" + primary "50 JOD/month"
      return {
        primary: `${formatJodAmount(quote.amount)}${labels.perMonth}`,
        secondary: labels.startingFrom,
      };
    case "after_scope":
      return { primary: labels.afterScope };
    case "separately":
      return { primary: labels.separately };
  }
}

/** Single-line quote for compact cards (add-ons). */
export function formatPricingQuoteLine(
  quote: PricingQuote,
  labels: QuoteLabels,
): string {
  const formatted = formatPricingQuote(quote, labels);
  if (formatted.secondary) {
    return `${formatted.secondary} ${formatted.primary}`;
  }
  return formatted.primary;
}
