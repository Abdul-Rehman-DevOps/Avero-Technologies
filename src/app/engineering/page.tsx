import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Section";
import { CtaBand } from "@/components/sections/CtaBand";
import { EngineeringLifecycle } from "@/components/visual/EngineeringLifecycle";
import { Reveal } from "@/components/visual/Reveal";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Engineering",
  description:
    "How Avero approaches discovery, design, build, security, automation, operations, and continuous evolution.",
  path: "/engineering",
});

export default function EngineeringPage() {
  return (
    <>
      <PageHero
        index="ENG"
        label="LIFECYCLE"
        title="Engineering"
        description="A disciplined path from discovery through evolution. Select a phase to inspect practices."
        crumbs={[{ label: "Home", href: "/" }, { label: "Engineering" }]}
        identity="lifecycle"
      />
      <Section>
        <Container>
          <Reveal>
            <EngineeringLifecycle />
          </Reveal>
          <Reveal className="mt-10 max-w-3xl space-y-4 text-ink-600" delay={80}>
            <p>
              Prefer explicit architecture decisions over fashionable complexity. Prefer verification
              over claims. Prefer operable defaults over demos.
            </p>
            <Button href="/contact" variant="secondary">
              Discuss an engagement
            </Button>
          </Reveal>
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}
