import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Typography } from "@/components/ui/typography";

export default async function GlobalNotFound() {
  const t = await getTranslations({ locale: "en", namespace: "notFound" });

  return (
    <html lang="en">
      <body className="bg-bg-base text-text-primary antialiased">
        <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-4 py-16">
          <Typography variant="h1" as="h1">
            {t("title")}
          </Typography>
          <Typography variant="body" className="mt-4">
            {t("description")}
          </Typography>
          <Link href="/en" className="mt-8 text-sm font-medium text-accent-violet">
            {t("backHome")}
          </Link>
        </main>
      </body>
    </html>
  );
}
