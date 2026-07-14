import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { homepageSectionIds } from "@/config/navigation";

type DemoActionProps = {
  demoUrl?: string;
  contactProduct: string;
  openLabel: string;
  requestLabel: string;
  comingSoonLabel: string;
  className?: string;
};

/**
 * Homepage product CTA: configured demo opens externally; otherwise a disabled
 * "Demo Coming Soon" plus request-demo contact path — never unfinished pages or `#`.
 */
export function DemoAction({
  demoUrl,
  contactProduct,
  openLabel,
  requestLabel,
  comingSoonLabel,
  className = "px-6 py-3",
}: DemoActionProps) {
  if (demoUrl) {
    return (
      <ButtonLink
        href={demoUrl}
        variant="primary"
        shape="pill"
        className={className}
        external
      >
        {openLabel}
      </ButtonLink>
    );
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <Button
        type="button"
        variant="secondary"
        shape="pill"
        className={className}
        disabled
        aria-disabled="true"
      >
        {comingSoonLabel}
      </Button>
      <ButtonLink
        href={{
          pathname: "/",
          hash: homepageSectionIds.contact,
          query: { product: contactProduct },
        }}
        variant="ghost"
        shape="pill"
        className={className}
      >
        {requestLabel}
      </ButtonLink>
    </div>
  );
}
