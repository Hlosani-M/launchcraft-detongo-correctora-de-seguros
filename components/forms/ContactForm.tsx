"use client";

import { useState, useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { contactAction, type ContactState } from "@/app/[lang]/actions";
import {
  CarIcon,
  ShieldIcon,
  SparkIcon,
  PlaneIcon,
  BriefcaseIcon,
  OilDropIcon,
  BoxIcon,
  MiningIcon,
  LayersIcon,
  ScaleIcon,
  DocumentIcon,
  CheckIcon,
} from "@/components/ui/Icons";
import { ArrowIcon } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";

// ===== Types =====================================================

type FormDict = {
  steps: {
    labels: string[];
    of: string;
    next: string;
    back: string;
  };
  step1: {
    heading: string;
    services: Record<string, string>;
  };
  step2: {
    heading: string;
    purposes: Record<string, string>;
  };
  step3: {
    heading: string;
    motor: {
      brand: string;
      brandPlaceholder: string;
      model: string;
      modelPlaceholder: string;
      year: string;
      yearPlaceholder: string;
    };
    health: { label: string; individual: string; family: string; corporate: string };
    oilgas: { label: string; upstream: string; midstream: string; downstream: string; marine: string };
    mining: { label: string; operations: string; equipment: string; transport: string; liability: string; operational: string };
    reinsurance: { label: string; treaty: string; facultative: string; consulting: string; riskMgmt: string };
    other: { label: string; placeholder: string };
    noDetails: string;
  };
  step4: {
    heading: string;
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    phoneHint: string;
    comments: string;
    commentsPlaceholder: string;
    commentsHint: string;
    consent: string;
    privacyNotice: string;
    privacyLink: string;
  };
  submit: string;
  submitting: string;
  success: {
    title: string;
    body: string;
    summaryLabel: string;
    serviceLabel: string;
    purposeLabel: string;
  };
  errorTitle: string;
  errorBody: string;
  errors: { name: string; email: string; consent: string; message: string };
};

type WizardData = {
  serviceType: string;
  purpose: string;
  motorBrand: string;
  motorModel: string;
  motorYear: string;
  healthPlan: string;
  oilGasSegment: string;
  miningCoverages: string[];
  reinsuranceType: string;
  otherDescription: string;
  name: string;
  email: string;
  phone: string;
  comments: string;
  consent: boolean;
};

// ===== Constants =================================================

const INITIAL_STATE: ContactState = { status: "idle" };

const INITIAL_DATA: WizardData = {
  serviceType: "",
  purpose: "",
  motorBrand: "",
  motorModel: "",
  motorYear: "",
  healthPlan: "",
  oilGasSegment: "",
  miningCoverages: [],
  reinsuranceType: "",
  otherDescription: "",
  name: "",
  email: "",
  phone: "",
  comments: "",
  consent: false,
};

const DETAIL_SERVICES = new Set([
  "motor",
  "health",
  "oilgas",
  "mining",
  "reinsurance",
  "other",
]);

const SERVICE_ICONS: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  motor: CarIcon,
  health: ShieldIcon,
  life: SparkIcon,
  travel: PlaneIcon,
  corporate: BriefcaseIcon,
  oilgas: OilDropIcon,
  marine: BoxIcon,
  mining: MiningIcon,
  reinsurance: LayersIcon,
  riskManagement: ScaleIcon,
  other: DocumentIcon,
};

// Maps legacy ?topic= URL params to pre-selected purposes
const TOPIC_TO_PURPOSE: Record<string, string> = {
  quote: "quote",
  claims: "claim",
  client: "support",
  partnership: "partnership",
};

const fieldBase =
  "mt-1.5 block w-full rounded-xl border border-brand-slate/25 bg-white px-4 py-3 text-base text-brand-navy placeholder:text-brand-slate/70 transition-colors focus:border-brand-azure focus:outline-none focus:ring-2 focus:ring-brand-azure/30";

// ===== Sub-components ============================================

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

// ===== Progress Bar ==============================================

function ProgressBar({
  step,
  labels,
}: {
  step: number;
  labels: string[];
}) {
  return (
    <div className="mb-8">
      {/* Mobile: step text + progress bar */}
      <div className="sm:hidden">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-semibold text-brand-navy">
            {labels[step - 1]}
          </span>
          <span className="text-xs text-brand-slate">
            {step} / 4
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-brand-slate/15">
          <div
            className="h-full rounded-full bg-brand-azure transition-all duration-500"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>
      {/* Desktop: numbered circles with connecting lines */}
      <div className="hidden sm:flex sm:items-start">
        {labels.map((label, idx) => {
          const num = idx + 1;
          const done = num < step;
          const active = num === step;
          return (
            <div key={num} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex w-full items-center">
                {idx > 0 && (
                  <div
                    className={`h-0.5 flex-1 transition-colors duration-300 ${
                      done ? "bg-brand-azure" : "bg-brand-slate/20"
                    }`}
                  />
                )}
                <div
                  className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
                    done
                      ? "bg-brand-azure text-brand-navy"
                      : active
                        ? "bg-brand-navy text-white ring-2 ring-brand-azure ring-offset-2"
                        : "bg-brand-slate/15 text-brand-slate"
                  }`}
                >
                  {done ? <CheckIcon className="h-4 w-4" /> : num}
                </div>
                {idx < 3 && (
                  <div
                    className={`h-0.5 flex-1 transition-colors duration-300 ${
                      done ? "bg-brand-azure" : "bg-brand-slate/20"
                    }`}
                  />
                )}
              </div>
              <span
                className={`text-center text-xs font-medium transition-colors duration-300 ${
                  active
                    ? "text-brand-navy"
                    : done
                      ? "text-brand-azure"
                      : "text-brand-slate/50"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ===== Step 1: Service Type ======================================

function Step1({
  data,
  onSelect,
  dict,
  hasError,
}: {
  data: WizardData;
  onSelect: (serviceType: string) => void;
  dict: FormDict["step1"];
  hasError: boolean;
}) {
  const services = Object.keys(SERVICE_ICONS);
  return (
    <div>
      <h2 className="mb-5 text-base font-semibold tracking-tight text-brand-navy sm:text-lg">
        {dict.heading}
      </h2>
      {hasError && (
        <p className="mb-3 text-sm font-medium text-red-600" role="alert">
          {/* error shown via visual cue; no text needed for mouse users */}
        </p>
      )}
      <div
        className="grid grid-cols-2 gap-3 sm:grid-cols-3"
        role="radiogroup"
        aria-label={dict.heading}
      >
        {services.map((key) => {
          const Icon = SERVICE_ICONS[key];
          const label = dict.services[key] ?? key;
          const selected = data.serviceType === key;
          return (
            <button
              key={key}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onSelect(key)}
              className={`flex flex-col items-center gap-2 rounded-2xl border p-4 text-center text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-azure focus-visible:ring-offset-2 ${
                selected
                  ? "border-brand-azure bg-brand-azure/10 text-brand-navy shadow-sm"
                  : "border-brand-slate/20 bg-white text-brand-slate hover:border-brand-azure/40 hover:bg-brand-azure/5 hover:text-brand-navy"
              } ${hasError && !data.serviceType ? "ring-1 ring-red-300/50" : ""}`}
            >
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-xl transition-colors ${
                  selected
                    ? "bg-brand-azure text-brand-navy"
                    : "bg-brand-slate/10 text-brand-slate"
                }`}
              >
                {Icon && <Icon className="h-5 w-5" />}
              </span>
              <span className="leading-tight">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ===== Step 2: Purpose ===========================================

function Step2({
  data,
  onSelect,
  dict,
  hasError,
}: {
  data: WizardData;
  onSelect: (purpose: string) => void;
  dict: FormDict["step2"];
  hasError: boolean;
}) {
  const purposes = Object.keys(dict.purposes);
  return (
    <div>
      <h2 className="mb-5 text-base font-semibold tracking-tight text-brand-navy sm:text-lg">
        {dict.heading}
      </h2>
      <div
        className="grid grid-cols-1 gap-2.5 sm:grid-cols-2"
        role="radiogroup"
        aria-label={dict.heading}
      >
        {purposes.map((key) => {
          const label = dict.purposes[key] ?? key;
          const selected = data.purpose === key;
          return (
            <button
              key={key}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onSelect(key)}
              className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-azure focus-visible:ring-offset-2 ${
                selected
                  ? "border-brand-azure bg-brand-azure/10 text-brand-navy"
                  : "border-brand-slate/20 bg-white text-brand-slate hover:border-brand-azure/40 hover:bg-brand-azure/5 hover:text-brand-navy"
              } ${hasError && !data.purpose ? "ring-1 ring-red-300/50" : ""}`}
            >
              <span
                className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                  selected
                    ? "border-brand-azure bg-brand-azure"
                    : "border-brand-slate/40 bg-white"
                }`}
              >
                {selected && (
                  <span className="h-2 w-2 rounded-full bg-brand-navy" />
                )}
              </span>
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ===== Step 3: Conditional Details ===============================

function Step3({
  data,
  onChange,
  dict,
}: {
  data: WizardData;
  onChange: (updates: Partial<WizardData>) => void;
  dict: FormDict["step3"];
}) {
  const { serviceType } = data;

  if (!DETAIL_SERVICES.has(serviceType)) {
    return (
      <div>
        <h2 className="mb-4 text-base font-semibold tracking-tight text-brand-navy sm:text-lg">
          {dict.heading}
        </h2>
        <p className="rounded-xl bg-brand-azure/8 px-4 py-3 text-sm text-brand-slate">
          {dict.noDetails}
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-5 text-base font-semibold tracking-tight text-brand-navy sm:text-lg">
        {dict.heading}
      </h2>
      <div className="space-y-4">
        {serviceType === "motor" && (
          <>
            <label className="block text-sm font-semibold text-brand-navy">
              {dict.motor.brand}
              <input
                type="text"
                value={data.motorBrand}
                onChange={(e) => onChange({ motorBrand: e.target.value })}
                placeholder={dict.motor.brandPlaceholder}
                maxLength={80}
                className={fieldBase}
              />
            </label>
            <label className="block text-sm font-semibold text-brand-navy">
              {dict.motor.model}
              <input
                type="text"
                value={data.motorModel}
                onChange={(e) => onChange({ motorModel: e.target.value })}
                placeholder={dict.motor.modelPlaceholder}
                maxLength={80}
                className={fieldBase}
              />
            </label>
            <label className="block text-sm font-semibold text-brand-navy">
              {dict.motor.year}
              <input
                type="text"
                inputMode="numeric"
                value={data.motorYear}
                onChange={(e) => onChange({ motorYear: e.target.value })}
                placeholder={dict.motor.yearPlaceholder}
                maxLength={4}
                className={fieldBase}
              />
            </label>
          </>
        )}

        {serviceType === "health" && (
          <fieldset>
            <legend className="text-sm font-semibold text-brand-navy">
              {dict.health.label}
            </legend>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {(["individual", "family", "corporate"] as const).map((opt) => (
                <button
                  key={opt}
                  type="button"
                  role="radio"
                  aria-checked={data.healthPlan === opt}
                  onClick={() => onChange({ healthPlan: opt })}
                  className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-azure focus-visible:ring-offset-2 ${
                    data.healthPlan === opt
                      ? "border-brand-azure bg-brand-azure text-brand-navy"
                      : "border-brand-slate/25 text-brand-slate hover:border-brand-azure/50 hover:text-brand-navy"
                  }`}
                >
                  {dict.health[opt]}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {serviceType === "oilgas" && (
          <fieldset>
            <legend className="text-sm font-semibold text-brand-navy">
              {dict.oilgas.label}
            </legend>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {(["upstream", "midstream", "downstream", "marine"] as const).map(
                (opt) => (
                  <button
                    key={opt}
                    type="button"
                    role="radio"
                    aria-checked={data.oilGasSegment === opt}
                    onClick={() => onChange({ oilGasSegment: opt })}
                    className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-azure focus-visible:ring-offset-2 ${
                      data.oilGasSegment === opt
                        ? "border-brand-azure bg-brand-azure text-brand-navy"
                        : "border-brand-slate/25 text-brand-slate hover:border-brand-azure/50 hover:text-brand-navy"
                    }`}
                  >
                    {dict.oilgas[opt]}
                  </button>
                ),
              )}
            </div>
          </fieldset>
        )}

        {serviceType === "mining" && (
          <fieldset>
            <legend className="text-sm font-semibold text-brand-navy">
              {dict.mining.label}
            </legend>
            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {(
                [
                  "operations",
                  "equipment",
                  "transport",
                  "liability",
                  "operational",
                ] as const
              ).map((opt) => {
                const checked = data.miningCoverages.includes(opt);
                return (
                  <label
                    key={opt}
                    className={`flex cursor-pointer items-center gap-2.5 rounded-xl border px-3 py-2.5 text-sm transition-colors ${
                      checked
                        ? "border-brand-azure bg-brand-azure/10 text-brand-navy"
                        : "border-brand-slate/20 text-brand-slate hover:border-brand-azure/30"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => {
                        onChange({
                          miningCoverages: checked
                            ? data.miningCoverages.filter((c) => c !== opt)
                            : [...data.miningCoverages, opt],
                        });
                      }}
                      className="sr-only"
                    />
                    <span
                      className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border-2 transition-colors ${
                        checked
                          ? "border-brand-azure bg-brand-azure"
                          : "border-brand-slate/40"
                      }`}
                      aria-hidden
                    >
                      {checked && (
                        <svg
                          viewBox="0 0 10 8"
                          className="h-2.5 w-2.5 text-brand-navy"
                          fill="none"
                        >
                          <path
                            d="M1 4l3 3 5-6"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                    {dict.mining[opt]}
                  </label>
                );
              })}
            </div>
          </fieldset>
        )}

        {serviceType === "reinsurance" && (
          <fieldset>
            <legend className="text-sm font-semibold text-brand-navy">
              {dict.reinsurance.label}
            </legend>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {(
                ["treaty", "facultative", "consulting", "riskMgmt"] as const
              ).map((opt) => (
                <button
                  key={opt}
                  type="button"
                  role="radio"
                  aria-checked={data.reinsuranceType === opt}
                  onClick={() => onChange({ reinsuranceType: opt })}
                  className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-azure focus-visible:ring-offset-2 ${
                    data.reinsuranceType === opt
                      ? "border-brand-azure bg-brand-azure text-brand-navy"
                      : "border-brand-slate/25 text-brand-slate hover:border-brand-azure/50 hover:text-brand-navy"
                  }`}
                >
                  {dict.reinsurance[opt]}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {serviceType === "other" && (
          <label className="block text-sm font-semibold text-brand-navy">
            {dict.other.label}
            <textarea
              rows={4}
              value={data.otherDescription}
              onChange={(e) => onChange({ otherDescription: e.target.value })}
              placeholder={dict.other.placeholder}
              maxLength={1000}
              className={`${fieldBase} resize-none`}
            />
          </label>
        )}
      </div>
    </div>
  );
}

// ===== Step 4: Contact Details ====================================

function Step4({
  data,
  onChange,
  dict,
  errorDict,
  serverErrors,
  lang,
}: {
  data: WizardData;
  onChange: (updates: Partial<WizardData>) => void;
  dict: FormDict["step4"];
  errorDict: FormDict["errors"];
  serverErrors: ContactState["errors"];
  lang: string;
}) {
  const e = serverErrors ?? {};
  return (
    <div className="space-y-5">
      <h2 className="text-base font-semibold tracking-tight text-brand-navy sm:text-lg">
        {dict.heading}
      </h2>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-brand-navy">
          {dict.name}
          <input
            type="text"
            name="name"
            autoComplete="name"
            required
            value={data.name}
            onChange={(ev) => onChange({ name: ev.target.value })}
            aria-invalid={e.name ? "true" : undefined}
            aria-describedby={e.name ? "contact-name-error" : undefined}
            placeholder={dict.namePlaceholder}
            className={fieldBase}
          />
          {e.name && (
            <span
              id="contact-name-error"
              className="mt-1.5 block text-xs font-medium text-red-600"
            >
              {errorDict.name}
            </span>
          )}
        </label>
        <label className="block text-sm font-semibold text-brand-navy">
          {dict.email}
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            value={data.email}
            onChange={(ev) => onChange({ email: ev.target.value })}
            aria-invalid={e.email ? "true" : undefined}
            aria-describedby={e.email ? "contact-email-error" : undefined}
            placeholder={dict.emailPlaceholder}
            className={fieldBase}
          />
          {e.email && (
            <span
              id="contact-email-error"
              className="mt-1.5 block text-xs font-medium text-red-600"
            >
              {errorDict.email}
            </span>
          )}
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
          value={data.phone}
          onChange={(ev) => onChange({ phone: ev.target.value })}
          placeholder={dict.phonePlaceholder}
          className={fieldBase}
        />
      </label>
      <label className="block text-sm font-semibold text-brand-navy">
        <span className="flex items-baseline justify-between">
          {dict.comments}
          <span className="text-xs font-normal text-brand-slate">
            {dict.commentsHint}
          </span>
        </span>
        <textarea
          name="comments"
          rows={4}
          value={data.comments}
          onChange={(ev) => onChange({ comments: ev.target.value })}
          placeholder={dict.commentsPlaceholder}
          maxLength={4000}
          className={`${fieldBase} resize-none`}
        />
      </label>
      <div>
        <label className="flex cursor-pointer gap-3 text-sm text-brand-slate">
          <input
            type="checkbox"
            name="consent"
            value="on"
            checked={data.consent}
            onChange={(ev) => onChange({ consent: ev.target.checked })}
            aria-invalid={e.consent ? "true" : undefined}
            aria-describedby={e.consent ? "contact-consent-error" : undefined}
            className="mt-0.5 h-4 w-4 flex-shrink-0 rounded border-brand-slate/40 accent-brand-azure"
          />
          <span>
            {dict.consent}{" "}
            <Link
              href={`/${lang}/privacy-policy`}
              className="font-medium text-brand-navy underline hover:text-brand-azure"
            >
              {dict.privacyLink}
            </Link>
          </span>
        </label>
        {e.consent && (
          <p
            id="contact-consent-error"
            className="mt-1.5 text-xs font-medium text-red-600"
          >
            {errorDict.consent}
          </p>
        )}
      </div>
    </div>
  );
}

// ===== Success Screen ============================================

function SuccessCard({
  dict,
  data,
  serviceLabel,
  purposeLabel,
}: {
  dict: FormDict["success"];
  data: WizardData;
  serviceLabel: string;
  purposeLabel: string;
}) {
  return (
    <div className="rounded-3xl bg-brand-surface p-8 ring-1 ring-brand-azure/30">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-azure text-brand-navy">
        <CheckIcon className="h-6 w-6" />
      </div>
      <h3 className="mt-5 text-xl font-semibold tracking-tight text-brand-navy sm:text-2xl">
        {dict.title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-brand-slate sm:text-base">
        {dict.body}
      </p>
      {(data.serviceType || data.purpose) && (
        <div className="mt-5 rounded-xl bg-white p-4 ring-1 ring-brand-slate/15">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-brand-mid">
            {dict.summaryLabel}
          </p>
          {data.serviceType && (
            <div className="flex gap-2 text-sm">
              <span className="text-brand-slate">{dict.serviceLabel}:</span>
              <span className="font-medium text-brand-navy">{serviceLabel}</span>
            </div>
          )}
          {data.purpose && (
            <div className="mt-1 flex gap-2 text-sm">
              <span className="text-brand-slate">{dict.purposeLabel}:</span>
              <span className="font-medium text-brand-navy">{purposeLabel}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ===== Main Component ============================================

export function ContactForm({
  locale,
  dict,
  initialTopic,
}: {
  locale: "pt" | "en";
  dict: FormDict;
  initialTopic?: string;
}) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [data, setData] = useState<WizardData>(() => ({
    ...INITIAL_DATA,
    purpose: initialTopic ? (TOPIC_TO_PURPOSE[initialTopic] ?? "") : "",
  }));
  const [stepErrors, setStepErrors] = useState<Record<string, boolean>>({});
  const [state, formAction] = useActionState(contactAction, INITIAL_STATE);

  useEffect(() => {
    if (state.status === "success") {
      trackEvent("generate_lead", { locale });
    }
  }, [state.status, locale]);

  const update = (updates: Partial<WizardData>) =>
    setData((d) => ({ ...d, ...updates }));

  const validate = (): boolean => {
    if (step === 1 && !data.serviceType) {
      setStepErrors({ serviceType: true });
      return false;
    }
    if (step === 2 && !data.purpose) {
      setStepErrors({ purpose: true });
      return false;
    }
    setStepErrors({});
    return true;
  };

  const goNext = () => {
    if (validate()) setStep((s) => Math.min(4, s + 1) as 1 | 2 | 3 | 4);
  };

  const goBack = () => {
    setStep((s) => Math.max(1, s - 1) as 1 | 2 | 3 | 4);
    setStepErrors({});
  };

  if (state.status === "success") {
    return (
      <SuccessCard
        dict={dict.success}
        data={data}
        serviceLabel={dict.step1.services[data.serviceType] ?? data.serviceType}
        purposeLabel={dict.step2.purposes[data.purpose] ?? data.purpose}
      />
    );
  }

  const backBtn = (
    <button
      type="button"
      onClick={goBack}
      className="inline-flex items-center justify-center gap-1.5 rounded-full border border-brand-slate/25 px-5 py-3 text-sm font-semibold text-brand-slate transition-colors hover:border-brand-navy hover:text-brand-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-azure focus-visible:ring-offset-2"
    >
      {dict.steps.back}
    </button>
  );

  return (
    <div>
      <ProgressBar step={step} labels={dict.steps.labels} />

      {step === 1 && (
        <Step1
          data={data}
          onSelect={(serviceType) => {
            update({ serviceType });
            setStepErrors({});
          }}
          dict={dict.step1}
          hasError={!!stepErrors.serviceType}
        />
      )}

      {step === 2 && (
        <Step2
          data={data}
          onSelect={(purpose) => {
            update({ purpose });
            setStepErrors({});
          }}
          dict={dict.step2}
          hasError={!!stepErrors.purpose}
        />
      )}

      {step === 3 && (
        <Step3 data={data} onChange={update} dict={dict.step3} />
      )}

      {step === 4 && (
        <form action={formAction} noValidate>
          {/* Hidden fields: locale + all wizard data from previous steps */}
          <input type="hidden" name="locale" value={locale} />
          <input type="hidden" name="serviceType" value={data.serviceType} />
          <input type="hidden" name="purpose" value={data.purpose} />
          <input type="hidden" name="motorBrand" value={data.motorBrand} />
          <input type="hidden" name="motorModel" value={data.motorModel} />
          <input type="hidden" name="motorYear" value={data.motorYear} />
          <input type="hidden" name="healthPlan" value={data.healthPlan} />
          <input type="hidden" name="oilGasSegment" value={data.oilGasSegment} />
          <input
            type="hidden"
            name="miningCoverages"
            value={data.miningCoverages.join(",")}
          />
          <input
            type="hidden"
            name="reinsuranceType"
            value={data.reinsuranceType}
          />
          <input
            type="hidden"
            name="otherDescription"
            value={data.otherDescription}
          />
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

          <Step4
            data={data}
            onChange={update}
            dict={dict.step4}
            errorDict={dict.errors}
            serverErrors={state.errors}
            lang={locale}
          />

          {state.status === "error" && !state.errors && (
            <div
              role="alert"
              className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
            >
              <div className="font-semibold">{dict.errorTitle}</div>
              <div className="mt-1 text-red-700">{dict.errorBody}</div>
            </div>
          )}

          <div className="mt-6 flex gap-3">
            {backBtn}
            <SubmitButton label={dict.submit} pendingLabel={dict.submitting} />
          </div>
        </form>
      )}

      {step < 4 && (
        <div className="mt-6 flex items-center gap-3">
          {step > 1 && backBtn}
          <button
            type="button"
            onClick={goNext}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-azure px-7 py-3.5 text-base font-semibold text-brand-navy transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-azure-bright shadow-[0_14px_40px_-18px_rgba(5,187,251,0.9)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-azure focus-visible:ring-offset-2"
          >
            {dict.steps.next}
            <ArrowIcon />
          </button>
        </div>
      )}
    </div>
  );
}

