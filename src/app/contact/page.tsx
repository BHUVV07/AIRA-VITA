import { Metadata } from "next";
import ContactClient from "./ContactClient";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Contact Aria Vita | Authorized HVAC Distribution India",
  description:
    "Get in touch with Aria Vita and authorized distributor Ecosta Systems in Indiranagar, Bengaluru for technical quotes, product specifications, and project inquiries.",
  alternates: {
    canonical: "https://www.ariavita.in/contact",
  },
  openGraph: {
    title: "Contact Aria Vita | Authorized HVAC Distribution India",
    description:
      "Get in touch with Aria Vita and authorized distributor Ecosta Systems in Indiranagar, Bengaluru for technical quotes, product specifications, and project inquiries.",
    url: "https://www.ariavita.in/contact",
    siteName: "Aria Vita",
    type: "website",
  },
};

export default function ContactPage() {
  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Contact", url: "/contact" },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <ContactClient />
    </>
  );
}
