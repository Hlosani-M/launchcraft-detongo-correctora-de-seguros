import "server-only";

const dictionaries = {
  pt: () => import("./dictionaries/pt.json").then((m) => m.default),
  en: () => import("./dictionaries/en.json").then((m) => m.default),
};

export type Locale = keyof typeof dictionaries;
export const LOCALES: readonly Locale[] = ["pt", "en"] as const;
export const DEFAULT_LOCALE: Locale = "pt";

export const hasLocale = (value: string): value is Locale =>
  value in dictionaries;

export const getDictionary = async (locale: Locale) => dictionaries[locale]();

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
