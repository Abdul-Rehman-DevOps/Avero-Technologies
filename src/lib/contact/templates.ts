import { siteConfig } from "@/lib/site";

type ContactAckInput = {
  name: string;
  intent: string;
  lookingToBuild: string;
};

function greeting(name: string): string {
  const first = name.trim().split(/\s+/)[0];
  return first ? `Hi ${first},` : "Hi,";
}

export function contactAcknowledgementEmail(input: ContactAckInput) {
  const subject = `We received your message — ${siteConfig.legalName}`;
  const text = [
    greeting(input.name),
    "",
    "Thank you for contacting Avero Technologies. We received your message and will reply with a clear next step.",
    "",
    "Summary",
    `• Intent: ${input.intent}`,
    `• Topic: ${input.lookingToBuild}`,
    "",
    "We usually respond within one business day. If your note is urgent, reply to this email or call us:",
    `• ${siteConfig.phoneDisplay}`,
    `• ${siteConfig.phoneSecondaryDisplay}`,
    "",
    "—",
    siteConfig.legalName,
    siteConfig.email,
    siteConfig.url,
  ].join("\n");

  return { subject, text };
}

export function newsletterConfirmationEmail(email: string) {
  const subject = `You're subscribed — ${siteConfig.legalName}`;
  const text = [
    "Hi,",
    "",
    `You're on the Avero Technologies list (${email}).`,
    "",
    "We'll share occasional notes on engineering, architecture, and delivery — no spam, and you can unsubscribe by replying to any message.",
    "",
    "—",
    siteConfig.legalName,
    siteConfig.email,
    siteConfig.url,
  ].join("\n");

  return { subject, text };
}

export function newsletterTeamNotifyEmail(email: string, source?: string) {
  const subject = `[Avero newsletter] New subscriber`;
  const text = [
    "New newsletter subscription",
    "",
    `Email: ${email}`,
    `Source: ${source ?? "site"}`,
    `Time: ${new Date().toISOString()}`,
  ].join("\n");

  return { subject, text };
}
