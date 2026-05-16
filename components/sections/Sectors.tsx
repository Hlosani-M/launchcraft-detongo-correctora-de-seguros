import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { BriefcaseIcon, BoltIcon, OilDropIcon, MiningIcon } from "@/components/ui/Icons";
import type { ComponentType } from "react";

type Item = { id: string; name: string; description: string };

type Dict = {
  eyebrow: string;
  title: string;
  description: string;
  items: Item[];
};

const ICONS: Record<string, ComponentType<{ className?: string }>> = {
  corporate: BriefcaseIcon,
  energy: BoltIcon,
  oilgas: OilDropIcon,
  mining: MiningIcon,
};

const IMAGES: Record<string, string> = {
  corporate: "/sectors/corporate.jpg",
  energy: "/sectors/energy.jpg",
  oilgas: "/sectors/oil-gas.jpg",
  mining: "/sectors/mining.jpg",
};

const ROUTES: Record<string, string> = {
  corporate: "/services/business",
  energy: "/services/business",
  oilgas: "/services/business",
  mining: "/services/mining",
};

export function Sectors({
  lang,
  dict,
  chapter,
}: {
  lang: string;
  dict: Dict;
  chapter?: string;
}) {
  return (
    <Section
      id="sectors"
      tone="ivory"
      chapter={chapter}
      eyebrow={dict.eyebrow}
      title={dict.title}
      description={dict.description}
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {dict.items.map((item, i) => {
          const Icon = ICONS[item.id] ?? BriefcaseIcon;
          const img = IMAGES[item.id];
          const href = ROUTES[item.id] ? `/${lang}${ROUTES[item.id]}` : undefined;
          return (
            <Reveal key={item.id} delay={i * 0.05}>
              <Link
                href={href ?? `/${lang}/services`}
                className="block h-full"
              >
              <article className="relative h-full overflow-hidden rounded-3xl bg-brand-navy text-brand-ivory ring-1 ring-brand-ivory/10 transition-transform duration-200 hover:-translate-y-1 hover:ring-brand-azure/40">
                {/* 16:9 photo header */}
                <div className="relative aspect-video w-full overflow-hidden">
                  {img ? (
                    <Image
                      src={img}
                      alt={item.name}
                      width={800}
                      height={450}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="h-full w-full object-cover object-center"
                    />
                  ) : null}
                  {/* scrim — dissolves photo into the navy card body */}
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-b from-brand-navy/20 via-transparent to-brand-navy"
                  />
                  {/* icon badge */}
                  <div
                    aria-hidden
                    className="absolute bottom-4 left-5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-navy/70 text-brand-azure backdrop-blur-sm ring-1 ring-brand-azure/30"
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                {/* text */}
                <div className="px-7 pb-8 pt-5">
                  <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                    {item.name}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-brand-ivory/75">
                    {item.description}
                  </p>
                </div>
              </article>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
