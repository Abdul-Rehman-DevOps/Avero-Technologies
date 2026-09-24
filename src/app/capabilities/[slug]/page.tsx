import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Section";
import { CtaBand } from "@/components/sections/CtaBand";
import { DetailTabs } from "@/components/ui/DetailTabs";
import { mediaForCapability } from "@/lib/capability-media";
import { content } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const capabilities = await content.getCapabilities();
  return capabilities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const capability = await content.getCapability(slug);
  if (!capability) return {};
  return buildMetadata({
    title: capability.seo.title,
    description: capability.seo.description,
    path: `/capabilities/${capability.slug}`,
  });
}

export default async function CapabilityDetailPage({ params }: Props) {
  const { slug } = await params;
  const capability = await content.getCapability(slug);
  if (!capability) notFound();

  const services = await content.getServices();
  const solutions = await content.getSolutions();
  const related = services.filter((s) => s.capability === capability.id);
  const relatedSolutions = solutions.filter((s) =>
    s.relatedCapabilities.includes(capability.id),
  );
  const heroMedia = mediaForCapability(capability.id);

  const tabs = [
    {
      id: "mandate",
      label: "Mandate",
      body: capability.mandate,
      mediaKey: heroMedia,
    },
    {
      id: "areas",
      label: "Areas",
      body: capability.capabilities.join(" · "),
      mediaKey: "engineering" as const,
    },
    {
      id: "engagement",
      label: "Engagement",
      body: "Commercial work in this domain is engaged through Services. Capabilities describe what Avero can engineer; services describe how customers buy that work.",
      mediaKey: "delivery" as const,
    },
  ];

  return (
    <>
      <PageHero
        mediaKey={heroMedia}
        label={capability.status === "research" ? "Research" : "Capability"}
        title={capability.name}
        description={capability.summary}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Capabilities", href: "/capabilities" },
          { label: capability.shortName },
        ]}
      />
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="tech-label text-signal">Capability area</p>
              <p className="mt-3 text-sm text-ink-600">
                What Avero can engineer in this domain. Commercial offerings are listed under
                Services.
              </p>
              <div className="mt-8">
                <Button href="/services">Browse services</Button>
              </div>
            </div>
            <div className="space-y-8 lg:col-span-8">
              <DetailTabs tabs={tabs} eyebrow="Capability tabs" />

              {capability.status === "research" ? (
                <p className="rounded-2xl border border-chalk-200 bg-chalk-50 p-4 text-sm text-ink-600">
                  Labs work is exploratory. Presence here is not a claim that every listed emerging
                  technology is commercially delivered today.
                </p>
              ) : null}

              <div>
                <p className="tech-label mb-4 text-signal">Capability areas</p>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {capability.capabilities.map((item) => (
                    <li
                      key={item}
                      className="rounded-2xl border border-chalk-200 bg-paper px-4 py-3 text-sm text-ink-800"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {related.length > 0 ? (
                <div>
                  <p className="tech-label mb-4 text-signal">Related services</p>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {related.map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={`/services/${service.slug}`}
                          className="surface-card block p-4 no-underline"
                        >
                          <span className="font-display text-base font-semibold text-ink-950">
                            {service.title}
                          </span>
                          <span className="mt-1 block text-sm text-ink-600">{service.summary}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {relatedSolutions.length > 0 ? (
                <div>
                  <p className="tech-label mb-4 text-signal">Related solutions</p>
                  <ul className="space-y-2">
                    {relatedSolutions.map((solution) => (
                      <li key={solution.slug}>
                        <Link
                          href={`/solutions/${solution.slug}`}
                          className="text-sm font-semibold text-signal no-underline"
                        >
                          {solution.title} →
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </Container>
      </Section>
      <CtaBand title="Want to talk about this capability?" />
    </>
  );
}
