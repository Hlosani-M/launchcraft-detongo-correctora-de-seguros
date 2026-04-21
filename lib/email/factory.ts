import "server-only";
import type { EmailProvider } from "./provider";
import { BrevoProvider } from "./brevo";
import { ResendProvider } from "./resend";
import { SendGridProvider } from "./sendgrid";
import { SmtpProvider } from "./smtp";
import { ConsoleProvider } from "./console";

export type EmailProviderKind =
  | "brevo"
  | "resend"
  | "sendgrid"
  | "smtp"
  | "console";

type EnvLike = Record<string, string | undefined>;

const read = (env: EnvLike, key: string): string => {
  const value = env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

const readOptional = (env: EnvLike, key: string): string | undefined =>
  env[key] && env[key]!.length > 0 ? env[key] : undefined;

export function createEmailProvider(env: EnvLike = process.env): EmailProvider {
  const kind = (env.EMAIL_PROVIDER ?? "brevo") as EmailProviderKind;

  switch (kind) {
    case "brevo":
      return new BrevoProvider({
        apiKey: read(env, "BREVO_API_KEY"),
        from: read(env, "CONTACT_FROM_EMAIL"),
        fromName: readOptional(env, "CONTACT_FROM_NAME"),
        to: read(env, "CONTACT_TO_EMAIL"),
      });
    case "resend":
      return new ResendProvider({
        apiKey: read(env, "RESEND_API_KEY"),
        from: read(env, "CONTACT_FROM_EMAIL"),
        to: read(env, "CONTACT_TO_EMAIL"),
      });
    case "sendgrid":
      return new SendGridProvider({
        apiKey: read(env, "SENDGRID_API_KEY"),
        from: read(env, "CONTACT_FROM_EMAIL"),
        fromName: readOptional(env, "CONTACT_FROM_NAME"),
        to: read(env, "CONTACT_TO_EMAIL"),
      });
    case "smtp":
      return new SmtpProvider({
        host: read(env, "SMTP_HOST"),
        port: Number.parseInt(env.SMTP_PORT ?? "587", 10),
        user: read(env, "SMTP_USER"),
        pass: read(env, "SMTP_PASS"),
        secure: env.SMTP_SECURE === "true" ? true : undefined,
        from: read(env, "CONTACT_FROM_EMAIL"),
        fromName: readOptional(env, "CONTACT_FROM_NAME"),
        to: read(env, "CONTACT_TO_EMAIL"),
      });
    case "console":
      return new ConsoleProvider();
    default: {
      const exhaustive: never = kind;
      throw new Error(`Unknown EMAIL_PROVIDER: ${exhaustive}`);
    }
  }
}

let cached: EmailProvider | undefined;

export function getEmailProvider(): EmailProvider {
  if (!cached) cached = createEmailProvider();
  return cached;
}
