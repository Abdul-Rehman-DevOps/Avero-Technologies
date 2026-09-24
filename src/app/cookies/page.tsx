import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Container, Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Cookie Policy",
  description: "Cookie Policy for the Avero Technologies website.",
  path: "/cookies",
});

const effectiveDate = "16 September 2026";

export default function CookiesPage() {
  return (
    <>
      <PageHero
        index="LEG"
        label="LEGAL"
        title="Cookie Policy"
        description={`Effective ${effectiveDate}. How this website uses cookies and similar storage.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "Cookie Policy" }]}
      />
      <Section>
        <Container className="max-w-3xl">
          <div className="prose-legal">
            <p>
              This Cookie Policy explains how {siteConfig.legalName} uses cookies and local browser
              storage on this website. It should be read with our{" "}
              <Link href="/privacy">Privacy Policy</Link>.
            </p>

            <h2>1. What we use today</h2>
            <h3>Essential / functional</h3>
            <ul>
              <li>
                <strong>Session cookie (`avero_portal_session`)</strong> — used only after you sign
                in to the Employee Portal. HttpOnly, not used for advertising.
              </li>
              <li>
                <strong>Security and delivery</strong> — standard HTTP connection and hosting
                behaviors required to serve pages securely. These are not advertising cookies.
              </li>
            </ul>
            <h3>Analytics and advertising</h3>
            <p>
              As of the effective date, this production site does not load third-party advertising
              cookies or marketing pixels. If we add analytics later, we will update this Policy and,
              where required, request consent before non-essential cookies run.
            </p>

            <h2>2. Managing preferences</h2>
            <p>
              You can clear localStorage and cookies through your browser settings. Clearing storage
              resets theme preference to system default. Blocking all storage may affect theme
              persistence but not core page access.
            </p>

            <h2>3. Contact</h2>
            <p>
              Questions: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> ·{" "}
              <a href={`tel:${siteConfig.phoneTel}`}>{siteConfig.phoneDisplay}</a>
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
