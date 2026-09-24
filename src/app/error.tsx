"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container className="py-20 md:py-28">
      <div className="mx-auto max-w-2xl rounded-3xl border border-chalk-200 bg-paper p-8 shadow-soft md:p-10">
        <p className="tech-label text-signal">Something went wrong</p>
        <h1 className="font-display mt-3 text-3xl font-bold text-ink-950 md:text-4xl">
          We hit an unexpected problem.
        </h1>
        <p className="mt-4 max-w-lg text-ink-600">
          Please try again. If it continues, return home or contact us — technical details are kept
          internal.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button type="button" onClick={reset}>
            Try again
          </Button>
          <Button href="/" variant="secondary">
            Back to home
          </Button>
        </div>
      </div>
    </Container>
  );
}
