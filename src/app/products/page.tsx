import { Metadata } from "next";
import ProductsClient from "./ProductsClient";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "HVAC Air Distribution Products South India",
  description:
    "Explore Aria Vita's HVAC air distribution products across South India: Fire Retardent Canvas, Constant Airflow Regulator (CAR), Disc Valves, Air Curtains, and Flexible Ducts. Distributed by Ecosta Systems Bangalore.",
  alternates: {
    canonical: "https://www.ariavita.in/products",
  },
  openGraph: {
    title: "HVAC Air Distribution Products South India | Aria Vita",
    description:
      "Explore Aria Vita's HVAC air distribution products across South India: Fire Retardent Canvas, Constant Airflow Regulator (CAR), Disc Valves, Air Curtains, and Flexible Ducts. Distributed by Ecosta Systems Bangalore.",
    url: "https://www.ariavita.in/products",
    siteName: "Aria Vita",
    type: "website",
  },
};

export default function ProductsPage() {
  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Products", url: "/products" },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <ProductsClient />
    </>
  );
}
