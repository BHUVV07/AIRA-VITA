import { Metadata } from "next";
import ResourcesClient from "./ResourcesClient";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "HVAC Technical Resources & Educational Guides | Aria Vita",
  description:
    "Technical guides, articles, and documentation on HVAC air distribution, constant airflow regulators, disc valves, flexible ducting, and air curtains.",
  alternates: {
    canonical: "https://www.ariavita.in/resources",
  },
  openGraph: {
    title: "HVAC Technical Resources & Educational Guides | Aria Vita",
    description:
      "Technical guides, articles, and documentation on HVAC air distribution, constant airflow regulators, disc valves, flexible ducting, and air curtains.",
    url: "https://www.ariavita.in/resources",
    siteName: "Aria Vita",
    type: "website",
  },
};

export default function ResourcesPage() {
  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Resources", url: "/resources" },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <ResourcesClient />
    </>
  );
}
