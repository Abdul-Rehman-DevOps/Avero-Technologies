import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/visual/Reveal";
import { content } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const industries = await content.getIndustries();
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const industry = await content.getIndustry(slug);
  if (!industry) return {};
  return buildMetadata({
    title: industry.seo.title,
    description: industry.seo.description,
    path: `/industries/${industry.slug}`,
  });
}

export default async function IndustryDetailPage({ params }: Props) {
  const { slug } = await params;
  const industry = await content.getIndustry(slug);
  if (!industry) notFound();

  const services = await content.getServices();
  const related = industry.relatedServiceSlugs
    .map((s) => services.find((svc) => svc.slug === s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <>
      <PageHero
        mediaKey="office"
        label="Industry"
        title={industry.title}
        description={industry.summary}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Industries", href: "/industries" },
          { label: industry.title },
        ]}
      />
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <p className="tech-label text-signal">Use cases</p>
              <h2 className="font-display mt-3 text-3xl font-bold tracking-tight">
                Where Avero typically helps
              </h2>
              <ul className="mt-6 space-y-3">
                {industry.useCases.map((item) => (
                  <li
                    key={item}
                    className="rounded-2xl border border-chalk-200 bg-paper px-5 py-4 text-ink-700"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="lg:col-span-5" variant="right">
              <div className="rounded-3xl border border-chalk-200 bg-chalk-50 p-6">
                <p className="tech-label">Capability domains</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {industry.relatedCapabilities.map((cap) => (
                    <li key={cap}>
                      <Link
                        href={`/capabilities/${cap}`}
                        className="rounded-full border border-chalk-200 bg-paper px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ink-600 no-underline hover:border-signal hover:text-signal"
                      >
                        {cap}
                      </Link>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-sm text-ink-600">
                  Industry pages describe applicable engineering work. Published outcomes appear in
                  case studies when verified.
                </p>
                <div className="mt-6">
                  <Button href="/contact" size="sm">
                    Talk to us
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>

          {related.length > 0 ? (
            <Reveal className="mt-14">
              <p className="tech-label text-signal">Related services</p>
              <h2 className="font-display mt-3 text-2xl font-bold">Related services</h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {related.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="surface-card block p-5 no-underline"
                  >
                    <h3 className="font-display text-lg font-semibold text-ink-950">{service.title}</h3>
                    <p className="mt-2 text-sm text-ink-600">{service.summary}</p>
                  </Link>
                ))}
              </div>
            </Reveal>
          ) : null}
        </Container>
      </Section>
    </>
  );
}
