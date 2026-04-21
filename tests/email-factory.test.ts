import { describe, expect, it } from "vitest";
import { createEmailProvider } from "@/lib/email/factory";
import { BrevoProvider } from "@/lib/email/brevo";
import { ResendProvider } from "@/lib/email/resend";
import { SendGridProvider } from "@/lib/email/sendgrid";
import { SmtpProvider } from "@/lib/email/smtp";
import { ConsoleProvider } from "@/lib/email/console";

const baseEnv = {
  CONTACT_FROM_EMAIL: "noreply@example.com",
  CONTACT_TO_EMAIL: "hello@example.com",
};

describe("createEmailProvider", () => {
  it("defaults to Brevo when EMAIL_PROVIDER is unset", () => {
    const provider = createEmailProvider({
      ...baseEnv,
      BREVO_API_KEY: "brevo-key",
    });
    expect(provider).toBeInstanceOf(BrevoProvider);
    expect(provider.name).toBe("brevo");
  });

  it("builds a ResendProvider when selected", () => {
    const provider = createEmailProvider({
      ...baseEnv,
      EMAIL_PROVIDER: "resend",
      RESEND_API_KEY: "resend-key",
    });
    expect(provider).toBeInstanceOf(ResendProvider);
  });

  it("builds a SendGridProvider when selected", () => {
    const provider = createEmailProvider({
      ...baseEnv,
      EMAIL_PROVIDER: "sendgrid",
      SENDGRID_API_KEY: "sg-key",
    });
    expect(provider).toBeInstanceOf(SendGridProvider);
  });

  it("builds an SmtpProvider when selected", () => {
    const provider = createEmailProvider({
      ...baseEnv,
      EMAIL_PROVIDER: "smtp",
      SMTP_HOST: "smtp.example.com",
      SMTP_PORT: "587",
      SMTP_USER: "user",
      SMTP_PASS: "pass",
    });
    expect(provider).toBeInstanceOf(SmtpProvider);
  });

  it("builds a ConsoleProvider when selected (no secrets)", () => {
    const provider = createEmailProvider({ EMAIL_PROVIDER: "console" });
    expect(provider).toBeInstanceOf(ConsoleProvider);
  });

  it("throws a helpful error when required env vars are missing", () => {
    expect(() =>
      createEmailProvider({ EMAIL_PROVIDER: "brevo" }),
    ).toThrowError(/BREVO_API_KEY/);
  });

  it("rejects unknown providers", () => {
    expect(() =>
      createEmailProvider({ EMAIL_PROVIDER: "mystery" }),
    ).toThrowError(/Unknown EMAIL_PROVIDER/);
  });
});
