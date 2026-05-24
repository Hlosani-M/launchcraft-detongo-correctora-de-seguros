import Link from "next/link";
import type { Locale } from "@/app/[lang]/dictionaries";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

type Props = {
  lang: Locale;
  eyebrow: string;
  title: string;
  body: string;
  contactLabel: string;
  backHomeLabel: string;
  contactEmail?: string;
  contactEmailLabel?: string;
};

export function ComingSoon({ lang, eyebrow, title, body, contactLabel, backHomeLabel, contactEmail, contactEmailLabel }: Props) {
  return (
    <Section tone="ivory" containerClassName="max-w-3xl">
      <Reveal>
        <div className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-azure">
          {eyebrow}
        </div>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-brand-navy sm:text-5xl">
          {title}
        </h1>
        <p className="mt-6 text-lg leading-8 text-brand-navy/75">{body}</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href={`/${lang}/contact`}
            className="inline-flex items-center gap-2 rounded-full bg-brand-azure px-6 py-3 text-sm font-semibold text-brand-navy transition-colors hover:bg-brand-azure-bright"
          >
            {contactLabel}
          </Link>
          <Link
            href={`/${lang}`}
            className="inline-flex items-center gap-2 rounded-full border border-brand-navy/20 px-6 py-3 text-sm font-semibold text-brand-navy transition-colors hover:bg-brand-navy/5"
          >
            {backHomeLabel}
          </Link>
        </div>
        {contactEmail && (
          <p className="mt-8 text-sm text-brand-slate">
            {contactEmailLabel && <span>{contactEmailLabel} </span>}
            <a
              href={`mailto:${contactEmail}`}
              className="font-medium text-brand-navy transition-colors hover:text-brand-azure"
            >
              {contactEmail}
            </a>
          </p>
        )}
      </Reveal>
    </Section>
  );
}
