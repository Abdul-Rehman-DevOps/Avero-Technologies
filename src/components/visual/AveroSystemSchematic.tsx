"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useState } from "react";
import { capabilityNodes } from "@/lib/site";

type NodeId = (typeof capabilityNodes)[number]["id"];

const positions: Record<NodeId, { x: number; y: number }> = {
  ai: { x: 180, y: 42 },
  engineering: { x: 300, y: 88 },
  cloud: { x: 332, y: 180 },
  platform: { x: 268, y: 268 },
  security: { x: 150, y: 300 },
  data: { x: 48, y: 248 },
  labs: { x: 52, y: 108 },
};

const core = { x: 168, y: 168 };
const VIEW_W = 360;
const VIEW_H = 330;

type Props = {
  activeId?: NodeId | null;
  onSelect?: (id: NodeId) => void;
  interactive?: boolean;
  className?: string;
  compact?: boolean;
  variant?: "hero" | "panel";
};

export function AveroSystemSchematic({
  activeId = null,
  onSelect,
  interactive = false,
  className = "",
  compact = false,
  variant = "panel",
}: Props) {
  const router = useRouter();
  const titleId = useId();
  const [animateIn, setAnimateIn] = useState(false);
  const [hoverId, setHoverId] = useState<NodeId | null>(null);
  const [selected, setSelected] = useState<NodeId | null>(activeId ?? (interactive ? "ai" : null));

  useEffect(() => {
    if (activeId) setSelected(activeId);
  }, [activeId]);

  const showControls = interactive;
  const controlGrid =
    variant === "hero"
      ? "grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7"
      : "grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7";
  const focusId = hoverId ?? selected;

  const selectNode = useCallback(
    (id: NodeId) => {
      setSelected(id);
      setHoverId(id);
      if (onSelect) {
        onSelect(id);
        return;
      }
      const node = capabilityNodes.find((n) => n.id === id);
      if (node) router.push(node.href);
    },
    [onSelect, router],
  );

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const id = window.requestAnimationFrame(() => setAnimateIn(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  return (
    <div className={["schematic-root", className].filter(Boolean).join(" ")}>
      <figure
        className={`diagram-frame diagram-substrate overflow-hidden ${animateIn ? "schematic-init" : ""}`}
        aria-labelledby={titleId}
      >
        <div className="flex items-center justify-between gap-3 border-b border-chalk-200 px-3 py-2.5">
          <p id={titleId} className="tech-label text-ink-600">
            Avero system map
          </p>
          <p className="tech-label shrink-0 text-signal">
            {focusId ? `Focus · ${focusId}` : "Core online"}
          </p>
        </div>

        <div
          className={["schematic-board relative w-full", compact ? "schematic-board-compact" : ""].join(
            " ",
          )}
          style={{ aspectRatio: `${VIEW_W} / ${VIEW_H}` }}
        >
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            className="absolute inset-0 h-full w-full"
            role={interactive ? "group" : "img"}
            aria-label={interactive ? "Capability system schematic" : undefined}
            aria-hidden={interactive ? undefined : true}
          >
            <line
              x1="24"
              y1="168"
              x2="336"
              y2="168"
              stroke="var(--grid-line-strong)"
              strokeWidth="1"
              className="sch-frame"
            />
            <line
              x1="168"
              y1="24"
              x2="168"
              y2="306"
              stroke="var(--grid-line-strong)"
              strokeWidth="1"
              className="sch-frame"
            />

            {capabilityNodes.map((node, index) => {
              const p = positions[node.id];
              const isSelected = selected === node.id;
              const isHovered = hoverId === node.id;
              const lit = isSelected || isHovered;
              return (
                <g key={`path-${node.id}`}>
                  <line
                    className="sch-path"
                    style={{
                      animationDelay: `${100 + index * 40}ms`,
                      transition: "stroke 160ms ease, stroke-width 160ms ease",
                    }}
                    x1={core.x}
                    y1={core.y}
                    x2={p.x}
                    y2={p.y}
                    stroke={
                      isSelected
                        ? "var(--signal)"
                        : isHovered
                          ? "var(--arc)"
                          : node.research
                            ? "var(--arc)"
                            : "var(--schematic-link)"
                    }
                    strokeWidth={isSelected ? 2.2 : isHovered ? 1.7 : 1.15}
                    strokeDasharray={node.research ? "5 4" : undefined}
                    opacity={lit || !focusId ? 1 : 0.45}
                  />
                  {isSelected ? (
                    <circle r="2.6" fill="var(--signal)">
                      <animateMotion
                        dur="1.5s"
                        repeatCount="indefinite"
                        path={`M ${core.x} ${core.y} L ${p.x} ${p.y}`}
                      />
                    </circle>
                  ) : null}
                </g>
              );
            })}

            <g className="sch-core">
              <circle
                cx={core.x}
                cy={core.y}
                r="36"
                fill="var(--paper)"
                stroke="var(--ink-950)"
                strokeWidth="1.3"
              />
              <circle
                cx={core.x}
                cy={core.y}
                r="24"
                fill="none"
                stroke="var(--signal)"
                strokeOpacity="0.35"
                strokeWidth="1"
              />
              <circle cx={core.x} cy={core.y} r="7" fill="var(--signal)" />
              <text
                x={core.x}
                y={core.y + 50}
                textAnchor="middle"
                fill="var(--ink-800)"
                style={{
                  fontFamily: "IBM Plex Mono, monospace",
                  fontSize: "9px",
                  letterSpacing: "0.14em",
                }}
              >
                CORE
              </text>
            </g>

            {capabilityNodes.map((node, index) => {
              const p = positions[node.id];
              const isSelected = selected === node.id;
              const isHovered = hoverId === node.id;
              const lit = isSelected || isHovered;
              const r = isSelected ? 13 : isHovered ? 11 : 9;

              return (
                <g
                  key={node.id}
                  className="sch-node"
                  style={{ animationDelay: `${160 + index * 40}ms` }}
                >
                  {lit ? (
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={r + 7}
                      fill="none"
                      stroke={isSelected ? "var(--signal)" : "var(--arc)"}
                      strokeOpacity="0.35"
                      strokeWidth="1"
                    />
                  ) : null}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={r}
                    fill={isSelected ? "var(--signal)" : "var(--paper)"}
                    stroke={
                      isSelected
                        ? "var(--signal)"
                        : isHovered
                          ? "var(--arc)"
                          : node.research
                            ? "var(--arc)"
                            : "var(--ink-950)"
                    }
                    strokeWidth={isHovered || isSelected ? 1.6 : 1.25}
                    strokeDasharray={node.research && !isSelected ? "3 2" : undefined}
                    style={{ transition: "r 140ms ease, fill 140ms ease, stroke 140ms ease" }}
                  />
                  <text
                    className="sch-label"
                    x={p.x}
                    y={p.y - 20}
                    textAnchor="middle"
                    fill={lit ? "var(--signal)" : "var(--ink-600)"}
                    style={{
                      fontFamily: "IBM Plex Mono, monospace",
                      fontSize: "10px",
                      letterSpacing: "0.1em",
                      transition: "fill 140ms ease",
                    }}
                  >
                    {node.code}
                  </text>

                  {interactive ? (
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r="26"
                      fill="transparent"
                      className="schematic-hit"
                      role="button"
                      tabIndex={0}
                      aria-label={`Select ${node.label}`}
                      aria-pressed={isSelected}
                      onClick={() => selectNode(node.id)}
                      onPointerEnter={() => setHoverId(node.id)}
                      onPointerLeave={() => setHoverId((current) => (current === node.id ? null : current))}
                      onFocus={() => setHoverId(node.id)}
                      onBlur={() => setHoverId((current) => (current === node.id ? null : current))}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          selectNode(node.id);
                        }
                      }}
                    />
                  ) : null}
                </g>
              );
            })}
          </svg>
        </div>

        {!interactive ? (
          <ul className="sr-only">
            {capabilityNodes.map((n) => (
              <li key={n.id}>
                <Link href={n.href}>{n.label}</Link>
              </li>
            ))}
          </ul>
        ) : null}
      </figure>

      {showControls ? (
        <ul
          className={`schematic-controls mt-3 grid ${controlGrid}`}
          role="listbox"
          aria-label="Capability domains"
        >
          {capabilityNodes.map((node) => {
            const isSelected = selected === node.id;
            const isHovered = hoverId === node.id;
            return (
              <li key={node.id} role="none">
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => selectNode(node.id)}
                  onPointerEnter={() => setHoverId(node.id)}
                  onPointerLeave={() => setHoverId((current) => (current === node.id ? null : current))}
                  onFocus={() => setHoverId(node.id)}
                  onBlur={() => setHoverId((current) => (current === node.id ? null : current))}
                  className={[
                    "schematic-control w-full border px-2.5 py-2.5 text-left",
                    isSelected ? "is-selected" : "",
                    isHovered && !isSelected ? "is-hovered" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <span className="tech-label block">{node.code}</span>
                  <span className="mt-1 block text-xs font-medium text-ink-950">{node.tabLabel}</span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
