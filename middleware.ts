import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["mk", "en", "bg"],
  defaultLocale: "mk",
  localePrefix: "always"
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
