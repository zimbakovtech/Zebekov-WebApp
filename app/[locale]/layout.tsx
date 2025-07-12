import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../globals.css";

export async function generateStaticParams() {
  return [
    { locale: 'mk' },
    { locale: 'en' },
    { locale: 'bg' }
  ];
}

export const metadata = {
  title: "Dental Center Zebekov - Your Perfect Smile Starts Here",
  description:
    "Experience exceptional dental care with our team of expert dentists in Skopje and Ohrid. Modern technology, comfortable environment, and personalized treatment for every patient.",
  keywords:
    "dental care, dentist, Skopje, Ohrid, Macedonia, cosmetic dentistry, orthodontics, oral surgery",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string | Promise<string> };
}) {
  // Await the locale promise before using it
  const localeValue = await params.locale;

  // Load your translations for that locale
  const messages = await getMessages({ locale: localeValue });

  return (
    <NextIntlClientProvider locale={localeValue} messages={messages}>
      <Header />
      <main>{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}
