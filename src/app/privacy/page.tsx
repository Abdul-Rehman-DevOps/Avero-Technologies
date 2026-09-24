import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Container, Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "Privacy Policy for the Avero Technologies website and contact intake.",
  path: "/privacy",
});

const effectiveDate = "16 September 2026";

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        index="LEG"
        label="LEGAL"
        title="Privacy Policy"
        description={`Effective ${effectiveDate}. How Avero Technologies handles personal data on this website.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
        identity="default"
      />
      <Section>
        <Container className="max-w-3xl">
          <div className="prose-legal">
            <p>
              This Privacy Policy explains how {siteConfig.legalName} (“Avero”, “we”, “us”) collects
              and uses personal data when you use our website and contact channels. It is written for
              clarity for website visitors. Jurisdiction-specific requirements may require additional
              notices for certain processing activities.
            </p>

            <h2>1. Controller</h2>
            <p>
              {siteConfig.legalName}
              <br />
              Email: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              <br />
              Phone: <a href={`tel:${siteConfig.phoneTel}`}>{siteConfig.phoneDisplay}</a>
            </p>

            <h2>2. Data we collect</h2>
            <h3>Contact messages</h3>
            <p>When you submit the contact form or email us, we may process:</p>
            <ul>
              <li>Name, work email, organization, and role</li>
              <li>Project description, timeline preferences, and related message content</li>
              <li>Technical metadata such as submission time and security/rate-limit signals</li>
            </ul>
            <h3>Technical and security logs</h3>
            <p>
              Servers may process IP address, user agent, request path, and similar logs needed to
              operate, secure, and debug the site. We do not use the contact form to request passwords,
              payment card data, or government ID numbers.
            </p>

            <h2>3. Purposes and legal bases</h2>
            <ul>
              <li>
                <strong>Respond to inquiries and evaluate potential engagements</strong> — legitimate
                interests / steps prior to contract, as applicable.
              </li>
              <li>
                <strong>Secure and operate the website</strong> — legitimate interests in integrity and
                availability; legal obligations where applicable.
              </li>
              <li>
                <strong>Improve site reliability</strong> — limited technical diagnostics; we do not
                currently run third-party advertising trackers on this site.
              </li>
            </ul>

            <h2>4. Sharing</h2>
            <p>
              We do not sell personal data. We may share data with service providers who process it on
              our instructions (for example email delivery or hosting), and when required by law or to
              protect rights, safety, and security. Providers are expected to protect data
              appropriately.
            </p>

            <h2>5. Retention</h2>
            <p>
              Contact submissions are retained as long as needed to respond and manage follow-up, then
              deleted or archived according to internal retention practice, unless a longer period is
              required for legal claims or compliance. Server logs are retained for a limited
              operational window.
            </p>

            <h2>6. Security</h2>
            <p>
              We apply reasonable technical and organizational measures (HTTPS, security headers,
              validation, and rate limiting on intake). No method of transmission or storage is
              completely secure. Do not send secrets or highly sensitive personal data through website
              forms.
            </p>

            <h2>7. International transfers</h2>
            <p>
              If we use processors or infrastructure outside your country, data may be transferred
              internationally. Where required, we rely on appropriate safeguards offered by those
              providers or contractual measures.
            </p>

            <h2>8. Your rights</h2>
            <p>
              Depending on your location, you may have rights to access, correct, delete, restrict, or
              object to certain processing, and to lodge a complaint with a supervisory authority.
              Contact us at <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> to exercise
              applicable rights. We may need to verify your request.
            </p>

            <h2>9. Children</h2>
            <p>
              This website is directed to business and professional audiences. We do not knowingly
              collect personal data from children.
            </p>

            <h2>10. Cookies</h2>
            <p>
              See our <Link href="/cookies">Cookie Policy</Link> for details on cookies and similar
              technologies.
            </p>

            <h2>11. Changes</h2>
            <p>
              We may update this Policy. The effective date at the top will change when we publish
              material revisions.
            </p>

            <h2>12. Contact</h2>
            <p>
              Privacy questions: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
