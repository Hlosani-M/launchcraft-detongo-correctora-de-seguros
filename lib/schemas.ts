import { z } from "zod";

export const SERVICE_TYPES = [
  "motor",
  "health",
  "life",
  "travel",
  "corporate",
  "oilgas",
  "marine",
  "mining",
  "reinsurance",
  "riskManagement",
  "other",
] as const;

export type ServiceType = (typeof SERVICE_TYPES)[number];

export const PURPOSES = [
  "quote",
  "consultant",
  "claim",
  "renewal",
  "info",
  "partnership",
  "support",
] as const;

export type Purpose = (typeof PURPOSES)[number];

const optStr = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v && v.length > 0 ? v : undefined));

export const contactSchema = z.object({
  name: z.string().trim().min(2, "name"),
  email: z.string().trim().email("email"),
  phone: optStr(40),
  locale: z.enum(["pt", "en"]),
  consent: z.string().refine((v) => v === "on" || v === "true", "consent"),
  serviceType: z.enum(SERVICE_TYPES).optional().catch(undefined),
  purpose: z.enum(PURPOSES).optional().catch(undefined),
  comments: optStr(4000),
  // Step 3 conditional detail fields
  motorBrand: optStr(80),
  motorModel: optStr(80),
  motorYear: optStr(4),
  healthPlan: z
    .enum(["individual", "family", "corporate"])
    .optional()
    .catch(undefined),
  oilGasSegment: z
    .enum(["upstream", "midstream", "downstream", "marine"])
    .optional()
    .catch(undefined),
  miningCoverages: optStr(500),
  reinsuranceType: z
    .enum(["treaty", "facultative", "consulting", "riskMgmt"])
    .optional()
    .catch(undefined),
  otherDescription: optStr(1000),
});

export type ContactInput = z.infer<typeof contactSchema>;
