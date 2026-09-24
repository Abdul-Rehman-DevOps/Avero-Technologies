"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type RevealVariant = "up" | "left" | "right" | "scale" | "fade" | "rise" | "blur";

/**
 * Scroll-triggered reveal with blur / rise / slide variants.
 */
export function Reveal({
  children,
  className = "",
  variant = "rise",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"ssr" | "hidden" | "shown">("ssr");

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setPhase("shown");
      return;
    }

    let cancelled = false;
    let delayTimer = 0;
    setPhase("hidden");

    const reveal = () => {
      delayTimer = window.setTimeout(() => {
        if (!cancelled) setPhase("shown");
      }, delay);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              if (!cancelled) reveal();
            });
          });
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -12% 0px" },
    );

    observer.observe(node);

    const fallback = window.setTimeout(() => {
      if (!cancelled) setPhase("shown");
    }, 2400);

    return () => {
      cancelled = true;
      window.clearTimeout(delayTimer);
      window.clearTimeout(fallback);
      observer.disconnect();
    };
  }, [delay]);

  const readyClass =
    variant === "left"
      ? "reveal-ready-left"
      : variant === "right"
        ? "reveal-ready-right"
        : variant === "scale"
          ? "reveal-ready-scale"
          : variant === "fade"
            ? "reveal-ready-fade"
            : variant === "blur"
              ? "reveal-ready-blur"
              : variant === "up"
                ? "reveal-ready"
                : "reveal-ready-rise";

  const style: CSSProperties | undefined =
    phase === "shown" && delay > 0 ? { transitionDelay: `${delay}ms` } : undefined;

  return (
    <div
      ref={ref}
      className={[
        phase === "hidden" ? readyClass : "",
        phase === "shown" ? "reveal-in" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      {children}
    </div>
  );
}

export function RevealGroup({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`reveal-group ${className}`.trim()}>{children}</div>;
}
