import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Section";
import { CtaBand } from "@/components/sections/CtaBand";
import { Reveal } from "@/components/visual/Reveal";
import { SystemFrame } from "@/components/visual/SystemFrame";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Security",
  description:
    "Security is integrated into the Avero engineering lifecycle across application, cloud, infrastructure, identity, and delivery.",
  path: "/security",
});

const practices = [
  {
    code: "01",
    title: "Application Security",
    body: "Input validation, authorization checks, secure session handling, and reviewable change practices.",
  },
  {
    code: "02",
    title: "Cloud Security",
    body: "Account and identity boundaries, network segmentation, and continuous posture awareness.",
  },
  {
    code: "03",
    title: "Infrastructure Security",
    body: "Hardened baselines, least privilege, and operable defaults for compute and network.",
  },
  {
    code: "04",
    title: "DevSecOps",
    body: "SAST, DAST, SCA, secret detection, and policy checks integrated into delivery pipelines.",
  },
  {
    code: "05",
    title: "Identity and Access Management",
    body: "Strong identity patterns, federation where appropriate, and privilege control.",
  },
  {
    code: "06",
    title: "Secrets Management",
    body: "Secret handling outside source control, rotation patterns, and access scoping.",
  },
  {
    code: "07",
    title: "Container Security",
    body: "Image hygiene, runtime constraints, and registry discipline.",
  },
  {
    code: "08",
    title: "Kubernetes Security",
    body: "RBAC, network policy, workload identity, and admission controls where applicable.",
  },
  {
    code: "09",
    title: "Infrastructure-as-Code Security",
    body: "Reviewable infrastructure definitions, policy checks, and environment parity.",
  },
  {
    code: "10",
    title: "Software Supply Chain Security",
    body: "Dependency hygiene, lockfiles, scanning, and provenance awareness.",
  },
  {
    code: "11",
    title: "Security Automation",
    body: "Repeatable checks and guardrails that reduce manual drift.",
  },
  {
    code: "12",
    title: "Monitoring and Detection",
    body: "Logging, alerting, and SIEM-oriented telemetry patterns for operational visibility.",
  },
  {
    code: "13",
    title: "Secure CI/CD",
    body: "Protected pipelines, signed artifacts where appropriate, and controlled promotion paths.",
  },
  {
    code: "14",
    title: "Security Engineering",
    body: "Threat-aware design, control selection, and verification as part of system delivery.",
  },
];

export default function SecurityPage() {
  return (
    <>
      <PageHero
        index="SEC"
        label="PRACTICE"
        title="Security"
        description="Security is part of how we engineer. Controls belong in design, delivery, and operations."
        crumbs={[{ label: "Home", href: "/" }, { label: "Security" }]}
        identity="control"
      />
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-4" variant="left">
              <p className="tech-label text-signal">ENGINEERING DISCIPLINE</p>
              <h2 className="font-display mt-3 text-2xl md:text-3xl">
                Security is integrated into our engineering lifecycle.
              </h2>
              <p className="mt-4 text-ink-600">
                This page describes practices we apply in delivery. It is not a compliance claim and
                does not list certifications.
              </p>
              <div className="mt-8">
                <Button href="/contact" variant="secondary">
                  Discuss a security-minded engagement
                </Button>
              </div>
            </Reveal>
            <Reveal className="lg:col-span-8" variant="right">
              <SystemFrame className="overflow-hidden">
                {practices.map((layer, index) => (
                  <article
                    key={layer.code}
                    className="grid gap-3 border-b border-chalk-200 p-5 last:border-b-0 md:grid-cols-[4rem_1fr]"
                    style={{ paddingLeft: `${1.25 + Math.min(index, 4) * 0.35}rem` }}
                  >
                    <p className="font-mono text-xs text-signal">{layer.code}</p>
                    <div>
                      <h2 className="font-display text-xl text-ink-950">{layer.title}</h2>
                      <p className="mt-2 text-sm text-ink-600">{layer.body}</p>
                    </div>
                  </article>
                ))}
              </SystemFrame>
            </Reveal>
          </div>
        </Container>
      </Section>
      <CtaBand title="Need security integrated into delivery?" />
    </>
  );
}
