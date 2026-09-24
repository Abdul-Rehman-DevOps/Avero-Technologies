"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { contactSchema } from "@/lib/contact/schema";
import { fieldErrorsFromZod } from "@/lib/validation/messages";

const intents = [
  { value: "general", label: "General inquiry" },
  { value: "project", label: "Project discussion" },
  { value: "partnership", label: "Partnership" },
  { value: "careers", label: "Careers" },
] as const;

const projectTypes = [
  { value: "ai", label: "AI / Intelligent systems" },
  { value: "software", label: "Software engineering" },
  { value: "cloud", label: "Cloud" },
  { value: "platform", label: "Platform / DevOps / SRE" },
  { value: "security", label: "Security / DevSecOps" },
  { value: "data", label: "Data engineering" },
  { value: "advisory", label: "Advisory / architecture" },
  { value: "other", label: "Other / not sure yet" },
] as const;

const timelines = [
  { value: "asap", label: "As soon as possible" },
  { value: "1-3m", label: "1-3 months" },
  { value: "3-6m", label: "3-6 months" },
  { value: "exploratory", label: "Exploratory / discovery" },
  { value: "n-a", label: "Not applicable" },
] as const;

type FieldErrors = Record<string, string[] | undefined>;
type Intent = (typeof intents)[number]["value"] | "";

const fieldClass =
  "min-h-11 w-full rounded-xl border border-chalk-200 bg-paper px-3.5 text-ink-950 transition-[border-color,box-shadow] duration-150 focus:border-signal focus:outline-none focus:ring-2 focus:ring-signal/20";

const fieldErrorClass =
  "min-h-11 w-full rounded-xl border border-danger/40 bg-danger/[0.03] px-3.5 text-ink-950 transition-[border-color,box-shadow] duration-150 focus:border-danger focus:outline-none focus:ring-2 focus:ring-danger/20";

export function ContactForm() {
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [intent, setIntent] = useState<Intent>("");

  const showProjectDetails = intent === "project" || intent === "partnership";

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);
    setFieldErrors({});
    setSuccess(false);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    // General inquiries default timeline / area when not project-focused
    if (!showProjectDetails) {
      if (!payload.timeline) payload.timeline = "n-a";
      if (!payload.projectType) payload.projectType = "other";
    }

    const local = contactSchema.safeParse(payload);
    if (!local.success) {
      setFieldErrors(fieldErrorsFromZod(local.error));
      setError("Please correct the highlighted fields and try again.");
      setPending(false);
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await res.json()) as {
        ok?: boolean;
        error?: string;
        fieldErrors?: FieldErrors;
      };

      if (!res.ok || !data.ok) {
        setFieldErrors(data.fieldErrors ?? {});
        setError(data.error ?? "Unable to send your message. Please try again.");
        return;
      }

      setSuccess(true);
      form.reset();
      setIntent("");
    } catch {
      setError("Connection issue. Please check your network and try again.");
    } finally {
      setPending(false);
    }
  }

  if (success) {
    return (
      <div
        role="status"
        className="rounded-3xl border border-signal/30 bg-signal-subtle p-6 md:p-8"
      >
        <p className="tech-label text-signal">Message received</p>
        <h2 className="font-display mt-3 text-2xl text-ink-950">Thank you. We got your note.</h2>
        <p className="mt-3 max-w-lg text-sm text-ink-700">
          Our team will reply to your email with a clear next step.
        </p>
        <div className="mt-6">
          <Button type="button" variant="secondary" onClick={() => setSuccess(false)}>
            Send another message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="min-w-0">
        <label htmlFor="intent" className="mb-1.5 block text-sm font-medium text-ink-800">
          How can we help?
        </label>
        <select
          id="intent"
          name="intent"
          required
          className={fieldErrors.intent?.length ? fieldErrorClass : fieldClass}
          value={intent}
          onChange={(e) => setIntent(e.target.value as Intent)}
          aria-invalid={Boolean(fieldErrors.intent)}
        >
          <option value="" disabled>
            Select one
          </option>
          {intents.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <FieldError id="intent-error" errors={fieldErrors.intent} />
        {intent === "general" ? (
          <p className="mt-1.5 text-xs leading-relaxed text-ink-400">
            A general question. No project brief required.
          </p>
        ) : null}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field id="name" label="Name" name="name" required autoComplete="name" errors={fieldErrors.name} />
        <Field
          id="workEmail"
          label="Work email"
          name="workEmail"
          type="email"
          required
          autoComplete="email"
          errors={fieldErrors.workEmail}
        />
        <Field
          id="company"
          label="Company (optional)"
          name="company"
          autoComplete="organization"
          errors={fieldErrors.company}
        />
        <Field
          id="role"
          label="Role (optional)"
          name="role"
          autoComplete="organization-title"
          errors={fieldErrors.role}
        />
      </div>

      <Field
        id="lookingToBuild"
        label="What would you like to discuss?"
        name="lookingToBuild"
        required
        errors={fieldErrors.lookingToBuild}
        hint="A short line is enough: a question, idea, or context."
      />

      {showProjectDetails ? (
        <div className="grid items-start gap-5 md:grid-cols-2">
          <div className="min-w-0">
            <label htmlFor="projectType" className="mb-1.5 block text-sm font-medium text-ink-800">
              Area
            </label>
            <select
              id="projectType"
              name="projectType"
              required
              className={fieldErrors.projectType?.length ? fieldErrorClass : fieldClass}
              defaultValue=""
              aria-invalid={Boolean(fieldErrors.projectType)}
            >
              <option value="" disabled>
                Select an area
              </option>
              {projectTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            <FieldError id="projectType-error" errors={fieldErrors.projectType} />
          </div>

          <div className="min-w-0">
            <label htmlFor="timeline" className="mb-1.5 block text-sm font-medium text-ink-800">
              Timeline
            </label>
            <select
              id="timeline"
              name="timeline"
              required
              className={fieldErrors.timeline?.length ? fieldErrorClass : fieldClass}
              defaultValue=""
              aria-invalid={Boolean(fieldErrors.timeline)}
            >
              <option value="" disabled>
                Select a timeline
              </option>
              {timelines.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
            <FieldError id="timeline-error" errors={fieldErrors.timeline} />
          </div>
        </div>
      ) : (
        <>
          <input type="hidden" name="projectType" value="other" />
          <input type="hidden" name="timeline" value="n-a" />
        </>
      )}

      {showProjectDetails ? (
        <Field id="budget" label="Budget range (optional)" name="budget" errors={fieldErrors.budget} />
      ) : null}

      <div className="min-w-0">
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink-800">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          maxLength={4000}
          className={`${fieldErrors.message?.length ? fieldErrorClass : fieldClass} py-2.5`}
          aria-invalid={Boolean(fieldErrors.message)}
          placeholder={
            intent === "general"
              ? "Ask your question. We will reply with a clear next step."
              : "Share context, goals, or what success looks like."
          }
        />
        <FieldError id="message-error" errors={fieldErrors.message} />
      </div>

      {error ? (
        <p
          role="alert"
          className="rounded-xl border border-danger/25 bg-danger/[0.04] px-4 py-3 text-sm text-danger"
        >
          {error}
        </p>
      ) : null}

      <Button type="submit" disabled={pending}>
        {pending ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}

function Field({
  id,
  label,
  name,
  type = "text",
  required,
  autoComplete,
  errors,
  hint,
}: {
  id: string;
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  errors?: string[];
  hint?: string;
}) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const hasError = Boolean(errors?.length);
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink-800">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        maxLength={254}
        className={hasError ? fieldErrorClass : fieldClass}
        aria-invalid={hasError}
        aria-describedby={
          [hint ? hintId : null, hasError ? errorId : null].filter(Boolean).join(" ") || undefined
        }
      />
      {hint ? (
        <p id={hintId} className="mt-1.5 text-xs leading-relaxed text-ink-400">
          {hint}
        </p>
      ) : null}
      <FieldError id={errorId} errors={errors} />
    </div>
  );
}

function FieldError({ id, errors }: { id: string; errors?: string[] }) {
  if (!errors?.length) return null;
  return (
    <p id={id} className="mt-1.5 break-words text-sm leading-snug text-danger" role="alert">
      {errors[0]}
    </p>
  );
}
