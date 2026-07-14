import { getLocale } from "next-intl/server";
import { homepageSectionIds } from "@/config/navigation";
import { getImsMediaSources } from "@/config/media-assets";
import { getImsDemoUrl } from "@/config/site";
import { ProductShowcaseSection } from "./product-showcase-section";
import type { Locale } from "@/i18n/routing";

const capabilityKeys = ["stock", "purchasing", "movements"] as const;

export async function ImsSection() {
  const locale = (await getLocale()) as Locale;
  const media = getImsMediaSources(locale);
  const titleId = `${homepageSectionIds.inventory}-title`;

  return (
    <ProductShowcaseSection
      id={homepageSectionIds.inventory}
      titleId={titleId}
      translationNamespace="homepage.ims"
      capabilityKeys={capabilityKeys}
      media={media}
      contactProduct="inventory"
      demoUrl={getImsDemoUrl()}
      mediaFirst={false}
      accent="cyan"
      mediaScale="standard"
      variant="subtle"
    />
  );
}
