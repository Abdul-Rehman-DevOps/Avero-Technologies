export type SendEmailInput = {
  to: string;
  from: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
};

export interface EmailProvider {
  send(input: SendEmailInput): Promise<{ id: string }>;
}

export class ConsoleEmailProvider implements EmailProvider {
  async send(input: SendEmailInput) {
    console.info("[email:console]", {
      to: input.to,
      from: input.from,
      subject: input.subject,
      replyTo: input.replyTo,
      textLength: input.text.length,
      htmlLength: input.html?.length ?? 0,
    });
    return { id: `console-${Date.now()}` };
  }
}

export class ResendEmailProvider implements EmailProvider {
  constructor(private apiKey: string) {}

  async send(input: SendEmailInput) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: input.from,
        to: [input.to],
        subject: input.subject,
        text: input.text,
        ...(input.html ? { html: input.html } : {}),
        reply_to: input.replyTo,
      }),
    });

    if (!res.ok) {
      throw new Error(`Email provider failed with status ${res.status}`);
    }

    const data = (await res.json()) as { id?: string };
    return { id: data.id ?? `resend-${Date.now()}` };
  }
}

export function getEmailProvider(): EmailProvider {
  const provider = process.env.EMAIL_PROVIDER ?? "console";
  if (provider === "resend") {
    const key = process.env.RESEND_API_KEY;
    if (!key) {
      throw new Error("RESEND_API_KEY is required when EMAIL_PROVIDER=resend");
    }
    return new ResendEmailProvider(key);
  }
  return new ConsoleEmailProvider();
}
