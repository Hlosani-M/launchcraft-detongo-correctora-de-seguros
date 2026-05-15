"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type CookieConsentValue = "accepted" | "rejected" | null;

const STORAGE_KEY = "detondo-cookie-consent";

type CookieBannerDict = {
  message: string;
  accept: string;
  reject: string;
  learnMore: string;
};

export function CookieBanner({
  lang,
  dict,
}: {
  lang: string;
  dict: CookieBannerDict;
}) {
  const [consent, setConsent] = useState<CookieConsentValue>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(STORAGE_KEY) as CookieConsentValue;
    if (stored === "accepted" || stored === "rejected") {
      setConsent(stored);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setConsent("accepted");
  };

  const handleReject = () => {
    localStorage.setItem(STORAGE_KEY, "rejected");
    setConsent("rejected");
  };

  // Avoid flash: only render after mount, and only if no consent given yet
  if (!mounted || consent !== null) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label={dict.message}
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-brand-ivory/10 bg-brand-navy/95 backdrop-blur-md"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="text-sm leading-6 text-brand-ivory/80 sm:max-w-xl">
          {dict.message}{" "}
          <Link
            href={`/${lang}/cookies`}
            className="font-medium text-brand-azure underline underline-offset-2 hover:text-brand-azure-bright transition-colors"
          >
            {dict.learnMore}
          </Link>
        </p>
        <div className="flex flex-shrink-0 flex-wrap gap-3">
          <button
            onClick={handleReject}
            className="rounded-full border border-brand-ivory/25 px-5 py-2.5 text-sm font-medium text-brand-ivory/75 transition-colors hover:border-brand-ivory/50 hover:text-brand-ivory"
          >
            {dict.reject}
          </button>
          <button
            onClick={handleAccept}
            className="rounded-full bg-brand-azure px-5 py-2.5 text-sm font-semibold text-brand-navy transition-colors hover:bg-brand-azure-bright"
          >
            {dict.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
