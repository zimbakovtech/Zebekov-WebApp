import { getRequestConfig } from "next-intl/server";

const locales = ["mk", "en", "bg"] as const;
const defaultLocale = "mk";

export default getRequestConfig(async ({ locale }) => {
  const safeLocale: string = locales.includes(locale as any) ? locale! : defaultLocale;
  return {
    locale: safeLocale,
    messages: (await import(`../messages/${safeLocale}.json`)).default,
  };
});
