import type { Metadata } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/context/store";
import { ExperienceProvider } from "@/context/experience";
import { ExperienceLayer } from "@/components/motion/experience-layer";
import { SiteChrome } from "@/components/site-chrome";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Omyre Essentials — Romanticise your everyday",
    template: "%s · Omyre Essentials",
  },
  description:
    "Premium self-care, fragrance and home essentials. Authentic Bath & Body Works products with nationwide delivery across Nigeria.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Omyre Essentials — Romanticise your everyday",
    description:
      "Discover carefully curated self-care, fragrance and home essentials.",
    type: "website",
    locale: "en_NG",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-NG"
      className={`${playfair.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-cream font-sans text-plum">
        <StoreProvider>
          <ExperienceProvider>
            <ExperienceLayer>
              <SiteChrome>{children}</SiteChrome>
            </ExperienceLayer>
          </ExperienceProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
