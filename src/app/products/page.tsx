import { Metadata } from "next";
import ProductsClient from "./ProductsClient";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "HVAC Air Distribution Products | Aria Vita",
  description:
    "Explore Aria Vita's HVAC air distribution products including disc valves, air curtains, flexible ducts, fire retardent canvas and CAR airflow control solutions.",
  alternates: {
    canonical: "https://www.ariavita.in/products",
  },
  openGraph: {
    title: "HVAC Air Distribution Products | Aria Vita",
    description:
      "Explore Aria Vita's HVAC air distribution products including disc valves, air curtains, flexible ducts, fire retardent canvas and CAR airflow control solutions.",
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
