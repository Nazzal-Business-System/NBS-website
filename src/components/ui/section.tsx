import { cn } from "@/lib/cn";
import { Container } from "./container";

type SectionVariant = "base" | "subtle" | "elevated" | "emphasis";
type SectionPadding = "default" | "compact" | "spacious" | "hero";

type SectionProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
  variant?: SectionVariant;
  padding?: SectionPadding;
  divider?: boolean;
  "aria-labelledby"?: string;
};

const variantClasses: Record<SectionVariant, string> = {
  base: "bg-transparent",
  subtle: "bg-bg-subtle/55",
  elevated: "bg-bg-elevated/35",
  emphasis:
    "bg-bg-elevated/50 border-y border-border-hairline",
};

const paddingClasses: Record<SectionPadding, string> = {
  default:
    "py-[var(--spacing-section-y)] sm:py-[var(--spacing-section-y-sm)] lg:py-[var(--spacing-section-y-lg)]",
  compact: "py-14 sm:py-16 lg:py-20",
  spacious:
    "py-24 sm:py-28 lg:py-32",
  hero:
    "py-20 sm:py-24 lg:py-28",
};

export function Section({
  id,
  children,
  className,
  variant = "base",
  padding = "default",
  divider = false,
  "aria-labelledby": ariaLabelledby,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledby}
      className={cn(
        "relative",
        paddingClasses[padding],
        variantClasses[variant],
        divider && "nbs-section-divider",
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}
