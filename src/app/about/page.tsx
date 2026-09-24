import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/visual/Reveal";
import { content } from "@/lib/content";
import { media } from "@/lib/media";
import { siteConfig } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About",
  description:
    "Avero Technologies designs and delivers software, cloud, AI, platform, security, and data systems for production workloads.",
  path: "/about",
});

const principles = [
  {
    t: "Clarify before you build",
    d: "We start with constraints, risk, and success criteria so architecture decisions stay grounded.",
  },
  {
    t: "Secure by default",
    d: "Identity, supply chain, and runtime controls belong in the delivery path, not as a late review.",
  },
  {
    t: "Operate what you ship",
    d: "Observability, ownership, and recovery plans ship with the system, not after the first incident.",
  },
  {
    t: "Depth across disciplines",
    d: "AI, software, cloud, platform, security, and data work as one system instead of disconnected vendors.",
  },
];

const facts = [
  { label: "Focus", value: "Production systems engineering" },
  { label: "Domains", value: "AI, software, cloud, platform, security, data" },
  { label: "Support", value: siteConfig.email },
  { label: "Phone", value: siteConfig.phoneDisplay },
];

export default async function AboutPage() {
  const [seats, people] = await Promise.all([
    content.getLeadershipSeats(),
    content.getPeople(),
  ]);
  const peopleBySlug = new Map(people.map((p) => [p.slug, p]));
  const leaders = seats
    .slice()
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((seat) => ({
      seat,
      person: seat.personSlug ? peopleBySlug.get(seat.personSlug) ?? null : null,
    }))
    .filter((row) => row.person);

  return (
    <>
      <PageHero
        mediaKey="team"
        label="Company"
        title="Avero Technologies"
        description="We help organizations design, secure, and operate the systems their products depend on."
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <Reveal className="lg:col-span-6" variant="left">
              <p className="tech-label text-signal">Who we are</p>
              <h2 className="font-display mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                {siteConfig.tagline}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-600">
                Avero is a technology engineering company. We build software platforms, cloud
                foundations, AI delivery systems, and security controls that stay operable after
                launch.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {facts.map((fact) => (
                  <div key={fact.label} className="rounded-2xl border border-chalk-200 bg-paper p-4">
                    <p className="tech-label">{fact.label}</p>
                    <p className="mt-2 text-sm font-medium text-ink-950">{fact.value}</p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal className="lg:col-span-6" variant="right">
              <div className="media-frame aspect-[5/4] shadow-lift">
                <Image
                  src={media.office.src}
                  alt={media.office.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 100vw, 50vw"
                />
              </div>
            </Reveal>
          </div>

          {leaders.length ? (
            <Reveal className="mt-16">
              <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="tech-label text-signal">Leadership</p>
                  <h2 className="font-display mt-2 text-2xl font-bold text-ink-950 md:text-3xl">
                    CEO and technology leadership
                  </h2>
                </div>
                <Link
                  href="/about/leadership"
                  className="text-sm font-semibold text-signal no-underline hover:underline"
                >
                  Full profiles →
                </Link>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                {leaders.map(({ seat, person }, i) =>
                  person ? (
                    <Link
                      key={seat.seatId}
                      href="/about/leadership"
                      className="group flex gap-4 rounded-3xl border border-chalk-200 bg-paper p-4 no-underline shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-signal/35 hover:shadow-lift"
                    >
                      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-chalk-100">
                        {person.imagePublic ? (
                          <Image
                            src={person.imagePublic}
                            alt=""
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="96px"
                            priority={i < 2}
                          />
                        ) : null}
                      </div>
                      <div className="min-w-0 self-center">
                        <p className="tech-label text-signal">{seat.title}</p>
                        <p className="font-display mt-1 text-lg font-semibold text-ink-950">
                          {person.roleTitle === "CEO" ? person.roleTitle : person.displayName}
                        </p>
                        <p className="mt-1 text-sm text-ink-500">
                          {person.roleTitle === "CEO" ? person.displayName : person.roleTitle}
                        </p>
                      </div>
                    </Link>
                  ) : null,
                )}
              </div>
            </Reveal>
          ) : null}

          <div className="mt-16 grid gap-4 md:grid-cols-2">
            {principles.map((p, i) => (
              <Reveal key={p.t} delay={i * 60}>
                <article className="surface-card h-full p-6">
                  <p className="tech-label text-signal">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="font-display mt-3 text-xl font-semibold text-ink-950">{p.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">{p.d}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14">
            <p className="tech-label mb-4">Explore</p>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                ["/about/leadership", "Leadership", "CEO and technology leadership"],
                ["/about/people", "People", "Public profiles"],
                ["/engineering", "Engineering", "How we deliver"],
                ["/security", "Security", "Security posture"],
                ["/careers", "Careers", "Open roles"],
                ["/contact", "Talk to us", "Ask a question or share an idea"],
              ].map(([href, label, hint]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="flex items-center justify-between rounded-2xl border border-chalk-200 bg-paper px-5 py-4 no-underline transition-all hover:-translate-y-0.5 hover:border-signal/40 hover:shadow-soft"
                  >
                    <span>
                      <span className="block font-display text-lg font-semibold text-ink-950">
                        {label}
                      </span>
                      <span className="text-sm text-ink-600">{hint}</span>
                    </span>
                    <span className="text-signal" aria-hidden>
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="mt-10">
            <Button href="/contact">Talk to us</Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
