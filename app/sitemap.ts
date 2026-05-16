import type { MetadataRoute } from "next";
import { LOCALES } from "./[lang]/dictionaries";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://detondocorretora.com";

const ROUTES = [
  "",
  "/about",
  "/services",
  "/services/personal",
  "/services/personal/motor",
  "/services/personal/building",
  "/services/personal/home-contents",
  "/services/personal/all-risks",
  "/services/personal/liability",
  "/services/personal/travel",
  "/services/business",
  "/services/reinsurance",
  "/contact",
  "/privacy-policy",
  "/terms",
  "/cookies",
  "/disclaimer",
  "/faqs",
  "/claims",
  "/client-support",
  "/compliance",
  "/aml-kyc",
  "/regulatory-notice",
  "/partners",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return LOCALES.flatMap((lang) =>
    ROUTES.map((path) => ({
      url: `${siteUrl}/${lang}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1.0 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, `${siteUrl}/${l}${path}`]),
        ),
      },
    })),
  );
}
