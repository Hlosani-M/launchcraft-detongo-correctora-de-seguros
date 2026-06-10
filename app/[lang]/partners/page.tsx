import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "../dictionaries";
import { ComingSoon } from "@/components/sections/ComingSoon";

export async function generateMetadata(
  props: PageProps<"/[lang]/partners">,
): Promise<Metadata> {
  const { lang } = await props.params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);
  return {
    title: dict.meta.partners.title,
    description: dict.meta.partners.description,
    robots: { index: false, follow: true },
    alternates: {
      canonical: `/${lang}/partners`,
      languages: {
        pt: "/pt/partners",
        en: "/en/partners",
        "x-default": "/pt/partners",
      },
    },
  };
}

export default async function PartnersPage(props: PageProps<"/[lang]/partners">) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  return (
    <ComingSoon
      lang={lang as Locale}
      eyebrow={dict.common.footer.corporate.heading}
      title={dict.common.footer.corporate.partners!}
      body={dict.legalPages.comingSoon}
      contactLabel={dict.legalPages.contactUs}
      backHomeLabel={dict.legalPages.backHome}
    />
  );
}
