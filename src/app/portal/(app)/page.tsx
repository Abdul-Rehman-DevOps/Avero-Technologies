import { getSession } from "@/lib/auth/session";
import { getAnnouncements, getDirectory } from "@/lib/portal/data";

export default async function PortalDashboardPage() {
  const session = await getSession();
  const [announcements, directory] = await Promise.all([getAnnouncements(), getDirectory()]);
  const latest = announcements.slice(0, 3);

  return (
    <div className="space-y-10">
      <div>
        <p className="tech-label text-signal">Dashboard</p>
        <h1 className="font-display mt-2 text-3xl text-ink-950 md:text-4xl">
          Welcome back, {session?.name.split(" ")[0]}
        </h1>
        <p className="mt-3 max-w-2xl text-ink-600">
          Internal updates, people directory, and company announcements for Avero Technologies
          employees.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Role", value: session?.title ?? "—" },
          { label: "Department", value: session?.department ?? "—" },
          { label: "Directory", value: `${directory.length} people` },
        ].map((item) => (
          <div key={item.label} className="border border-chalk-200 bg-paper p-5">
            <p className="tech-label">{item.label}</p>
            <p className="mt-2 font-display text-xl text-ink-950">{item.value}</p>
          </div>
        ))}
      </div>

      <section>
        <div className="mb-4 flex items-end justify-between gap-4">
          <h2 className="font-display text-2xl">Latest announcements</h2>
          <a href="/portal/announcements" className="font-mono text-[11px] text-arc no-underline">
            View all →
          </a>
        </div>
        <ul className="divide-y divide-chalk-200 border border-chalk-200 bg-paper">
          {latest.map((item) => (
            <li key={item.id} className="px-5 py-4">
              <p className="font-mono text-[10px] tracking-[0.12em] text-ink-400 uppercase">
                {item.date} · {item.category}
              </p>
              <p className="mt-1 font-medium text-ink-950">{item.title}</p>
              <p className="mt-1 text-sm text-ink-600">{item.summary}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
