import type { Metadata, Viewport } from "next";
import { Inter, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsAppButton from "@/components/ui/FloatingWhatsAppButton";
import { OrganizationSchema, WebSiteSchema } from "@/components/seo/JsonLd";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ariavita.in"),
  title: {
    default: "Aria Vita | HVAC Air Distribution Products & Solutions",
    template: "%s | Aria Vita",
  },
  description:
    "Aria Vita manufactures and supplies HVAC air distribution products for commercial, industrial and residential applications, including disc valves, flexible ducts, air curtains and airflow control solutions.",
  keywords: [
    "HVAC air distribution products",
    "air distribution systems",
    "air distribution solutions",
    "HVAC products",
    "HVAC air distribution",
    "commercial HVAC products",
    "industrial HVAC products",
    "residential HVAC products",
    "disc valves",
    "air curtain",
    "flexible duct",
    "fire retardent canvas",
    "constant airflow regulator",
    "CAR airflow regulator",
    "HVAC products India",
    "HVAC supplier India",
    "HVAC distributor Bangalore",
    "Ecosta Systems Bangalore",
  ],
  authors: [{ name: "Aria Vita" }],
  creator: "Aria Vita",
  publisher: "Aria Vita",
  alternates: {
    canonical: "https://www.ariavita.in",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.ariavita.in",
    title: "Aria Vita | HVAC Air Distribution Products & Solutions",
    description:
      "Aria Vita manufactures and supplies HVAC air distribution products for commercial, industrial and residential applications, including disc valves, flexible ducts, air curtains and airflow control solutions.",
    siteName: "Aria Vita",
    images: [
      {
        url: "https://www.ariavita.in/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Aria Vita HVAC Air Distribution Products",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B132B",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSans.variable} scroll-smooth h-full antialiased`}>
      <head>
        <OrganizationSchema />
        <WebSiteSchema />
      </head>
      <body className="min-h-full flex flex-col bg-white text-slate-900 selection:bg-purple-100 selection:text-purple-900">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <FloatingWhatsAppButton />
      </body>
    </html>
  );
}
