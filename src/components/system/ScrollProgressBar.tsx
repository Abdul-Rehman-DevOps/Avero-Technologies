"use client";

import { useEffect, useRef } from "react";

/** Top reading progress via transform (no layout thrash on scroll). */
export function ScrollProgressBar() {
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    function onScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
        if (fillRef.current) {
          fillRef.current.style.transform = `scaleX(${p})`;
        }
      });
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="scroll-signal" aria-hidden="true">
      <div className="scroll-signal__track">
        <div ref={fillRef} className="scroll-signal__fill" />
      </div>
    </div>
  );
}
