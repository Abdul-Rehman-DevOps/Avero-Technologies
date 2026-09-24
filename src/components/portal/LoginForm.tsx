"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { loginSchema } from "@/lib/auth/schema";
import { fieldErrorsFromZod, firstIssueMessage } from "@/lib/validation/messages";

function LoginFormInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/portal";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setFieldErrors({});

    const local = loginSchema.safeParse({ email, password });
    if (!local.success) {
      setFieldErrors(fieldErrorsFromZod(local.error));
      setError(firstIssueMessage(local.error, "Please check your email and password."));
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = (await res.json()) as {
        error?: string;
        fieldErrors?: Record<string, string[]>;
      };
      if (!res.ok) {
        setFieldErrors(data.fieldErrors ?? {});
        setError(data.error ?? "Unable to sign in. Please try again.");
        setLoading(false);
        return;
      }
      router.push(next.startsWith("/portal") ? next : "/portal");
      router.refresh();
    } catch {
      setError("Connection issue. Please try again shortly.");
      setLoading(false);
    }
  }

  const inputClass =
    "min-h-11 w-full rounded-xl border border-chalk-200 bg-chalk-50 px-3.5 text-sm focus:border-signal focus:outline-none focus:ring-2 focus:ring-signal/20";
  const inputErrorClass =
    "min-h-11 w-full rounded-xl border border-danger/40 bg-danger/[0.03] px-3.5 text-sm focus:border-danger focus:outline-none focus:ring-2 focus:ring-danger/20";

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div className="min-w-0">
        <label htmlFor="portal-email" className="mb-1.5 block text-sm font-medium text-ink-800">
          Work email
        </label>
        <input
          id="portal-email"
          type="email"
          autoComplete="username"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={fieldErrors.email?.length ? inputErrorClass : inputClass}
          aria-invalid={Boolean(fieldErrors.email?.length)}
          aria-describedby={fieldErrors.email?.length ? "portal-email-error" : undefined}
        />
        {fieldErrors.email?.[0] ? (
          <p id="portal-email-error" className="mt-1.5 break-words text-sm text-danger" role="alert">
            {fieldErrors.email[0]}
          </p>
        ) : null}
      </div>
      <div className="min-w-0">
        <label htmlFor="portal-password" className="mb-1.5 block text-sm font-medium text-ink-800">
          Password
        </label>
        <input
          id="portal-password"
          type="password"
          autoComplete="current-password"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={fieldErrors.password?.length ? inputErrorClass : inputClass}
          aria-invalid={Boolean(fieldErrors.password?.length)}
          aria-describedby={fieldErrors.password?.length ? "portal-password-error" : undefined}
        />
        {fieldErrors.password?.[0] ? (
          <p
            id="portal-password-error"
            className="mt-1.5 break-words text-sm text-danger"
            role="alert"
          >
            {fieldErrors.password[0]}
          </p>
        ) : null}
      </div>
      {error && !fieldErrors.email?.length && !fieldErrors.password?.length ? (
        <p
          role="alert"
          className="rounded-xl border border-danger/25 bg-danger/[0.04] px-3 py-2 text-sm text-danger"
        >
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={loading}
        className="min-h-11 w-full rounded-xl border border-signal bg-signal text-sm font-medium text-signal-fg disabled:opacity-60"
      >
        {loading ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}

export function LoginForm() {
  return (
    <Suspense fallback={<p className="text-sm text-ink-600">Loading sign-in…</p>}>
      <LoginFormInner />
    </Suspense>
  );
}
