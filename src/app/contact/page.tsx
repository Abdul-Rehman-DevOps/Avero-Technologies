import { PageHero } from "@/components/layout/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/visual/Reveal";
import { siteConfig } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact",
  description: "Contact Avero Technologies. Email contact@avero.com or use the project intake form.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        mediaKey="contact"
        label="Contact"
        title="Talk to Avero"
        description="Share what you need to build, secure, or operate. We reply with a clear next step."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />
      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-12">
            <Reveal className="space-y-4 lg:col-span-4" variant="left">
              <div className="rounded-3xl border border-chalk-200 bg-paper p-6 shadow-soft">
                <p className="tech-label text-signal">Direct</p>
                <dl className="mt-5 space-y-5">
                  <div>
                    <dt className="text-xs font-semibold tracking-wide text-ink-400 uppercase">Email</dt>
                    <dd className="mt-1">
                      <a
                        href={`mailto:${siteConfig.email}`}
                        className="break-all text-base font-semibold text-ink-950 no-underline hover:text-signal"
                      >
                        {siteConfig.email}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold tracking-wide text-ink-400 uppercase">Phone</dt>
                    <dd className="mt-1">
                      <a
                        href={`tel:${siteConfig.phoneTel}`}
                        className="font-mono text-base font-semibold text-ink-950 no-underline hover:text-signal"
                      >
                        {siteConfig.phoneDisplay}
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="rounded-3xl border border-chalk-200 bg-chalk-50 p-6">
                <p className="tech-label">Before you send</p>
                <ul className="mt-4 space-y-3 text-sm text-ink-600">
                  <li>Use a work email when possible.</li>
                  <li>Do not include secrets or credentials.</li>
                  <li>Describe current state, constraints, and success criteria.</li>
                  <li>We rate-limit intake to protect the inbox.</li>
                </ul>
              </div>
            </Reveal>
            <Reveal className="lg:col-span-8" variant="right">
              <div className="rounded-3xl border border-chalk-200 bg-paper p-5 shadow-soft md:p-8">
                <p className="tech-label mb-6">Project intake</p>
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
