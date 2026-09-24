"use client";

import { useEffect, useState } from "react";

const stages = [
  { id: "hero", label: "Intro", code: "01" },
  { id: "method", label: "Method", code: "02" },
  { id: "services", label: "Services", code: "03" },
  { id: "industries", label: "Industries", code: "04" },
  { id: "work", label: "Work", code: "05" },
  { id: "company", label: "Company", code: "06" },
  { id: "insights", label: "Insights", code: "07" },
] as const;

/** Floating section indicator for homepage scroll journeys. */
export function ScrollProgress() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ids = stages.map((s) => s.id);
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((n): n is HTMLElement => Boolean(n));
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible?.target.id) return;
        const idx = ids.indexOf(visible.target.id as (typeof ids)[number]);
        if (idx >= 0) setActive(idx);
      },
      { threshold: [0.25, 0.5], rootMargin: "-20% 0px -40% 0px" },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  const stage = stages[active] ?? stages[0];

  return (
    <div
      className="pointer-events-none fixed bottom-5 left-4 z-20 hidden rounded-xl border border-chalk-200 bg-paper px-3.5 py-2.5 shadow-soft md:block"
      aria-hidden="true"
    >
      <p className="font-mono text-[10px] tracking-[0.14em] text-ink-400 uppercase">
        Section {stage.code} of 07
      </p>
      <p className="mt-0.5 text-sm font-semibold text-ink-950">{stage.label}</p>
      <div className="mt-2 flex gap-1">
        {stages.map((s, i) => (
          <span
            key={s.id}
            className={`h-1 w-3 rounded-full transition-colors duration-300 ${
              i === active ? "bg-signal" : "bg-chalk-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
