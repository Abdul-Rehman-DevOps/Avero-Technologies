import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Section";
import type { MediaKey } from "@/lib/media";
import { media } from "@/lib/media";

type Crumb = { label: string; href?: string };

type PageHeroProps = {
  title: string;
  description?: string;
  crumbs?: Crumb[];
  mediaKey?: MediaKey;
  index?: string;
  label?: string;
  identity?: string;
};

export function PageHero({
  title,
  description,
  crumbs,
  mediaKey = "office",
  label,
}: PageHeroProps) {
  const shot = media[mediaKey];

  return (
    <section className="page-hero relative overflow-hidden border-b border-chalk-200">
      <div className="absolute inset-0">
        <Image
          src={shot.src}
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Keep photo visible on the right; soft readable wash on the left for type */}
        <div className="page-hero__veil" aria-hidden />
      </div>
      <Container className="relative py-16 md:py-20 lg:py-24">
        <div className="max-w-3xl rounded-3xl bg-paper/75 p-6 shadow-[0_12px_40px_rgb(7_17_31/0.08)] backdrop-blur-md md:bg-paper/70 md:p-8">
          {crumbs?.length ? (
            <nav aria-label="Breadcrumb" className="mb-5">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-ink-600">
                {crumbs.map((c, i) => (
                  <li key={`${c.label}-${i}`} className="flex items-center gap-2">
                    {i > 0 ? <span aria-hidden="true">/</span> : null}
                    {c.href ? (
                      <Link href={c.href} className="no-underline hover:text-signal">
                        {c.label}
                      </Link>
                    ) : (
                      <span className="text-ink-950">{c.label}</span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}
          {label ? <p className="tech-label text-signal">{label}</p> : null}
          <h1 className="font-display mt-3 text-4xl font-bold tracking-tight text-ink-950 md:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-5 text-lg leading-relaxed text-ink-700">{description}</p>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
