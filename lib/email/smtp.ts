import type { EmailProvider } from "./provider";
import { renderContactHtml, renderContactText } from "./provider";
import type { ContactMessage } from "./types";

export interface SmtpConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
  secure?: boolean;
  from: string;
  fromName?: string;
  to: string;
}

export class SmtpProvider implements EmailProvider {
  readonly name = "smtp";

  constructor(private readonly config: SmtpConfig) {}

  async sendContactMessage(message: ContactMessage): Promise<void> {
    // nodemailer is an optional peer dep — load it lazily and keep the bundler
    // from trying to resolve it at build time.
    const dynamicImport = new Function(
      "specifier",
      "return import(specifier);",
    ) as (s: string) => Promise<{
      default: { createTransport: (opts: unknown) => { sendMail: (o: unknown) => Promise<unknown> } };
    }>;
    const nodemailer = await dynamicImport("nodemailer").catch(() => {
      throw new Error(
        "nodemailer is not installed. Run `npm install nodemailer` to enable the SMTP email provider.",
      );
    });

    const transporter = nodemailer.default.createTransport({
      host: this.config.host,
      port: this.config.port,
      secure: this.config.secure ?? this.config.port === 465,
      auth: { user: this.config.user, pass: this.config.pass },
    });

    await transporter.sendMail({
      from: this.config.fromName
        ? `"${this.config.fromName}" <${this.config.from}>`
        : this.config.from,
      to: this.config.to,
      replyTo: `"${message.name}" <${message.email}>`,
      subject: `[detondocorretora.com] ${message.name}`,
      text: renderContactText(message),
      html: renderContactHtml(message),
    });
  }
}
