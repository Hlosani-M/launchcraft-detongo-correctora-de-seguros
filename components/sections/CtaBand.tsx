"use client";

import { LinkButton } from "@/components/ui/Button";
import { ParallelogramAccent } from "@/components/ui/ParallelogramAccent";
import { ArrowIcon } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";

type Dict = {
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
};

export function CtaBand({ lang, dict }: { lang: string; dict: Dict }) {
  return (
    <section className="relative overflow-hidden bg-brand-navy text-brand-ivory">
      <ParallelogramAccent
        tone="azure"
        className="pointer-events-none absolute -right-28 -top-20 h-[460px] w-[560px] opacity-20"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_left_bottom,rgba(5,187,251,0.16),transparent_55%)]"
      />
      <div className="relative mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 sm:py-24 lg:py-28">
        <div className="grid items-end gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <span
              aria-hidden
              className="block text-6xl font-serif leading-none text-brand-azure/40 sm:text-7xl"
            >
              "
            </span>
            <h2 className="mt-2 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              {dict.title}
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-brand-ivory/75 sm:text-lg sm:leading-8">
              {dict.description}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 lg:justify-end">
            <LinkButton href={`/${lang}/contact`} size="lg" variant="primary" onClick={() => trackEvent("cta_click", { source: "cta_band" })}>
              {dict.primaryCta}
              <ArrowIcon />
            </LinkButton>
            <LinkButton
              href={`/${lang}/services`}
              size="lg"
              variant="outline-light"
            >
              {dict.secondaryCta}
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
}
