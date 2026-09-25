"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Search } from "lucide-react";
import FinalCTASection from "@/components/sections/FinalCTASection";
import ProductModal from "@/components/ui/ProductModal";
import { PRODUCTS, getAllCategories, searchProducts, Product } from "@/data/products";

export default function ProductsClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Products");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = getAllCategories();

  // Selected product object if single category chosen
  const activeTopCategory = PRODUCTS.find((p) => p.name === selectedCategory);
  const availableSubcategories = activeTopCategory?.subcategories
    ? ["All", ...activeTopCategory.subcategories.map((s) => s.name)]
    : [];

  // Filter products dynamically
  let displayedProducts = searchQuery ? searchProducts(searchQuery) : PRODUCTS;

  if (selectedCategory !== "All Products") {
    displayedProducts = displayedProducts.filter(
      (p) => p.name === selectedCategory || p.category === selectedCategory
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-slate-50">
      {/* Editorial Hero */}
      <section className="bg-gradient-to-b from-white via-sky-50 to-sky-100/50 py-14 lg:py-20 border-b border-sky-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-100 px-3.5 py-1 rounded-full border border-sky-200 inline-block">
            Official HVAC Product Catalogue
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-slate-900 tracking-tight leading-tight">
            HVAC Air Distribution Products
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Explore Aria Vita&apos;s product lines engineered for commercial, industrial and residential applications.
          </p>
        </div>
      </section>

      {/* Educational Intro Content for Search Engines & Visitors */}
      <section className="py-10 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-slate-700 text-sm leading-relaxed">
          <h2 className="text-xl font-bold font-heading text-slate-900">
            Engineered Airflow Control for Modern HVAC Systems
          </h2>
          <p>
            Air distribution components are essential elements in modern heating, ventilation, and air conditioning (HVAC) networks. They regulate, balance, and direct conditioned air from central air handling units into occupied building zones while exhausting stale air smoothly.
          </p>
          <p>
            Whether balancing multi-story ventilation shafts with Constant Airflow Regulators (CAR), maintaining sterile air barriers with industrial Air Curtains, routing air flexible through ceiling voids with multi-ply Flexible Ducts, or protecting building shafts with Fire Retardent Canvas connectors, Aria Vita™ provides tested air distribution products tailored for Pan-India MEP specifications.
          </p>
        </div>
      </section>

      {/* Dynamic Filter & Search Toolbar */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-sky-100 shadow-sm space-y-4 mb-10">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Top-Level Category Filter Pills */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setSelectedSubcategory("All");
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-sky-600 text-white shadow-md"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products, subcategories, models, specs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
              />
            </div>
          </div>

          {/* Subcategory Filter Pills (If active category has subcategories) */}
          {availableSubcategories.length > 0 && (
            <div className="pt-3 border-t border-slate-100 flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-2">
                Subcategories:
              </span>
              {availableSubcategories.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubcategory(sub)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedSubcategory === sub
                      ? "bg-sky-700 text-white"
                      : "bg-sky-50 text-sky-800 hover:bg-sky-100 border border-sky-200"
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Dynamic Product Catalogue Cards */}
        {displayedProducts.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-3xl border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900">No Products Matched Your Search</h3>
            <p className="text-slate-500 text-sm mt-1">Try searching for &quot;AACA&quot;, &quot;50–200 dia&quot;, or &quot;Flexible Duct&quot;.</p>
            <button
              onClick={() => {
                setSelectedCategory("All Products");
                setSelectedSubcategory("All");
                setSearchQuery("");
              }}
              className="mt-4 px-5 py-2.5 bg-sky-600 text-white font-semibold text-xs rounded-xl"
            >
              Reset Search & Filters
            </button>
          </div>
        ) : (
          <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedProducts.map((product) => {
                const indexFormatted = String(PRODUCTS.findIndex((p) => p.id === product.id) + 1).padStart(2, "0");

                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-3xl border border-slate-200 hover:border-sky-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                  >
                    <div className="relative bg-slate-50/90 border-b border-slate-100 aspect-[4/3] overflow-hidden p-3">
                      <Image
                        src={product.image}
                        alt={product.slug === "car" ? "Aria Vita Constant Airflow Regulator" : `Aria Vita ${product.name}`}
                        fill
                        className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 bg-white/95 text-sky-900 text-xs font-mono font-bold tracking-wider px-3 py-1 rounded-md shadow-md border border-sky-200 flex items-center gap-2">
                        <span className="text-sky-600">{indexFormatted}</span>
                        <span>{product.name.toUpperCase()}</span>
                      </div>
                    </div>

                    <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between space-y-5">
                      <div>
                        <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
                          <span>PRODUCT {indexFormatted}</span>
                          {product.badges && product.badges[0] && (
                            <span className="text-sky-700 font-semibold">{product.badges[0]}</span>
                          )}
                        </div>
                        <h3 className="text-2xl font-extrabold font-heading text-slate-900 group-hover:text-sky-700 transition-colors">
                          {product.name}
                        </h3>
                        <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-2">
                          {product.subtitle}
                        </p>

                        {/* Display Subcategories List if present */}
                        {product.subcategories && product.subcategories.length > 0 && (
                          <div className="mt-4 p-3 bg-sky-50/50 rounded-2xl border border-sky-100 space-y-1.5">
                            <span className="text-[10px] uppercase font-bold tracking-wider text-sky-800 block">
                              Available Subcategories:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {product.subcategories.map((sub) => (
                                <Link
                                  key={sub.id}
                                  href={`/products/${product.slug}/${sub.slug}`}
                                  className="text-[11px] font-semibold text-slate-700 hover:text-sky-700 bg-white px-2.5 py-1 rounded border border-slate-200 transition-colors"
                                >
                                  {sub.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Display Specifications Highlights */}
                        <div className="mt-4 p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1 text-xs">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                            Key Specifications:
                          </span>
                          <div className="space-y-0.5 text-slate-700 font-mono text-[11px]">
                            {Object.entries(product.specifications).slice(0, 3).map(([key, val]) => (
                              <div key={key} className="flex items-center justify-between gap-2">
                                <span className="text-slate-500 font-sans text-xs">{key}:</span>
                                <span className="font-bold text-slate-900 truncate">{String(val)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Card Action CTAs */}
                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                        <button
                          onClick={() => setSelectedProduct(product)}
                          className="text-xs font-semibold text-slate-500 hover:text-sky-700 transition-colors cursor-pointer"
                        >
                          Quick Specifications
                        </button>

                        <Link
                          href={`/products/${product.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 hover:text-sky-900 group-hover:translate-x-1 transition-all"
                        >
                          <span>Explore Product</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* SEO Information & Trust Strip */}
      <section className="py-12 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <ShieldCheck className="w-6 h-6 text-sky-600 mx-auto md:mx-0" />
            <h4 className="text-sm font-bold text-slate-900">Tested MEP Quality</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Manufactured and compliance-tested to international HVAC performance standards for commercial and industrial installation.
            </p>
          </div>
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <Search className="w-6 h-6 text-sky-600 mx-auto md:mx-0" />
            <h4 className="text-sm font-bold text-slate-900">Authorized Stockist Support</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Stocked and distributed pan-India via Ecosta Systems in Indiranagar, Bengaluru for fast job site dispatch.
            </p>
          </div>
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <ArrowRight className="w-6 h-6 text-sky-600 mx-auto md:mx-0" />
            <h4 className="text-sm font-bold text-slate-900">Technical Selection Assistance</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our engineering team assists MEP consultants with airflow sizing, duct selection, and project bill of quantities (BOQ).
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <FinalCTASection />

      {/* Modal */}
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  );
}
