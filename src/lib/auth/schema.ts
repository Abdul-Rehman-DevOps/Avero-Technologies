import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().pipe(z.email("Enter a valid work email")),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(200, "Password is too long"),
});

export const newsletterSchema = z.object({
  email: z.string().trim().pipe(z.email("Enter a valid email address")),
  source: z.string().trim().max(64, "Invalid source").optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type NewsletterInput = z.infer<typeof newsletterSchema>;
