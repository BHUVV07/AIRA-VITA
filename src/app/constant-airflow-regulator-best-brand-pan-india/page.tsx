import React from "react";
import { Metadata } from "next";
import CarLandingClient from "./CarLandingClient";
import { CAR_LANDING_PAGE_DATA } from "@/lib/seo/car-landing-page";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { BreadcrumbSchema, FaqSchema } from "@/components/seo/JsonLd";
import { buildCarProductSchema } from "@/lib/seo/structured-data";

export const metadata: Metadata = buildPageMetadata({
  title: CAR_LANDING_PAGE_DATA.clientTitle,
  description: CAR_LANDING_PAGE_DATA.metaDescription,
  canonicalPath: CAR_LANDING_PAGE_DATA.route,
  keywords: [
    ...CAR_LANDING_PAGE_DATA.mainBrandKeywords,
    ...CAR_LANDING_PAGE_DATA.technicalKeywords,
    ...CAR_LANDING_PAGE_DATA.priceQualityKeywords,
    ...CAR_LANDING_PAGE_DATA.applicationKeywords,
  ],
  ogImage: "https://www.ariavita.in/images/products/car.png",
});

export default function CarLandingPage() {
  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Products", url: "/products" },
    { name: "Constant Airflow Regulator (CAR)", url: "/products/car" },
    { name: "CAR Best Brand Pan India", url: CAR_LANDING_PAGE_DATA.route },
  ];

  const faqsForSchema = CAR_LANDING_PAGE_DATA.faqs.map((f) => ({
    question: f.question,
    answer: f.editorialAnswer,
  }));

  const carProductSchema = buildCarProductSchema();

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <FaqSchema faqs={faqsForSchema} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(carProductSchema) }}
      />
      <CarLandingClient />
    </>
  );
}
