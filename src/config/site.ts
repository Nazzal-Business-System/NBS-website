export const siteConfig = {
  name: "Nazzal Business Systems",
  shortName: "NBS",
  defaultLocale: "en" as const,
  locales: ["en", "ar"] as const,
  location: "Amman, Jordan",
};

/** Public business contact email — real address, not a placeholder. */
export const BUSINESS_EMAIL = "nazzall.ahmed@gmail.com";

function readPublicUrl(raw: string | undefined): string | undefined {
  const value = raw?.trim();
  if (!value) return undefined;
  try {
    const url = new URL(value);
    if (url.protocol !== "http:" && url.protocol !== "https:") return undefined;
    return url.toString();
  } catch {
    return undefined;
  }
}

export function getSiteUrl(): string | undefined {
  const url = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!url) return undefined;
  return url.replace(/\/$/, "");
}

export function getWhatsAppNumber(): string | undefined {
  const raw = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim();
  if (!raw || !/^\d{8,15}$/.test(raw)) return undefined;
  return raw;
}

export function getWhatsAppUrl(message?: string): string | undefined {
  const number = getWhatsAppNumber();
  if (!number) return undefined;
  if (!message) return `https://wa.me/${number}`;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function getBusinessEmail(): string {
  const email = process.env.NEXT_PUBLIC_BUSINESS_EMAIL?.trim();
  if (email && email.includes("@")) return email;
  return BUSINESS_EMAIL;
}

export function getPortfolioUrl(): string | undefined {
  return readPublicUrl(process.env.NEXT_PUBLIC_PORTFOLIO_URL);
}

export function getErpDemoUrl(): string | undefined {
  return readPublicUrl(process.env.NEXT_PUBLIC_ERP_DEMO_URL);
}

export function getPosDemoUrl(): string | undefined {
  return readPublicUrl(process.env.NEXT_PUBLIC_POS_DEMO_URL);
}

export function getImsDemoUrl(): string | undefined {
  return readPublicUrl(process.env.NEXT_PUBLIC_IMS_DEMO_URL);
}
