import type { ContactMessage } from "./types";

export interface EmailProvider {
  readonly name: string;
  sendContactMessage(message: ContactMessage): Promise<void>;
}

export function renderContactText(message: ContactMessage): string {
  const phoneLine = message.phone ? `Phone: ${message.phone}\n` : "";
  return [
    `New contact form submission (${message.locale.toUpperCase()})`,
    "",
    `Name: ${message.name}`,
    `Email: ${message.email}`,
    phoneLine ? phoneLine.trim() : null,
    "",
    "Message:",
    message.message,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

export function renderContactHtml(message: ContactMessage): string {
  const phoneRow = message.phone
    ? `<tr><td style="padding:4px 0;color:#7D808C">Phone</td><td style="padding:4px 0;color:#171A35">${escapeHtml(message.phone)}</td></tr>`
    : "";
  return `<!doctype html>
<html>
  <body style="font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;background:#f2f5f8;padding:24px;color:#171A35">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid rgba(125,128,140,0.15)">
      <tr>
        <td style="background:#171A35;padding:20px 28px;color:#FBFCFC">
          <div style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#05BBFB;font-weight:600">Detondo · New contact</div>
          <div style="font-size:20px;font-weight:700;margin-top:6px">${escapeHtml(message.name)}</div>
        </td>
      </tr>
      <tr>
        <td style="padding:24px 28px">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="font-size:14px;line-height:22px">
            <tr><td style="padding:4px 0;color:#7D808C;width:80px">Email</td><td style="padding:4px 0;color:#171A35"><a href="mailto:${escapeHtml(message.email)}" style="color:#0399d1">${escapeHtml(message.email)}</a></td></tr>
            ${phoneRow}
            <tr><td style="padding:4px 0;color:#7D808C">Locale</td><td style="padding:4px 0;color:#171A35">${message.locale.toUpperCase()}</td></tr>
          </table>
          <div style="height:1px;background:rgba(125,128,140,0.2);margin:20px 0"></div>
          <div style="white-space:pre-wrap;font-size:15px;line-height:24px;color:#171A35">${escapeHtml(message.message)}</div>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
