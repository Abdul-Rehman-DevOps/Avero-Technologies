import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Container, Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Terms of Service",
  description: "Terms of Service for the Avero Technologies website.",
  path: "/terms",
});

const effectiveDate = "16 September 2026";

export default function TermsPage() {
  return (
    <>
      <PageHero
        label="Legal"
        title="Terms of Service"
        description={`Effective ${effectiveDate}. These terms govern use of the Avero Technologies website.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "Terms of Service" }]}
      />
      <Section>
        <Container className="max-w-3xl">
          <div className="prose-legal">
            <p>
              These Terms of Service (“Terms”) apply to your access and use of the website operated by{" "}
              {siteConfig.legalName} (“Avero”, “we”, “us”). By using this website, you agree to these
              Terms. If you do not agree, do not use the site.
            </p>

            <h2>1. Who we are</h2>
            <p>
              {siteConfig.legalName} provides technology engineering services. This website is an
              informational and contact channel. It does not by itself create a client engagement,
              partnership, employment relationship, or regulated service offering.
            </p>

            <h2>2. Informational content</h2>
            <p>
              Content on this site, including capability descriptions, services, solutions, technology
              lists, insights, and organizational information, is provided for general information. It
              is not legal, security, financial, or professional advice. Technology names and
              platforms mentioned indicate familiarity in delivery work and are not partnership or
              endorsement claims unless we explicitly state otherwise in a signed agreement.
            </p>

            <h2>3. No fabricated claims</h2>
            <p>
              We do not present unverified client logos, certifications, metrics, or testimonials on
              this site. Case studies and credentials appear only when approved and accurate. Do not
              treat placeholder or structural pages as evidence of completed engagements.
            </p>

            <h2>4. Contact</h2>
            <p>
              Submitting the contact form or emailing us does not create a contract. Any engagement
              begins only when both parties execute a written agreement covering scope, fees,
              confidentiality, and other commercial terms. Do not submit passwords, secrets, personal
              data of third parties, or confidential customer information through website forms.
            </p>

            <h2>5. Acceptable use</h2>
            <ul>
              <li>Do not attempt to disrupt, probe, or overload the site or its systems.</li>
              <li>Do not submit unlawful, abusive, or deceptive content.</li>
              <li>Do not scrape the site in a way that impairs availability or violates applicable law.</li>
              <li>Do not misrepresent your identity or affiliation when contacting us.</li>
            </ul>

            <h2>6. Intellectual property</h2>
            <p>
              Site design, text, diagrams, logos, and other materials are owned by Avero or used
              under license. You may view and share links for personal or internal evaluation. You may
              not copy, republish, or commercially exploit site content without prior written
              permission, except where fair use or other legal exceptions apply.
            </p>

            <h2>7. Third-party links and names</h2>
            <p>
              The site may reference third-party products, standards, or websites. Those references do
              not imply endorsement. Third-party sites have their own terms and privacy practices.
            </p>

            <h2>8. Disclaimer of warranties</h2>
            <p>
              The website is provided “as is” and “as available.” To the fullest extent permitted by
              law, we disclaim warranties of merchantability, fitness for a particular purpose, and
              non-infringement. We do not warrant uninterrupted or error-free operation.
            </p>

            <h2>9. Limitation of liability</h2>
            <p>
              To the fullest extent permitted by law, Avero is not liable for indirect, incidental,
              special, consequential, or punitive damages arising from use of the website or reliance
              on its content. Our aggregate liability related to website use is limited to USD 100 or
              the minimum amount required by applicable law, whichever is greater.
            </p>

            <h2>10. Privacy</h2>
            <p>
              Personal data submitted through the site is handled as described in our{" "}
              <Link href="/privacy">Privacy Policy</Link>. Cookie use is described in our{" "}
              <Link href="/cookies">Cookie Policy</Link>.
            </p>

            <h2>11. Changes</h2>
            <p>
              We may update these Terms from time to time. The effective date above will change when we
              publish revisions. Continued use after changes constitutes acceptance of the updated
              Terms.
            </p>

            <h2>12. Governing law</h2>
            <p>
              These Terms are governed by the laws applicable in Pakistan, without regard to conflict
              of law rules, except where mandatory consumer protections in your jurisdiction require
              otherwise. Courts in Pakistan have exclusive jurisdiction for disputes arising from
              these Terms, subject to mandatory local rights.
            </p>

            <h2>13. Contact</h2>
            <p>
              Questions about these Terms:{" "}
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> ·{" "}
              <a href={`tel:${siteConfig.phoneTel}`}>{siteConfig.phoneDisplay}</a>
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
