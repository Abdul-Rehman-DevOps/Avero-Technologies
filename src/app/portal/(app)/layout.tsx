import Link from "next/link";
import { redirect } from "next/navigation";
import { PortalNav } from "@/components/portal/PortalNav";
import { getSession } from "@/lib/auth/session";
import { siteConfig } from "@/lib/site";

export default async function PortalAppLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) {
    redirect("/portal/login");
  }

  return (
    <div className="flex min-h-dvh flex-col lg:flex-row">
      <aside className="border-b border-chalk-200 bg-paper lg:w-64 lg:shrink-0 lg:border-b-0 lg:border-r">
        <div className="flex h-[4.25rem] items-center border-b border-chalk-200 px-5">
          <Link href="/portal" className="no-underline">
            <span className="font-display text-lg font-bold text-ink-950">{siteConfig.name}</span>
            <span className="mt-0.5 block font-mono text-[10px] tracking-[0.14em] text-ink-400 uppercase">
              Employee Portal
            </span>
          </Link>
        </div>
        <PortalNav user={{ name: session.name, role: session.role, title: session.title }} />
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-[4.25rem] items-center justify-between gap-4 border-b border-chalk-200 bg-paper px-5 md:px-8">
          <p className="truncate text-sm text-ink-600">
            Signed in as <span className="font-medium text-ink-950">{session.name}</span>
          </p>
          <Link href="/" className="font-mono text-[11px] text-ink-400 no-underline hover:text-signal">
            ← Public site
          </Link>
        </header>
        <div className="flex-1 px-5 py-8 md:px-8 md:py-10">{children}</div>
      </div>
    </div>
  );
}
