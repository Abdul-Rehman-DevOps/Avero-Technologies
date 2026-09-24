import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/visual/Reveal";
import { content } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Careers",
  description: "Careers at Avero Technologies. Open engineering roles and how we hire.",
  path: "/careers",
});

export default async function CareersPage() {
  const jobs = await content.getJobs();

  return (
    <>
      <PageHero
        mediaKey="careers"
        label="Careers"
        title="Build systems with us"
        description="We hire engineers who care about architecture, security defaults, and operable delivery."
        crumbs={[{ label: "Home", href: "/" }, { label: "Careers" }]}
      />
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-5" variant="left">
              <p className="tech-label text-signal">Culture</p>
              <h2 className="font-display mt-3 text-3xl font-bold tracking-tight">
                Precise communication. Secure defaults. Ownership after launch.
              </h2>
              <ol className="mt-8 space-y-4">
                {[
                  "Role review and application",
                  "Technical conversation",
                  "Systems and security discussion",
                  "Team fit and offer",
                ].map((step, i) => (
                  <li key={step} className="flex gap-3 text-sm text-ink-700">
                    <span className="tech-label shrink-0 text-signal">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
              <p className="mt-6 text-sm text-ink-600">
                Questions:{" "}
                <a href={`mailto:${siteConfig.email}`} className="font-semibold text-signal no-underline">
                  {siteConfig.email}
                </a>
              </p>
            </Reveal>

            <Reveal className="lg:col-span-7" variant="right">
              <div className="overflow-hidden rounded-3xl border border-chalk-200 bg-paper shadow-soft">
                <div className="border-b border-chalk-200 px-5 py-4">
                  <p className="tech-label">Open positions</p>
                </div>
                {jobs.length === 0 ? (
                  <div className="p-6 text-sm text-ink-600">
                    No open roles right now. Send a note via{" "}
                    <Link href="/contact" className="font-semibold text-signal no-underline">
                      Contact
                    </Link>{" "}
                    if you want to introduce yourself.
                  </div>
                ) : (
                  <ul>
                    {jobs.map((job) => (
                      <li key={job.slug} className="border-b border-chalk-200 last:border-0">
                        <Link
                          href={`/careers/${job.slug}`}
                          className="block px-5 py-5 no-underline transition-colors hover:bg-chalk-50"
                        >
                          <p className="font-display text-xl font-semibold text-ink-950">{job.title}</p>
                          <p className="mt-1 text-sm text-ink-600">
                            {job.department}
                            {" · "}
                            {job.locationType}
                            {" · "}
                            {job.employmentType}
                          </p>
                          <p className="mt-2 line-clamp-2 text-sm text-ink-500">{job.description}</p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="mt-6">
                <Button href="/contact" variant="secondary">
                  General inquiry
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
