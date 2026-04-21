export interface ContactMessage {
  name: string;
  email: string;
  phone?: string;
  message: string;
  locale: "pt" | "en";
}
