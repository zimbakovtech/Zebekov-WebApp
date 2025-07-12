import "./globals.css";

export const metadata = {
  title: "Dental Center Zebekov - Your Perfect Smile Starts Here",
  description:
    "Experience exceptional dental care with our team of expert dentists in Strumica and Novo Selo. Modern technology, comfortable environment, and personalized treatment for every patient.",
  keywords:
    "dental care, dentist, Strumica, Novo Selo, Macedonia, cosmetic dentistry, orthodontics, oral surgery",
  icons: {
    icon: "../images/zebekov_logo.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mk">
      <body>{children}</body>
    </html>
  );
}
