"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";

type RevealVariant = "up" | "left" | "right" | "scale" | "fade" | "rise" | "blur";

/**
 * Scroll fade that works on first load and after route changes.
 * Does not wait for boot — arms immediately so the first visit animates.
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
  const pathname = usePathname();
  const [armed, setArmed] = useState(false);
  const [visible, setVisible] = useState(false);

  useLayoutEffect(() => {
    setVisible(false);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      setArmed(false);
      return;
    }
    // Arm after paint so opacity:0 is applied before we reveal (first visit + route changes).
    setArmed(false);
    const frame = window.requestAnimationFrame(() => setArmed(true));
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    if (!armed || visible) return;
    const node = ref.current;
    if (!node) return;

    let cancelled = false;
    let delayTimer = 0;
    let fallbackTimer = 0;
    let revealed = false;

    const reveal = () => {
      if (cancelled || revealed) return;
      revealed = true;
      delayTimer = window.setTimeout(() => {
        if (!cancelled) setVisible(true);
      }, delay);
    };

    const inView = () => {
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight || 0;
      return rect.bottom > 8 && rect.top < vh - 8;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          observer.disconnect();
          requestAnimationFrame(() => {
            requestAnimationFrame(() => reveal());
          });
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -5% 0px" },
    );

    observer.observe(node);
    if (inView()) {
      observer.disconnect();
      requestAnimationFrame(() => {
        requestAnimationFrame(() => reveal());
      });
    }

    fallbackTimer = window.setTimeout(() => reveal(), 1800);

    return () => {
      cancelled = true;
      window.clearTimeout(delayTimer);
      window.clearTimeout(fallbackTimer);
      observer.disconnect();
    };
  }, [armed, delay, visible, pathname]);

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
    visible && delay > 0 ? { transitionDelay: `${delay}ms` } : undefined;

  return (
    <div
      ref={ref}
      className={[armed && !visible ? readyClass : "", visible ? "reveal-in" : "", className]
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
