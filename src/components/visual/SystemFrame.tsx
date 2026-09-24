import { type ReactNode } from "react";

export function SystemFrame({
  children,
  className = "",
  substrate = false,
}: {
  children: ReactNode;
  className?: string;
  substrate?: boolean;
}) {
  return (
    <div
      className={[
        "diagram-frame",
        substrate ? "diagram-substrate" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}

export function SectionIndex({
  index,
  label,
  className = "mb-5",
}: {
  index: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`.trim()}>
      <span className="inline-flex h-5 w-[3px] bg-signal" aria-hidden />
      <p className="tech-label">
        <span className="text-ink-950">{index}</span>
        <span className="mx-2 text-ink-400">/</span>
        <span>{label}</span>
      </p>
    </div>
  );
}

export function MonoLabel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`tech-label ${className}`.trim()}>{children}</p>;
}
