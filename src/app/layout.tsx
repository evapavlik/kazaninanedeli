import type { Metadata } from "next";
import { Lora, Plus_Jakarta_Sans, Cormorant_Garamond } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Kázání na neděli — Průvodce přípravou kázání",
    template: "%s | Kázání na neděli",
  },
  description:
    "Interaktivní průvodce přípravou kázání pro začínající kazatele v Církvi československé husitské. Krok za krokem od textu ke kázání.",
  keywords: ["kázání", "příprava kázání", "CČSH", "hermeneutika", "exegeze", "homiletika"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body
        className={`${lora.variable} ${jakarta.variable} ${cormorant.variable} font-jakarta antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 pt-[68px]">{children}</main>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
