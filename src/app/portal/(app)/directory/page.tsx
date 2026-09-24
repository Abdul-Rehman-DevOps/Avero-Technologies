import { getDirectory } from "@/lib/portal/data";

export default async function PortalDirectoryPage() {
  const people = await getDirectory();

  return (
    <div className="space-y-8">
      <div>
        <p className="tech-label text-signal">People</p>
        <h1 className="font-display mt-2 text-3xl md:text-4xl">Directory</h1>
        <p className="mt-3 max-w-2xl text-ink-600">
          Internal employee directory. Contact details are for Avero staff use only.
        </p>
      </div>

      <div className="overflow-x-auto border border-chalk-200 bg-paper">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-chalk-200 bg-chalk-50 font-mono text-[10px] tracking-[0.12em] text-ink-400 uppercase">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Department</th>
              <th className="px-4 py-3 font-medium">Location</th>
              <th className="px-4 py-3 font-medium">Email</th>
            </tr>
          </thead>
          <tbody>
            {people.map((person) => (
              <tr key={person.id} className="border-b border-chalk-200 last:border-0">
                <td className="px-4 py-3 font-medium text-ink-950">{person.name}</td>
                <td className="px-4 py-3 text-ink-600">{person.title}</td>
                <td className="px-4 py-3 text-ink-600">{person.department}</td>
                <td className="px-4 py-3 text-ink-600">{person.location}</td>
                <td className="px-4 py-3">
                  <a href={`mailto:${person.email}`} className="text-arc no-underline hover:text-signal">
                    {person.email}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
