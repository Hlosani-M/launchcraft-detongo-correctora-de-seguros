import type { EmailProvider } from "./provider";
import { renderContactHtml, renderContactSubject, renderContactText } from "./provider";
import type { ContactMessage } from "./types";

export interface SendGridConfig {
  apiKey: string;
  from: string;
  fromName?: string;
  to: string;
}

export class SendGridProvider implements EmailProvider {
  readonly name = "sendgrid";

  constructor(private readonly config: SendGridConfig) {}

  async sendContactMessage(message: ContactMessage): Promise<void> {
    const body = {
      personalizations: [
        {
          to: [{ email: this.config.to }],
          subject: renderContactSubject(message),
        },
      ],
      from: {
        email: this.config.from,
        name: this.config.fromName ?? "Detondo Website",
      },
      reply_to: { email: message.email, name: message.name },
      content: [
        { type: "text/plain", value: renderContactText(message) },
        { type: "text/html", value: renderContactHtml(message) },
      ],
    };

    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.config.apiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      throw new Error(`SendGrid responded ${response.status}: ${detail}`);
    }
  }
}
