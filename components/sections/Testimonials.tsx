"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

type Item = { quote: string; author: string; company: string };

type Dict = {
  eyebrow: string;
  title: string;
  description: string;
  items: Item[];
  a11y: {
    goToSlide: string;
    previous: string;
    next: string;
  };
};

export function Testimonials({ dict }: { dict: Dict }) {
  const [index, setIndex] = useState(0);
  const total = dict.items.length;
  const reduce = useReducedMotion();

  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + total) % total),
    [total],
  );

  useEffect(() => {
    if (reduce || total < 2) return;
    const id = window.setInterval(next, 7000);
    return () => window.clearInterval(id);
  }, [next, reduce, total]);

  const current = dict.items[index];

  return (
    <section className="relative overflow-hidden bg-brand-surface">
      <div className="mx-auto w-full max-w-5xl px-6 py-20 sm:px-8 sm:py-24 lg:py-32">
        <div className="mb-10 max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-mid">
            {dict.eyebrow}
          </div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-brand-navy sm:text-4xl lg:text-5xl">
            {dict.title}
          </h2>
          <p className="mt-4 text-base leading-7 text-brand-slate sm:text-lg">
            {dict.description}
          </p>
        </div>

        <div className="relative rounded-3xl bg-white p-8 ring-1 ring-brand-slate/15 shadow-[var(--shadow-soft)] sm:p-12">
          <span
            aria-hidden
            className="absolute -top-5 left-8 text-7xl font-serif leading-none text-brand-azure/30 sm:text-8xl"
          >
            "
          </span>

          <div className="relative min-h-[180px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.blockquote
                key={index}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-lg leading-8 text-brand-navy sm:text-xl">
                  {current.quote}
                </p>
                <footer className="mt-6 text-sm">
                  <div className="font-semibold text-brand-navy">
                    {current.author}
                  </div>
                  <div className="text-brand-slate">{current.company}</div>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {dict.items.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={dict.a11y.goToSlide.replace("{index}", String(i + 1))}
                  aria-current={i === index ? "true" : undefined}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index
                      ? "w-8 bg-brand-azure"
                      : "w-3 bg-brand-slate/30 hover:bg-brand-slate/50"
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prev}
                aria-label={dict.a11y.previous}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-slate/25 text-brand-navy transition-colors hover:border-brand-azure hover:text-brand-azure"
              >
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none">
                  <path
                    d="M12 4l-6 6 6 6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Próximo"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-slate/25 text-brand-navy transition-colors hover:border-brand-azure hover:text-brand-azure"
              >
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none">
                  <path
                    d="M8 4l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
