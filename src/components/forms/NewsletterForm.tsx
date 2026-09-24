"use client";

import { useState } from "react";
import { newsletterSchema } from "@/lib/newsletter/schema";
import { firstIssueMessage } from "@/lib/validation/messages";

type Props = {
  variant?: "footer" | "inline";
};

export function NewsletterForm({ variant = "inline" }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const local = newsletterSchema.safeParse({ email, source: variant });
    if (!local.success) {
      setStatus("error");
      setMessage(firstIssueMessage(local.error, "Please enter a valid email address."));
      return;
    }

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: variant }),
      });
      const data = (await res.json()) as { message?: string; error?: string };
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "We could not complete your subscription. Please try again.");
        return;
      }
      setStatus("ok");
      setMessage(data.message ?? "Thanks. You are subscribed.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Connection issue. Please try again shortly.");
    }
  }

  const isFooter = variant === "footer";

  return (
    <form onSubmit={onSubmit} className="space-y-2" noValidate>
      <div className={`flex gap-2 ${isFooter ? "flex-col sm:flex-row" : "flex-col sm:flex-row"}`}>
        <label className="sr-only" htmlFor={`newsletter-email-${variant}`}>
          Email address
        </label>
        <input
          id={`newsletter-email-${variant}`}
          type="email"
          name="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") {
              setStatus("idle");
              setMessage("");
            }
          }}
          placeholder="you@company.com"
          aria-invalid={status === "error"}
          className={
            isFooter
              ? "min-h-11 flex-1 rounded-xl border border-white/20 bg-transparent px-3 text-sm text-[var(--footer-fg)] placeholder:text-[var(--footer-muted)] focus:border-[var(--signal)] focus:outline-none"
              : "min-h-11 flex-1 rounded-xl border border-chalk-200 bg-paper px-3 text-sm text-ink-950 placeholder:text-ink-400 focus:border-signal focus:outline-none"
          }
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className={
            isFooter
              ? "min-h-11 rounded-xl border border-[var(--signal)] bg-[var(--signal)] px-4 text-sm font-medium text-white disabled:opacity-60"
              : "min-h-11 rounded-xl border border-signal bg-signal px-4 text-sm font-medium text-signal-fg disabled:opacity-60"
          }
        >
          {status === "loading" ? "Sending…" : "Subscribe"}
        </button>
      </div>
      {message ? (
        <p
          role={status === "error" ? "alert" : "status"}
          className={`text-xs leading-relaxed ${
            status === "error"
              ? "text-danger"
              : isFooter
                ? "text-[var(--footer-muted)]"
                : "text-ink-600"
          }`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
