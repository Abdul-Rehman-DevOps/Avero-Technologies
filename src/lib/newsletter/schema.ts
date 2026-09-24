import { z } from "zod";

export const newsletterSchema = z.object({
  email: z.string().trim().pipe(z.email("Enter a valid email address")),
  source: z.string().trim().max(64, "Invalid source").optional(),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;
