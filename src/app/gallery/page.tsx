import React from "react";
import { Metadata } from "next";
import GalleryClient from "./GalleryClient";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Product & Project Installation Gallery | Aria Vita",
  description:
    "Explore high-performance ARIA VITA HVAC air distribution products, custom engineering variants, and project installations across India. Disc valves, air curtains, flexible ducts, fire retardent canvas, and CAR regulators.",
  alternates: {
    canonical: "https://www.ariavita.in/gallery",
  },
  openGraph: {
    title: "Product & Project Installation Gallery | Aria Vita",
    description:
      "Explore high-performance ARIA VITA HVAC air distribution products, custom engineering variants, and project installations across India.",
    url: "https://www.ariavita.in/gallery",
    type: "website",
    siteName: "Aria Vita",
    images: [
      {
        url: "https://www.ariavita.in/images/logo.png",
        alt: "Aria Vita Product & Project Gallery",
      },
    ],
  },
};

export default function GalleryPage() {
  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Gallery", url: "/gallery" },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <GalleryClient />
    </>
  );
}
