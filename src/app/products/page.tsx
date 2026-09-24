"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Search } from "lucide-react";
import FinalCTASection from "@/components/sections/FinalCTASection";
import ProductModal from "@/components/ui/ProductModal";
import { PRODUCTS, getAllCategories, searchProducts, Product } from "@/data/products";

export default function ProductsPage() {
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
      <section className="bg-gradient-to-b from-white via-sky-50 to-ice-blue py-14 lg:py-20 border-b border-sky-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-100 px-3.5 py-1 rounded-full border border-purple-200 inline-block">
            Official HVAC Product Catalogue
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-slate-900 tracking-tight leading-tight">
            Precision Air Distribution, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-sky-600 to-purple-900">
              Engineered Around Performance.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Explore Aria Vita™&apos;s 5 official air distribution product lines engineered for commercial, industrial and residential applications.
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
                      ? "bg-purple-700 text-white shadow-md"
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
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
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
                      ? "bg-sky-600 text-white"
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
            <p className="text-slate-500 text-sm mt-1">Try searching for &quot;ABS&quot;, &quot;Ø125&quot;, or &quot;Non-Insulated&quot;.</p>
            <button
              onClick={() => {
                setSelectedCategory("All Products");
                setSelectedSubcategory("All");
                setSearchQuery("");
              }}
              className="mt-4 px-5 py-2.5 bg-purple-700 text-white font-semibold text-xs rounded-xl"
            >
              Reset Search & Filters
            </button>
          </div>
        ) : (
          <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedProducts.map((product, idx) => {
                const indexFormatted = String(PRODUCTS.findIndex((p) => p.id === product.id) + 1).padStart(2, "0");

                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-3xl border border-slate-200 hover:border-purple-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                  >
                    <div className="relative bg-slate-950 aspect-[4/3] overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 bg-white/95 text-purple-900 text-xs font-mono font-bold tracking-wider px-3 py-1 rounded-md shadow-md border border-purple-200 flex items-center gap-2">
                        <span className="text-purple-600">{indexFormatted}</span>
                        <span>{product.name.toUpperCase()}</span>
                      </div>
                    </div>

                    <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between space-y-5">
                      <div>
                        <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
                          <span>PRODUCT {indexFormatted}</span>
                          {product.badges && product.badges[0] && (
                            <span className="text-purple-700 font-semibold">{product.badges[0]}</span>
                          )}
                        </div>
                        <h3 className="text-2xl font-extrabold font-heading text-slate-900 group-hover:text-purple-700 transition-colors">
                          {product.name}
                        </h3>
                        <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-2">
                          {product.subtitle}
                        </p>

                        {/* Display Subcategories List if present */}
                        {product.subcategories && product.subcategories.length > 0 && (
                          <div className="mt-4 p-3 bg-sky-50/70 rounded-2xl border border-sky-100 space-y-1.5">
                            <span className="text-[10px] uppercase font-bold tracking-wider text-purple-800 block">
                              Available Subcategories:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {product.subcategories.map((sub) => (
                                <Link
                                  key={sub.id}
                                  href={`/products/${product.slug}/${sub.slug}`}
                                  className="text-[11px] font-semibold text-slate-700 hover:text-purple-700 bg-white px-2.5 py-1 rounded border border-slate-200 transition-colors"
                                >
                                  {sub.name} {sub.isComingSoon && "(Soon)"}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Display Air Curtain Series if present */}
                        {product.id === "air-curtain" && product.models && (
                          <div className="mt-4 p-3 bg-purple-50/70 rounded-2xl border border-purple-100 space-y-1">
                            <span className="text-[10px] uppercase font-bold tracking-wider text-purple-800 block">
                              Available Series Range:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {product.models.map((m) => (
                                <span key={m.name} className="text-[11px] font-mono font-bold text-purple-700 bg-white px-2 py-0.5 rounded border border-purple-200">
                                  {m.name}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Standards badges */}
                        {product.standards && (
                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {product.standards.map((std) => (
                              <span
                                key={std}
                                className="inline-flex items-center gap-1 text-[11px] font-mono font-medium px-2.5 py-0.5 rounded bg-purple-50 text-purple-800 border border-purple-200"
                              >
                                <ShieldCheck className="w-3 h-3 text-purple-600" />
                                {std}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                        <button
                          onClick={() => setSelectedProduct(product)}
                          className="text-xs font-semibold text-slate-500 hover:text-purple-700 cursor-pointer"
                        >
                          Quick Data Sheet
                        </button>

                        <Link
                          href={`/products/${product.slug}`}
                          className="inline-flex items-center gap-1.5 text-sm font-bold text-purple-700 hover:text-purple-800 group-hover:translate-x-1 transition-transform"
                        >
                          <span>Explore {product.name}</span>
                          <ArrowRight className="w-4 h-4" />
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

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      <FinalCTASection />
    </div>
  );
}
