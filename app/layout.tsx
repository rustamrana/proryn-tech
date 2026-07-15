import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/common/PageTransition";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    template: 'PRORYN TECH',
    default: 'PRORYN TECH — Enterprise Software Development',
  },
  description:
    "PRORYN TECH delivers enterprise software development, AI solutions, cloud technologies, and business automation for startups, SMEs, enterprises, and government organizations worldwide.",
  keywords: [
    "enterprise software development",
    "AI solutions",
    "business automation",
    "cloud technologies",
    "resource augmentation",
    "ERP software",
    "digital transformation",
    "PRORYN TECH",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://proryntech.com",
    siteName: "PRORYN TECH",
    title: "PRORYN TECH - Enterprise Software Development Company",
    description:
      "Engineering Intelligent Software for Modern Businesses. Enterprise software, AI solutions, cloud technologies, and business automation.",
    images: [
      {
        url: "https://proryntech.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "PRORYN TECH",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PRORYN TECH - Enterprise Software Development Company",
    description:
      "Engineering Intelligent Software for Modern Businesses.",
    images: ["https://proryntech.com/og-image.png"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "PRORYN TECH",
  url: "https://proryntech.com",
  logo: "https://proryntech.com/logo.png",
  description:
    "Enterprise software development company specializing in AI solutions, business automation, cloud technologies, and resource augmentation.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Plot No. 42, IT Park, Sector-C, Scheme 74-C, Vijay Nagar",
    addressLocality: "Bhopal",
    addressRegion: "Madhya Pradesh",
    postalCode: "462010",
    addressCountry: "IN",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      email: "info@proryntech.com",
      contactType: "customer service",
    },
    {
      "@type": "ContactPoint",
      email: "sales@proryntech.com",
      contactType: "sales",
    },
    {
      "@type": "ContactPoint",
      email: "support@proryntech.com",
      contactType: "technical support",
    },
  ],
  sameAs: [
    "https://www.linkedin.com/company/proryntech",
    "https://github.com/proryntech",
    "https://twitter.com/proryntech",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} antialiased bg-brand-background`}
      >
        <Navbar />
        <PageTransition />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
