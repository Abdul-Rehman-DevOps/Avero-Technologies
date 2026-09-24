import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { Reveal } from "@/components/visual/Reveal";
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
      <section id="hero" className="hero-plane border-b border-chalk-200">
        <div className="hero-plane__media">
          <Image
            src={media.hero.src}
            alt={media.hero.alt}
            fill
            priority
            quality={70}
            className="hero-ken object-cover"
            sizes="100vw"
          />
        </div>
        <div className="hero-plane__veil" />
        <div className="hero-plane__grid" aria-hidden="true" />
        <div className="hero-plane__glow" aria-hidden="true" />
        <Container className="hero-plane__content flex min-h-[inherit] flex-col justify-end pb-16 pt-28 md:pb-24 md:pt-36">
          <div className="stagger-in max-w-3xl">
            <p className="status-chip">
              <span className="status-chip__dot" aria-hidden="true" />
              Live systems engineering
            </p>
            <p className="mt-7 font-display text-[clamp(3.6rem,12vw,7.8rem)] font-bold leading-[0.86] tracking-[-0.04em] text-white">
              Avero
            </p>
            <p className="mt-3 font-mono text-[11px] font-medium tracking-[0.28em] text-signal uppercase md:text-xs">
              Technologies · Production systems
            </p>
            <h1 className="mt-8 max-w-xl font-display text-2xl font-semibold leading-tight tracking-tight text-white md:text-[2.35rem]">
              Systems built for production.
            </h1>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-white/78 md:text-lg">
              Software, cloud, AI, platforms, security, and data engineered for real production load.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
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

      <section className="signal-marquee py-4">
        <div className="marquee">
          <div className="marquee__track px-5">
            {marqueeItems.map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="whitespace-nowrap font-display text-sm font-semibold tracking-[0.08em] text-white/75"
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

      <section className="border-b border-chalk-200 py-10 md:py-12">
        <Container>
          <Reveal>
            <div className="metric-rail">
              {[
                ["20+", "Service offerings across engineering domains"],
                [`${industries.length}`, "Industries we support"],
                [`${publishedStudies.length}+`, "Published architecture case studies"],
                [jobs.length > 0 ? String(jobs.length) : "Open", "Roles when we are hiring"],
              ].map(([k, v]) => (
                <div key={k} className="metric-rail__item">
                  <p className="font-display text-3xl font-bold tracking-tight text-ink-950 md:text-4xl">
                    {k}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">{v}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <section id="method" className="section-y border-b border-chalk-200">
        <Container>
          <Reveal>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="tech-label text-signal">How we work</p>
                <h2 className="font-display mt-3 max-w-2xl text-3xl font-bold tracking-tight md:text-5xl">
                  One engineering rhythm. Three outcomes.
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-ink-600 md:text-base">
                Immersive delivery across build, secure, and operate — not bolted-on afterthoughts.
              </p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {pillars.map((pillar, i) => (
              <Reveal key={pillar.title} variant={i === 1 ? "scale" : "up"} delay={i * 70}>
                <Link href={pillar.href} className="group block no-underline">
                  <div className="panel-image aspect-[4/5] shadow-lift md:aspect-[4/3]">
                    <Image
                      src={pillar.image.src}
                      alt={pillar.image.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width:1024px) 100vw, 33vw"
                    />
                    <div className="panel-image__veil" aria-hidden />
                    <div className="panel-image__body">
                      <p className="font-mono text-[10px] tracking-[0.18em] text-signal uppercase">
                        0{i + 1}
                      </p>
                      <h3 className="font-display mt-2 text-2xl font-semibold text-white">
                        {pillar.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/75">{pillar.body}</p>
                      <p className="mt-4 text-sm font-semibold text-white transition-transform group-hover:translate-x-1">
                        Explore →
                      </p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section id="services" className="section-y border-b border-chalk-200 bg-chalk-100/50">
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
                  <div className="relative z-[1]">
                    <p className="tech-label text-signal">{service.capability}</p>
                    <h3 className="font-display mt-3 text-xl font-semibold text-ink-950 transition-colors group-hover:text-signal">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-600">{service.summary}</p>
                    <p className="mt-5 text-sm font-semibold text-signal opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100">
                      Open service →
                    </p>
                  </div>
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
                  className="surface-card block px-5 py-5 no-underline"
                >
                  <div className="relative z-[1]">
                    <p className="font-semibold text-ink-950">{industry.title}</p>
                    <p className="mt-1 line-clamp-2 text-sm text-ink-600">{industry.summary}</p>
                  </div>
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
              <div className="media-frame aspect-[16/10] shadow-lift">
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
          <ul className="mt-10 overflow-hidden rounded-3xl border border-chalk-200 bg-paper shadow-soft">
            {publishedStudies.map((study, i) => (
              <li key={study.slug} className="border-b border-chalk-200 last:border-b-0">
                <Reveal delay={i * 50}>
                  <Link
                    href={`/work/${study.slug}`}
                    className="link-row grid gap-3 px-5 py-6 transition-colors hover:bg-signal-subtle/40 md:grid-cols-[4.5rem_1fr_auto] md:items-center md:px-7"
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

      <section id="company" className="band-dark section-y border-b border-white/5">
        <Container className="relative z-[1]">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <Reveal className="lg:col-span-6" variant="left">
              <p className="tech-label text-signal">Company</p>
              <h2 className="font-display mt-3 text-3xl font-bold tracking-tight md:text-5xl">
                Avero Technologies
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">
                We build systems across AI, software, cloud, platform, security, and data with secure
                defaults and operational ownership.
              </p>
              <ul className="mt-7 space-y-2 font-mono text-sm text-white/70">
                <li>{siteConfig.email}</li>
                <li>{siteConfig.phoneDisplay}</li>
                <li>{siteConfig.phoneSecondaryDisplay}</li>
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
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {latestArticles.map((article, i) => (
              <Reveal key={article.slug} delay={(i % 4) * 55}>
                <Link
                  href={`/insights/${article.slug}`}
                  className="surface-card block h-full p-5 no-underline"
                >
                  <div className="relative z-[1]">
                    <p className="tech-label text-signal">{article.category}</p>
                    <h3 className="font-display mt-3 text-lg font-semibold text-ink-950">
                      {article.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm text-ink-600">{article.summary}</p>
                    <p className="mt-4 text-xs font-medium text-ink-400">
                      {article.readingTimeMinutes} min read
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {jobs.length > 0 ? (
        <section className="section-y border-b border-chalk-200 bg-chalk-100/60">
          <Container>
            <Reveal>
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
            </Reveal>
            <ul className="mt-8 divide-y divide-chalk-200 overflow-hidden rounded-3xl border border-chalk-200 bg-paper shadow-soft">
              {jobs.slice(0, 3).map((job, i) => (
                <li key={job.slug}>
                  <Reveal delay={i * 50}>
                    <Link
                      href={`/careers/${job.slug}`}
                      className="flex flex-col gap-1 px-5 py-5 no-underline transition-colors hover:bg-signal-subtle/50 sm:flex-row sm:items-center sm:justify-between"
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
                  </Reveal>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <section className="section-y">
        <Container>
          <Reveal variant="fade">
            <div className="relative overflow-hidden rounded-[2rem] border border-chalk-200 shadow-lift">
              <div className="absolute inset-0">
                <Image src={media.contact.src} alt="" fill className="object-cover" sizes="100vw" />
                <div className="absolute inset-0 bg-[linear-gradient(105deg,rgb(5_11_20/0.94),rgb(5_11_20/0.7)_55%,rgb(13_158_171/0.35))]" />
              </div>
              <div className="relative grid gap-8 p-8 md:grid-cols-2 md:p-12 lg:p-16">
                <div>
                  <p className="tech-label text-signal">Next step</p>
                  <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-white md:text-5xl">
                    Ready to build something that lasts?
                  </h2>
                  <p className="mt-4 max-w-md text-white/75">
                    Send a message and we will reply with a clear next step.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button href="/contact">Talk to us</Button>
                  </div>
                </div>
                <div className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-soft backdrop-blur-[2px]">
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
          </Reveal>
        </Container>
      </section>
    </>
  );
}
