import type { EmailProvider } from "./provider";
import { renderContactHtml, renderContactText } from "./provider";
import type { ContactMessage } from "./types";

export interface BrevoConfig {
  apiKey: string;
  from: string;
  fromName?: string;
  to: string;
}

export class BrevoProvider implements EmailProvider {
  readonly name = "brevo";

  constructor(private readonly config: BrevoConfig) {}

  async sendContactMessage(message: ContactMessage): Promise<void> {
    const body = {
      sender: {
        email: this.config.from,
        name: this.config.fromName ?? "Detondo Website",
      },
      to: [{ email: this.config.to }],
      replyTo: { email: message.email, name: message.name },
      subject: `[detondocorretora.com] ${message.name}`,
      htmlContent: renderContactHtml(message),
      textContent: renderContactText(message),
    };

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": this.config.apiKey,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      throw new Error(`Brevo responded ${response.status}: ${detail}`);
    }
  }
}
