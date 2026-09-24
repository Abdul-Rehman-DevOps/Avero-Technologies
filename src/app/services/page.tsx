import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/visual/Reveal";
import { content } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Services",
  description: "Engineering services from Avero Technologies across software, AI, cloud, platform, security, and data.",
  path: "/services",
});

export default async function ServicesPage() {
  const [services, capabilities] = await Promise.all([
    content.getServices(),
    content.getCapabilities(),
  ]);

  return (
    <>
      <PageHero
        mediaKey="engineering"
        label="Services"
        title="Engineering services"
        description="Start with a clear conversation. We clarify outcomes and constraints before proposing architecture or timeline."
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />
      <Section>
        <Container className="space-y-14">
          <Reveal>
            <div className="flex flex-col gap-4 rounded-3xl border border-chalk-200 bg-paper p-6 md:flex-row md:items-center md:justify-between md:p-8">
              <div>
                <p className="tech-label text-signal">Getting started</p>
                <p className="mt-2 max-w-2xl text-ink-600">
                  Tell us what you need. We clarify outcomes, constraints, and the first delivery
                  slice before proposing architecture or timeline.
                </p>
              </div>
              <Button href="/contact">Talk to us</Button>
            </div>
          </Reveal>

          {capabilities.map((cap, capIndex) => {
            const group = services.filter((s) => s.capability === cap.id);
            if (group.length === 0) return null;
            return (
              <Reveal key={cap.id} delay={capIndex * 40}>
                <div>
                  <div className="mb-4 flex flex-col gap-2 border-b border-chalk-200 pb-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="tech-label">{cap.name}</p>
                      <h2 className="font-display mt-2 text-2xl font-bold text-ink-950 md:text-3xl">
                        {cap.shortName} services
                      </h2>
                      <p className="mt-2 max-w-2xl text-sm text-ink-600">{cap.summary}</p>
                    </div>
                    <Link
                      href={`/capabilities/${cap.slug}`}
                      className="text-sm font-semibold text-signal no-underline"
                    >
                      Capability overview →
                    </Link>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {group.map((service) => (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        className="surface-card group block p-5 no-underline"
                      >
                        <h3 className="font-display text-lg font-semibold text-ink-950 group-hover:text-signal">
                          {service.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-ink-600">{service.summary}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </Container>
      </Section>
    </>
  );
}
