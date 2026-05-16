import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "../dictionaries";
import { ComingSoon } from "@/components/sections/ComingSoon";

export async function generateMetadata(
  props: PageProps<"/[lang]/faqs">,
): Promise<Metadata> {
  const { lang } = await props.params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);
  return {
    title: dict.meta.faqs.title,
    description: dict.meta.faqs.description,
    alternates: {
      canonical: `/${lang}/faqs`,
      languages: {
        pt: "/pt/faqs",
        en: "/en/faqs",
        "x-default": "/pt/faqs",
      },
    },
  };
}

export default async function FaqsPage(props: PageProps<"/[lang]/faqs">) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  return (
    <ComingSoon
      lang={lang as Locale}
      eyebrow={dict.common.footer.support.heading}
      title={dict.common.footer.support.faqs!}
      body={dict.legalPages.comingSoon}
      contactLabel={dict.legalPages.contactUs}
      backHomeLabel={dict.legalPages.backHome}
    />
  );
}
