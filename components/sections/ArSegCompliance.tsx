import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

type Dict = {
  eyebrow: string;
  title: string;
  description: string;
  details: {
    entityType: string;
    entityTypeValue: string;
    licence: string;
    licenceValue: string;
  };
  link: string;
};

export function ArSegCompliance({ dict }: { dict: Dict }) {
  return (
    <Section id="arseg" tone="surface">
      <Reveal>
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-20">
          {/* Left — text content */}
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-mid">
              {dict.eyebrow}
            </p>
            <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-tight text-brand-navy sm:text-4xl">
              {dict.title}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-brand-slate sm:text-lg sm:leading-8">
              {dict.description}
            </p>
            <a
              href="https://www.arseg.ao/mediacao/entidades-autorizadas/mediadores-pessoa-colectiva/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-azure-dim underline-offset-4 hover:underline"
            >
              {dict.link}
              <svg
                aria-hidden="true"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2.5 7h9M7 2.5l4.5 4.5L7 11.5" />
              </svg>
            </a>
          </div>

          {/* Right — logo + details */}
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start lg:w-[400px] lg:flex-col">
            {/* ARSEG logo card */}
            <div className="flex h-36 w-full max-w-xs flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white p-6 ring-1 ring-brand-slate/15 shadow-[var(--shadow-soft)] sm:h-40 sm:w-72">
              <Image
                src="/partners/arseg-logo.png"
                alt="ARSEG - Agência Angolana de Regulação e Supervisão de Seguros"
                width={280}
                height={112}
                className="h-full w-full object-contain"
              />
            </div>

            {/* Regulatory details */}
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-1">
              <div className="flex flex-col gap-1 rounded-xl bg-white px-5 py-4 ring-1 ring-brand-slate/10">
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-slate">
                  {dict.details.entityType}
                </dt>
                <dd className="text-sm font-semibold text-brand-navy">
                  {dict.details.entityTypeValue}
                </dd>
              </div>
              <div className="flex flex-col gap-1 rounded-xl bg-white px-5 py-4 ring-1 ring-brand-slate/10">
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-slate">
                  {dict.details.licence}
                </dt>
                <dd className="font-mono text-sm font-semibold text-brand-navy">
                  {dict.details.licenceValue}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
