import { siteConfig } from "@/lib/site";

type LogoProps = {
  className?: string;
  markClassName?: string;
  showWordmark?: boolean;
  inverted?: boolean;
};

/**
 * Avero Signal Apex mark — clear geometric A with teal signal beam.
 */
export function AveroMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      role="img"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Avero</title>
      <rect width="64" height="64" rx="14" fill="#07111f" />
      {/* Teal signal beam behind */}
      <rect x="8" y="34" width="48" height="5.5" rx="1.5" fill="#0d8f9c" />
      {/* Clear A: outer chevron + inner cut */}
      <path
        fill="#ffffff"
        d="M32 12.5 14 51h8.2l3.4-8.2h12.8L41.8 51H50L32 12.5Zm0 14.2 4.6 11.1H27.4L32 26.7Z"
      />
      <circle cx="32" cy="10" r="2.8" fill="#0d8f9c" />
    </svg>
  );
}

export function AveroMarkLight({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      role="img"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Avero</title>
      <rect x="4" y="35" width="56" height="6" rx="1.5" fill="#0d8f9c" />
      <path
        fill="#07111f"
        d="M32 8 10 54h9.2l3.8-9.2h18L44.8 54H54L32 8Zm0 16.5 5.2 12.5H26.8L32 24.5Z"
      />
      <circle cx="32" cy="5" r="3" fill="#0d8f9c" />
    </svg>
  );
}

export function Logo({
  className = "",
  markClassName = "h-10 w-10",
  showWordmark = true,
  inverted = false,
}: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <span className="shrink-0 transition-transform duration-300 group-hover:scale-[1.04]">
        <AveroMark className={markClassName} />
      </span>
      {showWordmark ? (
        <span className="leading-none">
          <span
            className={`block font-display text-lg font-bold tracking-tight ${
              inverted ? "text-white" : "text-ink-950"
            }`}
          >
            {siteConfig.name}
          </span>
          <span
            className={`mt-0.5 block text-[10px] font-medium uppercase tracking-[0.18em] ${
              inverted ? "text-white/55" : "text-ink-400"
            }`}
          >
            Technologies
          </span>
        </span>
      ) : null}
    </span>
  );
}
