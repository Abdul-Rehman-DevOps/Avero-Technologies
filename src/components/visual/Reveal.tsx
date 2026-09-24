"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";

type RevealVariant = "up" | "left" | "right" | "scale" | "fade" | "rise" | "blur";

/**
 * Lightweight scroll fade for low-CPU clients.
 * Starts hidden under .avero-js (set before paint), then fades once in view.
 */
export function Reveal({
  children,
  className = "",
  variant = "up",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    setShown(false);
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }

    let cancelled = false;
    let delayTimer = 0;
    let done = false;

    const show = () => {
      if (cancelled || done) return;
      done = true;
      if (delay > 0) {
        delayTimer = window.setTimeout(() => {
          if (!cancelled) setShown(true);
        }, delay);
      } else {
        setShown(true);
      }
    };

    const nearViewport = () => {
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight || 0;
      return rect.top < vh * 0.94 && rect.bottom > 0;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          observer.disconnect();
          show();
        }
      },
      { threshold: 0.1, rootMargin: "40px 0px -6% 0px" },
    );
    observer.observe(node);

    // Above-the-fold: one frame so pending styles apply, then fade in.
    if (nearViewport()) {
      observer.disconnect();
      requestAnimationFrame(() => show());
    }

    const fallback = window.setTimeout(show, 1400);

    return () => {
      cancelled = true;
      window.clearTimeout(delayTimer);
      window.clearTimeout(fallback);
      observer.disconnect();
    };
  }, [pathname, delay]);

  return (
    <div
      ref={ref}
      className={["reveal", `reveal--${variant}`, shown ? "reveal--in" : "", className]
        .filter(Boolean)
        .join(" ")}
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
