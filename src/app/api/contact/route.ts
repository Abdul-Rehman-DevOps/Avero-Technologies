import { NextResponse } from "next/server";
import { getEmailProvider } from "@/lib/contact/email";
import { rateLimit } from "@/lib/contact/rate-limit";
import { contactSchema } from "@/lib/contact/schema";
import { fieldErrorsFromZod } from "@/lib/validation/messages";

export const runtime = "nodejs";

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  const limit = rateLimit(`contact:${clientIp(request)}`);
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please wait a moment and try again." },
      {
        status: 429,
        headers: limit.retryAfterSec
          ? { "Retry-After": String(limit.retryAfterSec) }
          : undefined,
      },
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "We could not read that submission. Please try again." },
      { status: 400 },
    );
  }

  if (typeof json !== "object" || json === null) {
    return NextResponse.json(
      { ok: false, error: "Please complete the form and try again." },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Please correct the highlighted fields and try again.",
        fieldErrors: fieldErrorsFromZod(parsed.error),
      },
      { status: 400 },
    );
  }

  const data = parsed.data;
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "noreply@avero.com";

  if (!to) {
    console.warn("[contact] CONTACT_TO_EMAIL is not configured; using console provider only.");
  }

  const text = [
    `Intent: ${data.intent}`,
    `Name: ${data.name}`,
    `Work email: ${data.workEmail}`,
    `Company: ${data.company}`,
    `Role: ${data.role}`,
    `Topic: ${data.lookingToBuild}`,
    `Area: ${data.projectType}`,
    `Timeline: ${data.timeline}`,
    `Budget: ${data.budget || "n/a"}`,
    "",
    data.message,
  ].join("\n");

  try {
    const provider = getEmailProvider();
    await provider.send({
      to: to || "dev-null@localhost",
      from,
      replyTo: data.workEmail,
      subject: `[Avero ${data.intent}] ${data.projectType} / ${data.company}`,
      text,
    });
  } catch (error) {
    console.error("[contact] delivery failed", error instanceof Error ? error.message : "unknown");
    return NextResponse.json(
      {
        ok: false,
        error: "We could not deliver your message right now. Please email contact@avero.com or try again shortly.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
