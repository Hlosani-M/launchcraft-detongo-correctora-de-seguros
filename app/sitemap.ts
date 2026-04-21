import type { MetadataRoute } from "next";
import { LOCALES } from "./[lang]/dictionaries";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://detondocorretora.com";

const ROUTES = [
  "",
  "/about",
  "/services",
  "/services/personal",
  "/services/business",
  "/services/reinsurance",
  "/contact",
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
