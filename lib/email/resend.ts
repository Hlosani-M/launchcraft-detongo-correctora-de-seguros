import type { EmailProvider } from "./provider";
import { renderContactHtml, renderContactText } from "./provider";
import type { ContactMessage } from "./types";

export interface ResendConfig {
  apiKey: string;
  from: string;
  to: string;
}

export class ResendProvider implements EmailProvider {
  readonly name = "resend";

  constructor(private readonly config: ResendConfig) {}

  async sendContactMessage(message: ContactMessage): Promise<void> {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.config.apiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: this.config.from,
        to: [this.config.to],
        reply_to: message.email,
        subject: `[detondocorretora.com] ${message.name}`,
        html: renderContactHtml(message),
        text: renderContactText(message),
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      throw new Error(`Resend responded ${response.status}: ${detail}`);
    }
  }
}
