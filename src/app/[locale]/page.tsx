import { setRequestLocale } from "next-intl/server";
import { HomepageShell } from "@/components/sections/homepage-shell";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomepageShell />;
}
