import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Section";
import { CtaBand } from "@/components/sections/CtaBand";
import { DetailTabs } from "@/components/ui/DetailTabs";
import { Reveal } from "@/components/visual/Reveal";
import { content } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const solutions = await content.getSolutions();
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const solution = await content.getSolution(slug);
  if (!solution) return {};
  return buildMetadata({
    title: solution.seo.title,
    description: solution.seo.description,
    path: `/solutions/${solution.slug}`,
  });
}

export default async function SolutionDetailPage({ params }: Props) {
  const { slug } = await params;
  const solution = await content.getSolution(slug);
  if (!solution) notFound();

  const [services, capabilities] = await Promise.all([
    content.getServices(),
    content.getCapabilities(),
  ]);

  const relatedServices = services.filter((s) => solution.relatedServiceSlugs.includes(s.slug));
  const relatedCapabilities = capabilities.filter((c) =>
    solution.relatedCapabilities.includes(c.id),
  );

  const tabs = [
    {
      id: "problem",
      label: "Problem",
      body: solution.problem,
      mediaKey: "office" as const,
    },
    {
      id: "outcome",
      label: "Outcome",
      body: solution.outcome,
      mediaKey: "delivery" as const,
    },
    {
      id: "approach",
      label: "Approach",
      body: solution.approach,
      mediaKey: "engineering" as const,
    },
    ...(solution.body
      ? [
          {
            id: "detail",
            label: "Detail",
            body: solution.body.replace(/\s+/g, " ").trim(),
            mediaKey: "cloud" as const,
          },
        ]
      : []),
  ];

  return (
    <>
      <PageHero
        mediaKey="delivery"
        label="Solution"
        title={solution.title}
        description={solution.outcome}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/solutions" },
          { label: solution.title },
        ]}
      />
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-8">
              <DetailTabs tabs={tabs} eyebrow="Solution tabs" />
            </Reveal>

            <Reveal className="space-y-6 lg:col-span-4" variant="right">
              {relatedCapabilities.length > 0 ? (
                <div className="rounded-3xl border border-chalk-200 bg-chalk-50 p-5">
                  <p className="tech-label text-signal">Capabilities</p>
                  <ul className="mt-4 space-y-2">
                    {relatedCapabilities.map((cap) => (
                      <li key={cap.slug}>
                        <Link
                          href={`/capabilities/${cap.slug}`}
                          className="text-sm font-medium text-ink-800 no-underline hover:text-signal"
                        >
                          {cap.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {relatedServices.length > 0 ? (
                <div className="rounded-3xl border border-chalk-200 bg-paper p-5 shadow-soft">
                  <p className="tech-label text-signal">Related services</p>
                  <ul className="mt-4 space-y-3">
                    {relatedServices.map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={`/services/${service.slug}`}
                          className="block text-sm font-semibold text-ink-950 no-underline hover:text-signal"
                        >
                          {service.title}
                        </Link>
                        <p className="mt-1 text-xs text-ink-600">{service.summary}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <Button href="/contact">Talk to us</Button>
              <div>
                <Button href="/solutions" variant="secondary">
                  All solutions
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
      <CtaBand title="Questions about this solution?" />
    </>
  );
}
