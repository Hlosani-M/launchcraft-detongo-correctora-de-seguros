"use client";

import { useState, useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { contactAction, type ContactState } from "@/app/[lang]/actions";
import { ArrowIcon } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/Icons";
import { trackEvent } from "@/lib/analytics";

type FormDict = {
  name: string;
  namePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  phone: string;
  phonePlaceholder: string;
  phoneHint: string;
  message: string;
  messagePlaceholder: string;
  submit: string;
  submitting: string;
  successTitle: string;
  successBody: string;
  errorTitle: string;
  errorBody: string;
  errors: { name: string; email: string; message: string };
};

const INITIAL: ContactState = { status: "idle" };

function SubmitButton({
  label,
  pendingLabel,
}: {
  label: string;
  pendingLabel: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-azure px-7 py-3.5 text-base font-semibold text-brand-navy transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-azure-bright shadow-[0_14px_40px_-18px_rgba(5,187,251,0.9)] disabled:pointer-events-none disabled:opacity-60"
    >
      {pending ? pendingLabel : label}
      {pending ? (
        <svg
          className="h-4 w-4 animate-spin"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden
        >
          <circle
            cx="10"
            cy="10"
            r="8"
            stroke="currentColor"
            strokeOpacity="0.3"
            strokeWidth="2"
          />
          <path
            d="M18 10a8 8 0 0 0-8-8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <ArrowIcon />
      )}
    </button>
  );
}

const fieldBase =
  "mt-1.5 block w-full rounded-xl border border-brand-slate/25 bg-white px-4 py-3 text-base text-brand-navy placeholder:text-brand-slate/70 transition-colors focus:border-brand-azure focus:outline-none focus:ring-2 focus:ring-brand-azure/30";

export function ContactForm({
  locale,
  dict,
}: {
  locale: "pt" | "en";
  dict: FormDict;
}) {
  const [state, formAction] = useActionState(contactAction, INITIAL);
  const e = state.errors ?? {};
  const [fields, setFields] = useState({ name: "", email: "", phone: "", message: "" });
  const update =
    (key: keyof typeof fields) =>
    (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFields((f) => ({ ...f, [key]: ev.target.value }));

  useEffect(() => {
    if (state.status === "success") {
      trackEvent("generate_lead", { locale });
    }
  }, [state.status, locale]);

  const errorLabel = (key: keyof FormDict["errors"]) =>
    dict.errors[key];

  if (state.status === "success") {
    return (
      <div className="rounded-3xl bg-brand-surface p-8 ring-1 ring-brand-azure/30">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-azure text-brand-navy">
          <CheckIcon className="h-6 w-6" />
        </div>
        <h3 className="mt-5 text-xl font-semibold tracking-tight text-brand-navy sm:text-2xl">
          {dict.successTitle}
        </h3>
        <p className="mt-2 text-sm leading-6 text-brand-slate sm:text-base">
          {dict.successBody}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="space-y-5">
      <input type="hidden" name="locale" value={locale} />
      {/* Honeypot: hidden from humans, visible to bots */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor="_hp_url">Url</label>
        <input
          type="text"
          id="_hp_url"
          name="_hp_url"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-brand-navy">
          {dict.name}
          <input
            type="text"
            name="name"
            autoComplete="name"
            required
            value={fields.name}
            onChange={update("name")}
            aria-invalid={!!e.name}
            aria-describedby={e.name ? "contact-name-error" : undefined}
            placeholder={dict.namePlaceholder}
            className={fieldBase}
          />
          {e.name ? (
            <span
              id="contact-name-error"
              className="mt-1.5 block text-xs font-medium text-red-600"
            >
              {errorLabel("name")}
            </span>
          ) : null}
        </label>
        <label className="block text-sm font-semibold text-brand-navy">
          {dict.email}
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            value={fields.email}
            onChange={update("email")}
            aria-invalid={!!e.email}
            aria-describedby={e.email ? "contact-email-error" : undefined}
            placeholder={dict.emailPlaceholder}
            className={fieldBase}
          />
          {e.email ? (
            <span
              id="contact-email-error"
              className="mt-1.5 block text-xs font-medium text-red-600"
            >
              {errorLabel("email")}
            </span>
          ) : null}
        </label>
      </div>

      <label className="block text-sm font-semibold text-brand-navy">
        <span className="flex items-baseline justify-between">
          {dict.phone}
          <span className="text-xs font-normal text-brand-slate">
            {dict.phoneHint}
          </span>
        </span>
        <input
          type="tel"
          name="phone"
          autoComplete="tel"
          value={fields.phone}
          onChange={update("phone")}
          placeholder={dict.phonePlaceholder}
          className={fieldBase}
        />
      </label>

      <label className="block text-sm font-semibold text-brand-navy">
        {dict.message}
        <textarea
          name="message"
          rows={6}
          required
          value={fields.message}
          onChange={update("message")}
          aria-invalid={!!e.message}
          aria-describedby={e.message ? "contact-message-error" : undefined}
          placeholder={dict.messagePlaceholder}
          className={`${fieldBase} resize-none`}
        />
        {e.message ? (
          <span
            id="contact-message-error"
            className="mt-1.5 block text-xs font-medium text-red-600"
          >
            {errorLabel("message")}
          </span>
        ) : null}
      </label>

      {state.status === "error" && !state.errors ? (
        <div
          role="alert"
          className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
        >
          <div className="font-semibold">{dict.errorTitle}</div>
          <div className="mt-1 text-red-700">{dict.errorBody}</div>
        </div>
      ) : null}

      <div className="pt-2">
        <SubmitButton label={dict.submit} pendingLabel={dict.submitting} />
      </div>
    </form>
  );
}
