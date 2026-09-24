"use client";

import Image from "next/image";
import { useId, useState } from "react";
import type { MediaKey } from "@/lib/media";
import { media } from "@/lib/media";

export type DetailTab = {
  id: string;
  label: string;
  body: string;
  mediaKey?: MediaKey;
};

type DetailTabsProps = {
  tabs: DetailTab[];
  eyebrow?: string;
};

export function DetailTabs({ tabs, eyebrow = "Details" }: DetailTabsProps) {
  const [active, setActive] = useState(tabs[0]?.id ?? "");
  const baseId = useId();
  const current = tabs.find((t) => t.id === active) ?? tabs[0];
  if (!current) return null;

  const shot = media[current.mediaKey ?? "delivery"];

  return (
    <div className="overflow-hidden rounded-3xl border border-chalk-200 bg-paper shadow-soft">
      <div className="border-b border-chalk-200 bg-chalk-50 px-4 pt-4 sm:px-5">
        <p className="tech-label text-signal">{eyebrow}</p>
        <div
          role="tablist"
          aria-label={eyebrow}
          className="mt-3 flex gap-1 overflow-x-auto pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {tabs.map((tab, i) => {
            const selected = tab.id === current.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`${baseId}-tab-${tab.id}`}
                aria-selected={selected}
                aria-controls={`${baseId}-panel-${tab.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(tab.id)}
                className={`shrink-0 rounded-xl px-3.5 py-2.5 text-left transition-colors duration-200 ${
                  selected
                    ? "bg-ink-950 text-white shadow-soft"
                    : "border border-chalk-200 bg-paper text-ink-600 hover:border-signal/40 hover:text-ink-950"
                }`}
              >
                <span className="block font-mono text-[10px] tracking-wide opacity-70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mt-0.5 block text-sm font-semibold">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-panel-${current.id}`}
        aria-labelledby={`${baseId}-tab-${current.id}`}
        className="relative min-h-[300px] overflow-hidden"
      >
        <div className="absolute inset-0">
          <Image
            src={shot.src}
            alt=""
            fill
            className="object-cover object-center"
            sizes="(max-width:1024px) 100vw, 60vw"
            quality={70}
            key={shot.src}
          />
          <div className="detail-tab__veil" aria-hidden />
        </div>
        <div key={current.id} className="detail-tab-panel relative grid gap-6 p-6 md:grid-cols-12 md:p-8">
          <div className="rounded-2xl bg-paper/92 p-5 shadow-soft md:col-span-4 md:p-6">
            <p className="tech-label text-signal">{current.label}</p>
            <h3 className="font-display mt-3 text-2xl font-bold tracking-tight text-ink-950 md:text-3xl">
              {current.label}
            </h3>
            <div className="mt-5 h-1.5 w-16 rounded-full bg-signal" aria-hidden />
          </div>
          <div className="rounded-2xl bg-paper/94 p-5 shadow-soft md:col-span-8 md:p-6">
            <p className="text-base leading-relaxed text-ink-700 md:text-lg">{current.body}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
