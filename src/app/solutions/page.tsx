import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Section";
import { CtaBand } from "@/components/sections/CtaBand";
import { Reveal } from "@/components/visual/Reveal";
import { content } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Solutions",
  description: "Outcome-shaped solutions from Avero: cloud platforms, AI data foundations, delivery systems, and more.",
  path: "/solutions",
});

export default async function SolutionsPage() {
  const solutions = await content.getSolutions();

  return (
    <>
      <PageHero
        mediaKey="delivery"
        label="Solutions"
        title="Solutions we deliver"
        description="Packaged outcomes that combine our services — described by problem and result."
        crumbs={[{ label: "Home", href: "/" }, { label: "Solutions" }]}
      />
      <Section>
        <Container>
          <div className="grid gap-4 md:grid-cols-2">
            {solutions.map((solution, i) => (
              <Reveal key={solution.slug} delay={(i % 4) * 45}>
                <Link
                  href={`/solutions/${solution.slug}`}
                  className="surface-card group flex h-full flex-col p-6 no-underline"
                >
                  <p className="tech-label text-signal">{String(i + 1).padStart(2, "0")}</p>
                  <h2 className="font-display mt-3 text-2xl font-semibold text-ink-950 group-hover:text-signal">
                    {solution.title}
                  </h2>
                  <p className="mt-3 text-sm font-medium text-ink-800">Problem</p>
                  <p className="mt-1 text-sm text-ink-600">{solution.problem}</p>
                  <p className="mt-4 text-sm font-medium text-ink-800">Outcome</p>
                  <p className="mt-1 flex-1 text-sm text-ink-600">{solution.outcome}</p>
                  <p className="mt-5 text-sm font-semibold text-signal">Explore solution →</p>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-10">
            <Button href="/services" variant="secondary">
              Browse all services
            </Button>
          </div>
        </Container>
      </Section>
      <CtaBand title="Don’t see your scenario?" />
    </>
  );
}
