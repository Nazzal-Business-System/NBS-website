import { readFile } from "node:fs/promises";
import path from "node:path";
import { brandAssets } from "@/config/brand-assets";
import { getBusinessEmail, getSiteUrl, siteConfig } from "@/config/site";

export type ContactEmailInput = {
  name: string;
  company: string;
  email: string;
  phone: string;
  interest: string;
  locale: string;
  message: string;
};

export type ContactEmailLogoMode = "cid" | "url" | "text";

export const EMAIL_LOGO_CID = "nbs-logo";

const INTEREST_LABELS: Record<string, string> = {
  "innovation-erp": "Innovation ERP",
  pos: "POS",
  inventory: "Inventory Management",
  custom: "Custom software",
  "not-sure": "Not sure yet",
};

export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function displayOrDash(value: string) {
  const trimmed = value.trim();
  return trimmed || "—";
}

export function interestLabel(interest: string) {
  return INTEREST_LABELS[interest] ?? interest;
}

function isLocalhostUrl(url: string) {
  try {
    const host = new URL(url).hostname;
    return (
      host === "localhost" ||
      host === "127.0.0.1" ||
      host === "0.0.0.0" ||
      host.endsWith(".local")
    );
  } catch {
    return true;
  }
}

/** Public absolute logo URL only when site URL is non-localhost. */
export function getPublicEmailLogoUrl(): string | null {
  const siteUrl = getSiteUrl();
  if (!siteUrl || isLocalhostUrl(siteUrl)) return null;
  return `${siteUrl}${brandAssets.markWhite}`;
}

/**
 * Load the brand mark for CID inline attachment.
 * Reads from the deployed public brand asset path (no filesystem paths exposed to email clients).
 */
export async function readEmailLogoAttachment(): Promise<{
  filename: string;
  content: Buffer;
  contentId: string;
  contentType: string;
} | null> {
  try {
    const logoPath = path.join(
      process.cwd(),
      "public",
      brandAssets.markWhite.replace(/^\//, ""),
    );
    const content = await readFile(logoPath);
    return {
      filename: "nbs-logo.png",
      content,
      contentId: EMAIL_LOGO_CID,
      contentType: "image/png",
    };
  } catch (error) {
    console.error("[contact-email] Failed to read inline logo asset:", error);
    return null;
  }
}

export function resolveEmailLogoMode(options?: {
  preferCid?: boolean;
}): ContactEmailLogoMode {
  if (options?.preferCid !== false) return "cid";
  if (getPublicEmailLogoUrl()) return "url";
  return "text";
}

function replyMailto(email: string, name: string) {
  const subject = encodeURIComponent(`Re: NBS inquiry from ${name}`);
  return `mailto:${email}?subject=${subject}`;
}

function logoBlockHtml(mode: ContactEmailLogoMode, publicUrl?: string | null) {
  if (mode === "cid") {
    return `<img src="cid:${EMAIL_LOGO_CID}" width="56" height="56" alt="NBS" style="display:block;border:0;width:56px;height:56px;" />`;
  }
  if (mode === "url" && publicUrl) {
    return `<img src="${escapeHtml(publicUrl)}" width="56" height="56" alt="NBS" style="display:block;border:0;width:56px;height:56px;" />`;
  }
  // Styled text mark — never emit a broken <img> for localhost/local previews
  return `<div style="display:inline-block;padding:8px 12px;border-radius:10px;border:1px solid rgba(139,92,246,0.35);background:#141925;font-size:18px;font-weight:700;letter-spacing:0.06em;color:#f3f4f6;font-family:Segoe UI,Arial,sans-serif;">NBS</div>`;
}

export function buildContactEmailText(input: ContactEmailInput) {
  const toEmail = getBusinessEmail();
  return [
    "New NBS website inquiry",
    "",
    `Name: ${input.name}`,
    `Company: ${displayOrDash(input.company)}`,
    `Email: ${input.email}`,
    `Phone / WhatsApp: ${displayOrDash(input.phone)}`,
    `System interest: ${interestLabel(input.interest)}`,
    `Locale: ${input.locale}`,
    "",
    "Message:",
    input.message,
    "",
    "—",
    siteConfig.name,
    siteConfig.location,
    toEmail,
    `Reply: ${input.email}`,
  ].join("\n");
}

export function buildContactEmailHtml(
  input: ContactEmailInput,
  options?: { logoMode?: ContactEmailLogoMode },
) {
  const toEmail = getBusinessEmail();
  const logoMode = options?.logoMode ?? "text";
  const publicUrl = logoMode === "url" ? getPublicEmailLogoUrl() : null;
  const safe = {
    name: escapeHtml(input.name),
    company: escapeHtml(displayOrDash(input.company)),
    email: escapeHtml(input.email),
    phone: escapeHtml(displayOrDash(input.phone)),
    interest: escapeHtml(interestLabel(input.interest)),
    locale: escapeHtml(input.locale),
    message: escapeHtml(input.message).replaceAll("\n", "<br />"),
    toEmail: escapeHtml(toEmail),
  };
  const replyHref = replyMailto(input.email, input.name);

  const rows: Array<{ label: string; value: string; ltr?: boolean }> = [
    { label: "Name", value: safe.name },
    { label: "Company", value: safe.company },
    { label: "Email", value: safe.email, ltr: true },
    { label: "Phone / WhatsApp", value: safe.phone, ltr: true },
    { label: "System interest", value: safe.interest },
    { label: "Locale", value: safe.locale },
  ];

  const detailRows = rows
    .map(
      (row) => `
        <tr>
          <td style="padding:12px 16px;border-bottom:1px solid rgba(255,255,255,0.08);width:38%;vertical-align:top;">
            <div style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#8b919c;font-family:Segoe UI,Arial,sans-serif;">
              ${row.label}
            </div>
          </td>
          <td style="padding:12px 16px;border-bottom:1px solid rgba(255,255,255,0.08);vertical-align:top;${row.ltr ? "direction:ltr;text-align:left;" : ""}">
            <div style="font-size:15px;line-height:1.45;color:#f3f4f6;font-family:Segoe UI,Arial,sans-serif;">
              ${row.value}
            </div>
          </td>
        </tr>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New NBS website inquiry</title>
  </head>
  <body style="margin:0;padding:0;background:#090b12;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#090b12;padding:28px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;background:#0e1119;border:1px solid rgba(255,255,255,0.1);border-radius:14px;overflow:hidden;">
            <tr>
              <td style="height:3px;background:linear-gradient(90deg,#8b5cf6 0%,#4f6ef7 100%);font-size:0;line-height:0;">&nbsp;</td>
            </tr>
            <tr>
              <td style="padding:28px 28px 8px 28px;">
                ${logoBlockHtml(logoMode, publicUrl)}
                <h1 style="margin:18px 0 0;font-size:22px;line-height:1.3;color:#f3f4f6;font-weight:650;font-family:Segoe UI,Arial,sans-serif;">
                  New NBS website inquiry
                </h1>
                <p style="margin:10px 0 0;font-size:14px;line-height:1.5;color:#c5cad3;font-family:Segoe UI,Arial,sans-serif;">
                  A visitor submitted the contact form on the Nazzal Business Systems website.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 28px 8px 28px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#141925;border:1px solid rgba(255,255,255,0.1);border-radius:12px;overflow:hidden;">
                  ${detailRows}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 28px 8px 28px;">
                <div style="font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#8b919c;font-family:Segoe UI,Arial,sans-serif;margin-bottom:10px;">
                  Message
                </div>
                <div style="background:#07080d;border:1px solid rgba(139,92,246,0.28);border-radius:12px;padding:18px 20px;font-size:15px;line-height:1.65;color:#f3f4f6;font-family:Segoe UI,Arial,sans-serif;">
                  ${safe.message}
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:22px 28px 28px 28px;" align="center">
                <a href="${replyHref}" style="display:inline-block;background:#8b5cf6;color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:12px 22px;border-radius:999px;font-family:Segoe UI,Arial,sans-serif;">
                  Reply to inquiry
                </a>
              </td>
            </tr>
            <tr>
              <td style="padding:0 28px 28px 28px;border-top:1px solid rgba(255,255,255,0.08);">
                <p style="margin:20px 0 0;font-size:13px;line-height:1.55;color:#8b919c;font-family:Segoe UI,Arial,sans-serif;">
                  ${escapeHtml(siteConfig.name)}<br />
                  ${escapeHtml(siteConfig.location)}<br />
                  <span style="direction:ltr;unicode-bidi:isolate;">${safe.toEmail}</span>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function buildContactEmailSubject(name: string, interest: string) {
  return `[NBS Contact] ${name} — ${interestLabel(interest)}`;
}
