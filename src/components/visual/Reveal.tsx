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

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function siteIsReady(): boolean {
  return (
    document.documentElement.classList.contains("avero-ready") ||
    prefersReducedMotion()
  );
}

/**
 * Scroll-triggered reveal for every section.
 * Arms hidden styles before paint, waits for boot, then observes reliably.
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

  // Reset when the route changes so client navigations animate again.
  useLayoutEffect(() => {
    setVisible(false);
    if (prefersReducedMotion()) {
      setVisible(true);
      setArmed(false);
      return;
    }
    setArmed(true);
  }, [pathname]);

  useEffect(() => {
    if (!armed || visible) return;
    const node = ref.current;
    if (!node) return;

    let cancelled = false;
    let delayTimer = 0;
    let startTimer = 0;
    let fallbackTimer = 0;
    let revealed = false;

    const reveal = () => {
      if (cancelled || revealed) return;
      revealed = true;
      window.clearTimeout(delayTimer);
      delayTimer = window.setTimeout(() => {
        if (!cancelled) setVisible(true);
      }, delay);
    };

    const inView = () => {
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight || 0;
      // Generous: any overlap with the viewport counts.
      return rect.bottom > 24 && rect.top < vh - 24;
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
      { threshold: [0, 0.05, 0.1], rootMargin: "0px 0px -4% 0px" },
    );

    const startObserving = () => {
      if (cancelled || revealed) return;
      observer.observe(node);
      if (inView()) {
        observer.disconnect();
        requestAnimationFrame(() => {
          requestAnimationFrame(() => reveal());
        });
      }
    };

    const onBootDone = () => {
      window.clearTimeout(startTimer);
      startTimer = window.setTimeout(startObserving, 48);
    };

    if (siteIsReady()) {
      startTimer = window.setTimeout(startObserving, 48);
    } else {
      window.addEventListener("avero:boot-done", onBootDone);
      startTimer = window.setTimeout(startObserving, 2400);
    }

    // Never leave content stuck invisible.
    fallbackTimer = window.setTimeout(() => reveal(), 4200);

    return () => {
      cancelled = true;
      window.clearTimeout(delayTimer);
      window.clearTimeout(startTimer);
      window.clearTimeout(fallbackTimer);
      observer.disconnect();
      window.removeEventListener("avero:boot-done", onBootDone);
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
