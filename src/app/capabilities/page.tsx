import { PageHero } from "@/components/layout/PageHero";
import { Container, Section } from "@/components/ui/Section";
import { CapabilityOrthograph } from "@/components/visual/CapabilityOrthograph";
import { CtaBand } from "@/components/sections/CtaBand";
import { Reveal } from "@/components/visual/Reveal";
import { content } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Capabilities",
  description:
    "Avero capabilities across AI, Engineering, Cloud, Platform, Security, Data, and Labs.",
  path: "/capabilities",
});

export default async function CapabilitiesPage() {
  const capabilities = await content.getCapabilities();

  return (
    <>
      <PageHero
        mediaKey="data"
        label="Capabilities"
        title="Capabilities"
        description="What we build across AI, software, cloud, platform, security, and data. Pick a domain to see focus areas and related services."
        crumbs={[{ label: "Home", href: "/" }, { label: "Capabilities" }]}
      />
      <Section>
        <Container>
          <Reveal variant="fade">
            <CapabilityOrthograph capabilities={capabilities} />
          </Reveal>
        </Container>
      </Section>
      <CtaBand title="Want help in this area?" />
    </>
  );
}
