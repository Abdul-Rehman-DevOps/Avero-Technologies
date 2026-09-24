"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

type RevealVariant = "up" | "left" | "right" | "scale" | "fade" | "rise" | "blur";

function bootAlreadyDone(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  try {
    return sessionStorage.getItem("avero-boot") === "1";
  } catch {
    return true;
  }
}

/**
 * Scroll-triggered reveal. Arms hidden styles before paint, then waits for
 * boot + intersection so first load and client navigations both animate.
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
  const [armed, setArmed] = useState(false);
  const [visible, setVisible] = useState(false);

  useLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVisible(true);
      return;
    }
    // Apply "from" styles before the browser paints so the transition can run.
    setArmed(true);
  }, []);

  useEffect(() => {
    if (!armed || visible) return;
    const node = ref.current;
    if (!node) return;

    let cancelled = false;
    let delayTimer = 0;
    let startTimer = 0;
    let fallbackTimer = 0;

    const reveal = () => {
      if (cancelled) return;
      window.clearTimeout(delayTimer);
      delayTimer = window.setTimeout(() => {
        if (!cancelled) setVisible(true);
      }, delay);
    };

    const inView = () => {
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight || 0;
      return rect.top < vh * 0.92 && rect.bottom > 0;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          observer.disconnect();
          // One frame after arming so opacity:0 is committed before reveal-in.
          requestAnimationFrame(() => {
            requestAnimationFrame(() => reveal());
          });
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
    );

    const startObserving = () => {
      if (cancelled) return;
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
      startTimer = window.setTimeout(startObserving, 40);
    };

    if (bootAlreadyDone() || document.documentElement.classList.contains("avero-ready")) {
      startTimer = window.setTimeout(startObserving, 40);
    } else {
      window.addEventListener("avero:boot-done", onBootDone);
      // Safety if the event was missed
      startTimer = window.setTimeout(startObserving, 2600);
    }

    fallbackTimer = window.setTimeout(() => {
      if (!cancelled) setVisible(true);
    }, 5000);

    return () => {
      cancelled = true;
      window.clearTimeout(delayTimer);
      window.clearTimeout(startTimer);
      window.clearTimeout(fallbackTimer);
      observer.disconnect();
      window.removeEventListener("avero:boot-done", onBootDone);
    };
  }, [armed, delay, visible]);

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
