import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Typography } from "@/components/ui/typography";
import { Section } from "@/components/ui/section";

export default async function NotFoundPage() {
  const t = await getTranslations("notFound");

  return (
    <Section variant="base">
      <Typography variant="h1" as="h1">
        {t("title")}
      </Typography>
      <Typography variant="body" className="mt-4 max-w-[var(--width-reading)]">
        {t("description")}
      </Typography>
      <Link
        href="/"
        className="mt-8 inline-flex min-h-11 items-center text-sm font-medium text-accent-violet hover:text-accent-violet-hover"
      >
        {t("backHome")}
      </Link>
    </Section>
  );
}
