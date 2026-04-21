"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/app/[lang]/dictionaries";

const LOCALES: readonly Locale[] = ["pt", "en"];

export function LocaleSwitcher({
  currentLocale,
  labels,
  tone = "light",
}: {
  currentLocale: Locale;
  labels: { pt: string; en: string; switchTo: string };
  tone?: "light" | "dark";
}) {
  const pathname = usePathname() ?? `/${currentLocale}`;

  const swap = (target: Locale) => {
    const segments = pathname.split("/");
    if (segments[1] && (LOCALES as readonly string[]).includes(segments[1])) {
      segments[1] = target;
      return segments.join("/") || `/${target}`;
    }
    return `/${target}${pathname === "/" ? "" : pathname}`;
  };

  const baseText = tone === "dark" ? "text-brand-ivory/70" : "text-brand-slate";
  const activeText =
    tone === "dark" ? "text-brand-ivory" : "text-brand-navy";

  return (
    <div
      role="group"
      aria-label={labels.switchTo}
      className="inline-flex items-center gap-0.5 rounded-full border border-brand-slate/25 p-0.5 text-xs font-semibold"
    >
      {LOCALES.map((locale) => {
        const isActive = locale === currentLocale;
        return (
          <Link
            key={locale}
            href={swap(locale)}
            aria-current={isActive ? "true" : undefined}
            className={`rounded-full px-2.5 py-1 uppercase tracking-[0.15em] transition-colors ${
              isActive
                ? `bg-brand-azure text-brand-navy`
                : `${baseText} hover:${activeText}`
            }`}
          >
            {locale}
          </Link>
        );
      })}
    </div>
  );
}
