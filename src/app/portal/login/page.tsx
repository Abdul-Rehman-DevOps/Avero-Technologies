import { redirect } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { LoginForm } from "@/components/portal/LoginForm";
import { getSession } from "@/lib/auth/session";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Portal sign in",
  description: "Sign in to the Avero Technologies employee portal.",
  path: "/portal/login",
  noIndex: true,
});

export default async function PortalLoginPage() {
  const session = await getSession();
  if (session) {
    redirect("/portal");
  }

  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden px-4 py-16">
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(ellipse at 20% 10%, rgba(13,143,156,0.12), transparent 45%), radial-gradient(ellipse at 90% 80%, rgba(7,17,31,0.08), transparent 40%)",
        }}
      />
      <div className="relative w-full max-w-md border border-chalk-200 bg-paper p-8 shadow-[0_20px_60px_rgba(10,18,32,0.08)]">
        <Logo markClassName="h-11 w-11" />
        <p className="mt-4 font-mono text-[10px] tracking-[0.16em] text-ink-400 uppercase">
          Employee Portal
        </p>
        <h1 className="font-display mt-6 text-2xl text-ink-950">Sign in</h1>
        <p className="mt-2 text-sm text-ink-600">
          Sign in with your Avero Technologies work account.
        </p>
        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
