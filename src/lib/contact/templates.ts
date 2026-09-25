import { siteConfig } from "@/lib/site";

export type OutboundEmail = {
  subject: string;
  text: string;
  html: string;
};

type ContactAckInput = {
  name: string;
  intent: string;
  lookingToBuild: string;
};

const INTENT_LABELS: Record<string, string> = {
  general: "General inquiry",
  project: "Project discussion",
  partnership: "Partnership",
  careers: "Careers",
};

const BRAND = {
  ink: "#050b14",
  muted: "#5a6a7a",
  line: "#e4e9ee",
  paper: "#ffffff",
  canvas: "#f3f6f8",
  signal: "#0d9eab",
  signalSoft: "#e8f7f9",
} as const;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function firstName(name: string): string {
  const first = name.trim().split(/\s+/)[0];
  return first || "there";
}

function intentLabel(intent: string): string {
  return INTENT_LABELS[intent] ?? intent;
}

function emailShell(options: {
  preheader: string;
  title: string;
  bodyHtml: string;
}): string {
  const { preheader, title, bodyHtml } = options;
  const year = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background:${BRAND.canvas};-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;visibility:hidden;mso-hide:all;">
    ${escapeHtml(preheader)}
  </div>
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:${BRAND.canvas};">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:560px;background:${BRAND.paper};border:1px solid ${BRAND.line};">
          <tr>
            <td style="height:4px;background:${BRAND.signal};font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          <tr>
            <td style="padding:28px 32px 8px 32px;">
              <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:22px;line-height:1.2;letter-spacing:-0.02em;color:${BRAND.ink};">
                ${escapeHtml(siteConfig.name)}
              </p>
              <p style="margin:6px 0 0 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:${BRAND.muted};">
                ${escapeHtml(siteConfig.tagline)}
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 32px 0 32px;">
              <div style="height:1px;background:${BRAND.line};line-height:1px;font-size:1px;">&nbsp;</div>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px 8px 32px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:${BRAND.ink};">
              ${bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:8px 32px 28px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="border-radius:8px;background:${BRAND.signal};">
                    <a href="${escapeHtml(siteConfig.url)}" style="display:inline-block;padding:12px 20px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;">
                      Visit averotechnologies.com
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 28px 32px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
              <div style="height:1px;background:${BRAND.line};line-height:1px;font-size:1px;margin-bottom:20px;">&nbsp;</div>
              <p style="margin:0 0 4px 0;font-size:14px;font-weight:600;color:${BRAND.ink};">${escapeHtml(siteConfig.legalName)}</p>
              <p style="margin:0 0 2px 0;font-size:13px;line-height:1.5;color:${BRAND.muted};">
                <a href="mailto:${escapeHtml(siteConfig.email)}" style="color:${BRAND.signal};text-decoration:none;">${escapeHtml(siteConfig.email)}</a>
              </p>
              <p style="margin:0 0 2px 0;font-size:13px;line-height:1.5;color:${BRAND.muted};">
                <a href="tel:${escapeHtml(siteConfig.phoneTel)}" style="color:${BRAND.muted};text-decoration:none;">${escapeHtml(siteConfig.phoneDisplay)}</a>
                &nbsp;·&nbsp;
                <a href="tel:${escapeHtml(siteConfig.phoneSecondaryTel)}" style="color:${BRAND.muted};text-decoration:none;">${escapeHtml(siteConfig.phoneSecondaryDisplay)}</a>
              </p>
              <p style="margin:16px 0 0 0;font-size:11px;line-height:1.5;color:${BRAND.muted};">
                © ${year} ${escapeHtml(siteConfig.legalName)}. Systems built for production.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function contactAcknowledgementEmail(input: ContactAckInput): OutboundEmail {
  const name = firstName(input.name);
  const intent = intentLabel(input.intent);
  const topic = input.lookingToBuild.trim();
  const subject = `We received your message — ${siteConfig.legalName}`;

  const text = [
    `Hi ${name},`,
    "",
    "Thank you for reaching out to Avero Technologies.",
    "We have received your message and will reply with a clear next step.",
    "",
    "Your submission",
    `Intent: ${intent}`,
    `Topic: ${topic}`,
    "",
    "We typically respond within one business day.",
    "For anything urgent, reply to this email or call us:",
    siteConfig.phoneDisplay,
    siteConfig.phoneSecondaryDisplay,
    "",
    siteConfig.legalName,
    siteConfig.email,
    siteConfig.url,
  ].join("\n");

  const bodyHtml = `
    <p style="margin:0 0 16px 0;font-size:16px;line-height:1.55;color:${BRAND.ink};">Hi ${escapeHtml(name)},</p>
    <p style="margin:0 0 12px 0;font-size:15px;line-height:1.6;color:${BRAND.ink};">
      Thank you for reaching out to <strong>${escapeHtml(siteConfig.legalName)}</strong>.
      We have received your message and will reply with a clear next step.
    </p>
    <p style="margin:0 0 20px 0;font-size:15px;line-height:1.6;color:${BRAND.muted};">
      We typically respond within one business day. If your note is urgent, reply to this email or call us directly.
    </p>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:${BRAND.signalSoft};border:1px solid #cfeef2;">
      <tr>
        <td style="padding:16px 18px;">
          <p style="margin:0 0 10px 0;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:${BRAND.signal};font-weight:700;">
            Your submission
          </p>
          <p style="margin:0 0 8px 0;font-size:14px;line-height:1.5;color:${BRAND.ink};">
            <span style="color:${BRAND.muted};">Intent</span><br />
            <strong>${escapeHtml(intent)}</strong>
          </p>
          <p style="margin:0;font-size:14px;line-height:1.5;color:${BRAND.ink};">
            <span style="color:${BRAND.muted};">Topic</span><br />
            <strong>${escapeHtml(topic)}</strong>
          </p>
        </td>
      </tr>
    </table>
    <p style="margin:20px 0 0 0;font-size:14px;line-height:1.6;color:${BRAND.muted};">
      We look forward to continuing the conversation.
    </p>
  `;

  return {
    subject,
    text,
    html: emailShell({
      preheader: "We received your message and will reply with a clear next step.",
      title: subject,
      bodyHtml,
    }),
  };
}

export function newsletterConfirmationEmail(email: string): OutboundEmail {
  const subject = `You're subscribed — ${siteConfig.legalName}`;

  const text = [
    "Welcome to the Avero Technologies list.",
    "",
    `You're subscribed as ${email}.`,
    "",
    "Expect occasional notes on engineering, architecture, security, and delivery — practical writing for teams shipping production systems.",
    "",
    "No spam. Low volume. Reply anytime if you prefer to unsubscribe.",
    "",
    siteConfig.legalName,
    siteConfig.email,
    siteConfig.url,
  ].join("\n");

  const bodyHtml = `
    <p style="margin:0 0 8px 0;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:${BRAND.signal};font-weight:700;">
      Subscription confirmed
    </p>
    <p style="margin:0 0 16px 0;font-size:22px;line-height:1.3;font-family:Georgia,'Times New Roman',serif;color:${BRAND.ink};">
      You're on the list.
    </p>
    <p style="margin:0 0 12px 0;font-size:15px;line-height:1.6;color:${BRAND.ink};">
      Thanks for subscribing to updates from <strong>${escapeHtml(siteConfig.legalName)}</strong>.
    </p>
    <p style="margin:0 0 20px 0;font-size:15px;line-height:1.6;color:${BRAND.muted};">
      We'll share occasional notes on engineering, architecture, security, and delivery — practical writing for teams shipping production systems.
    </p>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:${BRAND.signalSoft};border:1px solid #cfeef2;">
      <tr>
        <td style="padding:16px 18px;">
          <p style="margin:0 0 6px 0;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:${BRAND.signal};font-weight:700;">
            Subscribed as
          </p>
          <p style="margin:0;font-size:15px;line-height:1.5;color:${BRAND.ink};font-weight:600;">
            ${escapeHtml(email)}
          </p>
        </td>
      </tr>
    </table>
    <p style="margin:20px 0 0 0;font-size:14px;line-height:1.6;color:${BRAND.muted};">
      No spam. Low volume. Prefer to leave the list? Reply to this email and we'll remove you.
    </p>
  `;

  return {
    subject,
    text,
    html: emailShell({
      preheader: "Subscription confirmed. Occasional engineering notes from Avero Technologies.",
      title: subject,
      bodyHtml,
    }),
  };
}

export function newsletterTeamNotifyEmail(email: string, source?: string): OutboundEmail {
  const subject = `[Avero newsletter] New subscriber`;
  const when = new Date().toISOString();
  const sourceLabel = source ?? "site";

  const text = [
    "New newsletter subscription",
    "",
    `Email: ${email}`,
    `Source: ${sourceLabel}`,
    `Time: ${when}`,
  ].join("\n");

  const bodyHtml = `
    <p style="margin:0 0 8px 0;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:${BRAND.signal};font-weight:700;">
      Internal notice
    </p>
    <p style="margin:0 0 16px 0;font-size:20px;line-height:1.3;font-family:Georgia,'Times New Roman',serif;color:${BRAND.ink};">
      New newsletter subscriber
    </p>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:${BRAND.signalSoft};border:1px solid #cfeef2;">
      <tr>
        <td style="padding:16px 18px;">
          <p style="margin:0 0 10px 0;font-size:14px;line-height:1.5;color:${BRAND.ink};">
            <span style="color:${BRAND.muted};">Email</span><br />
            <strong>${escapeHtml(email)}</strong>
          </p>
          <p style="margin:0 0 10px 0;font-size:14px;line-height:1.5;color:${BRAND.ink};">
            <span style="color:${BRAND.muted};">Source</span><br />
            <strong>${escapeHtml(sourceLabel)}</strong>
          </p>
          <p style="margin:0;font-size:14px;line-height:1.5;color:${BRAND.ink};">
            <span style="color:${BRAND.muted};">Time</span><br />
            <strong>${escapeHtml(when)}</strong>
          </p>
        </td>
      </tr>
    </table>
  `;

  return {
    subject,
    text,
    html: emailShell({
      preheader: `New subscriber: ${email}`,
      title: subject,
      bodyHtml,
    }),
  };
}
