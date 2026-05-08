import { Reveal } from "@/components/ui/Reveal";
import { BadgeCheckIcon } from "@/components/ui/Icons";
import { ParallelogramAccent } from "@/components/ui/ParallelogramAccent";

type Dict = {
  eyebrow: string;
  title: string;
  description: string;
  issuer: string;
  viewCertificate: string;
};

export function AnpgCertification({ dict }: { dict: Dict }) {
  return (
    <section id="anpg" className="relative overflow-hidden bg-brand-navy text-brand-ivory">
      <ParallelogramAccent
        tone="azure"
        className="pointer-events-none absolute -right-24 -top-16 h-[420px] w-[520px] opacity-20"
      />
      <div className="relative mx-auto w-full max-w-6xl px-6 py-16 sm:px-8 sm:py-20 lg:py-24">
        <Reveal>
          <div className="grid items-center gap-10 lg:grid-cols-[auto_1fr_auto]">
            <div className="inline-flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl bg-brand-azure/15 text-brand-azure ring-1 ring-brand-azure/30 sm:h-24 sm:w-24">
              <BadgeCheckIcon className="h-10 w-10 sm:h-12 sm:w-12" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-azure">
                {dict.eyebrow}
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
                {dict.title}
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-brand-ivory/75">
                {dict.description}
              </p>
              <p className="mt-3 text-xs uppercase tracking-[0.18em] text-brand-ivory/55">
                {dict.issuer}
              </p>
            </div>
            <a
              href="/anpg-certificate.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 self-start rounded-full border border-brand-ivory/25 px-6 py-3 text-sm font-semibold text-brand-ivory transition-colors hover:border-brand-azure hover:bg-brand-azure/10 hover:text-brand-azure lg:self-center"
            >
              {dict.viewCertificate}
              <span aria-hidden>→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
