"use client";

import { useState } from "react";

const phases = [
  {
    id: "discover",
    title: "Discover",
    body: "Clarify constraints, risk, operators, and success criteria before architecture.",
  },
  {
    id: "design",
    title: "Design",
    body: "Define boundaries, interfaces, threat model, and delivery topology.",
  },
  {
    id: "build",
    title: "Build",
    body: "Implement with verification, reviewable changes, and operable defaults.",
  },
  {
    id: "secure",
    title: "Secure",
    body: "Embed controls in design and delivery: identity, supply chain, runtime.",
  },
  {
    id: "automate",
    title: "Automate",
    body: "Pipelines, infrastructure as code, and repeatable environment promotion.",
  },
  {
    id: "operate",
    title: "Operate",
    body: "Observability, incident readiness, capacity, and ownership.",
  },
  {
    id: "evolve",
    title: "Evolve",
    body: "Measure, refactor, and extend systems without rewriting identity.",
  },
] as const;

export function EngineeringLifecycle() {
  const [active, setActive] = useState<(typeof phases)[number]["id"]>("discover");
  const current = phases.find((p) => p.id === active) ?? phases[0];

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
      <ol className="diagram-frame overflow-hidden">
        {phases.map((phase, index) => {
          const selected = phase.id === active;
          return (
            <li key={phase.id} className="border-b border-chalk-200 last:border-b-0">
              <button
                type="button"
                aria-pressed={selected}
                onClick={() => setActive(phase.id)}
                className={[
                  "flex w-full items-center gap-4 px-4 py-4 text-left transition-colors",
                  selected ? "bg-signal-subtle" : "bg-paper hover:bg-chalk-50",
                ].join(" ")}
              >
                <span className="font-mono text-xs text-ink-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-lg text-ink-950">{phase.title}</span>
                {selected ? (
                  <span className="ml-auto h-2 w-2 rounded-full bg-signal" aria-hidden />
                ) : null}
              </button>
            </li>
          );
        })}
      </ol>
      <aside className="diagram-frame diagram-substrate p-6 md:p-8" aria-live="polite">
        <p className="tech-label">{current.title} phase</p>
        <h3 className="font-display mt-3 text-3xl">{current.title}</h3>
        <p className="mt-4 text-ink-600">{current.body}</p>
      </aside>
    </div>
  );
}
