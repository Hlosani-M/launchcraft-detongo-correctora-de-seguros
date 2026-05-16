import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "../dictionaries";
import { ComingSoon } from "@/components/sections/ComingSoon";

export async function generateMetadata(
  props: PageProps<"/[lang]/client-support">,
): Promise<Metadata> {
  const { lang } = await props.params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);
  return {
    title: dict.meta.clientSupport.title,
    description: dict.meta.clientSupport.description,
    alternates: {
      canonical: `/${lang}/client-support`,
      languages: {
        pt: "/pt/client-support",
        en: "/en/client-support",
        "x-default": "/pt/client-support",
      },
    },
  };
}

export default async function ClientSupportPage(
  props: PageProps<"/[lang]/client-support">,
) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  return (
    <ComingSoon
      lang={lang as Locale}
      eyebrow={dict.common.footer.support.heading}
      title={dict.common.footer.support.clientSupport!}
      body={dict.legalPages.comingSoon}
      contactLabel={dict.legalPages.contactUs}
      backHomeLabel={dict.legalPages.backHome}
    />
  );
}
