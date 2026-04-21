import { describe, expect, it, vi, beforeEach } from "vitest";

const sendContactMessage = vi.fn().mockResolvedValue(undefined);

vi.mock("server-only", () => ({}));
vi.mock("@/lib/email/factory", () => ({
  getEmailProvider: () => ({ name: "mock", sendContactMessage }),
}));

const formData = (
  entries: Record<string, string | undefined>,
): FormData => {
  const fd = new FormData();
  for (const [key, value] of Object.entries(entries)) {
    if (value !== undefined) fd.set(key, value);
  }
  return fd;
};

const validPayload = {
  name: "Maria Silva",
  email: "maria@example.com",
  phone: "+244 900 000 000",
  message: "Gostaria de receber uma cotação de seguro automóvel.",
  locale: "pt",
};

describe("contactAction", () => {
  beforeEach(() => {
    sendContactMessage.mockClear();
  });

  it("delivers a valid submission and returns success", async () => {
    const { contactAction } = await import("@/app/[lang]/actions");
    const result = await contactAction(
      { status: "idle" },
      formData(validPayload),
    );
    expect(result.status).toBe("success");
    expect(sendContactMessage).toHaveBeenCalledOnce();
    const arg = sendContactMessage.mock.calls[0][0];
    expect(arg.name).toBe("Maria Silva");
    expect(arg.phone).toBe("+244 900 000 000");
  });

  it("returns field errors for invalid input without sending", async () => {
    const { contactAction } = await import("@/app/[lang]/actions");
    const result = await contactAction(
      { status: "idle" },
      formData({ ...validPayload, email: "not-an-email", message: "too" }),
    );
    expect(result.status).toBe("error");
    expect(result.errors?.email).toBeTruthy();
    expect(result.errors?.message).toBeTruthy();
    expect(sendContactMessage).not.toHaveBeenCalled();
  });

  it("silently swallows honeypot submissions", async () => {
    const { contactAction } = await import("@/app/[lang]/actions");
    const result = await contactAction(
      { status: "idle" },
      formData({ ...validPayload, website: "http://spam.test" }),
    );
    expect(result.status).toBe("success");
    expect(sendContactMessage).not.toHaveBeenCalled();
  });

  it("reports a generic error when the provider throws", async () => {
    sendContactMessage.mockRejectedValueOnce(new Error("boom"));
    const { contactAction } = await import("@/app/[lang]/actions");
    const result = await contactAction(
      { status: "idle" },
      formData(validPayload),
    );
    expect(result.status).toBe("error");
    expect(result.errors).toBeUndefined();
  });
});
