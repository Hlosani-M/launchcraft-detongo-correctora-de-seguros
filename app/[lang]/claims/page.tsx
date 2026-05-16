import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "../dictionaries";
import { ComingSoon } from "@/components/sections/ComingSoon";

export async function generateMetadata(
  props: PageProps<"/[lang]/claims">,
): Promise<Metadata> {
  const { lang } = await props.params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);
  return {
    title: dict.meta.claims.title,
    description: dict.meta.claims.description,
    alternates: {
      canonical: `/${lang}/claims`,
      languages: {
        pt: "/pt/claims",
        en: "/en/claims",
        "x-default": "/pt/claims",
      },
    },
  };
}

export default async function ClaimsSupportPage(props: PageProps<"/[lang]/claims">) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  return (
    <ComingSoon
      lang={lang as Locale}
      eyebrow={dict.common.footer.support.heading}
      title={dict.common.footer.support.claims!}
      body={dict.legalPages.comingSoon}
      contactLabel={dict.legalPages.contactUs}
      backHomeLabel={dict.legalPages.backHome}
    />
  );
}
