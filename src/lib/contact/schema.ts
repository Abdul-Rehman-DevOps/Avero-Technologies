import { z } from "zod";

const projectTypes = [
  "ai",
  "software",
  "cloud",
  "platform",
  "security",
  "data",
  "advisory",
  "other",
] as const;

const timelines = ["asap", "1-3m", "3-6m", "exploratory"] as const;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name")
    .max(100, "Name is too long"),
  workEmail: z
    .string()
    .trim()
    .pipe(z.email("Enter a valid work email"))
    .refine((v) => !v.toLowerCase().endsWith("@example.com"), "Please use your work email"),
  company: z
    .string()
    .trim()
    .min(1, "Company is required")
    .max(120, "Company name is too long"),
  role: z
    .string()
    .trim()
    .min(1, "Role is required")
    .max(120, "Role is too long"),
  lookingToBuild: z
    .string()
    .trim()
    .min(8, "Please share a short description (at least a few words)")
    .max(240, "Please keep this under 240 characters"),
  projectType: z.enum(projectTypes, { error: "Please select an area" }),
  timeline: z.enum(timelines, { error: "Please select a timeline" }),
  budget: z
    .string()
    .trim()
    .max(80, "Budget note is too long")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(20, "Please add a bit more context (at least a short paragraph)")
    .max(4000, "Message is too long"),
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
