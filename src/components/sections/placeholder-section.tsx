import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/cn";

type SectionVariant = "base" | "subtle" | "elevated" | "emphasis";
type PlaceholderLayout =
  | "default"
  | "hero"
  | "split-start"
  | "split-end"
  | "band"
  | "cta";

type PlaceholderSectionProps = {
  id: string;
  titleId: string;
  title: string;
  status: string;
  variant?: SectionVariant;
  layout?: PlaceholderLayout;
  padding?: "default" | "compact" | "spacious" | "hero";
  divider?: boolean;
  className?: string;
};

function PlaceholderCard({ status, className }: { status: string; className?: string }) {
  return (
    <div
      className={cn(
        "nbs-placeholder-frame px-5 py-6 sm:px-6 sm:py-7",
        className,
      )}
    >
      <Typography variant="small" className="text-text-muted">
        {status}
      </Typography>
    </div>
  );
}

function PlaceholderMedia({ status }: { status: string }) {
  return (
    <div className="nbs-placeholder-media" aria-hidden>
      <div className="absolute inset-0 flex items-end p-4 sm:p-5">
        <Typography variant="caption" className="text-text-muted/80">
          {status}
        </Typography>
      </div>
    </div>
  );
}

export function PlaceholderSection({
  id,
  titleId,
  title,
  status,
  variant = "base",
  layout = "default",
  padding = "default",
  divider = false,
  className,
}: PlaceholderSectionProps) {
  if (layout === "hero") {
    return (
      <Section
        id={id}
        variant={variant}
        padding="hero"
        divider={divider}
        aria-labelledby={titleId}
        className={className}
      >
        <div className="flex flex-col gap-[var(--spacing-stack-lg)]">
          <SectionHeading title={title} titleId={titleId} />
          <div className="nbs-placeholder-media max-w-[var(--width-container)]" aria-hidden>
            <div className="absolute inset-0 flex items-end p-5 sm:p-6">
              <Typography variant="caption" className="text-text-muted/80">
                {status}
              </Typography>
            </div>
          </div>
        </div>
      </Section>
    );
  }

  if (layout === "split-start" || layout === "split-end") {
    const mediaFirst = layout === "split-start";

    return (
      <Section
        id={id}
        variant={variant}
        padding={padding}
        divider={divider}
        aria-labelledby={titleId}
        className={className}
      >
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          {mediaFirst ? (
            <>
              <PlaceholderMedia status={status} />
              <div className="flex flex-col gap-[var(--spacing-stack)]">
                <SectionHeading title={title} titleId={titleId} />
                <PlaceholderCard status={status} className="lg:hidden" />
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-[var(--spacing-stack)] lg:order-1">
                <SectionHeading title={title} titleId={titleId} />
                <PlaceholderCard status={status} className="lg:hidden" />
              </div>
              <PlaceholderMedia status={status} />
            </>
          )}
        </div>
      </Section>
    );
  }

  if (layout === "band") {
    return (
      <Section
        id={id}
        variant={variant}
        padding="compact"
        divider={divider}
        aria-labelledby={titleId}
        className={className}
      >
        <div className="flex flex-col gap-6">
          <SectionHeading title={title} titleId={titleId} />
          <div className="nbs-placeholder-frame px-4 py-5 sm:px-6">
            <Typography variant="small" className="text-text-muted">
              {status}
            </Typography>
          </div>
        </div>
      </Section>
    );
  }

  if (layout === "cta") {
    return (
      <Section
        id={id}
        variant={variant}
        padding="spacious"
        divider={divider}
        aria-labelledby={titleId}
        className={className}
      >
        <div className="mx-auto flex max-w-[var(--width-reading)] flex-col items-center gap-[var(--spacing-stack-lg)] text-center">
          <SectionHeading title={title} titleId={titleId} />
          <PlaceholderCard status={status} className="w-full text-center" />
        </div>
      </Section>
    );
  }

  return (
    <Section
      id={id}
      variant={variant}
      padding={padding}
      divider={divider}
      aria-labelledby={titleId}
      className={className}
    >
      <div className="flex flex-col gap-[var(--spacing-stack-lg)]">
        <SectionHeading title={title} titleId={titleId} />
        <PlaceholderCard status={status} className="max-w-[var(--width-reading)]" />
      </div>
    </Section>
  );
}
