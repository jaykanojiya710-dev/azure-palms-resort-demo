import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { MotionProvider } from "@/components/site/motion-provider";
import { LenisProvider } from "@/components/site/lenis-provider";
import { Cursor } from "@/components/site/cursor";
import { BookingProvider } from "@/components/site/booking-provider";
import { Toaster } from "@/components/ui/toaster";

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.name} — Luxury Beachfront Resort`,
  description: `${site.name}. Twenty-four villas and rooms on a private mile of Caribbean sand on the Costa Verde Peninsula. Where the tide sets the tempo.`,
};

export const viewport: Viewport = {
  themeColor: "#0E5E5A",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <MotionProvider>
          <LenisProvider>
            <BookingProvider>
              {children}
              <Toaster />
            </BookingProvider>
            <Cursor />
          </LenisProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
