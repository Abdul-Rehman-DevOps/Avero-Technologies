"use client";

import { useLayoutEffect, useState } from "react";

const BOOT_KEY = "avero-boot";

function markReady() {
  document.documentElement.classList.add("avero-ready");
  window.dispatchEvent(new Event("avero:boot-done"));
}

/**
 * Avero Signal Boot: first-visit loader (session-once).
 * Session cache only stores a tiny boot flag — never blocks the site if storage fails.
 */
export function BootLoader() {
  const [phase, setPhase] = useState<"boot" | "exit" | "done">("boot");

  useLayoutEffect(() => {
    document.documentElement.classList.add("avero-js");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem(BOOT_KEY) === "1";
    } catch {
      // Private mode / blocked storage: skip boot, never break the site.
      seen = true;
    }

    if (reduced || seen) {
      setPhase("done");
      markReady();
      return;
    }

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const exitAt = window.setTimeout(() => setPhase("exit"), 1450);
    const doneAt = window.setTimeout(() => {
      try {
        sessionStorage.setItem(BOOT_KEY, "1");
      } catch {
        /* ignore — site must still unlock */
      }
      document.body.style.overflow = prevOverflow;
      setPhase("done");
      markReady();
    }, 2100);

    // Absolute safety: never leave the page locked behind the boot veil.
    const safetyAt = window.setTimeout(() => {
      document.body.style.overflow = prevOverflow;
      setPhase("done");
      markReady();
    }, 3500);

    return () => {
      window.clearTimeout(exitAt);
      window.clearTimeout(doneAt);
      window.clearTimeout(safetyAt);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`avero-boot ${phase === "exit" ? "avero-boot--exit" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Loading Avero"
    >
      <div className="avero-boot__grid" aria-hidden />
      <div className="avero-boot__core">
        <div className="avero-boot__mark" aria-hidden>
          <svg viewBox="0 0 64 64" className="h-16 w-16 md:h-20 md:w-20">
            <rect width="64" height="64" rx="14" fill="#07111f" />
            <rect className="avero-boot__beam" x="8" y="34" width="48" height="5.5" rx="1.5" fill="#0d8f9c" />
            <path
              fill="#ffffff"
              d="M32 12.5 14 51h8.2l3.4-8.2h12.8L41.8 51H50L32 12.5Zm0 14.2 4.6 11.1H27.4L32 26.7Z"
            />
            <circle className="avero-boot__node" cx="32" cy="10" r="2.8" fill="#0d8f9c" />
          </svg>
        </div>
        <p className="avero-boot__brand">Avero</p>
        <p className="avero-boot__status">
          <span className="avero-boot__pulse" />
          Initializing systems
        </p>
        <div className="avero-boot__track" aria-hidden>
          <div className="avero-boot__fill" />
        </div>
      </div>
    </div>
  );
}
