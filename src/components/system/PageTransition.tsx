"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/** Soft route change cue — short bar only, no full-screen flash. */
export function PageTransition() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActive(false);
      return;
    }
    setActive(true);
    const t = window.setTimeout(() => setActive(false), 380);
    return () => {
      window.clearTimeout(t);
      setActive(false);
    };
  }, [pathname]);

  if (!active) return null;

  return (
    <div className="page-signal" aria-hidden="true">
      <div className="page-signal__bar" />
    </div>
  );
}
