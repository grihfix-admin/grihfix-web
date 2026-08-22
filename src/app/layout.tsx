// src/app/layout.tsx
import type { Metadata } from "next";

import "./globals.css";

import { Layout } from "@/components/layout/Layout";
import { Providers } from "@/app/providers";

const siteUrl = "https://grihfix.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "GrihFix — Hassle-free Home Services in Darbhanga",
    template: "%s • GrihFix Darbhanga",
  },
  description:
    "Home cleaning, tank cleaning, plumbing, electrical repairs, and on-call maintenance for Darbhanga households. Fast slots, verified staff, transparent pricing.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "GrihFix — Hassle-free Home Services in Darbhanga",
    description:
      "Book deep cleaning, tank flushing, plumbing, electrical and car wash services with verified Darbhanga pros.",
    url: siteUrl,
    siteName: "GrihFix",
    images: [
      {
        url: "/grihfix-logo.png",
        width: 800,
        height: 418,
        alt: "GrihFix home services",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GrihFix — Hassle-free Home Services in Darbhanga",
    description:
      "Verified Darbhanga technicians for cleaning, tanks, plumbing, electrical repairs and more.",
    images: ["/grihfix-logo.png"],
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "GrihFix",
  description:
    "Darbhanga’s trusted home services company for deep cleaning, tank flushing, plumbing, electrical repairs and car washes.",
  url: siteUrl,
  telephone: "+91-97098-70726",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Allalpatti",
    addressLocality: "Darbhanga",
    addressRegion: "Bihar",
    postalCode: "846003",
    addressCountry: "IN",
  },
  areaServed: "Darbhanga",
  sameAs: ["https://www.instagram.com/grihfix/", "https://www.facebook.com/grihfixdbg/"],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "09:00",
      closes: "20:00",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hind:wght@400;500;600;700&family=Poppins:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white font-sans text-slate-900 antialiased">
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </body>
    </html>
  );
}