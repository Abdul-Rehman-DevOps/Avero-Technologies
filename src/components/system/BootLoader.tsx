"use client";

import { useLayoutEffect } from "react";

/**
 * Marks the document ready for motion on first paint.
 * No full-screen overlay — keeps Vercel first load fast and lets Reveals animate on first visit.
 */
export function BootLoader() {
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.add("avero-js");
    root.classList.add("avero-ready");
    window.dispatchEvent(new Event("avero:boot-done"));
  }, []);

  return null;
}
