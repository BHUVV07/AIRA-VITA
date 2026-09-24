import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, PRODUCTS } from "@/data/products";
import ProductDetailClient from "./ProductDetailClient";
import { ProductSchema, BreadcrumbSchema } from "@/components/seo/JsonLd";

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateStaticParams() {
  const paths: { slug: string[] }[] = [];

  PRODUCTS.forEach((product) => {
    // Main product route
    paths.push({ slug: [product.slug] });

    // Subcategory routes
    if (product.subcategories) {
      product.subcategories.forEach((sub) => {
        paths.push({ slug: [product.slug, sub.slug] });
      });
    }
  });

  return paths;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slugSegments = resolvedParams.slug || [];
  const mainSlug = slugSegments[0] || "";
  const subSlug = slugSegments[1] || "";

  const product = getProductBySlug(mainSlug);

  if (!product) {
    return {
      title: "Product Not Found | Aria Vita",
    };
  }

  const activeSubcategory = product.subcategories?.find(
    (sc) =>
      sc.slug.toLowerCase() === subSlug.toLowerCase() ||
      sc.id.toLowerCase() === subSlug.toLowerCase() ||
      (sc.model && sc.model.toLowerCase() === subSlug.toLowerCase())
  );

  const title = activeSubcategory
    ? `${product.name} — ${activeSubcategory.name} | Aria Vita`
    : product.seoTitle || `${product.name} | Aria Vita`;

  const description =
    activeSubcategory?.description || product.seoDescription || product.description;

  const slugPath = slugSegments.join("/");
  const canonicalUrl = `https://www.ariavita.in/products/${slugPath}`;

  return {
    title,
    description,
    keywords: product.seoKeywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
      siteName: "Aria Vita",
      images: [
        {
          url: `https://www.ariavita.in${activeSubcategory?.image || product.image}`,
          alt: activeSubcategory ? `Aria Vita ${product.name} ${activeSubcategory.name}` : `Aria Vita ${product.name}`,
        },
      ],
    },
  };
}

export default async function DynamicProductPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slugSegments = resolvedParams.slug || [];
  const mainSlug = slugSegments[0] || "";
  const subSlug = slugSegments[1] || "";

  const product = getProductBySlug(mainSlug);

  if (!product) {
    notFound();
  }

  const activeSubcategory = product.subcategories?.find(
    (sc) =>
      sc.slug.toLowerCase() === subSlug.toLowerCase() ||
      sc.id.toLowerCase() === subSlug.toLowerCase() ||
      (sc.model && sc.model.toLowerCase() === subSlug.toLowerCase())
  );

  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Products", url: "/products" },
    { name: product.name, url: `/products/${product.slug}` },
  ];

  if (activeSubcategory) {
    breadcrumbItems.push({
      name: activeSubcategory.name,
      url: `/products/${product.slug}/${activeSubcategory.slug}`,
    });
  }

  return (
    <>
      <ProductSchema product={product} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <ProductDetailClient mainSlug={mainSlug} subSlug={subSlug} />
    </>
  );
}
