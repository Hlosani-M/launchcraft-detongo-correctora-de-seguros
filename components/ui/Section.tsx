import type { ReactNode } from "react";

type Tone = "ivory" | "navy" | "surface" | "azure";

type SectionProps = {
  id?: string;
  chapter?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  tone?: Tone;
  align?: "left" | "center";
  className?: string;
  children?: ReactNode;
  containerClassName?: string;
};

const toneStyles: Record<Tone, string> = {
  ivory: "bg-brand-ivory text-brand-navy",
  surface: "bg-brand-surface text-brand-navy",
  navy: "bg-hero-gradient text-brand-ivory",
  azure: "bg-brand-azure text-brand-navy",
};

export function Section({
  id,
  chapter,
  eyebrow,
  title,
  description,
  tone = "ivory",
  align = "left",
  className = "",
  containerClassName = "",
  children,
}: SectionProps) {
  const heading = chapter || eyebrow || title || description;
  const eyebrowColor =
    tone === "navy" ? "text-brand-azure" : "text-brand-mid";
  const chapterColor =
    tone === "navy" ? "text-brand-ivory/50" : "text-brand-slate";
  const descColor =
    tone === "navy" ? "text-brand-slate-soft" : "text-brand-slate";
  return (
    <section
      id={id}
      className={`relative py-20 sm:py-24 lg:py-32 ${toneStyles[tone]} ${className}`}
    >
      <div
        className={`mx-auto w-full max-w-6xl px-6 sm:px-8 ${containerClassName}`}
      >
        {heading ? (
          <div
            className={`mb-12 max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}
          >
            {chapter || eyebrow ? (
              <div
                className={`flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] ${eyebrowColor}`}
              >
                {chapter ? (
                  <>
                    <span className={`font-mono ${chapterColor}`}>
                      {chapter}
                    </span>
                    <span aria-hidden className={chapterColor}>
                      /
                    </span>
                  </>
                ) : null}
                {eyebrow ? <span>{eyebrow}</span> : null}
              </div>
            ) : null}
            {title ? (
              <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className={`mt-5 text-base leading-7 sm:text-lg ${descColor}`}>
                {description}
              </p>
            ) : null}
          </div>
        ) : null}
        {children}
      </div>
    </section>
  );
}
