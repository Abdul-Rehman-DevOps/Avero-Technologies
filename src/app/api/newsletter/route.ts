import { NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/auth/schema";
import { rateLimit } from "@/lib/contact/rate-limit";
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

  if (process.env.EMAIL_PROVIDER === "console" || !process.env.EMAIL_PROVIDER) {
    console.info("[newsletter]", { email, source: parsed.data.source ?? "site", already });
  }

  return NextResponse.json({
    ok: true,
    message: already
      ? "You are already on the list — thank you."
      : "Thanks — you are subscribed.",
  });
}
