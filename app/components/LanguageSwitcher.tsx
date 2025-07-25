"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon, LanguageIcon } from "@heroicons/react/24/outline";

const languages = [
  { code: "mk", name: "Македонски", flag: "🇲🇰" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "bg", name: "Български", flag: "🇧🇬" },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage =
    languages.find((lang) => lang.code === locale) || languages[0];

  const handleLanguageChange = (newLocale: string) => {
    startTransition(() => {
      // Get the current path without any locale prefix
      let pathWithoutLocale = pathname.replace(/^\/(mk|en|bg)(?=\/|$)/, "");
      if (pathWithoutLocale === "") pathWithoutLocale = "/";

      // Always add the locale prefix
      let targetPath;
      if (pathWithoutLocale === "/") {
        targetPath = `/${newLocale}`;
      } else {
        targetPath = `/${newLocale}${pathWithoutLocale}`;
      }
      
      // Always use router.push to ensure navigation happens
      router.push(targetPath);
    });
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-2 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        disabled={isPending}
      >
        <LanguageIcon className="h-5 w-5 text-gray-600" />
        <span className="text-sm font-medium text-gray-700">
          {currentLanguage.name}
        </span>
        <ChevronDownIcon
          className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20"
              {...({} as any)}
            >
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-200 ${
                    locale === language.code
                      ? "bg-[#44B0B6]/10 text-[#44B0B6]"
                      : "text-gray-700"
                  }`}
                  disabled={isPending}
                >
                  <span className="text-lg">{language.flag}</span>
                  <span className="text-sm font-medium">{language.name}</span>
                  {locale === language.code && (
                    <div className="ml-auto w-2 h-2 bg-[#44B0B6] rounded-full" />
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
