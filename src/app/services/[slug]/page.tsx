import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Section";
import { CtaBand } from "@/components/sections/CtaBand";
import { DetailTabs } from "@/components/ui/DetailTabs";
import { Reveal } from "@/components/visual/Reveal";
import { mediaForCapability, tabMediaForSection } from "@/lib/capability-media";
import { content } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const services = await content.getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = await content.getService(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.seo.title,
    description: service.seo.description,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = await content.getService(slug);
  if (!service) notFound();

  const [technologies, capabilities, allServices] = await Promise.all([
    content.getTechnologies(),
    content.getCapabilities(),
    content.getServices(),
  ]);

  const capability = capabilities.find((c) => c.id === service.capability);
  const relatedTech = (
    service.technologies.length
      ? service.technologies
      : technologies
          .filter((t) => t.capabilities.includes(service.capability))
          .map((t) => t.name)
  ).slice(0, 14);

  const relatedServices = allServices
    .filter((s) => s.capability === service.capability && s.slug !== service.slug)
    .slice(0, 4);

  const tabs = [
    {
      id: "problem",
      label: "Problem",
      body: service.problem,
      mediaKey: tabMediaForSection("problem", service.capability),
    },
    {
      id: "context",
      label: "Context",
      body: service.engagementContext,
      mediaKey: tabMediaForSection("context", service.capability),
    },
    {
      id: "approach",
      label: "Approach",
      body: service.approach,
      mediaKey: tabMediaForSection("approach", service.capability),
    },
    {
      id: "purpose",
      label: "Purpose",
      body: service.purpose,
      mediaKey: tabMediaForSection("purpose", service.capability),
    },
    {
      id: "security",
      label: "Security",
      body: service.securityConsiderations,
      mediaKey: tabMediaForSection("security", service.capability),
    },
    {
      id: "scope",
      label: "Scope",
      body: service.capabilities.join(" · "),
      mediaKey: tabMediaForSection("scope", service.capability),
    },
    {
      id: "technology",
      label: "Technology",
      body: `${relatedTech.join(", ")}. Representative stack, not a partnership claim.`,
      mediaKey: tabMediaForSection("tech", service.capability),
    },
  ];

  return (
    <>
      <PageHero
        mediaKey={mediaForCapability(service.capability)}
        label={capability?.name ?? "Engagement"}
        title={service.title}
        description={service.summary}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
      />
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <div className="rounded-3xl border border-chalk-200 bg-chalk-50 p-6 md:sticky md:top-28">
                <p className="tech-label text-signal">How to engage</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">
                  This is how you work with Avero on
                  {capability ? ` ${capability.shortName}` : ""} delivery, mapped to a clear
                  commercial scope.
                </p>
                {capability ? (
                  <Link
                    href={`/capabilities/${capability.slug}`}
                    className="mt-5 inline-flex rounded-full border border-chalk-200 bg-paper px-3 py-1 text-xs font-semibold tracking-wide text-ink-700 no-underline hover:border-signal hover:text-signal"
                  >
                    {capability.name}
                  </Link>
                ) : null}
                <div className="mt-8">
                  <Button href="/contact">Talk to us</Button>
                </div>
                <div className="mt-4">
                  <Button href="/services" variant="secondary" size="sm">
                    All services
                  </Button>
                </div>
              </div>
            </Reveal>

            <Reveal className="lg:col-span-8" variant="right">
              <DetailTabs tabs={tabs} eyebrow="About this service" />

              <div className="mt-10">
                <p className="tech-label mb-3 text-signal">Engineering scope</p>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {service.capabilities.map((item) => (
                    <li
                      key={item}
                      className="rounded-2xl border border-chalk-200 bg-paper px-4 py-3 text-sm text-ink-800"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <p className="tech-label mb-3 text-signal">Technology</p>
                <ul className="flex flex-wrap gap-2">
                  {relatedTech.map((name) => (
                    <li
                      key={name}
                      className="rounded-full border border-chalk-200 bg-chalk-50 px-3 py-1.5 text-sm text-ink-800"
                    >
                      {name}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {relatedServices.length > 0 ? (
            <Reveal className="mt-14">
              <p className="tech-label text-signal">Related services</p>
              <h2 className="font-display mt-3 text-2xl font-bold">Continue in this domain</h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {relatedServices.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/services/${related.slug}`}
                    className="surface-card block p-5 no-underline"
                  >
                    <h3 className="font-display text-lg font-semibold text-ink-950">{related.title}</h3>
                    <p className="mt-2 text-sm text-ink-600">{related.summary}</p>
                  </Link>
                ))}
              </div>
            </Reveal>
          ) : null}
        </Container>
      </Section>
      <CtaBand title="Want to discuss this service?" />
    </>
  );
}
