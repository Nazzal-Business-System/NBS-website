import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { homepageSectionIds, paths } from "@/config/navigation";
import { getBusinessEmail, getWhatsAppUrl } from "@/config/site";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Typography } from "@/components/ui/typography";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { ContactForm } from "./contact-form";

type ContactSectionProps = {
  compact?: boolean;
};

export async function ContactSection({ compact = false }: ContactSectionProps) {
  const t = await getTranslations("homepage.contact");
  const titleId = `${homepageSectionIds.contact}-title`;
  const whatsappUrl = getWhatsAppUrl();
  const businessEmail = getBusinessEmail();

  return (
    <Section
      id={homepageSectionIds.contact}
      variant="base"
      divider={!compact}
      aria-labelledby={titleId}
      padding={compact ? "compact" : "default"}
    >
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14 xl:gap-16">
        <div className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <SectionHeading
              eyebrow={t("eyebrow")}
              title={t("title")}
              description={t("description")}
              titleId={titleId}
            />
          </Reveal>

          <Reveal delay={70}>
            <div className="space-y-3">
              <Typography variant="small" className="text-text-secondary">
                {t("location")}
              </Typography>

              {(whatsappUrl || businessEmail) && (
                <ul className="flex list-none flex-col gap-2">
                  {businessEmail ? (
                    <li>
                      <a
                        href={`mailto:${businessEmail}`}
                        className="inline-flex min-h-11 cursor-pointer items-center text-sm text-text-primary underline-offset-4 hover:underline"
                        dir="ltr"
                      >
                        {businessEmail}
                      </a>
                    </li>
                  ) : null}
                  {whatsappUrl ? (
                    <li>
                      <a
                        href={whatsappUrl}
                        className="inline-flex min-h-11 cursor-pointer items-center gap-2 text-sm text-text-primary underline-offset-4 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <WhatsAppIcon className="size-4" />
                        {t("channels.whatsapp")}
                      </a>
                    </li>
                  ) : null}
                </ul>
              )}

              <Typography variant="caption">
                {t.rich("privacyNote", {
                  privacy: (chunks) => (
                    <Link
                      href={paths.privacy}
                      className="text-text-primary underline-offset-4 hover:underline"
                    >
                      {chunks}
                    </Link>
                  ),
                })}
              </Typography>
            </div>
          </Reveal>
        </div>

        <Reveal delay={90}>
          <Suspense
            fallback={
              <div
                className="min-h-80 rounded-xl border border-border-hairline bg-bg-elevated/20"
                aria-hidden
              />
            }
          >
            <ContactForm
              whatsappUrl={whatsappUrl}
              businessEmail={businessEmail}
            />
          </Suspense>
        </Reveal>
      </div>
    </Section>
  );
}
