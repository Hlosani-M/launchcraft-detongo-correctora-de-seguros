"use client";

import { motion, useReducedMotion } from "framer-motion";
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
  const MotionTag = motion[as];
  return (
    <MotionTag
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
