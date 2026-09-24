import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Employee Portal",
  description: "Avero Technologies employee portal.",
  path: "/portal",
  noIndex: true,
});

export default function PortalRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-dvh bg-chalk-50">{children}</div>;
}
