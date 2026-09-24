"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { Reveal } from "@/components/visual/Reveal";
import { siteConfig } from "@/lib/site";

type CtaBandProps = {
  title?: string;
  description?: string;
  primaryHref?: string;
  primaryLabel?: string;
};

export function CtaBand({
  title = "Tell us what you need to ship next",
  description = `Email ${siteConfig.email} or use the project intake form. We respond with a clear next step.`,
  primaryHref = "/contact",
  primaryLabel = "Talk to us",
}: CtaBandProps) {
  return (
    <section className="section-y" style={{ background: "var(--footer-bg)", color: "var(--footer-fg)" }}>
      <Container>
        <Reveal variant="fade">
          <div className="rounded-3xl border border-white/15 p-8 md:p-12">
            <p className="text-xs font-semibold tracking-[0.16em] text-signal uppercase">Next step</p>
            <h2 className="font-display mt-4 max-w-3xl text-3xl text-balance md:text-5xl">{title}</h2>
            <p className="mt-4 max-w-2xl text-lg" style={{ color: "var(--footer-muted)" }}>
              {description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={primaryHref}>{primaryLabel}</Button>
              <Button href={`mailto:${siteConfig.email}`} variant="ghost">
                {siteConfig.email}
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
