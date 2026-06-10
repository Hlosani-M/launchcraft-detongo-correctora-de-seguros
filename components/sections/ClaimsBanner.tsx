import type { Dictionary } from "@/app/[lang]/dictionaries";
import { Reveal } from "@/components/ui/Reveal";
import { EmailIcon } from "@/components/ui/Icons";

type Props = {
  dict: Dictionary["contact"]["claimsBanner"];
};

export function ClaimsBanner({ dict }: Props) {
  return (
    <Reveal className="mb-12 lg:mb-16">
      <div className="flex flex-col gap-5 rounded-3xl bg-brand-azure/10 p-6 ring-2 ring-brand-azure/60 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <span className="inline-flex items-center rounded-full bg-brand-azure px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-brand-navy">
            {dict.badge}
          </span>
          <a
            href={`mailto:${dict.address}`}
            className="mt-3 block break-all text-lg font-semibold tracking-tight text-brand-navy transition-colors hover:text-brand-azure-dim"
          >
            {dict.address}
          </a>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-brand-slate">
            {dict.description}
          </p>
        </div>
        <a
          href={`mailto:${dict.address}`}
          className="inline-flex flex-shrink-0 items-center gap-2 self-start rounded-full bg-brand-azure px-6 py-3 text-sm font-semibold text-brand-navy transition-colors hover:bg-brand-azure-bright sm:self-center"
        >
          <EmailIcon className="h-4 w-4" />
          {dict.cta}
        </a>
      </div>
    </Reveal>
  );
}
