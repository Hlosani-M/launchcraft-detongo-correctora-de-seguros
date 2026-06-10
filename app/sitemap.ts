import type { MetadataRoute } from "next";
import { LOCALES } from "./[lang]/dictionaries";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.detondocorretora.com";

// Dates reflect last meaningful content change; update when the page changes.
const ROUTES: { path: string; date: string }[] = [
  { path: "", date: "2026-05-25" },
  { path: "/about", date: "2026-05-01" },
  { path: "/services", date: "2026-05-01" },
  { path: "/services/personal", date: "2026-05-01" },
  { path: "/services/personal/motor", date: "2026-05-01" },
  { path: "/services/personal/building", date: "2026-05-01" },
  { path: "/services/personal/home-contents", date: "2026-05-01" },
  { path: "/services/personal/all-risks", date: "2026-05-01" },
  { path: "/services/personal/liability", date: "2026-05-01" },
  { path: "/services/personal/travel", date: "2026-05-01" },
  { path: "/services/business", date: "2026-05-01" },
  { path: "/services/mining", date: "2026-05-01" },
  { path: "/services/reinsurance", date: "2026-05-01" },
  { path: "/contact", date: "2026-05-25" },
  { path: "/privacy-policy", date: "2026-05-01" },
  { path: "/terms", date: "2026-05-01" },
  { path: "/cookies", date: "2026-05-01" },
  { path: "/disclaimer", date: "2026-05-01" },
  { path: "/aml-kyc", date: "2026-05-25" },
  { path: "/regulatory-notice", date: "2026-05-01" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return LOCALES.flatMap((lang) =>
    ROUTES.map(({ path, date }) => ({
      url: `${siteUrl}/${lang}${path}`,
      lastModified: new Date(date),
      alternates: {
        languages: {
          ...Object.fromEntries(LOCALES.map((l) => [l, `${siteUrl}/${l}${path}`])),
          "x-default": `${siteUrl}/pt${path}`,
        },
      },
    })),
  );
}
