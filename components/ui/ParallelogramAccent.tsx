type Tone = "azure" | "outline" | "navy";

const fills: Record<Tone, string> = {
  azure: "fill-brand-azure",
  outline: "fill-transparent stroke-brand-navy",
  navy: "fill-brand-navy",
};

export function ParallelogramAccent({
  className = "",
  tone = "azure",
  ariaHidden = true,
}: {
  className?: string;
  tone?: Tone;
  ariaHidden?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 600 420"
      aria-hidden={ariaHidden}
      className={className}
    >
      <path
        d="M90 40 H550 Q590 40 570 78 L450 360 Q430 400 390 400 H50 Q10 400 30 362 L150 78 Q170 40 210 40 Z"
        className={fills[tone]}
        strokeWidth={tone === "outline" ? 2 : 0}
      />
    </svg>
  );
}

