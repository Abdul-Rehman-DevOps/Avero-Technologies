import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/visual/Reveal";
import { content } from "@/lib/content";
import { media } from "@/lib/media";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Industries",
  description: "How Avero engineering applies across financial services, healthcare, SaaS, logistics, and more.",
  path: "/industries",
});

export default async function IndustriesPage() {
  const industries = await content.getIndustries();

  return (
    <>
      <PageHero
        mediaKey="office"
        label="Industries"
        title="Where we apply systems thinking"
        description="Sector-specific constraints shape architecture. Browse where our engineering shows up in practice."
        crumbs={[{ label: "Home", href: "/" }, { label: "Industries" }]}
      />
      <Section>
        <Container>
          <Reveal>
            <div className="mb-10 grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-5">
                <p className="tech-label text-signal">Context first</p>
                <h2 className="font-display mt-3 text-3xl font-bold tracking-tight">
                  Industry fit without invented claims
                </h2>
                <p className="mt-4 text-ink-600">
                  Each industry page describes applicable use cases and related services. Published
                  outcomes appear only in case studies with verified detail.
                </p>
              </div>
              <div className="lg:col-span-7">
                <div className="media-frame aspect-[16/9] shadow-soft">
                  <Image
                    src={media.data.src}
                    alt={media.data.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width:1024px) 100vw, 58vw"
                  />
                </div>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {industries.map((industry, i) => (
              <Reveal key={industry.slug} delay={(i % 4) * 50}>
                <Link
                  href={`/industries/${industry.slug}`}
                  className="surface-card group flex h-full flex-col p-6 no-underline"
                >
                  <p className="tech-label text-signal">{String(i + 1).padStart(2, "0")}</p>
                  <h2 className="font-display mt-3 text-2xl font-semibold text-ink-950 group-hover:text-signal">
                    {industry.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">
                    {industry.summary}
                  </p>
                  {industry.useCases?.length ? (
                    <ul className="mt-4 space-y-1 border-t border-chalk-200 pt-4">
                      {industry.useCases.slice(0, 3).map((useCase) => (
                        <li key={useCase} className="text-xs text-ink-500">
                          {useCase}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <p className="mt-4 text-sm font-semibold text-signal">View industry →</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
