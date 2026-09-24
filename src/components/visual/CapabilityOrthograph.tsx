"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AveroSystemSchematic } from "@/components/visual/AveroSystemSchematic";
import { capabilityNodes } from "@/lib/site";
import type { Capability } from "@/types/content";

type NodeId = (typeof capabilityNodes)[number]["id"];

const relations: Record<NodeId, NodeId[]> = {
  ai: ["data", "platform", "security", "engineering"],
  engineering: ["platform", "cloud", "security", "ai"],
  cloud: ["platform", "security", "data", "engineering"],
  platform: ["cloud", "security", "engineering", "ai"],
  security: ["cloud", "platform", "ai", "data"],
  data: ["ai", "cloud", "security", "platform"],
  labs: ["ai", "engineering", "data"],
};

export function CapabilityOrthograph({ capabilities }: { capabilities: Capability[] }) {
  const [activeId, setActiveId] = useState<NodeId>("ai");
  const byId = useMemo(() => new Map(capabilities.map((c) => [c.id, c])), [capabilities]);
  const active = byId.get(activeId);
  const meta = capabilityNodes.find((n) => n.id === activeId);
  const related = relations[activeId] ?? [];

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
      <AveroSystemSchematic
        interactive
        variant="panel"
        activeId={activeId}
        onSelect={setActiveId}
      />

      <aside className="diagram-frame p-6 md:p-8" aria-live="polite">
        <div key={activeId} className="panel-swap">
          <p className="tech-label text-signal">
            {meta?.code} · {meta?.research ? "RESEARCH SPUR" : "ACTIVE DOMAIN"}
          </p>
          <h3 className="font-display mt-3 text-3xl md:text-4xl">
            {active?.name ?? meta?.label}
          </h3>
          <p className="mt-4 text-ink-600">{active?.summary}</p>

          <div className="mt-6 border-t border-chalk-200 pt-5">
            <p className="tech-label mb-3">Connected systems</p>
            <ul className="flex flex-wrap gap-2">
              {related.map((id) => {
                const n = capabilityNodes.find((c) => c.id === id);
                return (
                  <li key={id}>
                    <button
                      type="button"
                      onClick={() => setActiveId(id)}
                      className="schematic-chip border border-chalk-200 bg-chalk-50 px-3 py-1.5 font-mono text-[11px] tracking-[0.08em] text-ink-800"
                    >
                      {n?.code}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {active ? (
            <ul className="mt-6 space-y-2 border-t border-chalk-200 pt-5">
              {active.capabilities.slice(0, 5).map((item) => (
                <li key={item} className="flex gap-3 text-sm text-ink-800">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          ) : null}

          <Link
            href={meta?.href ?? "/capabilities"}
            className="group mt-8 inline-flex items-center gap-2 font-medium text-ink-950 no-underline"
          >
            Open capability
            <span className="btn-arrow font-mono text-signal" aria-hidden>
              →
            </span>
          </Link>
        </div>
      </aside>
    </div>
  );
}
