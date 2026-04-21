import { LinkButton } from "@/components/ui/Button";
import { ParallelogramAccent } from "@/components/ui/ParallelogramAccent";
import { ArrowIcon } from "@/components/ui/Button";

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
        className="pointer-events-none absolute -right-28 -top-20 h-[420px] w-[520px] opacity-20"
      />
      <div className="relative mx-auto w-full max-w-6xl px-6 py-16 sm:px-8 sm:py-20 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              {dict.title}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-brand-ivory/75 sm:text-lg">
              {dict.description}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 lg:justify-end">
            <LinkButton
              href={`/${lang}/contact`}
              size="lg"
              variant="primary"
            >
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
