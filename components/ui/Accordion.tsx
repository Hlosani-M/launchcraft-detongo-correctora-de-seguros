"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState, type ReactNode } from "react";

type Item = {
  id: string;
  title: string;
  content: ReactNode;
};

export function Accordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);
  const reduce = useReducedMotion();
  return (
    <ul className="divide-y divide-brand-slate/20 rounded-2xl bg-white ring-1 ring-brand-slate/15 shadow-[var(--shadow-soft)]">
      {items.map((item) => {
        const isOpen = open === item.id;
        return (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : item.id)}
              aria-expanded={isOpen}
              aria-controls={`panel-${item.id}`}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="text-base font-semibold text-brand-navy sm:text-lg">
                {item.title}
              </span>
              <span
                aria-hidden
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-azure/15 text-brand-azure transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
              >
                <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none">
                  <path
                    d="M10 4v12M4 10h12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={`panel-${item.id}`}
                  key="content"
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 pt-0 text-sm leading-6 text-brand-slate">
                    {item.content}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
