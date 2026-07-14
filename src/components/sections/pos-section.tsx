import { getLocale } from "next-intl/server";
import { homepageSectionIds } from "@/config/navigation";
import { getPosMediaSources } from "@/config/media-assets";
import { getPosDemoUrl } from "@/config/site";
import { ProductShowcaseSection } from "./product-showcase-section";
import type { Locale } from "@/i18n/routing";

const capabilityKeys = ["checkout", "catalog", "visibility"] as const;

export async function PosSection() {
  const locale = (await getLocale()) as Locale;
  const media = getPosMediaSources(locale);
  const titleId = `${homepageSectionIds.pos}-title`;

  return (
    <ProductShowcaseSection
      id={homepageSectionIds.pos}
      titleId={titleId}
      translationNamespace="homepage.pos"
      capabilityKeys={capabilityKeys}
      media={media}
      contactProduct="pos"
      demoUrl={getPosDemoUrl()}
      mediaFirst
      accent="violet"
      mediaScale="standard"
      variant="base"
    />
  );
}
