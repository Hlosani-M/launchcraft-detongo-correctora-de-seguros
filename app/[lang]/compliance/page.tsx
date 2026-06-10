import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "../dictionaries";
import { ComingSoon } from "@/components/sections/ComingSoon";

export async function generateMetadata(
  props: PageProps<"/[lang]/compliance">,
): Promise<Metadata> {
  const { lang } = await props.params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);
  return {
    title: dict.meta.compliance.title,
    description: dict.meta.compliance.description,
    robots: { index: false, follow: true },
    alternates: {
      canonical: `/${lang}/compliance`,
      languages: {
        pt: "/pt/compliance",
        en: "/en/compliance",
        "x-default": "/pt/compliance",
      },
    },
  };
}

export default async function CompliancePage(props: PageProps<"/[lang]/compliance">) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  return (
    <ComingSoon
      lang={lang as Locale}
      eyebrow={dict.common.footer.regulatory.heading}
      title={dict.common.footer.regulatory.compliance!}
      body={dict.legalPages.comingSoon}
      contactLabel={dict.legalPages.contactUs}
      backHomeLabel={dict.legalPages.backHome}
    />
  );
}
