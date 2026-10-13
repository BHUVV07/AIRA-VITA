import { Metadata } from "next";
import { SEO_SITE_CONFIG } from "./site-config";
import { generateLocationSeoTitle } from "./location-keywords";

export interface PageMetadataOptions {
  title: string;
  description: string;
  canonicalPath: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: "website" | "article";
  noIndex?: boolean;
}

/**
 * Builds standard App Router Metadata with OpenGraph, Twitter Card, and Canonical URL.
 */
export function buildPageMetadata({
  title,
  description,
  canonicalPath,
  keywords = [],
  ogImage = "https://www.ariavita.in/images/logo.png",
  ogType = "website",
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const fullCanonicalUrl = canonicalPath.startsWith("http")
    ? canonicalPath
    : `${SEO_SITE_CONFIG.canonicalBase}${canonicalPath.startsWith("/") ? "" : "/"}${canonicalPath}`;

  // Strip trailing brand suffix so root layout template "%s | Aria Vita" appends it once
  const baseTitle = title.replace(/\s*\|\s*Aria\s*Vita.*$/i, "").trim();
  const fullTitleWithBrand = `${baseTitle} | Aria Vita`;

  return {
    title: baseTitle,
    description,
    keywords,
    alternates: {
      canonical: fullCanonicalUrl,
    },
    openGraph: {
      title: fullTitleWithBrand,
      description,
      url: fullCanonicalUrl,
      type: ogType,
      siteName: SEO_SITE_CONFIG.clientName,
      locale: SEO_SITE_CONFIG.defaultLocale,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fullTitleWithBrand,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitleWithBrand,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  };
}

/**
 * Formats a location SEO title conforming to client's Master Formula:
 * [Product] in [City] | Best Price | Best Quality | Aria Vita Distributor | Ecosta Systems
 */
export function buildLocationProductTitle(product: string, city: string): string {
  return generateLocationSeoTitle(product, city);
}
