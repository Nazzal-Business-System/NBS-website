"use client";

import { useId, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { cn } from "@/lib/cn";

const interestValues = [
  "innovation-erp",
  "pos",
  "inventory",
  "custom",
  "not-sure",
] as const;

type InterestValue = (typeof interestValues)[number];

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  interest: InterestValue | "";
  message: string;
  consent: boolean;
  website: string;
};

type FieldErrors = Partial<Record<keyof FormState, string>>;
type SubmitStatus =
  | "idle"
  | "success"
  | "delivery_error"
  | "not_configured"
  | "rate_limited"
  | "validation";

type ContactFormProps = {
  whatsappUrl?: string;
  businessEmail?: string;
  className?: string;
};

const initialState: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  interest: "",
  message: "",
  consent: false,
  website: "",
};

const fieldOrder: Array<keyof FormState> = [
  "name",
  "email",
  "interest",
  "message",
  "consent",
];

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function normalizeInterest(raw: string | null): InterestValue | "" {
  if (!raw) return "";
  const value = raw.trim().toLowerCase();
  if (value === "erp" || value === "innovation-erp" || value === "innovationerp") {
    return "innovation-erp";
  }
  if (value === "pos") return "pos";
  if (value === "ims" || value === "inventory") return "inventory";
  if (value === "custom") return "custom";
  if (value === "not-sure" || value === "unsure") return "not-sure";
  return "";
}

function FieldError({
  id,
  message,
}: {
  id: string;
  message?: string;
}) {
  const visible = Boolean(message);
  return (
    <p
      id={id}
      role={visible ? "alert" : undefined}
      className={cn("nbs-field-error", visible && "is-visible")}
      aria-hidden={!visible}
    >
      <span>{message || "\u00a0"}</span>
    </p>
  );
}

function StatusBanner({
  id,
  status,
  children,
}: {
  id: string;
  status: SubmitStatus;
  children: ReactNode;
}) {
  const variant =
    status === "success"
      ? "success"
      : status === "validation" || status === "rate_limited"
        ? "error"
        : status === "idle"
          ? "idle"
          : "info";

  return (
    <div className="nbs-form-banner-region" aria-live="polite">
      <div
        id={id}
        role={status === "success" ? "status" : status === "idle" ? undefined : "alert"}
        className={cn(
          "nbs-form-banner",
          variant !== "idle" && `nbs-form-banner--${variant}`,
          status !== "idle" && "is-visible",
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function ContactForm({
  whatsappUrl,
  businessEmail,
  className,
}: ContactFormProps) {
  const t = useTranslations("homepage.contact.form");
  const locale = useLocale();
  const searchParams = useSearchParams();
  const formId = useId();
  const initialInterest = normalizeInterest(searchParams.get("product"));
  const [values, setValues] = useState<FormState>(() => ({
    ...initialState,
    interest: initialInterest,
  }));
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [submitting, setSubmitting] = useState(false);

  const interestOptions = useMemo(
    () =>
      interestValues.map((value) => ({
        value,
        label: t(`interestOptions.${value}`),
      })),
    [t],
  );

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
    if (status !== "idle" && status !== "success") setStatus("idle");
  }

  function validate(current: FormState): FieldErrors {
    const next: FieldErrors = {};
    if (!current.name.trim()) next.name = t("errors.nameRequired");
    if (!current.email.trim()) next.email = t("errors.emailRequired");
    else if (!isValidEmail(current.email.trim())) {
      next.email = t("errors.emailInvalid");
    }
    if (!current.interest) next.interest = t("errors.interestRequired");
    if (!current.message.trim()) next.message = t("errors.messageRequired");
    else if (current.message.trim().length < 12) {
      next.message = t("errors.messageShort");
    }
    if (!current.consent) next.consent = t("errors.consentRequired");
    return next;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    if (values.website.trim()) {
      setStatus("success");
      return;
    }

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("validation");
      const firstKey = fieldOrder.find((key) => nextErrors[key]);
      if (firstKey) {
        document.getElementById(`${formId}-${firstKey}`)?.focus();
      }
      return;
    }

    setSubmitting(true);
    setStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          company: values.company.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          interest: values.interest,
          message: values.message.trim(),
          consent: values.consent,
          website: values.website,
          locale,
        }),
      });

      const data = (await response.json().catch(() => null)) as {
        ok?: boolean;
        code?: string;
      } | null;

      if (response.ok && data?.ok) {
        setStatus("success");
        setValues({ ...initialState, interest: initialInterest });
        setErrors({});
        return;
      }

      if (data?.code === "not_configured" || response.status === 503) {
        setStatus("not_configured");
        return;
      }

      if (data?.code === "rate_limited" || response.status === 429) {
        setStatus("rate_limited");
        return;
      }

      setStatus("delivery_error");
    } catch {
      setStatus("delivery_error");
    } finally {
      setSubmitting(false);
    }
  }

  const statusBannerId = `${formId}-status`;
  const showChannels =
    status === "not_configured" || status === "delivery_error";

  return (
    <form
      className={cn("nbs-contact-panel nbs-contact-form", className)}
      onSubmit={handleSubmit}
      noValidate
      aria-busy={submitting || undefined}
      aria-describedby={status !== "idle" ? statusBannerId : undefined}
    >
      <div className="nbs-contact-panel-accent" aria-hidden />

      <div className="nbs-contact-panel-header">
        <Typography as="h3" variant="h3" className="text-base sm:text-lg">
          {t("panelTitle")}
        </Typography>
        <Typography variant="caption" className="mt-0.5">
          {t("panelDescription")}
        </Typography>
      </div>

      <input
        type="text"
        name="website"
        value={values.website}
        onChange={(event) => updateField("website", event.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />

      <StatusBanner id={statusBannerId} status={status}>
        {status === "success" ? (
          <>
            <Typography variant="small" className="text-text-primary">
              {t("successTitle")}
            </Typography>
            <Typography variant="caption" className="mt-1 block">
              {t("successBody")}
            </Typography>
          </>
        ) : null}

        {showChannels ? (
          <>
            <Typography variant="small" className="text-text-primary">
              {status === "not_configured"
                ? t("notConfiguredTitle")
                : t("deliveryErrorTitle")}
            </Typography>
            <Typography variant="caption" className="mt-1 block">
              {status === "not_configured"
                ? t("notConfiguredBody")
                : t("deliveryErrorBody")}
            </Typography>
            {(whatsappUrl || businessEmail) && (
              <div className="mt-2 flex flex-wrap gap-2">
                {whatsappUrl ? (
                  <a
                    href={whatsappUrl}
                    className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-border-emphasis bg-bg-elevated/50 px-4 text-sm text-text-primary hover:border-border-accent"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WhatsAppIcon className="size-4" />
                    {t("channels.whatsapp")}
                  </a>
                ) : null}
                {businessEmail ? (
                  <a
                    href={`mailto:${businessEmail}`}
                    className="inline-flex min-h-11 cursor-pointer items-center rounded-full border border-border-emphasis bg-bg-elevated/50 px-4 text-sm text-text-primary hover:border-border-accent"
                    dir="ltr"
                  >
                    {businessEmail}
                  </a>
                ) : null}
              </div>
            )}
          </>
        ) : null}

        {status === "rate_limited" ? (
          <>
            <Typography variant="small" className="text-text-primary">
              {t("rateLimitedTitle")}
            </Typography>
            <Typography variant="caption" className="mt-1 block">
              {t("rateLimitedBody")}
            </Typography>
          </>
        ) : null}

        {status === "validation" ? (
          <Typography variant="small" className="text-text-primary">
            {t("errorBanner")}
          </Typography>
        ) : null}

        {status === "idle" ? (
          <span className="sr-only">{t("panelTitle")}</span>
        ) : null}
      </StatusBanner>

      <div className="nbs-contact-fields">
        <div className="grid gap-x-3 gap-y-0 sm:grid-cols-2">
          <div className="nbs-field">
            <label htmlFor={`${formId}-name`} className="nbs-field-label">
              {t("fields.name")}
              <span className="text-accent-violet" aria-hidden>
                {" *"}
              </span>
            </label>
            <input
              id={`${formId}-name`}
              name="name"
              type="text"
              autoComplete="name"
              required
              value={values.name}
              onChange={(event) => updateField("name", event.target.value)}
              aria-invalid={Boolean(errors.name) || undefined}
              aria-describedby={`${formId}-name-error`}
              className={cn(
                "nbs-field-control",
                errors.name && "nbs-field-invalid",
              )}
            />
            <FieldError id={`${formId}-name-error`} message={errors.name} />
          </div>

          <div className="nbs-field">
            <label htmlFor={`${formId}-company`} className="nbs-field-label">
              {t("fields.company")}
              <span className="text-text-muted"> {t("optional")}</span>
            </label>
            <input
              id={`${formId}-company`}
              name="company"
              type="text"
              autoComplete="organization"
              value={values.company}
              onChange={(event) => updateField("company", event.target.value)}
              className="nbs-field-control"
            />
            <FieldError id={`${formId}-company-error`} />
          </div>

          <div className="nbs-field">
            <label htmlFor={`${formId}-email`} className="nbs-field-label">
              {t("fields.email")}
              <span className="text-accent-violet" aria-hidden>
                {" *"}
              </span>
            </label>
            <input
              id={`${formId}-email`}
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              required
              value={values.email}
              onChange={(event) => updateField("email", event.target.value)}
              aria-invalid={Boolean(errors.email) || undefined}
              aria-describedby={`${formId}-email-error`}
              className={cn(
                "nbs-field-control",
                errors.email && "nbs-field-invalid",
              )}
              dir="ltr"
            />
            <FieldError id={`${formId}-email-error`} message={errors.email} />
          </div>

          <div className="nbs-field">
            <label htmlFor={`${formId}-phone`} className="nbs-field-label">
              {t("fields.phone")}
              <span className="text-text-muted"> {t("optional")}</span>
            </label>
            <input
              id={`${formId}-phone`}
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              value={values.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              className="nbs-field-control"
              dir="ltr"
            />
            <FieldError id={`${formId}-phone-error`} />
          </div>
        </div>

        <div className="nbs-contact-divider" aria-hidden />

        <div className="nbs-field">
          <label htmlFor={`${formId}-interest`} className="nbs-field-label">
            {t("fields.interest")}
            <span className="text-accent-violet" aria-hidden>
              {" *"}
            </span>
          </label>
          <select
            id={`${formId}-interest`}
            name="interest"
            required
            value={values.interest}
            onChange={(event) =>
              updateField("interest", event.target.value as InterestValue | "")
            }
            aria-invalid={Boolean(errors.interest) || undefined}
            aria-describedby={`${formId}-interest-error`}
            className={cn(
              "nbs-field-control",
              errors.interest && "nbs-field-invalid",
            )}
          >
            <option value="">{t("interestPlaceholder")}</option>
            {interestOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <FieldError
            id={`${formId}-interest-error`}
            message={errors.interest}
          />
        </div>

        <div className="nbs-field">
          <label htmlFor={`${formId}-message`} className="nbs-field-label">
            {t("fields.message")}
            <span className="text-accent-violet" aria-hidden>
              {" *"}
            </span>
          </label>
          <textarea
            id={`${formId}-message`}
            name="message"
            required
            rows={3}
            value={values.message}
            onChange={(event) => updateField("message", event.target.value)}
            aria-invalid={Boolean(errors.message) || undefined}
            aria-describedby={`${formId}-message-error`}
            className={cn(
              "nbs-field-control nbs-field-textarea",
              errors.message && "nbs-field-invalid",
            )}
          />
          <FieldError
            id={`${formId}-message-error`}
            message={errors.message}
          />
        </div>

        <div className="nbs-contact-footer">
          <div className="nbs-field nbs-field--consent">
            <label
              htmlFor={`${formId}-consent`}
              className="nbs-consent-label"
            >
              <input
                id={`${formId}-consent`}
                name="consent"
                type="checkbox"
                checked={values.consent}
                onChange={(event) =>
                  updateField("consent", event.target.checked)
                }
                aria-invalid={Boolean(errors.consent) || undefined}
                aria-describedby={`${formId}-consent-error`}
                className="nbs-consent-input"
              />
              <span>{t("fields.consent")}</span>
            </label>
            <FieldError
              id={`${formId}-consent-error`}
              message={errors.consent}
            />
          </div>

          <div className="nbs-contact-actions">
            <Button
              type="submit"
              variant="primary"
              shape="pill"
              className="px-6 py-2.5"
              loading={submitting}
              loadingLabel={t("submitting")}
              disabled={submitting}
            >
              {t("submit")}
            </Button>
            <Typography variant="caption" className="sm:max-w-[16rem]">
              {t("helper")}
            </Typography>
          </div>
        </div>
      </div>
    </form>
  );
}
