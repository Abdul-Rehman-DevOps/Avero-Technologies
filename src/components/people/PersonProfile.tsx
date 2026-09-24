import Image from "next/image";
import type { Person } from "@/types/content";

type Props = {
  person: Person;
  titles?: string[];
  className?: string;
};

export function PersonProfile({ person, titles, className = "" }: Props) {
  const extraTitles = (titles ?? []).filter(
    (title) => title !== person.roleTitle && title !== person.displayName,
  );

  return (
    <article
      className={[
        "grid gap-5 border-b border-chalk-200 px-5 py-6 last:border-0 md:grid-cols-[7.5rem_1fr] md:gap-6",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="w-24 shrink-0 md:w-[7.5rem]">
        {person.imagePublic ? (
          <Image
            src={person.imagePublic}
            alt={`${person.displayName}, ${person.roleTitle}`}
            width={240}
            height={240}
            className="person-photo w-full border border-chalk-200"
            priority={person.showOnLeadership}
          />
        ) : (
          <div
            className="person-photo flex w-full items-center justify-center border border-chalk-200 font-mono text-xs tracking-[0.14em] text-ink-400 uppercase"
            aria-hidden
          >
            {person.displayName
              .split(" ")
              .map((p) => p[0])
              .join("")
              .slice(0, 2)}
          </div>
        )}
      </div>

      <div className="min-w-0">
        <p className="tech-label text-signal">{person.roleTitle}</p>
        <h2 className="font-display mt-2 text-xl text-ink-950 md:text-2xl">{person.displayName}</h2>
        {extraTitles.length ? (
          <ul className="mt-2 space-y-1">
            {extraTitles.map((title) => (
              <li key={title} className="text-sm text-ink-700">
                {title}
              </li>
            ))}
          </ul>
        ) : null}
        {person.expertise.length ? (
          <p className="tech-label mt-3 text-ink-400">{person.expertise.join(" · ")}</p>
        ) : null}
        {person.bioPublic ? (
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-600">{person.bioPublic}</p>
        ) : (
          <p className="mt-4 text-sm text-ink-400">
            Public biography pending. No education, awards, or prior roles are invented here.
          </p>
        )}
      </div>
    </article>
  );
}
