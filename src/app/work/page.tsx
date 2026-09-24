import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/visual/Reveal";
import { content } from "@/lib/content";
import { media } from "@/lib/media";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Case Studies",
  description: "Architecture case studies from Avero Technologies across cloud, AI, platform, and security.",
  path: "/work",
});

export default async function WorkPage() {
  const studies = await content.getCaseStudies();
  const published = studies.filter((s) => !s.placeholder);

  return (
    <>
      <PageHero
        mediaKey="delivery"
        label="Case studies"
        title="Architecture that shipped"
        description="Real-world examples: problem, approach, and results. Client details are anonymized where needed."
        crumbs={[{ label: "Home", href: "/" }, { label: "Case Studies" }]}
      />
      <Section>
        <Container>
          <Reveal>
            <div className="mb-10 media-frame aspect-[21/9] max-h-[280px] shadow-soft sm:max-h-[360px]">
              <Image
                src={media.cloud.src}
                alt={media.cloud.alt}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
          </Reveal>

          {published.length === 0 ? (
            <div className="rounded-3xl border border-chalk-200 bg-paper p-8 text-center">
              <p className="font-display text-2xl font-semibold">Case studies coming soon</p>
              <p className="mt-3 text-ink-600">Talk to us and we will share relevant patterns.</p>
              <div className="mt-6">
                <Button href="/contact">Talk to us</Button>
              </div>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {published.map((study, i) => (
                <Reveal key={study.slug} delay={(i % 4) * 50}>
                  <Link
                    href={`/work/${study.slug}`}
                    className="surface-card group flex h-full flex-col p-6 no-underline"
                  >
                    <p className="tech-label text-signal">{String(i + 1).padStart(2, "0")}</p>
                    <h2 className="font-display mt-3 text-2xl font-semibold text-ink-950 group-hover:text-signal">
                      {study.title}
                    </h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-600">{study.summary}</p>
                    {study.technology.length > 0 ? (
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {study.technology.slice(0, 4).map((tech) => (
                          <li
                            key={tech}
                            className="rounded-md border border-chalk-200 bg-chalk-50 px-2 py-1 text-[11px] font-medium text-ink-600"
                          >
                            {tech}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    <p className="mt-5 text-sm font-semibold text-signal">Read case study →</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
