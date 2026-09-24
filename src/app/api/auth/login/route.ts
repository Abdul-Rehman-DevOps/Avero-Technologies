import { NextResponse } from "next/server";
import { loginSchema } from "@/lib/auth/schema";
import {
  authenticate,
  createSessionToken,
  sessionCookieOptions,
} from "@/lib/auth/session";
import { fieldErrorsFromZod, firstIssueMessage } from "@/lib/validation/messages";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "We could not read that request. Please try again." },
      { status: 400 },
    );
  }

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: firstIssueMessage(parsed.error, "Please check your email and password."),
        fieldErrors: fieldErrorsFromZod(parsed.error),
      },
      { status: 400 },
    );
  }

  const user = authenticate(parsed.data.email, parsed.data.password);
  if (!user) {
    return NextResponse.json(
      { error: "That email or password does not match our records." },
      { status: 401 },
    );
  }

  const token = createSessionToken(user);
  const response = NextResponse.json({
    ok: true,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      title: user.title,
      department: user.department,
    },
  });
  response.cookies.set(sessionCookieOptions(token));
  return response;
}
