import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { homeSeoKeywords } from "@/data/seo";
import { SOCIAL_LINKS } from "@/lib/constants";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.primapackages.pk"),
  title: {
    default: "Custom Packaging & Woven Labels Pakistan | Prima Packages",
    template: "%s | Prima Packages",
  },
  description:
    "Order custom polyester woven labels, hang tags, zipper bags, courier flyers, butter paper and branded packaging in Karachi with delivery across Pakistan.",
  keywords: homeSeoKeywords,
  alternates: {
    canonical: "/",
  },
  category: "Custom Packaging",
  openGraph: {
    title: "Custom Packaging & Woven Labels Pakistan | Prima Packages",
    description:
      "Custom woven labels, hang tags, zipper bags, courier flyers and branded packaging for clothing and ecommerce brands across Pakistan.",
    url: "https://www.primapackages.pk",
    siteName: "Prima Packages",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/products/hero-suite.jpg",
        width: 1200,
        height: 900,
        alt: "Prima Packages custom labels, tags and branded packaging",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Packaging & Woven Labels Pakistan | Prima Packages",
    description:
      "Custom labels, tags, bags and branded packaging with delivery across Pakistan.",
    images: ["/images/products/hero-suite.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
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

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.primapackages.pk/#business",
  name: "Prima Packages",
  url: "https://www.primapackages.pk",
  logo: "https://www.primapackages.pk/images/prima-logo-horizontal.png",
  image: "https://www.primapackages.pk/images/products/hero-suite.jpg",
  description:
    "Custom packaging supplier in Karachi for polyester woven labels, hang tags, zipper bags, courier flyers, butter paper, cards, stickers and carry bags.",
  telephone: "+92 323 3231712",
  email: "hello@primapackages.pk",
  priceRange: "PKR",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Shop B-52, Ground Floor, Karim Center, Saddar",
    addressLocality: "Karachi",
    addressRegion: "Sindh",
    addressCountry: "PK",
  },
  areaServed: {
    "@type": "Country",
    name: "Pakistan",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "10:00",
      closes: "19:00",
    },
  ],
  sameAs: [SOCIAL_LINKS.instagram, SOCIAL_LINKS.facebook, SOCIAL_LINKS.tiktok],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/images/products/icon-logo.png" />
        <link rel="shortcut icon" href="/images/products/icon-logo.png" />
        <link rel="apple-touch-icon" href="/images/products/icon-logo.png" />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-warm-white text-charcoal">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
