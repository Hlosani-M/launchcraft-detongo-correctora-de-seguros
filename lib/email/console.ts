import type { EmailProvider } from "./provider";
import { renderContactText } from "./provider";
import type { ContactMessage } from "./types";

export class ConsoleProvider implements EmailProvider {
  readonly name = "console";

  async sendContactMessage(message: ContactMessage): Promise<void> {
    // eslint-disable-next-line no-console
    console.info(
      "[email:console] Would deliver contact message\n" +
        renderContactText(message),
    );
  }
}
