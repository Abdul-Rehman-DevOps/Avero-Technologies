"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { Reveal } from "@/components/visual/Reveal";

type CtaBandProps = {
  title?: string;
  description?: string;
  primaryHref?: string;
  primaryLabel?: string;
};

export function CtaBand({
  title = "Ready to talk?",
  description = "Send a message. General questions and project ideas are both welcome. We reply with a clear next step.",
  primaryHref = "/contact",
  primaryLabel = "Talk to us",
}: CtaBandProps) {
  return (
    <section className="section-y" style={{ background: "var(--footer-bg)", color: "var(--footer-fg)" }}>
      <Container>
        <Reveal variant="fade">
          <div className="rounded-3xl border border-white/15 p-8 md:p-12">
            <p className="text-xs font-semibold tracking-[0.12em] text-signal">Next step</p>
            <h2 className="font-display mt-4 max-w-3xl text-3xl text-balance md:text-5xl">{title}</h2>
            <p className="mt-4 max-w-2xl text-lg" style={{ color: "var(--footer-muted)" }}>
              {description}
            </p>
            <div className="mt-8">
              <Button href={primaryHref}>{primaryLabel}</Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
