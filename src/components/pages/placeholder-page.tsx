import { getTranslations } from "next-intl/server";
import { Typography } from "@/components/ui/typography";
import { Section } from "@/components/ui/section";

type PlaceholderPageProps = {
  namespace: string;
};

export async function PlaceholderPage({ namespace }: PlaceholderPageProps) {
  const t = await getTranslations(namespace);
  const tPlaceholder = await getTranslations("placeholder");
  const titleId = "page-title";

  return (
    <Section variant="subtle" padding="spacious" aria-labelledby={titleId}>
      <div className="mx-auto flex max-w-[var(--width-reading)] flex-col gap-[var(--spacing-stack-lg)]">
        <Typography variant="h1" as="h1" id={titleId}>
          {t("title")}
        </Typography>
        <div className="nbs-placeholder-frame px-5 py-6 sm:px-6 sm:py-7">
          <Typography variant="body" className="text-text-muted">
            {tPlaceholder("status")}
          </Typography>
        </div>
      </div>
    </Section>
  );
}
