import type { ZodError } from "zod";

/** First friendly message per field — never expose raw Zod dumps to the UI. */
export function fieldErrorsFromZod(error: ZodError): Record<string, string[]> {
  const flat = error.flatten().fieldErrors as Record<string, string[] | undefined>;
  const out: Record<string, string[]> = {};
  for (const [key, messages] of Object.entries(flat)) {
    if (!messages?.length) continue;
    const first = messages[0]?.trim();
    if (first) out[key] = [first];
  }
  return out;
}

export function firstIssueMessage(error: ZodError, fallback: string): string {
  const msg = error.issues[0]?.message?.trim();
  return msg || fallback;
}
