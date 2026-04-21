import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CheckIcon } from "@/components/ui/Icons";

type Dict = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  highlights: string[];
};

export function WhoWeAre({ dict }: { dict: Dict }) {
  return (
    <Section tone="ivory" eyebrow={dict.eyebrow} title={dict.title}>
      <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
        <Reveal className="space-y-5 text-base leading-7 text-brand-slate">
          {dict.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Reveal>
        <Reveal delay={0.1}>
          <div className="rounded-3xl bg-brand-surface p-8 ring-1 ring-brand-slate/15">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-mid">
              {dict.eyebrow}
            </h3>
            <ul className="mt-5 space-y-3">
              {dict.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-3 text-sm font-medium text-brand-navy"
                >
                  <span className="mt-0.5 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-azure/15 text-brand-azure">
                    <CheckIcon className="h-3.5 w-3.5" />
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
