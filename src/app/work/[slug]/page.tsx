import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { PlaceholderNotice } from "@/components/ui/PlaceholderNotice";
import { Container, Heading, Section } from "@/components/ui/Section";
import { content } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const studies = await content.getCaseStudies();
  return studies.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const study = await content.getCaseStudy(slug);
  if (!study) return {};
  return buildMetadata({
    title: study.seo.title,
    description: study.seo.description,
    path: `/work/${study.slug}`,
    noIndex: study.placeholder,
  });
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = await content.getCaseStudy(slug);
  if (!study) notFound();

  return (
    <>
      <PageHero
        title={study.title}
        description={study.summary}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Case Studies", href: "/work" },
          { label: study.title },
        ]}
      />
      <Section>
        <Container className="max-w-3xl space-y-8">
          {study.placeholder ? (
            <PlaceholderNotice>
              This entry demonstrates case-study structure. It is not a client engagement.
            </PlaceholderNotice>
          ) : null}
          {(
            [
              ["Problem", study.problem],
              ["Context", study.context],
              ["Architecture", study.architecture],
              ["Engineering challenge", study.engineeringChallenge],
              ["Security considerations", study.securityConsiderations],
              ["Implementation", study.implementation],
              ["Results", study.results],
              ["Lessons learned", study.lessonsLearned],
            ] as const
          ).map(([label, value]) => (
            <div key={label}>
              <Heading as="h2">{label}</Heading>
              <p className="mt-3 text-ink-600">{value}</p>
            </div>
          ))}
          {study.technology.length > 0 ? (
            <div>
              <Heading as="h2">Technology</Heading>
              <ul className="mt-3 flex flex-wrap gap-2">
                {study.technology.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-chalk-200 bg-chalk-100 px-3 py-1 text-sm"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </Container>
      </Section>
    </>
  );
}
