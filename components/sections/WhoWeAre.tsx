import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CheckIcon } from "@/components/ui/Icons";

type Dict = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  quote: string;
  highlights: string[];
};

export function WhoWeAre({
  dict,
  chapter,
}: {
  dict: Dict;
  chapter?: string;
}) {
  return (
    <Section
      tone="ivory"
      chapter={chapter}
      eyebrow={dict.eyebrow}
      title={dict.title}
    >
      <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr]">
        <Reveal className="space-y-6 text-base leading-7 text-brand-slate lg:text-lg lg:leading-8">
          {dict.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Reveal>
        <Reveal delay={0.1}>
          <figure className="relative h-full overflow-hidden rounded-3xl bg-brand-navy p-8 text-brand-ivory sm:p-10">
            <span
              aria-hidden
              className="absolute -top-6 left-8 text-7xl font-serif leading-none text-brand-azure/40"
            >
              "
            </span>
            <blockquote className="relative">
              <p className="text-xl font-medium leading-8 tracking-tight text-brand-ivory sm:text-2xl sm:leading-9">
                {dict.quote}
              </p>
            </blockquote>
            <figcaption className="relative mt-8 border-t border-brand-ivory/15 pt-6">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-azure">
                {dict.eyebrow}
              </h3>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {dict.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-2 text-sm font-medium text-brand-ivory/85"
                  >
                    <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-azure/20 text-brand-azure">
                      <CheckIcon className="h-3 w-3" />
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </Section>
  );
}
