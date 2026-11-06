import type { Metadata } from "next";
import { Lora, DM_Sans, Cormorant_Garamond, Literata } from "next/font/google";
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

// The interface typeface. DM Sans reads cleanly at the small sizes the chrome
// uses and stays out of the way of Literata, which carries the scripture.
const jakarta = DM_Sans({
  variable: "--font-jakarta",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

const literata = Literata({
  variable: "--font-literata",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
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
        className={`${lora.variable} ${jakarta.variable} ${cormorant.variable} ${literata.variable} font-jakarta antialiased`}
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
