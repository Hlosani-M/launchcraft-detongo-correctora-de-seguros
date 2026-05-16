import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "../dictionaries";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export async function generateMetadata(
  props: PageProps<"/[lang]/aml-kyc">,
): Promise<Metadata> {
  const { lang } = await props.params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);
  return {
    title: dict.meta.aml.title,
    description: dict.meta.aml.description,
    alternates: {
      canonical: `/${lang}/aml-kyc`,
      languages: {
        pt: "/pt/aml-kyc",
        en: "/en/aml-kyc",
        "x-default": "/pt/aml-kyc",
      },
    },
  };
}

export default async function AmlKycPage(props: PageProps<"/[lang]/aml-kyc">) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  const page = dict.legalPages.aml;

  return (
    <Section tone="ivory" containerClassName="max-w-3xl">
      <Reveal>
        <div className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-azure">
          {dict.common.footer.regulatory.heading}
        </div>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-brand-navy sm:text-5xl">
          {page.title}
        </h1>
        <p className="mt-2 text-sm text-brand-navy/50">{dict.legalPages.lastUpdated}</p>
        <p className="mt-6 text-lg leading-8 text-brand-navy/75">{page.intro}</p>
        <div className="mt-8 whitespace-pre-line rounded-2xl border border-brand-navy/10 bg-white p-6 text-sm leading-7 text-brand-navy/70">
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
