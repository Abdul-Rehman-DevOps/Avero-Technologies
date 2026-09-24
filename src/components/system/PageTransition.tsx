"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/** Route change signal: sweeping teal bar + soft veil. Skips the first mount. */
export function PageTransition() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setActive(false);
      return;
    }
    setActive(true);
    const t = window.setTimeout(() => setActive(false), 620);
    return () => {
      window.clearTimeout(t);
      setActive(false);
    };
  }, [pathname]);

  if (!active) return null;

  return (
    <div className="page-signal" aria-hidden="true">
      <div className="page-signal__bar" />
      <div className="page-signal__flash" />
    </div>
  );
}
