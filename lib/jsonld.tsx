import type { Locale } from "@/app/[lang]/dictionaries";
import type { Dictionary } from "@/app/[lang]/dictionaries";

export function OrganizationJsonLd({
  lang,
  dict,
  siteUrl,
}: {
  lang: Locale;
  dict: Dictionary;
  siteUrl: string;
}) {
  const payload = {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    name: dict.meta.siteName,
    legalName: "Detondo Corretora de Seguros, Lda.",
    url: `${siteUrl}/${lang}`,
    logo: `${siteUrl}/logo-transparent.png`,
    image: `${siteUrl}/logo-dark.jpg`,
    description: dict.meta.description,
    areaServed: ["AO", "Africa"],
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Rua nº 121, casa nº 1262 D, Nova Vida - Kilamba Kiaxi",
      addressLocality: "Luanda",
      addressCountry: "AO",
    },
    telephone: ["+244 921 545 832", "+244 923 254 449", "+244 946 451 069"],
    email: "detondocorretoraseguros@gmail.com",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+244 921 545 832",
        contactType: "customer service",
        availableLanguage: ["Portuguese", "English"],
        areaServed: "AO",
      },
    ],
    sameAs: [],
    inLanguage: lang === "pt" ? "pt-AO" : "en",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
