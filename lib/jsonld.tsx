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
    name: dict.meta.organizationName,
    alternateName: dict.meta.alternateName,
    legalName: "Detondo Corretora de Seguros, Lda.",
    url: siteUrl,
    logo: `${siteUrl}/logo-transparent.png`,
    image: `${siteUrl}/logo-dark.jpg`,
    description: dict.meta.description,
    foundingDate: "2017",
    areaServed: {
      "@type": "Country",
      name: "Angola",
      sameAs: "https://www.wikidata.org/wiki/Q916",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rua nº 121, casa nº 1262 D, Nova Vida, Kilamba Kiaxi",
      addressLocality: "Luanda",
      addressRegion: "Luanda Province",
      addressCountry: "AO",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -8.9667,
      longitude: 13.2833,
    },
    telephone: ["+244 921 545 832", "+244 923 254 449", "+244 946 451 069"],
    email: "geral@detondocorretora.com",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+244 921 545 832",
        email: "support@detondocorretora.com",
        contactType: "customer service",
        availableLanguage: ["Portuguese", "English"],
        areaServed: "AO",
      },
      {
        "@type": "ContactPoint",
        email: "claims@detondocorretora.com",
        contactType: "claims",
        availableLanguage: ["Portuguese", "English"],
        areaServed: "AO",
      },
      {
        "@type": "ContactPoint",
        email: "comercial@detondocorretora.com",
        contactType: "sales",
        availableLanguage: ["Portuguese", "English"],
        areaServed: "AO",
      },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
    ],
    identifier: {
      "@type": "PropertyValue",
      propertyID: "ARSEG",
      value: "112/ASEG/MF/23",
    },
    sameAs: [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}

export function WebSiteJsonLd({ siteUrl }: { siteUrl: string }) {
  const payload = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Detondo Seguros",
    url: siteUrl,
    inLanguage: ["pt-AO", "en"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
