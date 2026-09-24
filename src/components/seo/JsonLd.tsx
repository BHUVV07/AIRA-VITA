import React from "react";
import { COMPANY_INFO, Product } from "@/data/products";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY_INFO.name,
    legalName: "Aria Vita™ Air Distribution Systems",
    url: "https://www.ariavita.in",
    logo: "https://www.ariavita.in/images/logo.png",
    description: COMPANY_INFO.business,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: COMPANY_INFO.contact.formattedPhone,
      contactType: "sales and technical support",
      areaServed: "IN",
      availableLanguage: ["en", "hi", "kn"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "#31, Ground Floor, 80 Feet Rd, HAL 2nd Stage, Indiranagar, Near LPSC",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      postalCode: "560008",
      addressCountry: "IN",
    },
    distributor: {
      "@type": "Organization",
      name: COMPANY_INFO.distributor.name,
      address: COMPANY_INFO.distributor.address,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Aria Vita™",
    url: "https://www.ariavita.in",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.ariavita.in/products?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ProductSchema({ product }: { product: Product }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.fullName ? `${product.name} — ${product.fullName}` : product.name,
    description: product.seoDescription || product.description,
    image: `https://www.ariavita.in${product.image}`,
    category: product.category,
    brand: {
      "@type": "Brand",
      name: "Aria Vita™",
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      priceValidUntil: "2027-12-31",
      itemCondition: "https://schema.org/NewCondition",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Ecosta Systems",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `https://www.ariavita.in${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ArticleSchema({
  title,
  description,
  url,
  publishedDate,
}: {
  title: string;
  description: string;
  url: string;
  publishedDate?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    url: url.startsWith("http") ? url : `https://www.ariavita.in${url}`,
    datePublished: publishedDate || "2026-01-01",
    author: {
      "@type": "Organization",
      name: "Aria Vita™ Technical Engineering Team",
    },
    publisher: {
      "@type": "Organization",
      name: "Aria Vita™",
      logo: {
        "@type": "ImageObject",
        url: "https://www.ariavita.in/images/logo.png",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
