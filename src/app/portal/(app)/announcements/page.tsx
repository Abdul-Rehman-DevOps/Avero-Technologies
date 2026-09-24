import { getAnnouncements } from "@/lib/portal/data";

export default async function PortalAnnouncementsPage() {
  const announcements = await getAnnouncements();

  return (
    <div className="space-y-8">
      <div>
        <p className="tech-label text-signal">Internal</p>
        <h1 className="font-display mt-2 text-3xl md:text-4xl">Announcements</h1>
        <p className="mt-3 max-w-2xl text-ink-600">
          Company-wide updates for Avero Technologies employees.
        </p>
      </div>

      <ul className="space-y-4">
        {announcements.map((item) => (
          <li key={item.id} className="border border-chalk-200 bg-paper p-5 md:p-6">
            <p className="font-mono text-[10px] tracking-[0.12em] text-ink-400 uppercase">
              {item.date} · {item.category} · {item.author}
            </p>
            <h2 className="font-display mt-2 text-xl text-ink-950 md:text-2xl">{item.title}</h2>
            <p className="mt-3 text-ink-600">{item.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
