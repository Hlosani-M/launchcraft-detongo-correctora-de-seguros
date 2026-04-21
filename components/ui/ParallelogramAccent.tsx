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

export function BrandDiamond({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={className}>
      <path
        d="M12 6 H36 Q42 6 38 12 L30 22 Q27 26 30 30 L38 40 Q40 44 36 44 H20 Q16 44 14 40 L6 28 Q4 24 6 20 L10 10 Q12 6 16 6 Z"
        fill="#05BBFB"
      />
    </svg>
  );
}
