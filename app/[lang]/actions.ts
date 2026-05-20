"use server";

import { contactSchema } from "@/lib/schemas";
import { getEmailProvider } from "@/lib/email/factory";

export type ContactState = {
  status: "idle" | "success" | "error";
  errors?: Partial<Record<"name" | "email" | "consent", string>>;
};

export async function contactAction(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: bots that fill the hidden field get a silent success.
  if (formData.get("website") || formData.get("_hp_url")) {
    return { status: "success" };
  }

  const str = (key: string) => {
    const v = formData.get(key);
    return v !== null ? String(v) : undefined;
  };

  const raw = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: str("phone"),
    locale: String(formData.get("locale") ?? "pt"),
    consent: String(formData.get("consent") ?? ""),
    serviceType: str("serviceType"),
    purpose: str("purpose"),
    comments: str("comments"),
    motorBrand: str("motorBrand"),
    motorModel: str("motorModel"),
    motorYear: str("motorYear"),
    healthPlan: str("healthPlan"),
    oilGasSegment: str("oilGasSegment"),
    miningCoverages: str("miningCoverages"),
    reinsuranceType: str("reinsuranceType"),
    otherDescription: str("otherDescription"),
  };

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const flat = parsed.error.flatten().fieldErrors;
    const errors: ContactState["errors"] = {};
    for (const key of ["name", "email", "consent"] as const) {
      if (flat[key]?.length) errors[key] = flat[key]![0];
    }
    return { status: "error", errors };
  }

  try {
    await getEmailProvider().sendContactMessage(parsed.data);
    return { status: "success" };
  } catch (err) {
    console.error("[contactAction] email delivery failed", err);
    return { status: "error" };
  }
}
