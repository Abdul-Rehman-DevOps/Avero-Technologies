import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { PlaceholderNotice } from "@/components/ui/PlaceholderNotice";
import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/visual/Reveal";
import { content } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Leadership",
  description: "Leadership at Avero Technologies: CEO and Chief Technology Officer.",
  path: "/about/leadership",
});

export default async function LeadershipPage() {
  const [seats, people] = await Promise.all([
    content.getLeadershipSeats(),
    content.getPeople(),
  ]);

  const peopleBySlug = new Map(people.map((p) => [p.slug, p]));

  const rows = seats
    .slice()
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((seat) => ({
      seat,
      person: seat.personSlug ? peopleBySlug.get(seat.personSlug) ?? null : null,
    }));

  return (
    <>
      <PageHero
        mediaKey="team"
        label="Leadership"
        title="People who lead Avero"
        description="Executive leadership focused on client outcomes and production engineering."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Leadership" },
        ]}
      />
      <Section>
        <Container>
          <div className="grid gap-8 md:grid-cols-2">
            {rows.map(({ seat, person }, i) =>
              person ? (
                <Reveal
                  key={seat.seatId}
                  delay={i * 90}
                  variant={i % 2 === 0 ? "left" : "right"}
                >
                  <article className="group surface-card overflow-hidden p-0 transition-shadow duration-300 hover:shadow-lift">
                    <div className="relative aspect-[4/5] overflow-hidden bg-chalk-100 sm:aspect-[5/6]">
                      {person.imagePublic ? (
                        <Image
                          src={person.imagePublic}
                          alt={`${person.displayName}, ${seat.title}`}
                          fill
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                          sizes="(max-width:768px) 100vw, 50vw"
                          priority={i < 2}
                        />
                      ) : null}
                      <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgb(7_17_31/0.88))] p-6 pt-24">
                        <p className="tech-label text-signal">{person.roleTitle}</p>
                        <h2 className="font-display mt-2 text-2xl font-bold text-white md:text-3xl">
                          {person.displayName}
                        </h2>
                        <p className="mt-1 text-sm text-white/70">{seat.title}</p>
                      </div>
                    </div>
                    <div className="p-6">
                      {person.expertise.length ? (
                        <p className="text-xs tracking-wide text-ink-400 uppercase">
                          {person.expertise.join(" · ")}
                        </p>
                      ) : null}
                      {person.bioPublic ? (
                        <p className="mt-3 text-sm leading-relaxed text-ink-600">
                          {person.bioPublic}
                        </p>
                      ) : null}
                    </div>
                  </article>
                </Reveal>
              ) : (
                <div
                  key={seat.seatId}
                  className="rounded-3xl border border-dashed border-chalk-200 p-6"
                >
                  <p className="font-display text-xl text-ink-950">Seat reserved</p>
                  <p className="mt-2 text-sm text-ink-500">{seat.title}</p>
                </div>
              ),
            )}
          </div>

          <Reveal className="mt-10">
            <p className="text-sm text-ink-500">
              See all public profiles on the{" "}
              <Link href="/about/people" className="font-semibold text-signal no-underline hover:underline">
                People
              </Link>{" "}
              page.
            </p>
          </Reveal>

          {!people.length ? (
            <div className="mt-8">
              <PlaceholderNotice title="Leadership profiles pending">
                Seats can exist before biographies are approved for publication.
              </PlaceholderNotice>
            </div>
          ) : null}
        </Container>
      </Section>
    </>
  );
}
