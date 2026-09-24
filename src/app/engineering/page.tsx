import { PageHero } from "@/components/layout/PageHero";
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
        mediaKey="engineering"
        label="Engineering"
        title="How we engineer"
        description="A clear path from discovery through build, security, and operations."
        crumbs={[{ label: "Home", href: "/" }, { label: "Engineering" }]}
      />
      <Section>
        <Container>
          <Reveal>
            <EngineeringLifecycle />
          </Reveal>
          <Reveal className="mt-10 max-w-3xl space-y-4 text-ink-600" delay={80}>
            <p>
              Prefer clear architecture decisions over unnecessary complexity. Prefer verification
              over claims. Prefer systems that stay operable after launch.
            </p>
          </Reveal>
        </Container>
      </Section>
      <CtaBand title="Want to discuss how we work?" />
    </>
  );
}
