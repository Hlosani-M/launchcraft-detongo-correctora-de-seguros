import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "../dictionaries";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export async function generateMetadata(
  props: PageProps<"/[lang]/disclaimer">,
): Promise<Metadata> {
  const { lang } = await props.params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);
  return {
    title: dict.meta.disclaimer.title,
    description: dict.meta.disclaimer.description,
    alternates: {
      canonical: `/${lang}/disclaimer`,
      languages: {
        pt: "/pt/disclaimer",
        en: "/en/disclaimer",
        "x-default": "/pt/disclaimer",
      },
    },
  };
}

export default async function DisclaimerPage(
  props: PageProps<"/[lang]/disclaimer">,
) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  const page = dict.legalPages.disclaimer;

  return (
    <Section tone="ivory" containerClassName="max-w-3xl">
      <Reveal>
        <div className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-azure">
          {dict.common.footer.legal.heading}
        </div>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-brand-navy sm:text-5xl">
          {page.title}
        </h1>
        <p className="mt-2 text-sm text-brand-navy/50">{dict.legalPages.lastUpdated}</p>
        <p className="mt-6 text-lg leading-8 text-brand-navy/75">{page.intro}</p>
        <div className="mt-8 rounded-2xl border border-brand-navy/10 bg-white p-6 text-sm leading-7 text-brand-navy/70">
          {page.body}
        </div>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href={`/${lang}/contact`}
            className="inline-flex items-center gap-2 rounded-full bg-brand-azure px-6 py-3 text-sm font-semibold text-brand-navy transition-colors hover:bg-brand-azure-bright"
          >
            {dict.legalPages.contactUs}
          </Link>
          <Link
            href={`/${lang}`}
            className="inline-flex items-center gap-2 rounded-full border border-brand-navy/20 px-6 py-3 text-sm font-semibold text-brand-navy transition-colors hover:bg-brand-navy/5"
          >
            {dict.legalPages.backHome}
          </Link>
        </div>
      </Reveal>
    </Section>
  );
}
