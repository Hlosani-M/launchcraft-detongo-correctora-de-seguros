import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { ParallelogramAccent } from "@/components/ui/ParallelogramAccent";

type Dict = {
  eyebrow: string;
  title: string;
  description: string;
  issuer: string;
};

export function AnpgCertification({ dict }: { dict: Dict }) {
  return (
    <section
      id="anpg"
      className="relative overflow-hidden bg-brand-navy text-brand-ivory"
    >
      <ParallelogramAccent
        tone="azure"
        className="pointer-events-none absolute -right-24 -top-16 h-[460px] w-[560px] opacity-20"
      />
      <ParallelogramAccent
        tone="navy"
        className="pointer-events-none absolute -left-32 -bottom-20 h-[380px] w-[480px] opacity-50"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(5,187,251,0.12),transparent_60%)]"
      />
      <div className="relative mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 sm:py-24 lg:py-28">
        <Reveal>
          <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:gap-16">
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 -m-4 rounded-3xl bg-brand-ivory/95 blur-2xl opacity-60" />
              <a
                href="https://anpg.co.ao/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ANPG"
                className="relative block h-32 w-44 overflow-hidden rounded-3xl bg-brand-ivory ring-1 ring-brand-ivory/40 shadow-[var(--shadow-soft)] transition-opacity hover:opacity-90 sm:h-40 sm:w-56"
              >
                <Image
                  src="/partners/anpg-logo.jpg"
                  alt="ANPG · Agência Nacional de Petróleo, Gás e Biocombustíveis de Angola"
                  fill
                  sizes="(max-width: 640px) 176px, 224px"
                  className="object-cover"
                  priority={false}
                />
              </a>
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-brand-azure">
                <span className="font-mono text-brand-ivory/50">04</span>
                <span aria-hidden className="text-brand-ivory/30">
                  /
                </span>
                <span>{dict.eyebrow}</span>
              </div>
              <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                {dict.title}
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-7 text-brand-ivory/80 sm:text-lg sm:leading-8">
                {dict.description}
              </p>
              <p className="mt-8 text-xs uppercase tracking-[0.18em] text-brand-ivory/55">
                {dict.issuer}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
