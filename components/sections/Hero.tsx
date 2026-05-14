"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowIcon } from "@/components/ui/Button";
import { ParallelogramAccent } from "@/components/ui/ParallelogramAccent";
import { trackEvent } from "@/lib/analytics";

type HeroDict = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  stats: { value: string; label: string }[];
};

export function Hero({ lang, dict }: { lang: string; dict: HeroDict }) {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
  };
  const item = {
    hidden: reduce ? {} : { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <section className="relative overflow-hidden bg-hero-gradient text-brand-ivory">
      {/* Luanda skyline — anchors the brand to Angola without competing with the headline */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
      >
        <Image
          src="/luanda.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-[0.12] mix-blend-luminosity"
          priority
        />
        {/* Vignette: fade the photo out at top and bottom so it reads as ambient texture */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy-deep/80 via-transparent to-brand-navy-deep/70" />
      </div>
      <ParallelogramAccent
        tone="azure"
        className="pointer-events-none absolute -right-24 top-8 h-[520px] w-[620px] opacity-25 blur-[2px] sm:opacity-35"
      />
      <ParallelogramAccent
        tone="navy"
        className="pointer-events-none absolute -left-40 -bottom-16 h-[420px] w-[540px] opacity-40"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(5,187,251,0.18),transparent_55%)]"
      />
      <div className="relative mx-auto w-full max-w-6xl px-6 pb-24 pt-20 sm:px-8 sm:pb-32 sm:pt-24 lg:pb-40 lg:pt-32">
        <motion.div
          initial="hidden"
          animate="show"
          variants={container}
          className="max-w-4xl"
        >
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-brand-ivory/15 bg-brand-ivory/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-brand-azure backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-azure" />
            {dict.eyebrow}
          </motion.div>
          <motion.h1
            variants={item}
            className="mt-7 text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl"
          >
            {dict.title}
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-7 max-w-2xl text-base leading-7 text-brand-ivory/75 sm:text-lg lg:text-xl lg:leading-8"
          >
            {dict.description}
          </motion.p>
          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Link
              href={`/${lang}/contact`}
              onClick={() => trackEvent("cta_click", { source: "hero" })}
              className="inline-flex items-center gap-2 rounded-full bg-brand-azure px-7 py-3.5 text-base font-semibold text-brand-navy transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-azure-bright shadow-[0_14px_40px_-18px_rgba(5,187,251,0.9)]"
            >
              {dict.primaryCta}
              <ArrowIcon />
            </Link>
            <Link
              href={`/${lang}/services`}
              className="inline-flex items-center gap-2 rounded-full border border-brand-ivory/25 px-7 py-3.5 text-base font-semibold text-brand-ivory transition-colors hover:bg-brand-ivory/10"
            >
              {dict.secondaryCta}
            </Link>
          </motion.div>

          <motion.ul
            variants={item}
            className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-medium uppercase tracking-[0.18em] text-brand-ivory/60"
          >
            {dict.stats.map((s, i) => (
              <li key={s.label} className="flex items-center gap-3">
                {i > 0 ? (
                  <span aria-hidden className="text-brand-ivory/25">/</span>
                ) : null}
                <span className="font-semibold text-brand-azure">{s.value}</span>
                <span>{s.label}</span>
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}
