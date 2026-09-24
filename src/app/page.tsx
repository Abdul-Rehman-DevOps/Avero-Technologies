import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { Reveal } from "@/components/visual/Reveal";
import { ScrollProgress } from "@/components/system/ScrollProgress";
import { content } from "@/lib/content";
import { media } from "@/lib/media";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: siteConfig.name,
  description: siteConfig.description,
  path: "/",
});

const pillars = [
  {
    title: "Build",
    body: "Software, SaaS, and AI systems designed for production traffic.",
    href: "/services",
    image: media.engineering,
  },
  {
    title: "Secure",
    body: "Identity, cloud posture, and delivery controls baked into the path.",
    href: "/security",
    image: media.security,
  },
  {
    title: "Operate",
    body: "Platforms, observability, and reliability that survive day two.",
    href: "/services/platform-engineering",
    image: media.cloud,
  },
];

const capabilities = [
  "AI Systems",
  "Software Engineering",
  "Cloud Architecture",
  "Platform Engineering",
  "DevSecOps",
  "Data Platforms",
  "SRE",
  "Automation",
];

export default async function HomePage() {
  const [services, studies, articles, industries, jobs] = await Promise.all([
    content.getServices(),
    content.getCaseStudies(),
    content.getArticles(),
    content.getIndustries(),
    content.getJobs(),
  ]);

  const featuredServices = [
    "software-engineering",
    "generative-ai-systems",
    "cloud-architecture",
    "platform-engineering",
    "devsecops",
    "data-engineering",
  ]
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const publishedStudies = studies.filter((s) => !s.placeholder).slice(0, 4);
  const latestArticles = articles.slice(0, 4);
  const marqueeItems = [...capabilities, ...capabilities];

  return (
    <>
      <ScrollProgress />
      <section id="hero" className="hero-plane border-b border-chalk-200">
        <div className="hero-plane__media">
          <Image
            src={media.hero.src}
            alt={media.hero.alt}
            fill
            priority
            className="object-cover"
            style={{ animation: "ken 20s ease-out forwards" }}
            sizes="100vw"
          />
        </div>
        <div className="hero-plane__veil" />
        <div className="hero-plane__glow" aria-hidden="true" />
        <Container className="hero-plane__content flex min-h-[inherit] flex-col justify-end pb-16 pt-28 md:pb-24 md:pt-36">
          <div className="stagger-in max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium tracking-wide text-white/90 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
              Engineering for production systems
            </p>
            <p className="mt-6 font-display text-[clamp(3.2rem,11vw,7.2rem)] font-bold leading-[0.88] tracking-tight text-white">
              Avero
            </p>
            <p className="mt-2 text-sm font-semibold tracking-[0.2em] text-white/65 uppercase">
              Technologies
            </p>
            <h1 className="mt-8 font-display text-2xl font-semibold leading-tight text-white md:text-4xl">
              Systems built for production.
            </h1>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-white/80 md:text-lg">
              Software, cloud, AI, platforms, security, and data engineered for real production load.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact" size="lg">
                Talk to us
              </Button>
              <Button href="/work" variant="ghost" size="lg">
                See case studies
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-chalk-200 bg-paper py-5">
        <div className="marquee">
          <div className="marquee__track px-5">
            {marqueeItems.map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="whitespace-nowrap font-display text-sm font-semibold tracking-wide text-ink-400"
              >
                {item}
                <span className="ml-10 text-signal" aria-hidden="true">
                  ◆
                </span>
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-chalk-200 bg-paper py-10">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["20+", "Service offerings across engineering domains"],
              [`${industries.length}`, "Industries we support"],
              [`${publishedStudies.length}+`, "Published architecture case studies"],
              [jobs.length > 0 ? String(jobs.length) : "Open", "Roles when we are hiring"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-2xl border border-chalk-200 bg-chalk-50/80 p-5">
                <p className="font-display text-3xl font-bold text-ink-950">{k}</p>
                <p className="mt-2 text-sm text-ink-600">{v}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="method" className="section-y border-b border-chalk-200">
        <Container>
          <Reveal>
            <p className="tech-label text-signal">How we work</p>
            <h2 className="font-display mt-3 max-w-2xl text-3xl font-bold tracking-tight md:text-5xl">
              One engineering rhythm. Three outcomes.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {pillars.map((pillar, i) => (
              <Reveal key={pillar.title} variant={i === 1 ? "scale" : "up"} delay={i * 60}>
                <Link href={pillar.href} className="group block no-underline">
                  <div className="media-frame aspect-[4/3] shadow-soft">
                    <Image
                      src={pillar.image.src}
                      alt={pillar.image.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width:1024px) 100vw, 33vw"
                    />
                  </div>
                  <h3 className="font-display mt-5 text-2xl font-semibold text-ink-950">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-ink-600">{pillar.body}</p>
                  <p className="mt-3 text-sm font-semibold text-signal transition-transform group-hover:translate-x-1">
                    Explore →
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section id="services" className="section-y border-b border-chalk-200 bg-chalk-100/70">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <p className="tech-label text-signal">Services</p>
              <h2 className="font-display mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                What clients engage us for
              </h2>
              <p className="mt-3 max-w-xl text-ink-600">
                Clear commercial offerings mapped to real engineering domains.
              </p>
            </Reveal>
            <Button href="/services" variant="secondary">
              All services
            </Button>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((service, i) => (
              <Reveal key={service.slug} delay={i * 50}>
                <Link
                  href={`/services/${service.slug}`}
                  className="surface-card group block h-full p-6 no-underline"
                >
                  <p className="tech-label">{service.capability}</p>
                  <h3 className="font-display mt-3 text-xl font-semibold text-ink-950 group-hover:text-signal">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">{service.summary}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section id="industries" className="section-y border-b border-chalk-200">
        <Container>
          <Reveal>
            <p className="tech-label text-signal">Industries</p>
            <h2 className="font-display mt-3 max-w-2xl text-3xl font-bold tracking-tight md:text-4xl">
              Where our systems land
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {industries.slice(0, 8).map((industry, i) => (
              <Reveal key={industry.slug} delay={(i % 4) * 55}>
                <Link
                  href={`/industries/${industry.slug}`}
                  className="block rounded-2xl border border-chalk-200 bg-paper px-5 py-4 no-underline transition-all hover:-translate-y-0.5 hover:border-signal/40 hover:shadow-soft"
                >
                  <p className="font-semibold text-ink-950">{industry.title}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-ink-600">{industry.summary}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section id="work" className="section-y border-b border-chalk-200">
        <Container>
          <div className="grid items-end gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-5" variant="left">
              <p className="tech-label text-signal">Case studies</p>
              <h2 className="font-display mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                Architecture that shipped
              </h2>
              <p className="mt-4 text-ink-600">
                Anonymized engagements with clear problem, architecture, and outcomes.
              </p>
              <div className="mt-6">
                <Button href="/work" variant="secondary">
                  View all
                </Button>
              </div>
            </Reveal>
            <Reveal className="lg:col-span-7" variant="right">
              <div className="media-frame float-soft aspect-[16/10] shadow-lift">
                <Image
                  src={media.delivery.src}
                  alt={media.delivery.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 100vw, 58vw"
                />
              </div>
            </Reveal>
          </div>
          <ul className="mt-10 divide-y divide-chalk-200 border-y border-chalk-200">
            {publishedStudies.map((study, i) => (
              <li key={study.slug}>
                <Reveal delay={i * 50}>
                  <Link
                    href={`/work/${study.slug}`}
                    className="grid gap-3 py-6 no-underline transition-colors hover:bg-chalk-50/80 md:grid-cols-[4rem_1fr_auto] md:items-center"
                  >
                    <span className="tech-label text-signal">{String(i + 1).padStart(2, "0")}</span>
                    <span>
                      <span className="font-display block text-xl font-semibold text-ink-950">
                        {study.title}
                      </span>
                      <span className="mt-1 block text-sm text-ink-600">{study.summary}</span>
                    </span>
                    <span className="font-semibold text-signal" aria-hidden="true">
                      →
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section id="company" className="section-y border-b border-chalk-200 bg-ink-950 text-chalk-50">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <Reveal className="lg:col-span-6" variant="left">
              <p className="text-xs font-semibold tracking-[0.16em] text-signal uppercase">Company</p>
              <h2 className="font-display mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                Avero Technologies
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">
                We build systems across AI, software, cloud, platform, security, and data with secure
                defaults and operational ownership.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-white/70">
                <li>Public email: {siteConfig.email}</li>
                <li>Phone: {siteConfig.phoneDisplay}</li>
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/about">About us</Button>
                <Button href="/careers" variant="ghost">
                  Careers
                </Button>
              </div>
            </Reveal>
            <Reveal className="lg:col-span-6" variant="right">
              <div className="media-frame aspect-[5/4] border-white/10 shadow-lift">
                <Image
                  src={media.team.src}
                  alt={media.team.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 100vw, 50vw"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section id="insights" className="section-y border-b border-chalk-200">
        <Container>
          <Reveal>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="tech-label text-signal">Insights</p>
                <h2 className="font-display mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                  Notes from the field
                </h2>
              </div>
              <Button href="/insights" variant="secondary">
                All insights
              </Button>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {latestArticles.map((article, i) => (
              <Reveal key={article.slug} delay={(i % 4) * 55}>
                <Link
                  href={`/insights/${article.slug}`}
                  className="surface-card block h-full p-5 no-underline"
                >
                  <p className="tech-label">{article.category}</p>
                  <h3 className="font-display mt-3 text-lg font-semibold text-ink-950">
                    {article.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm text-ink-600">{article.summary}</p>
                  <p className="mt-4 text-xs font-medium text-ink-400">
                    {article.readingTimeMinutes} min read
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {jobs.length > 0 ? (
        <section className="section-y border-b border-chalk-200 bg-chalk-100/60">
          <Container>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="tech-label text-signal">Careers</p>
                <h2 className="font-display mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                  Open roles
                </h2>
              </div>
              <Button href="/careers" variant="secondary">
                View careers
              </Button>
            </div>
            <ul className="mt-8 divide-y divide-chalk-200 overflow-hidden rounded-2xl border border-chalk-200 bg-paper">
              {jobs.slice(0, 3).map((job) => (
                <li key={job.slug}>
                  <Link
                    href={`/careers/${job.slug}`}
                    className="flex flex-col gap-1 px-5 py-5 no-underline transition-colors hover:bg-chalk-50 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <span>
                      <span className="block font-display text-lg font-semibold text-ink-950">
                        {job.title}
                      </span>
                      <span className="text-sm text-ink-600">
                        {job.department} · {job.locationType} · {job.employmentType}
                      </span>
                    </span>
                    <span className="text-sm font-semibold text-signal">Apply →</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <section className="section-y">
        <Container>
          <div className="relative overflow-hidden rounded-3xl border border-chalk-200 shadow-lift">
            <div className="absolute inset-0">
              <Image src={media.contact.src} alt="" fill className="object-cover" sizes="100vw" />
              <div className="absolute inset-0 bg-[linear-gradient(100deg,rgb(7_17_31/0.94),rgb(7_17_31/0.72))]" />
            </div>
            <div className="relative grid gap-8 p-8 md:grid-cols-2 md:p-12 lg:p-16">
              <div>
                <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
                  Ready to build something that lasts?
                </h2>
                <p className="mt-4 max-w-md text-white/75">
                  Send a message and we will reply with a clear next step.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href="/contact">Talk to us</Button>
                </div>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-md">
                <p className="text-xs font-semibold tracking-[0.14em] text-white/60 uppercase">
                  Newsletter
                </p>
                <p className="mt-2 text-sm text-white/75">Engineering notes. No spam.</p>
                <div className="mt-4">
                  <NewsletterForm variant="footer" />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
