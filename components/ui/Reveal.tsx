"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
};

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null);
  const [visible, setVisible] = useState(false);
  const MotionTag = motion[as];

  useEffect(() => {
    // For reduced-motion users, animate={undefined} so visible is unused —
    // skip the observer setup entirely.
    const el = ref.current as HTMLElement | null;
    if (!el || reduce) return;

    const show = () => {
      setVisible(true);
      observer.disconnect();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) show();
      },
      { rootMargin: "0px" },
    );

    observer.observe(el);

    // After the next paint, re-check whether the element is already in the
    // viewport. This handles browser back-navigation: Next.js restores the
    // scroll position asynchronously (in its own useEffect), so by the time
    // this rAF fires the element may already be on-screen.
    const rafId = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) show();
    });

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [reduce]);

  return (
    <MotionTag
      ref={ref}
      initial={reduce ? false : { opacity: 0, y }}
      animate={
        reduce ? undefined : { opacity: visible ? 1 : 0, y: visible ? 0 : y }
      }
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
