import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { Container, Heading, Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { content } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const jobs = await content.getJobs();
  return jobs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const job = await content.getJob(slug);
  if (!job) return {};
  return buildMetadata({
    title: job.title,
    description: job.description.slice(0, 160),
    path: `/careers/${job.slug}`,
  });
}

export default async function JobPage({ params }: Props) {
  const { slug } = await params;
  const job = await content.getJob(slug);
  if (!job) notFound();

  return (
    <>
      <PageHero
        title={job.title}
        description={`${job.department} · ${job.seniority} · ${job.locationType}`}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Careers", href: "/careers" },
          { label: job.title },
        ]}
      />
      <Section>
        <Container className="max-w-3xl">
          <p className="text-ink-600">{job.description}</p>
          <Heading as="h2" className="mt-10">
            Responsibilities
          </Heading>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-ink-600">
            {job.responsibilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <Heading as="h2" className="mt-10">
            Requirements
          </Heading>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-ink-600">
            {job.requirements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {job.niceToHave.length > 0 ? (
            <>
              <Heading as="h2" className="mt-10">
                Nice to have
              </Heading>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-ink-600">
                {job.niceToHave.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </>
          ) : null}
          <Heading as="h2" className="mt-10">
            Application process
          </Heading>
          <p className="mt-4 text-ink-600">{job.applicationProcess}</p>
          <div className="mt-8">
            {job.applyUrl ? (
              <Button href={job.applyUrl}>Apply</Button>
            ) : (
              <Button href="/contact">Talk to us about this role</Button>
            )}
          </div>
        </Container>
      </Section>
    </>
  );
}
