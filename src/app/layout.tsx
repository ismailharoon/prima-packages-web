import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Prima Packages | Custom Labels. Tags. Print. Packaging.",
    template: "%s | Prima Packages",
  },
  description:
    "Premium custom packaging & branding solutions for boutiques, fashion brands, and businesses across Pakistan. Custom labels, hang tags, business cards, and more.",
  keywords: [
    "custom packaging",
    "labels",
    "hang tags",
    "business cards",
    "Pakistan",
    "branding",
    "Prima Packages",
  ],
  openGraph: {
    title: "Prima Packages | Custom Labels. Tags. Print. Packaging.",
    description:
      "Premium custom packaging & branding solutions for boutiques, fashion brands, and businesses across Pakistan.",
    url: "https://primapackages.pk",
    siteName: "Prima Packages",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: [
      { url: '/images/products/icon-logo.png', type: 'image/png' },
    ],
    apple: [
      { url: '/images/products/icon-logo.png' },
    ],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/images/products/icon-logo.png" />
        <link rel="shortcut icon" href="/images/products/icon-logo.png" />
        <link rel="apple-touch-icon" href="/images/products/icon-logo.png" />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-warm-white text-charcoal">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
