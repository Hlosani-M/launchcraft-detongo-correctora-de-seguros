import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline-light";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-200 focus-visible:outline-none disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-azure text-brand-navy hover:bg-brand-azure-bright hover:-translate-y-0.5 shadow-[0_10px_30px_-15px_rgba(5,187,251,0.7)]",
  secondary:
    "bg-brand-navy text-brand-ivory hover:bg-brand-navy-deep hover:-translate-y-0.5",
  ghost:
    "bg-transparent text-brand-navy hover:bg-brand-navy/5",
  "outline-light":
    "border border-brand-ivory/30 text-brand-ivory hover:bg-brand-ivory/10",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: CommonProps & ComponentProps<"button">) {
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

type LinkButtonProps = CommonProps &
  Omit<ComponentProps<typeof Link>, "className" | "children">;

export function LinkButton({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: LinkButtonProps) {
  return (
    <Link
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
}

export function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      fill="none"
      className={`h-4 w-4 ${className}`}
    >
      <path
        d="M4 10h12m0 0-5-5m5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
