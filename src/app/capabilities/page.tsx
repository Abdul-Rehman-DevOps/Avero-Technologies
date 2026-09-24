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
        index="CAP"
        label="SYSTEM"
        title="Capabilities"
        description="Organizational engineering domains. Select a node to inspect mandate, connected systems, and related technologies. Commercial engagements live under Services."
        crumbs={[{ label: "Home", href: "/" }, { label: "Capabilities" }]}
        identity="map"
      />
      <Section>
        <Container>
          <Reveal variant="fade">
            <CapabilityOrthograph capabilities={capabilities} />
          </Reveal>
        </Container>
      </Section>
      <CtaBand title="Need a capability-aligned engagement?" />
    </>
  );
}
