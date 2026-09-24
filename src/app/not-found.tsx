import { Container } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="py-20 md:py-28">
      <div className="mx-auto max-w-2xl rounded-3xl border border-chalk-200 bg-paper p-8 shadow-soft md:p-10">
        <p className="tech-label text-signal">Page not found</p>
        <h1 className="font-display mt-3 text-3xl font-bold text-ink-950 md:text-4xl">
          This page is not available.
        </h1>
        <p className="mt-4 max-w-lg text-ink-600">
          The link may be outdated, or the page may have moved. Use the options below to continue.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/">Back to home</Button>
          <Button href="/contact" variant="secondary">
            Contact us
          </Button>
        </div>
      </div>
    </Container>
  );
}
