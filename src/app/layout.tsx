import type { Metadata, Viewport } from "next";
import { Inter, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsAppButton from "@/components/ui/FloatingWhatsAppButton";

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
  title: {
    default: "Aria Vita™ | Precision Air Distribution Solutions",
    template: "%s | Aria Vita™ HVAC Air Distribution",
  },
  description:
    "Aria Vita™ manufactures and supplies high-performance air distribution and HVAC products for commercial, industrial and residential applications.",
  keywords: [
    "HVAC Air Distribution",
    "Fire Retardant Flexible Duct",
    "Constant Airflow Regulator",
    "Plastic Disc Valves",
    "Flexible Ducting",
    "Air Curtains",
    "Ecosta Systems Bangalore",
    "Aria Vita™ HVAC",
  ],
  authors: [{ name: "Aria Vita™" }],
  creator: "Aria Vita™",
  publisher: "Aria Vita™",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.ariavita.in",
    title: "Aria Vita™ | Precision Air Distribution Solutions",
    description:
      "Engineered air distribution solutions focused on airflow control, safety, reliability, efficiency and long-term performance.",
    siteName: "Aria Vita™",
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
      <body className="min-h-full flex flex-col bg-white text-slate-900 selection:bg-purple-100 selection:text-purple-900">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <FloatingWhatsAppButton />
      </body>
    </html>
  );
}
