import { PageHero } from "@/components/layout/PageHero";
import { PersonProfile } from "@/components/people/PersonProfile";
import { PlaceholderNotice } from "@/components/ui/PlaceholderNotice";
import { Container, Section } from "@/components/ui/Section";
import { SystemFrame } from "@/components/visual/SystemFrame";
import { content } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Leadership",
  description: "Leadership at Avero Technologies.",
  path: "/about/leadership",
});

export default async function LeadershipPage() {
  const [seats, people] = await Promise.all([
    content.getLeadershipSeats(),
    content.getPeople(),
  ]);

  const peopleBySlug = new Map(people.map((p) => [p.slug, p]));

  /** One person may hold multiple seats. Never render the same person twice. */
  const byPerson = new Map<
    string,
    { person: (typeof people)[number] | null; titles: string[]; sortOrder: number }
  >();

  for (const seat of seats.slice().sort((a, b) => a.sortOrder - b.sortOrder)) {
    const key = seat.personSlug ?? `vacant-${seat.seatId}`;
    const existing = byPerson.get(key);
    if (existing) {
      existing.titles.push(seat.title);
    } else {
      byPerson.set(key, {
        person: seat.personSlug ? peopleBySlug.get(seat.personSlug) ?? null : null,
        titles: [seat.title],
        sortOrder: seat.sortOrder,
      });
    }
  }

  const rows = [...byPerson.values()].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <>
      <PageHero
        index="LDR"
        label="ORGANIZATION"
        title="Leadership"
        description="Roles and people as they exist today."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Leadership" },
        ]}
        identity="organization"
      />
      <Section>
        <Container>
          <SystemFrame className="overflow-hidden">
            <ul>
              {rows.map((row) =>
                row.person ? (
                  <li key={row.person.slug}>
                    <PersonProfile person={row.person} titles={row.titles} />
                  </li>
                ) : (
                  <li
                    key={`vacant-${row.titles.join("-")}`}
                    className="border-b border-chalk-200 px-5 py-6 last:border-0"
                  >
                    <p className="font-display text-xl text-ink-950">Seat reserved</p>
                    <ul className="mt-2 space-y-1">
                      {row.titles.map((title) => (
                        <li key={title} className="tech-label text-ink-600">
                          {title}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-sm text-ink-400">Public profile pending approval.</p>
                  </li>
                ),
              )}
            </ul>
          </SystemFrame>
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
