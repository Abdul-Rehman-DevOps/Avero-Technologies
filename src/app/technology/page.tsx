import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/visual/Reveal";
import { SystemFrame } from "@/components/visual/SystemFrame";
import { content } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Technology",
  description:
    "Technology ecosystem used in Avero engineering across cloud, containers, platform, security, AI, and data.",
  path: "/technology",
});

const categoryOrder = [
  "cloud",
  "containers",
  "infrastructure",
  "platform",
  "observability",
  "security",
  "ai",
  "data",
] as const;

export default async function TechnologyPage() {
  const technologies = await content.getTechnologies();
  const grouped = categoryOrder.map((category) => ({
    category,
    items: technologies.filter((t) => t.category === category),
  }));

  return (
    <>
      <PageHero
        mediaKey="cloud"
        label="Technology"
        title="Technology"
        description="Tools and platforms we use in delivery — grouped by domain, not a logo wall."
        crumbs={[{ label: "Home", href: "/" }, { label: "Technology" }]}
      />
      <Section>
        <Container>
          <Reveal>
            <SystemFrame substrate className="p-6 md:p-10">
              <div className="mb-8 flex flex-col gap-2 border-b border-chalk-200 pb-6 md:flex-row md:items-end md:justify-between">
                <p className="tech-label">By engineering domain</p>
                <Link href="/engineering" className="text-sm text-arc no-underline hover:text-signal">
                  Engineering method →
                </Link>
              </div>
              <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                {grouped.map((group, i) => (
                  <Reveal key={group.category} delay={(i % 4) * 50}>
                    <div className="border-l border-chalk-200 pl-4">
                      <h2 className="tech-label text-ink-800">{group.category}</h2>
                      <ul className="mt-4 space-y-2 text-ink-800">
                        {group.items.map((item) => (
                          <li key={item.id} className="text-sm">
                            {item.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                ))}
              </div>
            </SystemFrame>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
