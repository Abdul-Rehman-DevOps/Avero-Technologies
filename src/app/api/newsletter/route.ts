import { NextResponse } from "next/server";
import { getEmailProvider } from "@/lib/contact/email";
import { rateLimit } from "@/lib/contact/rate-limit";
import {
  newsletterConfirmationEmail,
  newsletterTeamNotifyEmail,
} from "@/lib/contact/templates";
import { newsletterSchema } from "@/lib/newsletter/schema";
import { siteConfig } from "@/lib/site";
import { fieldErrorsFromZod, firstIssueMessage } from "@/lib/validation/messages";

export const runtime = "nodejs";

const subscribers = new Set<string>();

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const limited = rateLimit(
    `newsletter:${ip}`,
    Number(process.env.NEWSLETTER_RATE_LIMIT_MAX ?? 8),
    Number(process.env.NEWSLETTER_RATE_LIMIT_WINDOW_MS ?? 600_000),
  );
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many attempts. Please wait a moment and try again." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "We could not read that request. Please try again." },
      { status: 400 },
    );
  }

  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: firstIssueMessage(parsed.error, "Please enter a valid email address."),
        fieldErrors: fieldErrorsFromZod(parsed.error),
      },
      { status: 400 },
    );
  }

  const email = parsed.data.email.toLowerCase();
  const already = subscribers.has(email);
  subscribers.add(email);
  const source = parsed.data.source ?? "site";
  const from = process.env.CONTACT_FROM_EMAIL ?? "noreply@avero.com";
  const teamTo = process.env.CONTACT_TO_EMAIL;

  try {
    const provider = getEmailProvider();

    if (!already) {
      const confirm = newsletterConfirmationEmail(email);
      await provider.send({
        to: email,
        from,
        replyTo: siteConfig.email,
        subject: confirm.subject,
        text: confirm.text,
        html: confirm.html,
      });

      if (teamTo) {
        const notify = newsletterTeamNotifyEmail(email, source);
        try {
          await provider.send({
            to: teamTo,
            from,
            subject: notify.subject,
            text: notify.text,
            html: notify.html,
          });
        } catch (notifyError) {
          console.error(
            "[newsletter] team notify failed",
            notifyError instanceof Error ? notifyError.message : "unknown",
          );
        }
      }
    } else {
      console.info("[newsletter] already subscribed", { email, source });
    }
  } catch (error) {
    console.error(
      "[newsletter] confirmation failed",
      error instanceof Error ? error.message : "unknown",
    );
    return NextResponse.json(
      {
        error: `We could not complete your subscription right now. Please email ${siteConfig.email} or try again shortly.`,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: already
      ? "You are already on the list. Thank you."
      : "Thanks — check your inbox for a confirmation email.",
  });
}
