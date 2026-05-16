import { z } from "zod";

export const CONTACT_TOPICS = [
  "general",
  "quote",
  "claims",
  "client",
  "partnership",
  "other",
] as const;

export type ContactTopic = (typeof CONTACT_TOPICS)[number];

export const contactSchema = z.object({
  name: z.string().trim().min(2, "name"),
  email: z.string().trim().email("email"),
  phone: z
    .string()
    .trim()
    .max(40)
    .optional()
    .transform((v) => (v && v.length > 0 ? v : undefined)),
  message: z.string().trim().min(10, "message").max(4000),
  locale: z.enum(["pt", "en"]),
  topic: z.enum(CONTACT_TOPICS).optional().catch(undefined),
});

export type ContactInput = z.infer<typeof contactSchema>;
