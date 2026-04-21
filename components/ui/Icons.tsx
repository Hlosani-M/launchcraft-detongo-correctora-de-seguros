type Props = { className?: string };

const base = "h-5 w-5";

export const CarIcon = ({ className = base }: Props) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path
      d="M4 13l2-5a2 2 0 0 1 2-1h8a2 2 0 0 1 2 1l2 5m-16 0h16m-16 0v5m16-5v5M7 16h.01M17 16h.01"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const HomeIcon = ({ className = base }: Props) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path
      d="M4 10l8-6 8 6v10a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1V10z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const BoxIcon = ({ className = base }: Props) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path
      d="M4 7l8-4 8 4v10l-8 4-8-4V7zm0 0l8 4m0 0l8-4m-8 4v10"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ShieldIcon = ({ className = base }: Props) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path
      d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6l8-3z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
);

export const PlaneIcon = ({ className = base }: Props) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path
      d="M3 12l18-7-7 18-3-7-8-4z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
);

export const ScaleIcon = ({ className = base }: Props) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path
      d="M12 3v18m-7-4h14M5 8l-2 6h4l-2-6zm14 0l-2 6h4l-2-6z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const BriefcaseIcon = ({ className = base }: Props) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path
      d="M4 8h16v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8zm5-3h6a1 1 0 0 1 1 1v2H8V6a1 1 0 0 1 1-1z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
);

export const LayersIcon = ({ className = base }: Props) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path
      d="M12 3l9 5-9 5-9-5 9-5zm0 8l9 5-9 5-9-5 9-5z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
);

export const HandshakeIcon = ({ className = base }: Props) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path
      d="M3 12l3-1 4 4 2-2 2 2 4-4 3 1m-8-4l-2 2m2-2a2.5 2.5 0 0 1 3.5 3.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const DocumentIcon = ({ className = base }: Props) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path
      d="M6 3h9l5 5v12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm9 0v5h5M8 13h8M8 17h6"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const GlobeIcon = ({ className = base }: Props) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
    <path
      d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"
      stroke="currentColor"
      strokeWidth="1.8"
    />
  </svg>
);

export const SparkIcon = ({ className = base }: Props) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path
      d="M12 3v6m0 6v6M3 12h6m6 0h6M6 6l4 4m4 4l4 4M6 18l4-4m4-4l4-4"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

export const PhoneIcon = ({ className = base }: Props) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path
      d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
);

export const EmailIcon = ({ className = base }: Props) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path
      d="M3 6h18v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6zm0 0l9 7 9-7"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
);

export const MapPinIcon = ({ className = base }: Props) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path
      d="M12 21s7-6.3 7-12a7 7 0 1 0-14 0c0 5.7 7 12 7 12z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

export const ClockIcon = ({ className = base }: Props) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
    <path
      d="M12 7v5l3 2"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

export const CheckIcon = ({ className = base }: Props) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path
      d="M5 12l5 5L20 7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
