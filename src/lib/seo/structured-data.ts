import { SEO_SITE_CONFIG } from "./site-config";

export interface FaqItemSchema {
  question: string;
  answer: string;
}

export interface BreadcrumbItemSchema {
  name: string;
  url: string;
}

/**
 * Builds valid Schema.org FAQPage JSON-LD object.
 */
export function buildFaqPageSchema(faqs: FaqItemSchema[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Builds valid Schema.org BreadcrumbList JSON-LD object.
 */
export function buildBreadcrumbSchema(items: BreadcrumbItemSchema[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: item.url.startsWith("http")
        ? item.url
        : `${SEO_SITE_CONFIG.canonicalBase}${item.url.startsWith("/") ? "" : "/"}${item.url}`,
    })),
  };
}

/**
 * Builds valid Schema.org Product JSON-LD for the Constant Airflow Regulator (CAR).
 */
export function buildCarProductSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Aria Vita Constant Airflow Regulator (CAR)",
    description:
      "Pressure-independent mechanical constant airflow regulator (50–250 Pa, 50–200 mm diameter) designed for automatic duct balancing with zero electric power.",
    image: `${SEO_SITE_CONFIG.canonicalBase}/images/products/car.png`,
    category: "Constant Airflow Regulators",
    brand: {
      "@type": "Brand",
      name: "Aria Vita™",
    },
    manufacturer: {
      "@type": "Organization",
      name: "Aria Vita™",
      url: SEO_SITE_CONFIG.canonicalBase,
    },
  };
}
