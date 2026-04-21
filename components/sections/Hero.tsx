"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowIcon } from "@/components/ui/Button";
import { ParallelogramAccent } from "@/components/ui/ParallelogramAccent";

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
      <ParallelogramAccent
        tone="azure"
        className="pointer-events-none absolute -right-24 top-8 h-[520px] w-[620px] opacity-25 blur-[2px] sm:opacity-35"
      />
      <ParallelogramAccent
        tone="navy"
        className="pointer-events-none absolute -left-40 -bottom-16 h-[420px] w-[540px] opacity-40"
      />
      <div className="relative mx-auto w-full max-w-6xl px-6 pb-20 pt-16 sm:px-8 sm:pb-24 sm:pt-20 lg:pb-32 lg:pt-28">
        <motion.div
          initial="hidden"
          animate="show"
          variants={container}
          className="max-w-3xl"
        >
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-brand-ivory/15 bg-brand-ivory/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-azure backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-azure" />
            {dict.eyebrow}
          </motion.div>
          <motion.h1
            variants={item}
            className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
          >
            {dict.title}
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-6 max-w-2xl text-base leading-7 text-brand-ivory/75 sm:text-lg"
          >
            {dict.description}
          </motion.p>
          <motion.div
            variants={item}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Link
              href={`/${lang}/contact`}
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
        </motion.div>

        <motion.dl
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 grid grid-cols-1 gap-6 border-t border-brand-ivory/10 pt-8 sm:grid-cols-3 sm:gap-10"
        >
          {dict.stats.map((s) => (
            <div key={s.label}>
              <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-azure">
                {s.label}
              </dt>
              <dd className="mt-2 text-3xl font-semibold tracking-tight text-brand-ivory sm:text-4xl">
                {s.value}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
