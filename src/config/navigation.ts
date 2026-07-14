export const paths = {
  home: "/",
  systems: {
    innovationErp: "/systems/innovation-erp",
    pos: "/systems/pos",
    inventory: "/systems/inventory",
  },
  services: "/services",
  about: "/about",
  contact: "/contact",
  pricing: "/pricing",
  privacy: "/privacy",
  terms: "/terms",
} as const;

export const homepageSectionIds = {
  hero: "hero",
  proof: "proof",
  problems: "problems",
  innovationErp: "innovation-erp",
  pos: "pos",
  inventory: "inventory",
  services: "services",
  pricing: "pricing",
  process: "process",
  founder: "founder",
  consultation: "consultation",
  faq: "faq",
  contact: "contact",
} as const;

/** Homepage section hashes for in-page navigation (locale-aware via next-intl Link). */
export const homepageAnchors = {
  systems: homepageSectionIds.innovationErp,
  services: homepageSectionIds.services,
  pricing: homepageSectionIds.pricing,
  about: homepageSectionIds.founder,
  contact: homepageSectionIds.contact,
  pos: homepageSectionIds.pos,
  inventory: homepageSectionIds.inventory,
  faqPricing: "faq-pricing",
} as const;

export function homepageHref(sectionId: string) {
  return { pathname: "/" as const, hash: sectionId };
}
