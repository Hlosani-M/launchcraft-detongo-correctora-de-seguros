import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "../dictionaries";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export async function generateMetadata(
  props: PageProps<"/[lang]/cookies">,
): Promise<Metadata> {
  const { lang } = await props.params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);
  return {
    title: dict.meta.cookies.title,
    description: dict.meta.cookies.description,
    alternates: {
      canonical: `/${lang}/cookies`,
      languages: {
        pt: "/pt/cookies",
        en: "/en/cookies",
        "x-default": "/pt/cookies",
      },
    },
  };
}

export default async function CookiePolicyPage(
  props: PageProps<"/[lang]/cookies">,
) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  const page = dict.legalPages.cookies;

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
        <div className="mt-8 rounded-2xl border border-brand-navy/10 bg-white p-6 text-sm leading-7 text-brand-navy/70 whitespace-pre-line">
          {page.body}
        </div>

        {page.categories && page.table && (
          <div className="mt-8 overflow-x-auto rounded-2xl border border-brand-navy/10">
            <table className="min-w-full text-sm">
              <thead className="bg-brand-navy text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold tracking-wide">{page.table.category}</th>
                  <th className="px-4 py-3 text-left font-semibold tracking-wide">{page.table.purpose}</th>
                  <th className="px-4 py-3 text-left font-semibold tracking-wide">{page.table.provider}</th>
                  <th className="px-4 py-3 text-left font-semibold tracking-wide">{page.table.retention}</th>
                  <th className="px-4 py-3 text-left font-semibold tracking-wide">{page.table.type}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-navy/10 bg-white">
                {page.categories.map((cat: { name: string; purpose: string; provider: string; retention: string; essential: boolean }) => (
                  <tr key={cat.name} className="hover:bg-brand-surface/50">
                    <td className="px-4 py-3 font-medium text-brand-navy">{cat.name}</td>
                    <td className="px-4 py-3 text-brand-navy/70">{cat.purpose}</td>
                    <td className="px-4 py-3 text-brand-navy/70">{cat.provider}</td>
                    <td className="px-4 py-3 text-brand-navy/70">{cat.retention}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${cat.essential ? "bg-brand-azure/20 text-brand-navy" : "bg-brand-slate/10 text-brand-slate"}`}>
                        {cat.essential ? page.table.essential : page.table.nonEssential}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

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
