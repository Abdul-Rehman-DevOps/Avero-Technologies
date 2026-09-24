import { type ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  prose?: boolean;
};

export function Container({ children, className = "", prose = false }: ContainerProps) {
  return (
    <div className={`${prose ? "container-prose" : "container-site"} ${className}`.trim()}>
      {children}
    </div>
  );
}

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "default" | "muted" | "ink";
};

export function Section({
  children,
  className = "",
  id,
  tone = "default",
}: SectionProps) {
  const toneClass =
    tone === "muted" ? "bg-chalk-100" : tone === "ink" ? "bg-ink-950 text-chalk-50" : "";

  return (
    <section id={id} className={`section-y ${toneClass} ${className}`.trim()}>
      {children}
    </section>
  );
}

type HeadingProps = {
  as?: "h1" | "h2" | "h3";
  children: ReactNode;
  className?: string;
  eyebrow?: string;
};

export function Heading({ as = "h2", children, className = "", eyebrow }: HeadingProps) {
  const Tag = as;
  const size =
    as === "h1"
      ? "text-4xl md:text-5xl lg:text-6xl"
      : as === "h2"
        ? "text-3xl md:text-4xl"
        : "text-xl md:text-2xl";

  return (
    <div className={className}>
      {eyebrow ? (
        <p className="font-mono text-xs tracking-[0.08em] text-ink-400 uppercase mb-3">
          {eyebrow}
        </p>
      ) : null}
      <Tag className={`font-display text-balance text-ink-950 ${size}`}>{children}</Tag>
    </div>
  );
}

export function Lead({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`mt-4 max-w-2xl text-lg text-ink-600 ${className}`.trim()}>{children}</p>
  );
}

export function Rule({ className = "" }: { className?: string }) {
  return <hr className={`border-0 border-t border-chalk-200 ${className}`.trim()} />;
}
