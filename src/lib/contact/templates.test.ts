import { describe, expect, it } from "vitest";
import {
  contactAcknowledgementEmail,
  newsletterConfirmationEmail,
} from "@/lib/contact/templates";

describe("email templates", () => {
  it("builds a contact acknowledgement with html and text", () => {
    const mail = contactAcknowledgementEmail({
      name: "Alex Rivera",
      intent: "project",
      lookingToBuild: "Cloud landing zone",
    });
    expect(mail.subject).toContain("We received your message");
    expect(mail.text).toContain("Hi Alex,");
    expect(mail.text).toContain("Project discussion");
    expect(mail.text).toContain("Cloud landing zone");
    expect(mail.html).toContain("Hi Alex,");
    expect(mail.html).toContain("Project discussion");
    expect(mail.html).toContain("Cloud landing zone");
    expect(mail.html).toContain("contact@averotechnologies.com");
    expect(mail.html).not.toContain("<script");
  });

  it("escapes user content in html", () => {
    const mail = contactAcknowledgementEmail({
      name: "Alex",
      intent: "general",
      lookingToBuild: 'A & B <img src=x onerror=alert(1)>',
    });
    expect(mail.html).toContain("A &amp; B &lt;img");
    expect(mail.html).not.toContain("<img src=x");
  });

  it("builds a newsletter confirmation", () => {
    const mail = newsletterConfirmationEmail("alex@example.com");
    expect(mail.subject).toContain("subscribed");
    expect(mail.text).toContain("alex@example.com");
    expect(mail.html).toContain("alex@example.com");
    expect(mail.html).toContain("You're on the list.");
  });
});
