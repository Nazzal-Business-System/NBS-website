import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/section";
import { Typography } from "@/components/ui/typography";
import { Eyebrow } from "@/components/ui/eyebrow";
import { HomeAwareLink } from "@/components/navigation/home-aware-link";
import { homepageAnchors, homepageHref } from "@/config/navigation";
import { getBusinessEmail } from "@/config/site";

type LegalDocumentProps = {
  namespace: "legal.privacy" | "legal.terms";
};

export async function LegalDocument({ namespace }: LegalDocumentProps) {
  const t = await getTranslations(namespace);
  const email = getBusinessEmail();
  const titleId = "legal-title";
  const sectionKeys = t.raw("sectionOrder") as string[];

  return (
    <>
      <Section
        variant="base"
        padding="compact"
        aria-labelledby={titleId}
        className="nbs-legal-hero"
      >
        <div className="mx-auto max-w-[var(--width-reading)]">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <Typography
            variant="h1"
            as="h1"
            id={titleId}
            className="text-[clamp(1.75rem,2vw+1rem,2.5rem)]"
          >
            {t("title")}
          </Typography>
          <Typography variant="body" className="mt-4 text-text-secondary">
            {t("intro")}
          </Typography>
          <p className="mt-5 text-sm text-text-muted">
            <span className="font-medium text-text-secondary">
              {t("effectiveLabel")}
            </span>{" "}
            {t("effectiveDate")}
          </p>
        </div>
      </Section>

      <Section variant="subtle" divider aria-labelledby={titleId}>
        <article className="nbs-legal-doc mx-auto max-w-[var(--width-reading)]">
          {sectionKeys.map((key) => (
            <section
              key={key}
              id={key}
              className="nbs-legal-section"
              aria-labelledby={`legal-${key}-title`}
            >
              <Typography
                variant="h2"
                as="h2"
                id={`legal-${key}-title`}
                className="text-xl sm:text-2xl"
              >
                {t(`sections.${key}.title`)}
              </Typography>
              {(t.raw(`sections.${key}.paragraphs`) as string[]).map(
                (paragraph, index) => (
                  <Typography
                    key={`${key}-${index}`}
                    variant="body"
                    className="mt-3 text-text-secondary leading-relaxed"
                  >
                    {paragraph}
                  </Typography>
                ),
              )}
            </section>
          ))}

          <div className="nbs-legal-contact mt-10 rounded-xl border border-border-hairline bg-bg-elevated/30 p-5 sm:p-6">
            <Typography variant="h3" as="h2" className="text-base sm:text-lg">
              {t("contactHeading")}
            </Typography>
            <Typography variant="small" className="mt-2 leading-relaxed">
              {t("contactBody")}
            </Typography>
            <a
              href={`mailto:${email}`}
              className="mt-3 inline-flex min-h-11 cursor-pointer items-center text-sm font-medium text-accent-cobalt hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-violet"
              dir="ltr"
            >
              {email}
            </a>
            <div className="mt-4">
              <HomeAwareLink
                href={homepageHref(homepageAnchors.contact)}
                className="text-sm font-medium text-text-secondary underline-offset-4 hover:text-text-primary hover:underline"
              >
                {t("contactPageLink")}
              </HomeAwareLink>
            </div>
          </div>
        </article>
      </Section>
    </>
  );
}
