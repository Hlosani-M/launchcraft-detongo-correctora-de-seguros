"use server";

import { contactSchema } from "@/lib/schemas";
import { getEmailProvider } from "@/lib/email/factory";

export type ContactState = {
  status: "idle" | "success" | "error";
  errors?: Partial<Record<"name" | "email" | "phone" | "message", string>>;
};

export async function contactAction(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot — bots that fill hidden `website` field get a silent success.
  if (formData.get("website")) {
    return { status: "success" };
  }

  const raw = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    message: String(formData.get("message") ?? ""),
    locale: String(formData.get("locale") ?? "pt"),
  };

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const flat = parsed.error.flatten().fieldErrors;
    const errors: ContactState["errors"] = {};
    for (const key of ["name", "email", "phone", "message"] as const) {
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
