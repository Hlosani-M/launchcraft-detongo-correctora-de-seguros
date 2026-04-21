import { describe, expect, it } from "vitest";
import {
  LOCALES,
  DEFAULT_LOCALE,
  hasLocale,
  getDictionary,
} from "@/app/[lang]/dictionaries";

describe("dictionaries", () => {
  it("exposes both supported locales", () => {
    expect(LOCALES).toEqual(["pt", "en"]);
    expect(LOCALES).toContain(DEFAULT_LOCALE);
  });

  it("hasLocale narrows unknown strings", () => {
    expect(hasLocale("pt")).toBe(true);
    expect(hasLocale("en")).toBe(true);
    expect(hasLocale("fr")).toBe(false);
    expect(hasLocale("")).toBe(false);
  });

  it("resolves both dictionaries with matching top-level shape", async () => {
    const [pt, en] = await Promise.all([getDictionary("pt"), getDictionary("en")]);
    const ptKeys = Object.keys(pt).sort();
    const enKeys = Object.keys(en).sort();
    expect(ptKeys).toEqual(enKeys);
  });

  it("contains brand, nav, and CTA strings for every locale", async () => {
    for (const lang of LOCALES) {
      const dict = await getDictionary(lang);
      expect(dict.common.brand).toBeTruthy();
      expect(dict.common.cta.quote).toBeTruthy();
      expect(dict.common.nav.contact).toBeTruthy();
      expect(dict.hero.title).toBeTruthy();
    }
  });
});
