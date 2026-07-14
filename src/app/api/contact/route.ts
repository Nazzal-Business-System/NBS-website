import { Resend } from "resend";
import { NextResponse } from "next/server";
import {
  buildContactEmailHtml,
  buildContactEmailSubject,
  buildContactEmailText,
  getPublicEmailLogoUrl,
  readEmailLogoAttachment,
} from "@/lib/contact-email";

export const runtime = "nodejs";

const INTEREST_VALUES = new Set([
  "innovation-erp",
  "pos",
  "inventory",
  "custom",
  "not-sure",
]);

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;

type RateBucket = { count: number; resetAt: number };

/**
 * Best-effort in-memory rate limit for this serverless instance only.
 * On Vercel, each isolate has its own Map — this is not a global durable
 * limiter and must not be treated as strong abuse protection.
 */
const rateLimitStore = new Map<string, RateBucket>();

type ContactPayload = {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  interest?: string;
  message?: string;
  consent?: boolean;
  website?: string;
  locale?: string;
};

function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const current = rateLimitStore.get(ip);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (current.count >= RATE_LIMIT_MAX) return true;
  current.count += 1;
  rateLimitStore.set(ip, current);
  return false;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { ok: false, code: "rate_limited" },
        { status: 429 },
      );
    }

    let body: ContactPayload;
    try {
      body = (await request.json()) as ContactPayload;
    } catch {
      return NextResponse.json(
        { ok: false, code: "invalid_json" },
        { status: 400 },
      );
    }

    if (typeof body.website === "string" && body.website.trim()) {
      return NextResponse.json({ ok: true, code: "accepted" });
    }

    const name = body.name?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const company = body.company?.trim() ?? "";
    const phone = body.phone?.trim() ?? "";
    const interest = body.interest?.trim() ?? "";
    const message = body.message?.trim() ?? "";
    const locale = body.locale?.trim() || "en";
    const consent = Boolean(body.consent);

    if (!name || !email || !isValidEmail(email) || !interest || !message || !consent) {
      return NextResponse.json(
        { ok: false, code: "validation_error" },
        { status: 400 },
      );
    }

    if (!INTEREST_VALUES.has(interest) || message.length < 12) {
      return NextResponse.json(
        { ok: false, code: "validation_error" },
        { status: 400 },
      );
    }

    const apiKey = process.env.RESEND_API_KEY?.trim();
    const toEmail =
      process.env.CONTACT_TO_EMAIL?.trim() ||
      process.env.NEXT_PUBLIC_BUSINESS_EMAIL?.trim() ||
      "nazzall.ahmed@gmail.com";
    const fromEmail = process.env.CONTACT_FROM_EMAIL?.trim();

    if (!apiKey || !fromEmail) {
      return NextResponse.json(
        {
          ok: false,
          code: "not_configured",
          message:
            "Contact delivery is not configured. Set RESEND_API_KEY and CONTACT_FROM_EMAIL.",
        },
        { status: 503 },
      );
    }

    const resend = new Resend(apiKey);
    const emailInput = {
      name,
      company,
      email,
      phone,
      interest,
      locale,
      message,
    };

    // Prefer CID inline attachment (Resend 6.x contentId). Never emit localhost <img> URLs.
    const logoAttachment = await readEmailLogoAttachment();
    const publicLogoUrl = getPublicEmailLogoUrl();
    const logoMode = logoAttachment ? "cid" : publicLogoUrl ? "url" : "text";

    const result = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: buildContactEmailSubject(name, interest),
      text: buildContactEmailText(emailInput),
      html: buildContactEmailHtml(emailInput, { logoMode }),
      ...(logoAttachment
        ? {
            attachments: [
              {
                filename: logoAttachment.filename,
                content: logoAttachment.content,
                contentId: logoAttachment.contentId,
                contentType: logoAttachment.contentType,
              },
            ],
          }
        : {}),
    });

    if (result.error) {
      console.error("[contact] Resend error:", result.error);
      return NextResponse.json(
        {
          ok: false,
          code: "delivery_failed",
          message: result.error.message,
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, code: "sent", id: result.data?.id });
  } catch (error) {
    console.error("[contact] Unexpected error:", error);
    return NextResponse.json(
      { ok: false, code: "server_error" },
      { status: 500 },
    );
  }
}
