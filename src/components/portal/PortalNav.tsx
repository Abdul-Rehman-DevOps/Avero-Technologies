"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { href: "/portal", label: "Dashboard", exact: true },
  { href: "/portal/directory", label: "Directory" },
  { href: "/portal/announcements", label: "Announcements" },
];

export function PortalNav({
  user,
}: {
  user: { name: string; role: string; title: string };
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/portal/login");
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-6 p-4">
      <nav aria-label="Portal" className="flex flex-row gap-1 overflow-x-auto lg:flex-col">
        {links.map((link) => {
          const active = link.exact ? pathname === link.href : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`whitespace-nowrap rounded-lg px-3 py-2.5 text-sm no-underline transition-colors ${
                active
                  ? "bg-signal-subtle font-semibold text-signal"
                  : "text-ink-700 hover:bg-chalk-100"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-3 border-t border-chalk-200 pt-4">
        <div>
          <p className="text-sm font-semibold text-ink-950">{user.name}</p>
          <p className="text-xs text-ink-600">{user.title}</p>
          <p className="mt-1 font-mono text-[10px] tracking-[0.1em] text-ink-400 uppercase">
            {user.role}
          </p>
        </div>
        <button
          type="button"
          onClick={logout}
          className="min-h-10 w-full rounded-lg border border-chalk-200 px-3 text-sm text-ink-700 transition-colors hover:border-signal hover:text-signal"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
