import { describe, expect, it } from "vitest";
import {
  contactAcknowledgementEmail,
  newsletterConfirmationEmail,
} from "@/lib/contact/templates";

describe("email templates", () => {
  it("builds a contact acknowledgement with the sender name", () => {
    const mail = contactAcknowledgementEmail({
      name: "Alex Rivera",
      intent: "project",
      lookingToBuild: "Cloud landing zone",
    });
    expect(mail.subject).toContain("We received your message");
    expect(mail.text).toContain("Hi Alex,");
    expect(mail.text).toContain("Cloud landing zone");
    expect(mail.text).toContain("contact@averotechnologies.com");
  });

  it("builds a newsletter confirmation", () => {
    const mail = newsletterConfirmationEmail("alex@example.com");
    expect(mail.subject).toContain("subscribed");
    expect(mail.text).toContain("alex@example.com");
  });
});
