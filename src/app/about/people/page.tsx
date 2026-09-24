import { PageHero } from "@/components/layout/PageHero";
import { PersonProfile } from "@/components/people/PersonProfile";
import { PlaceholderNotice } from "@/components/ui/PlaceholderNotice";
import { Container, Section } from "@/components/ui/Section";
import { SystemFrame } from "@/components/visual/SystemFrame";
import { content } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import type { Person } from "@/types/content";

export const metadata = buildMetadata({
  title: "People",
  description: "Public team profiles at Avero Technologies.",
  path: "/about/people",
});

const groupOrder: Array<{ key: string; label: string; match: (p: Person) => boolean }> = [
  {
    key: "leadership",
    label: "Leadership",
    match: (p) => p.showOnLeadership || p.leadershipLevel === "c-level" || p.leadershipLevel === "founder",
  },
  { key: "engineering", label: "Engineering", match: (p) => p.team === "engineering" },
  { key: "cloud", label: "Cloud", match: (p) => p.team === "cloud" },
  { key: "platform", label: "Platform", match: (p) => p.team === "platform" },
  { key: "security", label: "Security", match: (p) => p.team === "security" },
  { key: "ai", label: "AI", match: (p) => p.team === "ai" },
  { key: "data", label: "Data", match: (p) => p.team === "data" },
  { key: "labs", label: "Research", match: (p) => p.team === "labs" },
  {
    key: "corporate",
    label: "Operations",
    match: (p) => p.team === "corporate" || p.team === null,
  },
];

export default async function PeoplePage() {
  const people = await content.getPeople();
  const used = new Set<string>();

  const groups = groupOrder
    .map((group) => {
      const members = people.filter((p) => {
        if (used.has(p.slug)) return false;
        if (!group.match(p)) return false;
        used.add(p.slug);
        return true;
      });
      return { ...group, members };
    })
    .filter((g) => g.members.length > 0);

  return (
    <>
      <PageHero
        index="PPL"
        label="ORGANIZATION"
        title="People"
        description="Public profiles for approved team members."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "People" },
        ]}
        identity="organization"
      />
      <Section>
        <Container>
          {people.length === 0 ? (
            <SystemFrame className="p-6 md:p-8">
              <PlaceholderNotice title="No public team profiles yet">
                When individuals opt into a public profile, they appear here with role and approved
                biography only.
              </PlaceholderNotice>
            </SystemFrame>
          ) : (
            <div className="space-y-12">
              {groups.map((group) => (
                <div key={group.key}>
                  <p className="tech-label mb-4">{group.label}</p>
                  <SystemFrame className="overflow-hidden">
                    <ul>
                      {group.members.map((person) => (
                        <li key={person.slug}>
                          <PersonProfile person={person} />
                        </li>
                      ))}
                    </ul>
                  </SystemFrame>
                </div>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
