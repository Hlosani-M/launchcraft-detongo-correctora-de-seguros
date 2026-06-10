import type { Dictionary } from "@/app/[lang]/dictionaries";
import { Reveal } from "@/components/ui/Reveal";

type Props = {
  dict: Dictionary["contact"]["directory"];
};

export function EmailDirectory({ dict }: Props) {
  return (
    <div className="mt-20 sm:mt-24">
      <Reveal>
        <h2 className="text-xl font-semibold tracking-tight text-brand-navy">
          {dict.title}
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-brand-slate">
          {dict.description}
        </p>
      </Reveal>

      <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {dict.groups.map((group, index) => (
          <Reveal key={group.title} delay={index * 0.1} className="h-full">
            <div className="h-full">
              <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-mid">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {group.items.map((item) => (
                  <li
                    key={item.address}
                    className="rounded-2xl bg-brand-surface p-4 ring-1 ring-brand-slate/15"
                  >
                    <a
                      href={`mailto:${item.address}`}
                      className="block break-all text-sm font-semibold text-brand-navy transition-colors hover:text-brand-azure-dim"
                    >
                      {item.address}
                    </a>
                    <p className="mt-1 text-sm leading-6 text-brand-slate">
                      {item.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
